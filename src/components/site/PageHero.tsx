import type { ReactNode } from "react";

export function PageHero({ image, eyebrow, title, children }: { image: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden">
      <img src={image} alt="" className="animate-slowzoom absolute inset-0 h-full w-full object-cover" />
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 text-ivory">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="animate-rise mt-4 max-w-3xl text-4xl font-medium leading-tight md:text-6xl" style={{ animationDelay: "120ms" }}>{title}</h1>
        {children && <div className="animate-rise mt-6" style={{ animationDelay: "240ms" }}>{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-medium leading-tight md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{text}</p>}
    </div>
  );
}
