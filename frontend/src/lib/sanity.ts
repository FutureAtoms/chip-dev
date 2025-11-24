import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

export const sanityClient = (projectId && dataset) ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
}) : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export const urlFor = (source: any) => builder ? builder.image(source) : null;

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  category: string;
  inStock: boolean;
}

export interface HeroContent {
  _id: string;
  title: string;
  subtitle: string;
  backgroundImage: any;
  ctaText: string;
}

export interface StoreInfo {
  _id: string;
  storeName: string;
  tagline: string;
  hours: string;
  phone: string;
  address: string;
}
