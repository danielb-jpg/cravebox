export interface FoodItem {
  id: string;
  name: string;
  category: 'chicken' | 'nigerian' | 'healthy' | 'comfort' | 'quick' | 'family';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  badge?: 'BESTSELLER' | 'HIGH PROTEIN' | 'NEW' | 'CHEF PICK' | 'POPULAR';
  rating: number;
  reviewCount: number;
  prepTime: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  spicyLevel?: 1 | 2 | 3;
  isHealthy?: boolean;
}

export interface MealPrepPlan {
  id: string;
  title: string;
  subtitle: string;
  mealsPerWeek: number;
  pricePerWeek: number;
  pricePerMeal: number;
  recommendedFor: string;
  isPopular?: boolean;
  features: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  foodItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedOptions?: {
    portion?: string;
    spiceLevel?: string;
    extras?: string[];
  };
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  dishOrdered: string;
  avatar: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  city: string;
  deliveryTime: string;
  fee: number;
  minOrderFree: number;
  status: 'active' | 'limited';
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryArea: string;
  deliveryNotes?: string;
  deliverySlot: string;
  paymentMethod: 'card' | 'transfer' | 'cod' | 'applepay';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCodeApplied?: string;
  createdAt: string;
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
}
