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
  images: string[];
  sold: boolean;
  weight?: number;
  dimensions?: string;
  sku?: string;
  category?: string;
};

export const DOLLS: Doll[] = [
  { id: "anouk", name: "Anouk", italic: "il vento", price: 280, edition: "1 of 1", origin: "Lana, IT", materials: "Lino, lana cardata", height: "32 cm", year: "2026",
    desc: "Cucita a mano in un pomeriggio d'aprile. Veste un abito sottile come la prima brezza dopo l'inverno. Anouk è un soffio, una pausa.", tag: "new", images: ["/foto/1.png"], sold: false, weight: 450, dimensions: "32×12×10 cm", sku: "DUDI-001", category: "bambola" },
  { id: "tobia", name: "Tobia", italic: "il custode", price: 320, edition: "1 of 1", origin: "Lana, IT", materials: "Cotone biologico, bottoni d'osso", height: "36 cm", year: "2026",
    desc: "Sguardo serio, mani grandi. Tobia tiene in tasca pietre raccolte lungo il fiume. Custodisce ciò che gli altri non sanno guardare.", tag: "scarce", images: ["/foto/2.png"], sold: false, weight: 520, dimensions: "36×14×12 cm", sku: "DUDI-002", category: "bambola" },
  { id: "miele", name: "Miele", italic: "la dolcezza", price: 260, edition: "1 of 1", origin: "Bolzano, IT", materials: "Lana merino, capelli in seta", height: "30 cm", year: "2026",
    desc: "Capelli color miele, guance arrossate. Profuma di pane caldo e domeniche d'estate.", tag: "", images: ["/foto/3.png"], sold: false, weight: 380, dimensions: "30×11×9 cm", sku: "DUDI-003", category: "bambola" },
  { id: "ines", name: "Ines", italic: "la sognatrice", price: 340, edition: "1 of 1", origin: "Lana, IT", materials: "Velluto a coste, pizzo antico", height: "34 cm", year: "2026",
    desc: "Ines dorme con gli occhi aperti. Indossa il pizzo della nonna, smontato e ricomposto come un sogno.", tag: "", images: ["/foto/5.png"], sold: false, weight: 480, dimensions: "34×13×11 cm", sku: "DUDI-004", category: "bambola" },
  { id: "noe", name: "Noé", italic: "il viaggiatore", price: 300, edition: "1 of 1", origin: "Trento, IT", materials: "Tela di canapa, scarpe in cuoio", height: "38 cm", year: "2026",
    desc: "Zaino piccolo, intenzioni grandi. Noé parte sempre all'alba e torna con storie pieghettate in tasca.", tag: "new", images: ["/foto/6.png"], sold: false, weight: 550, dimensions: "38×15×13 cm", sku: "DUDI-005", category: "bambola" },
  { id: "olmo", name: "Olmo", italic: "il silenzio", price: 290, edition: "1 of 1", origin: "Lana, IT", materials: "Lana grezza tinta a mano", height: "33 cm", year: "2026",
    desc: "Non parla. Ascolta. Olmo è una pausa lunga fra due frasi importanti.", tag: "scarce", images: ["/foto/olmo.jpg"], sold: false, weight: 420, dimensions: "33×12×10 cm", sku: "DUDI-006", category: "bambola" },
  { id: "vera", name: "Vera", italic: "la luce", price: 360, edition: "1 of 1", origin: "Merano, IT", materials: "Cotone egiziano, ricamo a mano", height: "35 cm", year: "2026",
    desc: "Indossa un abito ricamato a punto croce. Ogni nodo è una piccola promessa.", tag: "", images: ["/foto/vera.jpg"], sold: false, weight: 500, dimensions: "35×13×11 cm", sku: "DUDI-007", category: "bambola" },
  { id: "barnaba", name: "Barnaba", italic: "il sorriso", price: 270, edition: "1 of 1", origin: "Lana, IT", materials: "Lana merino, ciuffo di seta", height: "31 cm", year: "2026",
    desc: "Ha un sorriso storto, di quelli che non si possono ignorare. Barnaba si fa amico di chiunque in tre minuti.", tag: "", images: ["/foto/barnaba.jpg"], sold: false, weight: 400, dimensions: "31×11×9 cm", sku: "DUDI-008", category: "bambola" },
];

export function dollImage(id: string): string {
  const doll = DOLLS.find((d) => d.id === id);
  return doll?.images[0] || "/foto/hero.jpg";
}

export function dollImages(id: string): string[] {
  const doll = DOLLS.find((d) => d.id === id);
  return doll?.images || ["/foto/hero.jpg"];
}

export function findDoll(id: string): Doll | undefined {
  return DOLLS.find((d) => d.id === id);
}

export function isAvailable(id: string): boolean {
  const doll = DOLLS.find((d) => d.id === id);
  return doll ? !doll.sold : false;
}
