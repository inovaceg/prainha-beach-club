import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/quadras", label: "Quadras" },
  { to: "/gastronomia", label: "Gastronomia" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500",
      scrolled || open ? "bg-ocean-deep/95 py-3 shadow-soft backdrop-blur-md" : "bg-transparent py-5")}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 flex-col leading-none text-ivory" onClick={() => setOpen(false)}>
          <span className="truncate font-display text-2xl font-semibold tracking-wide">Prainha</span>
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.45em] text-gold">Beach Club</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium text-ivory/80 transition-colors hover:text-gold data-[status=active]:text-gold">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="gold" className="hidden rounded-full sm:inline-flex"><Link to="/reservar">Reservar quadra</Link></Button>
          <button aria-label="Abrir menu" className="p-2 text-ivory lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-4 pt-4 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-ivory/10 py-3 font-display text-xl text-ivory">{n.label}</Link>
          ))}
          <Button asChild variant="gold" className="mt-3 rounded-full"><Link to="/reservar" onClick={() => setOpen(false)}>Reservar quadra</Link></Button>
        </nav>
      )}
    </header>
  );
}
