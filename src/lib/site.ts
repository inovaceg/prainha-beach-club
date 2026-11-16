export const SITE = {
  name: "Prainha Beach Club",
  whatsapp: "5532999497726",
  phoneDisplay: "(32) 99949-7726",
  address: "Rua Sinval Corrêa, 100 – Poço Rico, Juiz de Fora – MG, CEP 36020-310",
  addressNote: "Minas Park Centro Empresarial",
  rating: 4.6,
  reviewsCount: 64,
  mapsQuery: "Prainha Beach Club, Rua Sinval Corrêa, 100, Poço Rico, Juiz de Fora - MG",
};

export const WA_MESSAGES = {
  reservar: "Olá! Gostaria de reservar uma quadra no Prainha Beach Club. Poderiam me informar os horários disponíveis?",
  disponibilidade: "Olá! Gostaria de consultar a disponibilidade das quadras no Prainha Beach Club.",
  valores: "Olá! Gostaria de informações sobre os valores de locação das quadras do Prainha Beach Club.",
  grupos: "Olá! Gostaria de fazer uma reserva para um grupo no Prainha Beach Club.",
  eventos: "Olá! Gostaria de saber sobre eventos e confraternizações no Prainha Beach Club.",
  pedido: "Olá! Gostaria de fazer um pedido no Prainha Beach Club.",
  cardapio: "Olá! Poderiam me enviar o cardápio do Prainha Beach Club?",
  geral: "Olá! Gostaria de mais informações sobre o Prainha Beach Club.",
} as const;

export function waLink(message: string = WA_MESSAGES.geral) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;
export const mapsRoute = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsQuery)}`;
export const googleReviews = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Prainha Beach Club Juiz de Fora")}`;

export const GALLERY_CATEGORIES = [
  { id: "quadras", label: "Quadras" },
  { id: "esportes", label: "Esportes" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "amigos", label: "Amigos e confraternizações" },
  { id: "dia", label: "Durante o dia" },
  { id: "noite", label: "À noite" },
] as const;

export const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function reservationWaMessage(r: { name: string; date: string; time: string; modality?: string; court?: string; people?: number }) {
  const [y, m, d] = r.date.split("-");
  return `Olá! Gostaria de reservar uma quadra no Prainha Beach Club.\nNome: ${r.name}\nData: ${d}/${m}/${y}\nHorário: ${r.time}` +
    (r.court ? `\nQuadra: ${r.court}` : "") + (r.modality ? `\nModalidade: ${r.modality}` : "") +
    (r.people ? `\nPessoas: ${r.people}` : "") + `\nPoderiam confirmar a disponibilidade?`;
}
