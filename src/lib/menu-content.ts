export interface DigitalMenuItem {
  name: string;
  description: string;
  price: string;
}

export interface DigitalMenuCategory {
  id: string;
  name: string;
  items: DigitalMenuItem[];
}

/**
 * Carte digitale d'aperçu pour la page /menu.
 * Construite à partir de la carte des cocktails du Just Relax.
 */
export const digitalMenuCategories: DigitalMenuCategory[] = [
  {
    id: "cocktails-sans-alcool",
    name: "Cocktails sans alcool",
    items: [
      {
        name: "Virgin mojito",
        description:
          "Menthe, citron, eau pétillante, sirop mojito.",
        price: "8,00 €",
      },
      {
        name: "Virgin mojito fraise",
        description:
          "Menthe, citron, eau pétillante, sirop de fraise, purée de fraise.",
        price: "8,00 €",
      },
      {
        name: "Virgin mojito passion",
        description:
          "Menthe, citron, eau pétillante, sirop de passion, purée de passion.",
        price: "8,00 €",
      },
      {
        name: "Le Mira",
        description:
          "Jus de cranberry, jus d’ananas, sirop de cerise, citron.",
        price: "8,00 €",
      },
      {
        name: "Le Tcha Tcha Tcha",
        description:
          "Sirop d’érable, citron vert, jus de pomme, jus d’ananas.",
        price: "8,00 €",
      },
      {
        name: "Le Rubis",
        description:
          "Fraise, basilic, citron vert, purée de fraise, limonade.",
        price: "8,00 €",
      },
      {
        name: "Le Ginger",
        description:
          "Menthe, gingembre, sirop de cerise, citron vert, jus d’ananas.",
        price: "8,00 €",
      },
    ],
  },
  {
    id: "cocktails-classiques",
    name: "Cocktails classiques",
    items: [
      {
        name: "Le Boulevardier",
        description:
          "Vermouth rouge, Campari, Four Roses.",
        price: "11,00 €",
      },
      {
        name: "Le Manhattan",
        description:
          "Rye Jack Daniel’s, martini rouge, angostura.",
        price: "11,00 €",
      },
      {
        name: "Le Cosmopolitan",
        description:
          "Vodka, citron vert, jus de cranberry, Cointreau.",
        price: "11,00 €",
      },
      {
        name: "Sex and the Beach",
        description:
          "Vodka, liqueur de pêche, jus d’ananas, jus de cranberry.",
        price: "11,00 €",
      },
      {
        name: "Expresso martini",
        description:
          "Dose d’expresso, vodka, liqueur de café, sucre.",
        price: "11,00 €",
      },
      {
        name: "Gin tonic",
        description:
          "Gin, Schweppes tonic.",
        price: "11,00 €",
      },
      {
        name: "French 75",
        description:
          "Gin, citron, sucre, champagne.",
        price: "11,00 €",
      },
      {
        name: "Mojito",
        description:
          "Rhum blanc, citron vert, menthe, sucre, eau pétillante.",
        price: "11,00 €",
      },
      {
        name: "Margarita",
        description:
          "Tequila, citron vert, Cointreau, sel.",
        price: "11,00 €",
      },
    ],
  },
  {
    id: "cocktails-signature",
    name: "Cocktails signature Just Relax",
    items: [
      {
        name: "Just cocktail (sur mesure)",
        description:
          "Une idée, un souvenir, faites-en part à notre barman et le tour est joué.",
        price: "13,00 €",
      },
      {
        name: "Keep Calm",
        description:
          "Jack Daniel’s, jus d’ananas, jus d’abricot, basilic.",
        price: "12,00 €",
      },
      {
        name: "Just Relax",
        description:
          "Four Roses, liqueur de cerise, citron vert, sirop de grenadine.",
        price: "12,00 €",
      },
      {
        name: "Redlight",
        description:
          "Vodka, purée de fraise, citron vert, sucre, basilic.",
        price: "12,00 €",
      },
      {
        name: "Grinch",
        description:
          "Gin, basilic, citron, liqueur de sureau, sucre.",
        price: "12,00 €",
      },
      {
        name: "Sunset",
        description:
          "Gin, Lillet blanc, limoncello, citron, sucre.",
        price: "12,00 €",
      },
      {
        name: "Oulala",
        description:
          "Gin, calvados, citron, sucre, blanc d’œuf.",
        price: "12,00 €",
      },
    ],
  },
];