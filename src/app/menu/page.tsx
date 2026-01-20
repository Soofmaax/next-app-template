import Section from "@/components/Section";
import MenuCategory from "@/components/MenuCategory";
import CTAButtons from "@/components/CTAButtons";
import { justRelaxData } from "@/lib/just-relax-data";

export default function MenuPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10">
      <Section
        title="Notre carte"
        eyebrow="Just Menu · Just Boisson · Just Chicha"
      >
        <p className="max-w-2xl text-sm text-slate-200/90">
          Retrouvez ici une vue détaillée de la carte. Les liens PDF vous
          permettent de consulter les menus officiels, et vous pouvez, si vous
          le souhaitez, saisir vos plats un par un pour une expérience 100 %
          digitale.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {justRelaxData.menus.map((menu) => (
            <div
              key={menu.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-black/40 p-5 shadow-md shadow-black/40"
            >
              <div>
                <h2 className="text-base font-semibold text-slate-50">
                  {menu.name}
                </h2>
                {menu.description && (
                  <p className="mt-2 text-xs text-slate-300">
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
                    className="inline-flex items-center rounded-full bg-amber-400 px-4 py-2 font-semibold text-slate-950 shadow-sm ring-1 ring-amber-300/70 transition hover:bg-amber-300 hover:ring-amber-200"
                  >
                    Ouvrir le PDF
                  </a>
                )}
                <span className="inline-flex items-center rounded-full border border-white/25 px-3 py-1.5 text-[11px] text-slate-200/90">
                  Utilise la structure JSON pour saisir les plats
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="menus-detail"
        title="Exemple de structure détaillée"
        eyebrow="À adapter avec vos propres plats"
        background="subtle"
      >
        <p className="text-xs text-slate-300">
          La section ci-dessous illustre comment vos catégories et plats peuvent
          être affichés lorsque vous remplissez{" "}
          <code>data/just-relax.json</code>. Les éléments marqués{" "}
          <span className="rounded-full bg-amber-400/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
            À compléter
          </span>{" "}
          sont des placeholders à remplacer.
        </p>
        <div className="mt-6 space-y-8">
          {justRelaxData.menus
            .filter((menu) => menu.categories.length > 0)
            .map((menu) => (
              <section key={menu.id} className="space-y-4">
                <h2 className="text-sm font-semibold text-slate-50">
                  {menu.name}
                </h2>
                <div className="space-y-6">
                  {menu.categories.map((category) => (
                    <MenuCategory key={category.id} category={category} />
                  ))}
                </div>
              </section>
            ))}
          {justRelaxData.menus.every((m) => m.categories.length === 0) && (
            <p className="text-xs text-slate-400">
              Pour voir un exemple de rendu détaillé, vous pouvez compléter la
              section{" "}
              <code>menus[].categories[].items</code> dans{" "}
              <code>data/just-relax.json</code>.
            </p>
          )}
        </div>
      </Section>

      <Section
        id="reserve"
        title="Réserver une table"
        eyebrow="Booking"
        background="subtle"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] md:items-center">
          <div className="space-y-3 text-sm text-slate-100/90">
            <p>
              Pour vos repas, anniversaires, afterworks ou événements privés,{" "}
              <span className="font-semibold">{justRelaxData.name}</span> vous
              accueille dans un cadre cosy avec terrasse et espace lounge.
            </p>
            <p>
              Réservation par téléphone recommandée pour les groupes et les
              soirées de week-end.
            </p>
          </div>
          <CTAButtons data={justRelaxData} layout="stacked" />
        </div>
      </Section>
    </div>
  );
}