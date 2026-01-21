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
 * Carte digitale d'exemple pour la page /menu.
 * À ajuster au besoin sans toucher au JSX.
 */
export const digitalMenuCategories: DigitalMenuCategory[] = [
  {
    id: "entrees-demo",
    name: "Entrées",
    items: [
      {
        name: "Carpaccio de bœuf mariné",
        description:
          "Fines tranches de bœuf, parmesan, roquette et huile d’olive citronnée.",
        price: "13,00 €",
      },
      {
        name: "Burrata crémeuse & tomates",
        description:
          "Burrata, tomates confites, basilic frais et réduction balsamique.",
        price: "12,00 €",
      },
      {
        name: "Assiette de tapas Just Relax",
        description:
          "Sélection de tapas chauds et froids à partager à plusieurs.",
        price: "15,00 €",
      },
    ],
  },
  {
    id: "plats-demo",
    name: "Plats",
    items: [
      {
        name: "Burger gourmet Just Relax",
        description:
          "Pain brioché, steak haché façon bouchère, fromage fondant et frites maison.",
        price: "21,00 €",
      },
      {
        name: "Pavé de saumon grillé",
        description:
          "Légumes de saison rôtis, sauce légère aux agrumes et herbes fraîches.",
        price: "23,00 €",
      },
      {
        name: "Plat du chef",
        description:
          "Suggestion du moment selon le marché et l’inspiration du chef.",
        price: "24,00 €",
      },
    ],
  },
  {
    id: "desserts-demo",
    name: "Desserts",
    items: [
      {
        name: "Tiramisu maison",
        description: "Crème mascarpone légère, café corsé et biscuit imbibé.",
        price: "9,00 €",
      },
      {
        name: "Fondant au chocolat",
        description:
          "Cœur coulant, glace vanille et éclats de noisettes caramélisées.",
        price: "10,00 €",
      },
      {
        name: "Assortiment de desserts",
        description:
          "Sélection de plusieurs desserts à partager pour finir le repas en douceur.",
        price: "14,00 €",
      },
    ],
  },
];