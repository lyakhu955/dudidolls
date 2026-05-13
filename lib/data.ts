export type Doll = {
  id: string;
  name: string;
  italic: string;
  price: number;
  edition: string;
  origin: string;
  materials: string;
  height: string;
  year: string;
  desc: string;
  tag: "" | "new" | "scarce";
};

export const DOLLS: Doll[] = [
  { id: "anouk", name: "Anouk", italic: "il vento", price: 280, edition: "1 of 1", origin: "Lana, IT", materials: "Lino, lana cardata", height: "32 cm", year: "2026",
    desc: "Cucita a mano in un pomeriggio d'aprile. Veste un abito sottile come la prima brezza dopo l'inverno. Anouk è un soffio, una pausa.", tag: "new" },
  { id: "tobia", name: "Tobia", italic: "il custode", price: 320, edition: "1 of 1", origin: "Lana, IT", materials: "Cotone biologico, bottoni d'osso", height: "36 cm", year: "2026",
    desc: "Sguardo serio, mani grandi. Tobia tiene in tasca pietre raccolte lungo il fiume. Custodisce ciò che gli altri non sanno guardare.", tag: "scarce" },
  { id: "miele", name: "Miele", italic: "la dolcezza", price: 260, edition: "1 of 1", origin: "Bolzano, IT", materials: "Lana merino, capelli in seta", height: "30 cm", year: "2026",
    desc: "Capelli color miele, guance arrossate. Profuma di pane caldo e domeniche d'estate.", tag: "" },
  { id: "ines", name: "Ines", italic: "la sognatrice", price: 340, edition: "1 of 1", origin: "Lana, IT", materials: "Velluto a coste, pizzo antico", height: "34 cm", year: "2026",
    desc: "Ines dorme con gli occhi aperti. Indossa il pizzo della nonna, smontato e ricomposto come un sogno.", tag: "" },
  { id: "noe", name: "Noé", italic: "il viaggiatore", price: 300, edition: "1 of 1", origin: "Trento, IT", materials: "Tela di canapa, scarpe in cuoio", height: "38 cm", year: "2026",
    desc: "Zaino piccolo, intenzioni grandi. Noé parte sempre all'alba e torna con storie pieghettate in tasca.", tag: "new" },
  { id: "olmo", name: "Olmo", italic: "il silenzio", price: 290, edition: "1 of 1", origin: "Lana, IT", materials: "Lana grezza tinta a mano", height: "33 cm", year: "2026",
    desc: "Non parla. Ascolta. Olmo è una pausa lunga fra due frasi importanti.", tag: "scarce" },
  { id: "vera", name: "Vera", italic: "la luce", price: 360, edition: "1 of 1", origin: "Merano, IT", materials: "Cotone egiziano, ricamo a mano", height: "35 cm", year: "2026",
    desc: "Indossa un abito ricamato a punto croce. Ogni nodo è una piccola promessa.", tag: "" },
  { id: "barnaba", name: "Barnaba", italic: "il sorriso", price: 270, edition: "1 of 1", origin: "Lana, IT", materials: "Lana merino, ciuffo di seta", height: "31 cm", year: "2026",
    desc: "Ha un sorriso storto, di quelli che non si possono ignorare. Barnaba si fa amico di chiunque in tre minuti.", tag: "" },
];

const IMG_MAP: Record<string, string> = {
  anouk: "/foto/1.png",
  tobia: "/foto/2.png",
  miele: "/foto/3.png",
  ines: "/foto/5.png",
  noe: "/foto/6.png",
  olmo: "/foto/olmo.jpg",
  vera: "/foto/vera.jpg",
  barnaba: "/foto/barnaba.jpg",
};

export function dollImage(id: string): string {
  return IMG_MAP[id] || "/foto/hero.jpg";
}

export function findDoll(id: string): Doll | undefined {
  return DOLLS.find((d) => d.id === id);
}
