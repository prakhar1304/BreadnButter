// types.ts
export interface SizePricing {
    size: string;
    price: number;
  }
  
  export interface PartyItem {
    key: string;
    itemName: string;
    description: string;
    category: string;
    image: string;
    colors: string[];
    hasSizes: boolean;
    pricing: number | SizePricing[];
  }