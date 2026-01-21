import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAButtons from "@/components/CTAButtons";
import { justRelaxData } from "@/lib/just-relax-data";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.evenements;

export default function EvenementsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10">
      <Section
        title="Privatisation & événements privés"
        eyebrow="Événements · Afterworks · Réceptions"
        background="subtle"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] md:items-start">
          <div className="space-y-4 text-sm text-slate-100/90">
            <p>
              Pour vos anniversaires, afterworks, soirées d&apos;entreprise ou
              événements privés,{" "}
              <span className="font-semibold">{justRelaxData.name}</span> vous
              propose un cadre chaleureux à Pantin (93500), avec terrasse
              privée, espace lounge et service jusqu&apos;à 2h du matin.
            </p>
            <p>
              Selon la taille de votre groupe et le type d&apos;événement, il est
              possible de privatiser une partie du restaurant (salle, terrasse,
              espace lounge) ou l&apos;établissement complet, sur demande.
            </p>
            <p>
              Nous étudions chaque projet sur mesure : menus adaptés, formule
              cocktail dînatoire, ambiance musicale, configuration des tables
              et horaires étendus.
            </p>
            <div className="pt-2">
              <CTAButtons data={justRelaxData} layout="stacked" />
            </div>
          </div>
          <div className="space-y-4 text-sm text-slate-100/90">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-lg shadow-black/40">
              <h2 className="text-sm font-semibold text-amber-300">
                Types d&apos;événements
              </h2>
              <ul className="mt-3 space-y-2 text-xs text-slate-200">
                <li>• Anniversaires, soirées entre amis</li>
                <li>• Afterworks &amp; soirées d&apos;entreprise</li>
                <li>• Réunions d&apos;équipe, lancements de projet</li>
                <li>• Réceptions familiales, repas de groupe</li>
                <li>• Privatisation partielle ou totale sur demande</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-lg shadow-black/40">
              <h2 className="text-sm font-semibold text-amber-300">
                Informations pratiques
              </h2>
              <ul className="mt-3 space-y-2 text-xs text-slate-200">
                <li>
                  • Capacité indicative : à ajuster selon la configuration et la
                  saison (intérieur / terrasse).
                </li>
                <li>• Options : menu fixe, formule groupe, cocktail dînatoire.</li>
                <li>• Ouverture 7j/7 jusqu&apos;à 2h du matin à Pantin (93).</li>
                <li>
                  • Accès facile depuis Paris et les communes voisines
                  (métro / bus / voiture).
                </li>
              </ul>
              <p className="mt-3 text-[11px] text-slate-400">
                Les modalités précises (nombre de personnes, budget, horaires)
                seront définies ensemble lors de la demande de devis.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}