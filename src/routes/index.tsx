import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Sparkles, Sun, Users, UtensilsCrossed, Waves, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/PageHero";
import { WhatsIcon } from "@/components/site/WhatsIcon";
import { IMG } from "@/lib/images";
import { SITE, waLink, WA_MESSAGES, googleReviews } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prainha Beach Club | Quadras de areia e gastronomia em Juiz de Fora" },
      { name: "description", content: "Quadras de areia, vôlei, futevôlei, beach tennis, bar e restaurante no Poço Rico, Juiz de Fora – MG. Reserve pelo WhatsApp." },
      { property: "og:title", content: "Prainha Beach Club – Juiz de Fora" },
      { property: "og:description", content: "Esporte, gastronomia e diversão em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "SportsActivityLocation", name: SITE.name, telephone: "+55 32 99949-7726",
      address: { "@type": "PostalAddress", streetAddress: "Rua Sinval Corrêa, 100 – Poço Rico", addressLocality: "Juiz de Fora", addressRegion: "MG", postalCode: "36020-310", addressCountry: "BR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: SITE.rating, reviewCount: SITE.reviewsCount },
    }) }],
  }),
  component: Index,
});

const FEATURES = [
  { icon: Sun, t: "Ambiente agradável", d: "Clima descontraído para curtir o dia e a noite." },
  { icon: Waves, t: "Quadras de areia", d: "Areia clara e estrutura sempre bem cuidada." },
  { icon: Car, t: "Estacionamento", d: "Espaço para vários veículos." },
  { icon: Sparkles, t: "Banheiros limpos", d: "Conforto e cuidado em cada detalhe." },
  { icon: UtensilsCrossed, t: "Cardápio variado", d: "Petiscos, refeições e drinks para todos." },
  { icon: Users, t: "Amigos e família", d: "O ponto de encontro para reunir quem você gosta." },
];

const REVIEWS = [
  "Excelente lugar para jogar! Depois ainda temos um ótimo cardápio.",
  "Quadras muito boas, bom estacionamento.",
  "Areia clarinha, tudo limpo, ambiente muito gostoso.",
];

function Index() {
  return (
    <main>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img src={IMG.dive} alt="Atleta mergulhando na areia do Prainha Beach Club" className="animate-slowzoom absolute inset-0 h-full w-full object-cover" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-36 text-ivory md:pb-28">
          <p className="eyebrow animate-rise">Juiz de Fora · MG</p>
          <h1 className="animate-rise mt-5 max-w-4xl text-4xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl" style={{ animationDelay: "120ms" }}>
            Seu lugar ao sol, ao esporte e aos <em className="text-gold">bons momentos.</em>
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-base text-ivory/85 md:text-lg" style={{ animationDelay: "240ms" }}>
            Esporte, gastronomia e diversão em um só lugar. Viva a experiência Prainha Beach Club.
          </p>
          <div className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
            <Button asChild variant="gold" size="xl"><Link to="/reservar">Reservar quadra</Link></Button>
            <Button asChild variant="glass" size="xl"><Link to="/galeria">Conhecer o espaço</Link></Button>
            <Button asChild variant="tropical" size="xl"><a href={waLink(WA_MESSAGES.reservar)} target="_blank" rel="noreferrer"><WhatsIcon /> Falar pelo WhatsApp</a></Button>
          </div>
          <div className="animate-rise mt-12 flex items-center gap-3 text-sm text-ivory/80" style={{ animationDelay: "480ms" }}>
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-gold text-gold" />)}</div>
            <span><b className="text-ivory">{SITE.rating.toLocaleString("pt-BR")}</b> · {SITE.reviewsCount} avaliações no Google</span>
          </div>
        </div>
      </section>

      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="Sobre o Prainha" title="A praia que Juiz de Fora merecia."
              text="Um espaço de lazer, esporte e gastronomia pensado para você jogar, relaxar e celebrar. Areia clara, estrutura cuidada e um cardápio para estender o jogo em boa companhia." />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.t} className="flex gap-4">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-ivory text-ocean shadow-soft"><f.icon className="size-5" /></div>
                  <div><p className="font-semibold">{f.t}</p><p className="text-sm text-muted-foreground">{f.d}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <img src={IMG.aerial} alt="Vista aérea das quadras do Prainha" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft" />
            <img src={IMG.block} alt="Bloqueio no vôlei de praia" loading="lazy" className="absolute -bottom-10 -left-6 hidden w-1/2 rounded-2xl border-8 border-sand object-cover shadow-soft md:block" />
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle eyebrow="Experiências" title="Jogue. Saboreie. Celebre." />
            <Button asChild variant="link" className="px-0 text-ocean"><Link to="/galeria">Ver galeria completa <ArrowRight /></Link></Button>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { img: IMG.courts, t: "Quadras e esportes", d: "Vôlei, futevôlei e beach tennis.", to: "/quadras" as const },
              { img: IMG.food, t: "Gastronomia", d: "Restaurante e bar à beira da areia.", to: "/gastronomia" as const },
              { img: IMG.night, t: "Eventos e confraternizações", d: "Seu grupo, nossa areia.", to: "/contato" as const },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 120}>
                <Link to={c.to} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl">
                  <img src={c.img} alt={c.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="bg-hero-overlay absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                    <h3 className="text-2xl">{c.t}</h3>
                    <p className="mt-1 text-sm text-ivory/80">{c.d}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ocean-gradient py-24 text-ivory md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow">Avaliações</p>
            <p className="mt-4 font-display text-7xl md:text-8xl">{SITE.rating.toLocaleString("pt-BR")}</p>
            <div className="mt-3 flex justify-center">{[...Array(5)].map((_, i) => <Star key={i} className="size-6 fill-gold text-gold" />)}</div>
            <p className="mt-3 text-ivory/70">{SITE.reviewsCount} avaliações no Google</p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r} delay={i * 120}>
                <blockquote className="h-full rounded-3xl border border-ivory/15 bg-ivory/5 p-8 backdrop-blur">
                  <p className="font-display text-xl leading-snug">“{r}”</p>
                  <footer className="mt-6 text-xs uppercase tracking-widest text-gold">Cliente no Google</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="glass" size="xl"><a href={googleReviews} target="_blank" rel="noreferrer">Ver mais avaliações no Google</a></Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <Reveal className="mx-auto max-w-4xl px-5 text-center">
          <SectionTitle center eyebrow="Reserve agora" title="A areia está esperando por você." text="Escolha data, horário e modalidade em poucos cliques ou fale direto com a nossa equipe." />
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="ocean" size="xl"><Link to="/reservar">Reservar quadra</Link></Button>
            <Button asChild variant="tropical" size="xl"><a href={waLink(WA_MESSAGES.reservar)} target="_blank" rel="noreferrer"><WhatsIcon /> Reservar pelo WhatsApp</a></Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
