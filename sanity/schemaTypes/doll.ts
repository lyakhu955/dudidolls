import { defineField, defineType } from "sanity";

export const doll = defineType({
  name: "doll",
  title: "Bambola",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID (slug per URL)",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[a-z0-9-]+$/)
          .error("Solo lettere minuscole, numeri e trattini. Es: nuova-bambola"),
      description: "URL: /product/ID — es. anouk, miele, nuova-bambola",
    }),
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "italic",
      title: "Sottotitolo (italic)",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Prezzo",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "sold",
      title: "Venduta",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      options: {
        list: [
          { title: "Nessuno", value: "" },
          { title: "Nuova", value: "new" },
          { title: "Rara", value: "scarce" },
        ],
      },
      initialValue: "",
    }),
    defineField({
      name: "desc",
      title: "Descrizione",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "images",
      title: "Immagini",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "edition",
      title: "Edizione",
      type: "string",
    }),
    defineField({
      name: "origin",
      title: "Provenienza",
      type: "string",
    }),
    defineField({
      name: "materials",
      title: "Materiali",
      type: "string",
    }),
    defineField({
      name: "height",
      title: "Altezza",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Anno",
      type: "string",
    }),
    defineField({
      name: "weight",
      title: "Peso (kg)",
      type: "number",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensioni",
      type: "string",
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
    }),
  ],
});
