
export type AppSection = 'home' | 'quote' | 'gallery' | 'prices' | 'emergency' | 'rating' | 'admin';

export interface AppSettings {
  driveLink: string;
  phone: string;
  email: string;
  address: string;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  location: 'Tarumã' | 'Assis' | 'Região';
  serviceType: string;
  description: string;
}

export interface ServicePrice {
  id: string;
  category: string;
  description: string;
  basePrice: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}
