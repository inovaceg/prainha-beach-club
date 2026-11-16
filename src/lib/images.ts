import dive from "@/assets/dive.jpg.asset.json";
import block from "@/assets/block.jpg.asset.json";
import playerNet from "@/assets/player-net.jpg.asset.json";
import courts from "@/assets/courts.jpg.asset.json";
import aerial from "@/assets/aerial.png.asset.json";
import drinks from "@/assets/drinks.jpg";
import food from "@/assets/food.jpg";
import night from "@/assets/night.jpg";

export const IMG = { dive: dive.url, block: block.url, playerNet: playerNet.url, courts: courts.url, aerial: aerial.url, drinks, food, night };

export const DEFAULT_GALLERY: { url: string; category: string; caption: string }[] = [
  { url: IMG.dive, category: "esportes", caption: "Vôlei de praia no Prainha" },
  { url: IMG.courts, category: "quadras", caption: "Nossas quadras de areia" },
  { url: IMG.block, category: "esportes", caption: "Bloqueio na rede" },
  { url: IMG.aerial, category: "dia", caption: "Vista aérea do espaço" },
  { url: IMG.playerNet, category: "amigos", caption: "Torneio entre amigos" },
  { url: IMG.night, category: "noite", caption: "Jogos à noite (imagem ilustrativa)" },
  { url: IMG.food, category: "gastronomia", caption: "Gastronomia (imagem ilustrativa)" },
  { url: IMG.drinks, category: "gastronomia", caption: "Bar e drinks (imagem ilustrativa)" },
];
