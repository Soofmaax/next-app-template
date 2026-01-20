import * as fs from "fs/promises";
import * as path from "path";
import * as cheerio from "cheerio";
import type {
  JustRelaxData,
  GalleryGroup,
  GalleryImage,
  Menu,
  OpeningHourRange,
} from "../src/lib/just-relax-schema";

const SOURCE_URL = "https://just-relax.eatbu.com/?lang=fr";
const OUTPUT_PATH = path.join(process.cwd(), "data", "just-relax.json");

function log(step: string, detail?: string) {
  // Simple, readable logs for CLI usage
  console.log(`[scraper] ${step}${detail ? `: ${detail}` : ""}`);
}

function normaliseText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function extractPhones($: cheerio.CheerioAPI): { main?: string; others: string[] } {
  const rawPhones: string[] = [];

  $("a[href^='tel:']").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const value = href.replace("tel:", "").trim();
    if (!value) return;
    rawPhones.push(value);
  });

  const phones = unique(
    rawPhones.map((p) =>
      p
        .replace(/\s+/g, "")
        .replace(/^(00|\+)?33/, "+33")
        .replace(/^0+(?=\d)/, "")
    )
  );

  return {
    main: phones[0],
    others: phones.slice(1),
  };
}

function extractEmails($: cheerio.CheerioAPI): string[] {
  const emails: string[] = [];
  $("a[href^='mailto:']").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const value = href.replace("mailto:", "").trim();
    if (!value) return;
    emails.push(value);
  });
  return unique(emails);
}

function extractDeliveryLinks($: cheerio.CheerioAPI): { deliveroo?: string; uberEats?: string } {
  let deliveroo: string | undefined;
  let uberEats: string | undefined;

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (href.includes("deliveroo")) {
      deliveroo = href;
    }
    if (href.toLowerCase().includes("ubereats")) {
      uberEats = href;
    }
  });

  return { deliveroo, uberEats };
}

function collectSectionList(start: cheerio.Element, $: cheerio.CheerioAPI): string[] {
  const values: string[] = [];
  let node = $(start).next();

  while (node.length) {
    const tag = node.prop("tagName")?.toLowerCase();
    const text = normaliseText(node.text());

    if (!text) {
      node = node.next();
      continue;
    }

    if (tag && /^h[1-6]$/.test(tag)) {
      break; // next section
    }

    text
      .split(/\n+/)
      .map((t) => normaliseText(t))
      .filter(Boolean)
      .forEach((t) => values.push(t));

    node = node.next();
  }

  return unique(values);
}

function extractServicesAndPayments($: cheerio.CheerioAPI): {
  services: string[];
  paymentMethods: string[];
} {
  const services: string[] = [];
  const paymentMethods: string[] = [];

  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const label = normaliseText($(el).text()).toLowerCase();

    if (label.includes("nos services")) {
      services.push(...collectSectionList(el, $));
    }

    if (label === "disponibles" || label.includes("moyens de paiement")) {
      paymentMethods.push(...collectSectionList(el, $));
    }
  });

  return {
    services: unique(services),
    paymentMethods: unique(paymentMethods),
  };
}

function extractOpeningHours($: cheerio.CheerioAPI): OpeningHourRange[] {
  const result: OpeningHourRange[] = [];

  const heading = $("h1, h2, h3, h4, h5, h6")
    .filter((_, el) =>
      normaliseText($(el).text())
        .toLowerCase()
        .includes("heures d'ouverture")
    )
    .first();

  if (!heading.length) {
    return result;
  }

  const container = heading.parent();
  const text = normaliseText(container.text());

  const mondayToFridayMatch = text.match(/Lundi\s+à\s+Vendredi.*?(\d{2}:\d{2})[-–](\d{2}:\d{2})/i);
  const saturdayToSundayMatch = text.match(/Samedi\s+à\s+Dimanche.*?(\d{2}:\d{2})[-–](\d{2}:\d{2})/i);

  if (mondayToFridayMatch) {
    result.push({
      days: "Lundi à Vendredi",
      slots: [
        {
          from: mondayToFridayMatch[1],
          to: mondayToFridayMatch[2],
        },
      ],
    });
  }

  if (saturdayToSundayMatch) {
    result.push({
      days: "Samedi à Dimanche",
      slots: [
        {
          from: saturdayToSundayMatch[1],
          to: saturdayToSundayMatch[2],
        },
      ],
    });
  }

  return result;
}

function extractGallery($: cheerio.CheerioAPI): GalleryGroup[] {
  const groups: GalleryGroup[] = [];

  const galleryHeadings = $("*").filter((_, el) => {
    const text = normaliseText($(el).text());
    return /^Galerie\s+\d+$/i.test(text);
  });

  galleryHeadings.each((_, el) => {
    const title = normaliseText($(el).text());
    const id = title.toLowerCase().replace(/\s+/g, "-");
    const images: GalleryImage[] = [];

    let node = $(el).next();

    while (node.length) {
      const nodeText = normaliseText(node.text());
      if (/^Galerie\s+\d+$/i.test(nodeText)) break;

      node.find("img").each((_, imgEl) => {
        const src = $(imgEl).attr("src");
        if (!src) return;
        images.push({
          url: src,
          alt: $(imgEl).attr("alt") || `${title} – Just Relax`,
        });
      });

      node = node.next();
    }

    if (images.length > 0) {
      groups.push({ id, title, images });
    }
  });

  // Fallback: any standalone gallery images if headings not found
  if (groups.length === 0) {
    const images: GalleryImage[] = [];
    $("img[src*='cdn.website.dish.co/media/']").each((_, imgEl) => {
      const src = $(imgEl).attr("src");
      if (!src) return;
      images.push({
        url: src,
        alt: $(imgEl).attr("alt") || "Just Relax – Galerie",
      });
    });

    if (images.length > 0) {
      groups.push({
        id: "galerie",
        title: "Galerie",
        images,
      });
    }
  }

  return groups;
}

function extractMenus($: cheerio.CheerioAPI): Menu[] {
  const menus: Menu[] = [];

  $("a[href$='.pdf']").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;

    const previousText =
      normaliseText($(el).prev().text()) ||
      normaliseText($(el).parent().prev().text());

    const name = previousText || "Menu";
    const id = name.toLowerCase().replace(/\s+/g, "-");

    menus.push({
      id,
      name,
      pdfUrl: href,
      description: "",
      categories: [],
    });
  });

  return menus;
}

async function scrape(): Promise<JustRelaxData> {
  log("Fetching", SOURCE_URL);
  const response = await fetch(SOURCE_URL);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while fetching ${SOURCE_URL}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const titleText = normaliseText($("title").first().text()) || "JUST RELAX – Restaurant & Lounge";
  const nameMatch = titleText.match(/just\s*relax/i);
  const name = nameMatch ? "Just Relax" : titleText;

  const description =
    normaliseText(
      $("meta[name='description']").attr("content") ||
        $("meta[property='og:description']").attr("content") ||
        ""
    ) ||
    "Restaurant & lounge à Pantin avec terrasse privée, chicha, cocktails et ambiance conviviale.";

  const phones = extractPhones($);
  const emails = extractEmails($);
  const delivery = extractDeliveryLinks($);
  const { services, paymentMethods } = extractServicesAndPayments($);
  const openingHours = extractOpeningHours($);
  const gallery = extractGallery($);
  const menus = extractMenus($);

  const bodyText = normaliseText($("body").text());

  const addressMatch = bodyText.match(/136\s+Av\.?\s+du\s+Général\s+Leclerc/i);
  const postalCityMatch = bodyText.match(/93500\s+Pantin/i);
  const countryMatch = bodyText.match(/France/i);

  const addressLine1 = addressMatch ? "136 Av. du Général Leclerc" : "À renseigner (adresse complète)";
  const postalCode = postalCityMatch ? "93500" : "À renseigner (code postal)";
  const city = postalCityMatch ? "Pantin" : "À renseigner (ville)";
  const country = countryMatch ? "France" : "À renseigner (pays)";

  const googleMapsLink = $("a[href*='google.com/maps']").attr("href");

  const heroImage =
    gallery[0]?.images[0]?.url ||
    "https://via.placeholder.com/1600x900?text=Just+Relax+Hero+Image+%E2%80%93+Remplacer";

  const data: JustRelaxData = {
    name,
    tagline: "Restaurant & Lounge",
    description,
    heroImage,
    contact: {
      phoneMain: phones.main || "+33XXXXXXXXX",
      phoneAlt: phones.others[0],
      email: emails[0] || "a-remplacer@exemple.com",
      emailAlt: emails[1],
      address: {
        line1: addressLine1,
        postalCode,
        city,
        country,
        mapUrl:
          googleMapsLink ||
          "https://www.google.com/maps/search/?api=1&query=136%20Av.%20du%20G%C3%A9n%C3%A9ral%20Leclerc%20,%2093500%20Pantin",
      },
    },
    openingHours:
      openingHours.length > 0
        ? openingHours
        : [
            {
              days: "Lundi à Vendredi",
              slots: [{ from: "11:00", to: "02:00" }],
            },
            {
              days: "Samedi à Dimanche",
              slots: [{ from: "15:00", to: "02:00" }],
            },
          ],
    services:
      services.length > 0
        ? services
        : [
            "Accessible aux personnes à mobilité réduite",
            "Climatisation",
            "Terrasse",
            "Événements privés",
            "Coin fumeurs",
            "À emporter",
            "Réceptions de mariage",
            "Wi-Fi gratuit",
          ],
    paymentMethods:
      paymentMethods.length > 0
        ? paymentMethods
        : [
            "Espèces",
            "Paiement sans contact",
            "MasterCard",
            "Ticket Restaurant®",
            "VISA",
            "Carte ticket restaurant",
            "Carte de débit",
            "Apple Pay",
            "Maestro",
          ],
    menus:
      menus.length > 0
        ? menus
        : [
            {
              id: "just-menu",
              name: "Just Menu",
              description: "Carte des plats – à compléter si besoin.",
              pdfUrl: "",
              categories: [],
            },
          ],
    gallery,
    delivery: {
      deliveroo: delivery.deliveroo,
      uberEats: delivery.uberEats,
      others: [],
    },
    social: {
      facebook: undefined,
      instagram: undefined,
      tiktok: undefined,
    },
    legal: {
      companyName: "JUST RELAX",
      firstName: "Fethi",
      lastName: "Chelda",
      registrationType: "registre des sociétés",
      registrationNumber: "90047622700021",
      localTaxNumber: "90047622700021",
      shareCapital: "1000 €",
      phone: phones.others[1],
      email: emails[1],
      addressLine1,
      postalCode,
      city,
      country,
    },
    seo: {
      title: "Just Relax – Restaurant & Lounge à Pantin",
      description,
      keywords: [
        "Just Relax",
        "restaurant Pantin",
        "lounge Pantin",
        "chicha Pantin",
        "terrasse privée",
        "cocktails",
      ],
    },
  };

  return data;
}

async function main() {
  try {
    log("Start");
    const data = await scrape();

    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2), "utf-8");

    log("Success", `Données enregistrées dans ${OUTPUT_PATH}`);
  } catch (error) {
    log("Erreur", error instanceof Error ? error.message : String(error));
    log(
      "Fallback",
      "Si le scraping échoue, vous pouvez remplir manuellement data/just-relax.json en suivant la structure d'exemple."
    );
    process.exitCode = 1;
  }
}

void main();