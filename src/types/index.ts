export type IndianRegion =
  | "Northern India"
  | "Southern India"
  | "Western India"
  | "Eastern India"
  | "Central India"
  | "North-Eastern India";

export interface IndianState {
  id: string;
  name: string;
  slug: string;
  region: IndianRegion;
  capital: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  thumbImage: string;
  traditionalAttire: {
    men: string;
    women: string;
    description: string;
  };
  famousCrafts: string[];
  keyTextiles: string[];
  culturalHighlights: string[];
  featuredProductIds: string[];
  artisanIds: string[];
  storyIds: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Size", "Color"
  options: string[]; // e.g. ["S", "M", "L", "XL"] or ["Ruby Red", "Royal Blue"]
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  stateId: string;
  stateName: string;
  region: IndianRegion;
  categorySlug: string;
  categoryName: string;
  craftType: string;
  gender: "Women" | "Men" | "Unisex";
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  fabric: string;
  craftTechnique: string;
  careInstructions: string;
  origin: string;
  sellerId: string;
  sellerName: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  stockCount: number;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  sku: string;
  reviews?: ProductReview[];
}

export interface Artisan {
  id: string;
  name: string;
  slug: string;
  community: string;
  stateId: string;
  stateName: string;
  craftSpeciality: string;
  experienceYears: number;
  avatar: string;
  workshopImage: string;
  shortBio: string;
  fullStory: string;
  recognizedAwards?: string[];
  featuredProductIds: string[];
}

export interface CultureStory {
  id: string;
  title: string;
  slug: string;
  category: "Textiles" | "Craft Heritage" | "Festivals" | "Weaving Traditions" | "Artisan Spotlight";
  author: string;
  authorRole: string;
  publishDate: string;
  readingTimeMinutes: number;
  coverImage: string;
  summary: string;
  content: string[];
  relatedStateId?: string;
  relatedProductIds?: string[];
}

export interface CartItem {
  id: string; // cart item unique ID (productId + variants)
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  stateName: string;
  craftType: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: "Home" | "Work";
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  stateName: string;
}

export type OrderTrackingStatus =
  | "Order Placed"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

export interface OrderTrackingStep {
  status: OrderTrackingStatus;
  date?: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  shippingAddress: SavedAddress;
  paymentMethod: "UPI" | "Credit / Debit Card" | "Net Banking" | "Cash on Delivery";
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderTrackingStatus;
  trackingSteps: OrderTrackingStep[];
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}

export interface SellerProfile {
  id: string;
  storeName: string;
  slug: string;
  artisanLeader: string;
  stateId: string;
  stateName: string;
  craftSpeciality: string;
  description: string;
  rating: number;
  totalProducts: number;
  totalSales: number;
  bannerImage: string;
  logoImage: string;
  contactEmail: string;
  contactPhone: string;
  city: string;
  verified: boolean;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  productName: string;
  reason: string;
  description: string;
  date: string;
  status: "Requested" | "Under Review" | "Approved" | "Rejected" | "Refunded";
  refundAmount: number;
}

export type UserRole = "buyer" | "seller" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  sellerId?: string;
}

