import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WhatsIcon } from "@/components/site/WhatsIcon";
import { IMG } from "@/lib/images";
import { menuCatsQ, menuItemsQ } from "@/lib/queries";
import { waLink, WA_MESSAGES } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gastronomia")({
  head: () => ({ meta: [
    { title: "Restaurante e bar | Prainha Beach Club Juiz de Fora" },
    { name: "description", content: "Cardápio variado, petiscos e drinks no Prainha Beach Club. Faça seu pedido pelo WhatsApp." },
    { property: "og:title", content: "Gastronomia – Prainha Beach Club" },
    { property: "og:description", content: "Restaurante e bar à beira da areia." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Gastro,
});

function Gastro() {
  const cats = useQuery(menuCatsQ).data ?? [];
  const items = useQuery(menuItemsQ).data ?? [];
  const [cat, setCat] = useState<string | null>(null);
  const featured = items.filter((i) => i.featured);
  const shown = cat ? items.filter((i) => i.category_id === cat) : items;
  return (
    <main>
      <PageHero image={IMG.drinks} eyebrow="Restaurante e bar" title="Depois do jogo, o melhor sabor do dia.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gold" size="xl"><a href="#cardapio">Consultar cardápio</a></Button>
          <Button asChild variant="tropical" size="xl"><a href={waLink(WA_MESSAGES.pedido)} target="_blank" rel="noreferrer"><WhatsIcon /> Pedir pelo WhatsApp</a></Button>
        </div>
      </PageHero>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal><img src={IMG.food} alt="Petiscos servidos à mesa (imagem ilustrativa)" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" /></Reveal>
          <Reveal delay={150}>
            <SectionTitle eyebrow="Gastronomia" title="Sabores para compartilhar." text="Um cardápio variado para acompanhar cada momento: do lanche rápido entre partidas ao encontro sem hora para acabar." />
          </Reveal>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-sand py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal><SectionTitle eyebrow="Destaques" title="Os favoritos da casa" /></Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((f) => (
                <Reveal key={f.id}>
                  <div className="overflow-hidden rounded-3xl bg-ivory shadow-soft">
                    {f.image_url && <img src={f.image_url} alt={f.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />}
                    <div className="p-6"><h3 className="text-xl">{f.name}</h3>{f.description && <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>}{f.price && <p className="mt-3 font-display text-xl text-ocean">{f.price}</p>}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="cardapio" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal><SectionTitle center eyebrow="Cardápio" title="Para todos os gostos" /></Reveal>
          {items.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-sand p-10 text-center">
              <p className="text-muted-foreground">Nosso cardápio completo está sendo atualizado. Peça pelo WhatsApp e receba as opções do dia.</p>
              <Button asChild variant="tropical" size="lg" className="mt-6 rounded-full"><a href={waLink(WA_MESSAGES.cardapio)} target="_blank" rel="noreferrer"><WhatsIcon /> Receber cardápio</a></Button>
            </div>
          ) : (
            <>
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {[{ id: null, name: "Tudo" }, ...cats].map((c) => (
                  <button key={c.id ?? "all"} onClick={() => setCat(c.id)}
                    className={cn("rounded-full border px-5 py-2 text-sm font-semibold transition", cat === c.id ? "border-ocean bg-ocean text-ivory" : "border-border hover:border-ocean")}>{c.name}</button>
                ))}
              </div>
              <ul className="mt-10 divide-y divide-border">
                {shown.map((i) => (
                  <li key={i.id} className="flex items-baseline justify-between gap-6 py-5">
                    <div><p className="font-semibold">{i.name}</p>{i.description && <p className="text-sm text-muted-foreground">{i.description}</p>}</div>
                    {i.price && <p className="shrink-0 font-display text-lg text-ocean">{i.price}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
