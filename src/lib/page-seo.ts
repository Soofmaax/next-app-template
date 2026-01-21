import type { Metadata } from "next";
import { justRelaxData } from "@/lib/just-relax-data";

export const pageSeo = {
  menu: {
    title: `Carte & menus – ${justRelaxData.name} à ${justRelaxData.contact.address.city}`,
    description:
      "Découvrez la carte Just Menu, Just Boisson et Just Chicha : plats, boissons et chichas à Pantin. Consultation confortable sur mobile grâce à la carte digitale et aux menus PDF.",
  } as Metadata,
  galerie: {
    title: `Galerie photos – ${justRelaxData.name}`,
    description:
      "Ambiance, terrasse, lounge, chicha et cocktails : parcourez les photos de Just Relax à Pantin et plongez dans l’atmosphère du restaurant & lounge.",
  } as Metadata,
  accesHoraires: {
    title: `Accès & horaires – ${justRelaxData.name} à ${justRelaxData.contact.address.city}`,
    description:
      "Adresse, plan d’accès, horaires d’ouverture et informations pratiques pour venir chez Just Relax à Pantin, 7j/7 jusqu’à 2h du matin.",
  } as Metadata,
  contact: {
    title: `Contact & réservation – ${justRelaxData.name}`,
    description:
      "Contactez Just Relax à Pantin pour une réservation, un événement privé ou une privatisation. Téléphone, e-mail et formulaire de contact à votre disposition.",
  } as Metadata,
  mentionsLegales: {
    title: `Mentions légales – ${justRelaxData.name}`,
    description:
      "Mentions légales et informations réglementaires concernant le site de démonstration du restaurant & lounge Just Relax à Pantin.",
  } as Metadata,
};