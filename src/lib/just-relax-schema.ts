export interface Address {
  line1: string;
  postalCode: string;
  city: string;
  country: string;
  mapUrl: string;
}

export interface Contact {
  phoneMain: string;
  phoneAlt?: string;
  whatsapp?: string;
  email: string;
  emailAlt?: string;
  address: Address;
}

export interface OpeningHourSlot {
  from: string;
  to: string;
  label?: string;
}

export interface OpeningHourRange {
  days: string;
  slots: OpeningHourSlot[];
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface GalleryGroup {
  id: string;
  title: string;
  images: GalleryImage[];
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  isPlaceholder?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
  pdfUrl?: string;
  categories: MenuCategory[];
}

export interface DeliveryLink {
  label: string;
  url: string;
}

export interface LegalInfo {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  registrationType?: string;
  registrationNumber?: string;
  localTaxNumber?: string;
  shareCapital?: string;
  phone?: string;
  email?: string;
  addressLine1?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
}

export interface JustRelaxData {
  name: string;
  tagline: string;
  description: string;
  heroImage?: string;
  contact: Contact;
  openingHours: OpeningHourRange[];
  services: string[];
  paymentMethods: string[];
  menus: Menu[];
  gallery: GalleryGroup[];
  delivery: {
    deliveroo?: string;
    uberEats?: string;
    others?: DeliveryLink[];
  };
  social: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
  legal: LegalInfo;
  seo: SeoConfig;
}