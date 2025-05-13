export interface ProductFeature {
  feature: {
    name: string;
  };
}

export interface ProductVariant {
  productId: string;
  id: string;
  size: string;
  colors: string[];
  inventory: number;
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  description: string;
  brand: string;
  images: string[];
  price: number;
  mrp: number;
  status: "Live" | "OutOfStock" | "Disabled";
  material?: string;
  warrantyPeriod?: string;
  warrantyType?: string;
  countryOfOrigin?: string;
  categories: string[];
  variants: ProductVariant[];
  featuredTags?: ProductFeature[];
}
