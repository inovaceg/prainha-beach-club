import { describe, expect, it } from "vitest";
import { waLink, WA_MESSAGES, SITE } from "./site";

describe("WhatsApp", () => {
  it("usa o número (32) 99949-7726", () => {
    expect(SITE.whatsapp).toBe("5532999497726");
    expect(waLink()).toContain("https://wa.me/5532999497726?text=");
  });
  it("abre a mensagem automática de reserva", () => {
    const url = new URL(waLink(WA_MESSAGES.reservar));
    expect(url.searchParams.get("text")).toBe(
      "Olá! Gostaria de reservar uma quadra no Prainha Beach Club. Poderiam me informar os horários disponíveis?",
    );
  });
  it("mantém a nota 4,6 com 64 avaliações", () => {
    expect(SITE.rating).toBe(4.6);
    expect(SITE.reviewsCount).toBe(64);
  });
});
