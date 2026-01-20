import type { JustRelaxData } from "@/lib/just-relax-schema";

interface CTAButtonsProps {
  data: JustRelaxData;
  layout?: "inline" | "stacked";
}

export default function CTAButtons({
  data,
  layout = "inline",
}: CTAButtonsProps) {
  const phoneHref = data.contact.phoneMain
    ? `tel:${data.contact.phoneMain.replace(/\s+/g, "")}`
    : "#";

  const mapHref = data.contact.address.mapUrl || "#";

  const whatsappHref =
    data.contact.whatsapp && data.contact.whatsapp.trim().length > 0
      ? `https://wa.me/${data.contact.whatsapp.replace(/\D/g, "")}`
      : undefined;

  const baseClass =
    "inline-flex items-center justify-center rounded-full text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  const layoutClass =
    layout === "stacked"
      ? "flex flex-col gap-3"
      : "flex flex-wrap gap-3 items-center";

  return (
    <div className={layoutClass}>
      <a
        href={phoneHref}
        className={`${baseClass} bg-amber-400 px-4 py-2 text-slate-950 shadow-sm ring-1 ring-amber-300/70 hover:bg-amber-300 hover:ring-amber-200`}
      >
        Appeler
      </a>
      <a
        href={mapHref}
        target="_blank"
        rel="noreferrer"
        className={`${baseClass} border border-white/25 px-4 py-2 text-slate-100 hover:border-amber-300/80 hover:text-amber-200`}
      >
        Itinéraire
      </a>
      <a
        href="/menu"
        className={`${baseClass} border border-white/25 px-4 py-2 text-slate-100 hover:border-amber-300/80 hover:text-amber-200`}
      >
        Voir le menu
      </a>
      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={`${baseClass} bg-emerald-400/90 px-4 py-2 text-slate-950 shadow-sm ring-1 ring-emerald-300/70 hover:bg-emerald-300 hover:ring-emerald-200`}
        >
          Réserver via WhatsApp
        </a>
      ) : (
        <a
          href="/contact"
          className={`${baseClass} bg-white/10 px-4 py-2 text-slate-100 ring-1 ring-white/15 hover:bg-white/15`}
        >
          Réserver en ligne
        </a>
      )}
    </div>
  );
}