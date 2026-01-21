import Hero from "@/components/Hero";
import OpeningHours from "@/components/OpeningHours";
import GalleryGrid from "@/components/GalleryGrid";
import CTAButtons from "@/components/CTAButtons";
import Section from "@/components/Section";
import { justRelaxData } from "@/lib/just-relax-data";

const menuDuMoment = [
  {
    name: "Planche à partager Just Relax",
    description:
      "Sélection de tapas chauds et froids à partager : bouchées croustillantes, dips maison et petites salades.",
    price: "29,00 €",
  },
  {
    name: "Plat signature du chef",
    description:
      "Viande ou poisson du moment, accompagnement de saison et sauce travaillée, selon l’inspiration du chef.",
    price: "24,00 €",
  },
  {
    name: "Dessert gourmand à partager",
    description:
      "Assortiment de desserts maison pour finir le repas sur une note douce et conviviale.",
    price: "18,00 €",
  },
];

const avisClients = [
  {
    name: "Samir",
    source: "Exemple d'avis Google",
    text: "Super ambiance, cocktails très bien réalisés et équipe aux petits soins. On a passé une excellente soirée.",
  },
  {
    name: "Mélanie",
    source: "Exemple d'avis Google",
    text: "Terrasse agréable, chicha de qualité et carte variée. Parfait pour un anniversaire ou une soirée entre amis.",
  },
  {
    name: "Thomas",
    source: "Exemple d'avis Google",
    text: "Service rapide, musique au bon volume et déco soignée. Une belle découverte à Pantin.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 pb-16 pt-6 sm:pb-24 sm:pt-4">
      <Hero data={justRelaxData} />

      <div className="rounded-full border border-amber-300/25 bg-gradient-to-r from-amber-400/20 via-amber-300/10 to-transparent px-4 py-2 text-center text-[11px] text-amber-100 shadow-sm shadow-black/40">
        Événements privés, anniversaires &amp; afterworks sur demande. Contactez-nous pour privatiser tout ou partie du lieu.
      </div>

      <Section
        id="menu-du-moment"
        title="Menu du moment"
        eyebrow="Suggestions à découvrir dès maintenant"
        background="subtle"
        cta={{
          label: "Voir tout le menu",
          href: "/menu",
        }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {menuDuMoment.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-5 shadow-lg shadow-black/40"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-slate-200/90">
                  {item.description}
                </p>
              </div>
              <p className="mt-4 text-sm font-semibold text-amber-300">
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="highlights"
        title="Un lieu pensé pour se détendre"
        eyebrow="Just Relax – Restaurant & Lounge"
      >
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-amber-300">
              Cuisine &amp; cocktails
            </h3>
            <p className="mt-2 text-sm text-slate-100">
              Cuisine généreuse et cocktails signatures, servis dans une
              atmosphère chaleureuse. Idéal pour les déjeuners, dîners et
              afterworks.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-amber-300">
              Terrasse &amp; lounge
            </h3>
            <p className="mt-2 text-sm text-slate-100">
              Terrasse conviviale et espace lounge intimiste, parfaits pour
              profiter de la chicha et des cocktails jusqu&apos;à 2h du matin.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-amber-300">
              Services premium
            </h3>
            <p className="mt-2 text-sm text-slate-100">
              Accès PMR, Wi-Fi, climatisation et accueil d&apos;événements
              privés : tout est pensé pour votre confort, 7j/7.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="menu"
        title="Notre carte"
        eyebrow="Just Menu, Just Boisson, Just Chicha"
        background="subtle"
        cta={{
          label: "Voir tout le menu",
          href: "/menu",
        }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {justRelaxData.menus.map((menu) => (
            <div
              key={menu.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-black/40 p-5 shadow-lg shadow-black/40"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  {menu.name}
                </h3>
                {menu.description && (
                  <p className="mt-2 text-sm text-slate-200/90">
                    {menu.description}
                  </p>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                {menu.pdfUrl && (
                  <a
                    href={menu.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full bg-amber-400 px-3 py-1.5 font-semibold text-slate-900 shadow-sm ring-1 ring-amber-300/70 transition hover:bg-amber-300 hover:ring-amber-200"
                  >
                    Ouvrir le menu PDF
                  </a>
                )}
                <a
                  href="/menu"
                  className="inline-flex items-center rounded-full border border-white/20 px-3 py-1.5 font-medium text-slate-100/90 transition hover:border-amber-300/80 hover:text-amber-200"
                >
                  Voir en détail
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="reviews"
        title="Ils ont passé une excellente soirée"
        eyebrow="Avis clients – exemple de rendu"
        background="subtle"
        cta={{
          label: "Laisser un avis Google",
          href:
            justRelaxData.contact.googleReviewUrl ||
            justRelaxData.contact.address.mapUrl,
        }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {avisClients.map((review) => (
            <figure
              key={review.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-black/40 p-5 shadow-lg shadow-black/40"
            >
              <div>
                <div className="flex items-center gap-1 text-[11px] text-amber-300">
                  <span>★★★★★</span>
                  <span className="text-slate-300">· {review.source}</span>
                </div>
                <blockquote className="mt-3 text-sm text-slate-100">
                  “{review.text}”
                </blockquote>
              </div>
              <figcaption className="mt-4 text-xs font-medium text-slate-300">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-slate-400">
          Les avis présentés ci-dessus sont fournis à titre d&apos;exemple de
          mise en forme. Les avis réels apparaîtront une fois le site en ligne
          et relié à votre fiche Google.
        </p>
      </Section>

      <Section
        id="hours"
        title="Horaires &amp; informations pratiques"
        eyebrow="Accès &amp; horaires"
        background="subtle"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)]">
          <OpeningHours ranges={justRelaxData.openingHours} />
          <div className="space-y-3 text-sm text-slate-100/90">
            <p className="font-semibold text-slate-50">
              {justRelaxData.contact.address.line1}
              <br />
              {justRelaxData.contact.address.postalCode}{" "}
              {justRelaxData.contact.address.city}
            </p>
            <p>
              {justRelaxData.description ||
                "Restaurant & lounge à Pantin avec terrasse privée, chicha et cocktails."}
            </p>
            <CTAButtons data={justRelaxData} layout="stacked" />
          </div>
        </div>
      </Section>

      <Section
        id="gallery"
        title="Ambiance &amp; atmosphère"
        eyebrow="Galerie"
        cta={{
          label: "Voir toutes les photos",
          href: "/galerie",
        }}
      >
        <GalleryGrid
          gallery={justRelaxData.gallery}
          limit={9}
          showOverlay={true}
        />
      </Section>
    </div>
  );
}
