export type JewelryCategory = 
  | 'ALL'
  | 'ENGAGEMENT_RINGS'
  | 'DIAMOND_RINGS'
  | 'NECKLACES'
  | 'EARRINGS'
  | 'BRACELETS'
  | 'BANGLES'
  | 'PENDANTS'
  | 'FINE_JEWELLERY';

export interface MetalOption {
  id: string;
  name: string;
  karat: string;
  colorHex: string;
  priceAdjustment: number; // in INR (₹)
}

export interface JewelryItem {
  id: string;
  title: string;
  collection: string;
  category: JewelryCategory;
  categoryLabel?: string;
  subtitle: string;
  metalPurity: string;
  gemstoneSpecs: string;
  price: number; // in INR (₹)
  images: string[];
  description: string;
  craftsmanshipStory: string;
  badge?: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  availableSizes?: number[];
  metalOptions: MetalOption[];
  allowsEngraving: boolean;
  inStock: boolean;
  specifications: {
    grossWeight?: string;
    diamondCarat?: string;
    diamondClarity?: string;
    diamondColor?: string;
    hallmarkCertification: string;
    settingType: string;
  };
}

export interface CartItem {
  cartId: string;
  item: JewelryItem;
  selectedMetal: MetalOption;
  selectedSize?: number;
  engravingText: string;
  quantity: number;
}

export interface ConsultationBooking {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  appointmentType: string;
  salon: string;
  date: string;
  time: string;
  focusPieceOrNotes: string;
}

export type ActivePageView = 
  | 'HOME'
  | 'CATALOGUE'
  | 'PRODUCT_DETAIL'
  | 'STUDIO_3D'
  | 'ABOUT'
  | 'CARE_GUIDE'
  | 'SHIPPING_RETURNS'
  | 'PRIVACY_TERMS'
  | 'CONTACT';
