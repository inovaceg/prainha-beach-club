import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Star } from "lucide-react";
import { SITE, waLink, mapsRoute } from "@/lib/site";
import { WhatsIcon } from "./WhatsIcon";

export function Footer() {
  return (
    <footer className="bg-ocean-deep text-ivory/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl text-ivory">Prainha <span className="text-gold">Beach Club</span></p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">Esporte, gastronomia e diversão em um só lugar, no coração de Juiz de Fora.</p>
          <p className="mt-4 flex items-center gap-2 text-sm"><Star className="size-4 fill-gold text-gold" /> {SITE.rating.toLocaleString("pt-BR")} no Google · {SITE.reviewsCount} avaliações</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow">Navegue</p>
          <Link to="/quadras" className="block hover:text-gold">Quadras e esportes</Link>
          <Link to="/gastronomia" className="block hover:text-gold">Gastronomia</Link>
          <Link to="/galeria" className="block hover:text-gold">Galeria</Link>
          <Link to="/reservar" className="block hover:text-gold">Reservar</Link>
          <Link to="/contato" className="block hover:text-gold">Contato</Link>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow">Contato</p>
          <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold"><WhatsIcon className="size-4" /> {SITE.phoneDisplay}</a>
          <a href={`tel:+${SITE.whatsapp}`} className="flex items-center gap-2 hover:text-gold"><Phone className="size-4" /> Ligar</a>
          <a href={mapsRoute} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-gold"><MapPin className="mt-0.5 size-4 shrink-0" /> <span>{SITE.address}<br />{SITE.addressNote}</span></a>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 text-center text-xs text-ivory/50">
        © {new Date().getFullYear()} Prainha Beach Club · Juiz de Fora – MG · <Link to="/admin" className="hover:text-gold">Área do proprietário</Link>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a href={waLink()} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-tropical text-ivory shadow-soft transition-transform hover:scale-110">
      <WhatsIcon className="size-7" />
    </a>
  );
}
