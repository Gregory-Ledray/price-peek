export interface Brand {
  "@type": "Brand" | "Organization";
  // "ACME"
  name: string;
}

export interface Offer {
  "@type": "Offer";
  // "https://example.com/anvil"
  url: string;
  // "USD"
  priceCurrency: string;
  // 119.99
  price: number;
  // "2024-11-20"
  priceValidUntil?: string;
  // "https://schema.org/UsedCondition"
  availability?: string;
  // "https://schema.org/InStock"
  itemCondition?: string;
}

export interface AggregateRating {
  "@type": "AggregateRating";
  // 4.4
  ratingValue: number;
  // 89
  reviewCount: number;
}

export interface Product {
  "@context": "https://schema.org/";
  "@type": "Product";
  // "Executive Anvil"
  name: string;
  // "https://example.com/photos/1x1/photo.jpg", "https://example.com/photos/4x3/photo.jpg"
  image: string[];
  // "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
  description: string;
  // "0446310786"
  sku: string;
  // "925872"
  mpn: string;
  brand: Brand;
  aggregateRating: AggregateRating;
  offers: Offer;
}
