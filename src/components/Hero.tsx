import Image from "next/image";
import type { JustRelaxData } from "@/lib/just-relax-schema";
import CTAButtons from "./CTAButtons";

interface HeroProps {
  data: JustRelaxData;
}

export default function Hero({ data }: HeroProps) {
  const heroImage = data.heroImage || data.gallery[0]?.images[0]?.url;

  return (
    <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] md:items-center">
      <div className="space-y-5">
        <p className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200">
          Restaurant &amp; Lounge · Pantin
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
          {data.name} –{" "}
          <span className="text-amber-300">{data.tagline}</span>
        </h1>
        <p className="max-w-xl text-pretty text-sm text-slate-200/90 sm:text-base">
          {data.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <CTAButtons data={data} />
        </div>
        <div className="mt-4 grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-100">Adresse</p>
            <p className="mt-1">
              {data.contact.address.line1}
              <br />
              {data.contact.address.postalCode} {data.contact.address.city}
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-100">Horaires</p>
            {data.openingHours.slice(0, 2).map((range) => (
              <p key={range.days} className="mt-1">
                <span className="block font-medium text-slate-50">
                  {range.days}
                </span>
                {range.slots.map((slot) => (
                  <span key={`${slot.from}-${slot.to}`} className="block">
                    {slot.from} – {slot.to}
                  </span>
                ))}
              </p>
            ))}
          </div>
          <div>
            <p className="font-semibold text-slate-100">Services</p>
            <p className="mt-1">
              {data.services.slice(0, 3).join(" · ")}
              {data.services.length > 3 && " · …"}
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 rounded-[2.5rem] bg-amber-400/10 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/40 shadow-2xl shadow-black/70">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={`Ambiance de ${data.name}`}
              width={900}
              height={900}
              priority
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-slate-300">
              Image à compléter (hero) – mettre en avant une photo phare du
              restaurant.
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-xs text-slate-100 sm:p-5">
            <p className="font-medium">
              7j/7 · Terrasse privée · Chicha · Cocktails
            </p>
            <p className="text-slate-300">
              À 2 minutes de la Porte de Pantin – parfait pour prolonger vos
              soirées.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}