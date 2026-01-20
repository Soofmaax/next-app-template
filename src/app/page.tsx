import Hero from "@/components/Hero";
import OpeningHours from "@/components/OpeningHours";
import GalleryGrid from "@/components/GalleryGrid";
import CTAButtons from "@/components/CTAButtons";
import Section from "@/components/Section";
import { justRelaxData } from "@/lib/just-relax-data";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10">
      <Hero data={justRelaxData} />

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
              Découvrez une cuisine généreuse et des cocktails signatures dans
              une ambiance chaleureuse. Idéal pour les déjeuners, dîners et
              afterworks entre amis ou en famille.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-amber-300">
              Terrasse &amp; lounge
            </h3>
            <p className="mt-2 text-sm text-slate-100">
              Profitez d&apos;une terrasse confortable et d&apos;un espace
              lounge intimiste, idéal pour chicha, cocktails et longues soirées
              jusqu&apos;à 2h du matin.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-amber-300">
              Services premium
            </h3>
            <p className="mt-2 text-sm text-slate-100">
              Accès PMR, Wi-Fi, climatisation, réception d&apos;événements
              privés… tout est pensé pour un confort optimal, 7j/7.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="menu"
        title="Notre carte"
        eyebrow="Just Menu, Just Boisson, Just Chicha"
        cta={{
          label: "Voir tout le menu",
          href: "/menu"
        }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {justRelaxData.menus.map((menu) => (
            <div
              key={menu.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/40"
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
          href: "/galerie"
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
