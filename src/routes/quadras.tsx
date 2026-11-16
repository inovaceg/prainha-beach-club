import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WhatsIcon } from "@/components/site/WhatsIcon";
import { IMG } from "@/lib/images";
import { courtsQ, modalitiesQ, pricesQ, mediaQ } from "@/lib/queries";
import { waLink, WA_MESSAGES } from "@/lib/site";

export const Route = createFileRoute("/quadras")({
  head: () => ({ meta: [
    { title: "Quadras de areia em Juiz de Fora | Prainha Beach Club" },
    { name: "description", content: "Quadras de areia para vôlei de praia, futevôlei e beach tennis em Juiz de Fora. Consulte horários e reserve." },
    { property: "og:title", content: "Quadras e esportes – Prainha Beach Club" },
    { property: "og:description", content: "Areia clara, estrutura cuidada e reserva fácil." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Quadras,
});

function Quadras() {
  const courts = useQuery(courtsQ).data ?? [];
  const mods = useQuery(modalitiesQ).data ?? [];
  const prices = useQuery(pricesQ).data ?? [];
  const media = (useQuery(mediaQ).data ?? []).filter((m) => (m.category === "quadras" || m.category === "esportes") && m.kind === "image");
  const gallery = media.length ? media.map((m) => m.url) : [IMG.courts, IMG.block, IMG.playerNet, IMG.aerial];
  return (
    <main>
      <PageHero image={IMG.block} eyebrow="Quadras e esportes" title="Areia clara, rede alta e jogo bom.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gold" size="xl"><Link to="/reservar">Consultar horários</Link></Button>
          <Button asChild variant="tropical" size="xl"><a href={waLink(WA_MESSAGES.reservar)} target="_blank" rel="noreferrer"><WhatsIcon /> Reservar pelo WhatsApp</a></Button>
        </div>
      </PageHero>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><SectionTitle eyebrow="Modalidades" title="Escolha o seu jogo." /></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {mods.map((m, i) => (
              <Reveal key={m.id} delay={i * 100}>
                <div className="h-full rounded-3xl bg-sand p-8">
                  <p className="font-display text-5xl text-gold">0{i + 1}</p>
                  <h3 className="mt-4 text-2xl">{m.name}</h3>
                  {m.description && <p className="mt-2 text-muted-foreground">{m.description}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="Locação" title="Nossas quadras" text="Reserve por hora, sozinho, em dupla ou com o grupo todo." />
            <ul className="mt-8 divide-y divide-border">
              {courts.map((c) => (
                <li key={c.id} className="py-4"><p className="font-semibold">{c.name}</p>{c.description && <p className="text-sm text-muted-foreground">{c.description}</p>}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-3xl bg-ivory p-8 shadow-soft">
              <p className="eyebrow">Valores</p>
              {prices.length ? (
                <ul className="mt-6 space-y-5">
                  {prices.map((p) => (
                    <li key={p.id} className="flex items-baseline justify-between gap-4 border-b border-dashed border-border pb-4">
                      <div><p className="font-semibold">{p.label}</p>{p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}</div>
                      <p className="shrink-0 font-display text-2xl text-ocean">{p.value}</p>
                    </li>
                  ))}
                </ul>
              ) : <p className="mt-6 text-muted-foreground">Consulte os valores atualizados com a nossa equipe.</p>}
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild variant="ocean" size="lg" className="rounded-full"><a href={waLink(WA_MESSAGES.valores)} target="_blank" rel="noreferrer">Solicitar valores</a></Button>
                <Button asChild variant="outline" size="lg" className="rounded-full"><a href={waLink(WA_MESSAGES.grupos)} target="_blank" rel="noreferrer">Reservar para grupos</a></Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><SectionTitle eyebrow="Galeria" title="Dentro das quadras" /></Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.slice(0, 8).map((src, i) => (
              <Reveal key={src + i} delay={i * 80} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <img src={src} alt="Quadras do Prainha" loading="lazy" className="h-full w-full rounded-2xl object-cover aspect-square" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
