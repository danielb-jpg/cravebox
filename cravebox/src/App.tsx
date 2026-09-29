/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Categories } from './components/Categories';
import { Bestsellers } from './components/Bestsellers';
import { MealDetailModal } from './components/MealDetailModal';
import { MealPrepSection } from './components/MealPrepSection';
import { HowItWorks } from './components/HowItWorks';
import { HealthySection } from './components/HealthySection';
import { Testimonials } from './components/Testimonials';
import { PromoBanner } from './components/PromoBanner';
import { DeliveryChecker } from './components/DeliveryChecker';
import { InstagramGrid } from './components/InstagramGrid';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';

import { FoodItem, MealPrepPlan, CartItem, DeliveryZone, OrderDetails } from './types';
import { MENU_ITEMS, DELIVERY_ZONES } from './data/menuData';
import { Check } from 'lucide-react';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-item-1',
      foodItemId: 'smoky-jollof-chicken',
      name: 'Smoky Jollof & Grilled Chicken',
      price: 6500,
      quantity: 1,
      image: MENU_ITEMS[0].image,
      selectedOptions: {
        portion: 'Standard',
        spiceLevel: 'Medium',
        extras: ['Fried Sweet Plantain (Dodo)'],
      },
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Active category & detail modal
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDetailItem, setActiveDetailItem] = useState<FoodItem | null>(null);

  // Delivery zone & promo code
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(DELIVERY_ZONES[0]);
  const [promoCode, setPromoCode] = useState<string>('CRAVE20');

  // Quick toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add food item directly to cart
  const handleQuickAdd = (item: FoodItem) => {
    const existingIndex = cartItems.findIndex(
      (c) => c.foodItemId === item.id && !c.selectedOptions?.extras?.length
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        foodItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(`Added ${item.name} to order`);
  };

  // Add customized meal to cart
  const handleAddCustomizedMeal = (
    item: FoodItem,
    quantity: number,
    options?: { spiceLevel?: string; extras?: string[] }
  ) => {
    let extraCost = 0;
    if (options?.extras?.includes('Fried Sweet Plantain (Dodo)')) extraCost += 1200;
    if (options?.extras?.includes('Extra Char-Grilled Chicken Quarter')) extraCost += 2500;
    if (options?.extras?.includes('Crunchy Chef Slaw')) extraCost += 800;
    if (options?.extras?.includes('Chilled Spiced Hibiscus Zobo (500ml)')) extraCost += 1500;

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      foodItemId: item.id,
      name: item.name,
      price: item.price + extraCost,
      quantity,
      image: item.image,
      selectedOptions: {
        spiceLevel: options?.spiceLevel,
        extras: options?.extras,
      },
    };

    setCartItems([...cartItems, newItem]);
    showToast(`Added ${quantity}x ${item.name} to order`);
    setIsCartOpen(true);
  };

  // Add weekly meal prep plan to cart
  const handleSelectMealPrepPlan = (plan: MealPrepPlan) => {
    const planCartItem: CartItem = {
      id: `plan-${Date.now()}`,
      foodItemId: plan.id,
      name: `CraveBox ${plan.title} Plan (${plan.subtitle})`,
      price: plan.pricePerWeek,
      quantity: 1,
      image: MENU_ITEMS[0].image,
      selectedOptions: {
        portion: `${plan.mealsPerWeek} chef meals weekly`,
        extras: ['Priority Thermal Packaging', 'Macro Labels'],
      },
    };

    setCartItems([...cartItems, planCartItem]);
    showToast(`Added ${plan.title} Plan to your cart!`);
    setIsCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Handle Order Complete
  const handleOrderComplete = (order: OrderDetails) => {
    setConfirmedOrder(order);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDelivery = () => {
    const el = document.getElementById('delivery-zones');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#F9F7F4] flex flex-col font-sans selection:bg-[#E8590C] selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1E1B19] border border-[#38332E] text-white shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom duration-300">
          <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-[#E8590C] hover:underline font-bold"
          >
            View Cart
          </button>
        </div>
      )}

      {/* 1. Sticky Navigation (3-Zone Contract) */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToMenu={scrollToMenu}
        selectedZoneName={selectedZone.name}
        onOpenDeliveryChecker={scrollToDelivery}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onOrderClick={() => {
            const first = MENU_ITEMS[0];
            handleQuickAdd(first);
            setIsCartOpen(true);
          }}
          onExploreMenu={scrollToMenu}
          onQuickAddHeroMeal={() => {
            handleQuickAdd(MENU_ITEMS[0]);
            setIsCartOpen(true);
          }}
        />

        {/* 3. Social Proof / Trust Bar */}
        <TrustBar />

        {/* 4. "What are you craving?" Section */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
        />

        {/* 5. Bestsellers Menu Section */}
        <Bestsellers
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          onQuickAdd={handleQuickAdd}
          onOpenDetailModal={(item) => setActiveDetailItem(item)}
        />

        {/* 6. Meal Prep Section */}
        <MealPrepSection onSelectPlan={handleSelectMealPrepPlan} />

        {/* 7. "Dinner in 3 easy steps" (How It Works) */}
        <HowItWorks />

        {/* 8. Healthy / Fitness Section */}
        <HealthySection
          onExploreHealthy={() => {
            setSelectedCategory('healthy');
            scrollToMenu();
          }}
        />

        {/* 9. Customer Reviews */}
        <Testimonials />

        {/* 10. Limited-Time Offer (CRAVE20) */}
        <PromoBanner
          onApplyPromo={(code) => {
            setPromoCode(code);
            showToast('Discount code CRAVE20 applied (20% off)!');
          }}
          isApplied={promoCode.toUpperCase() === 'CRAVE20'}
        />

        {/* 11. Delivery Area Section */}
        <DeliveryChecker
          selectedZone={selectedZone}
          onSelectZone={(zone) => {
            setSelectedZone(zone);
            showToast(`Delivery area set to ${zone.name}`);
          }}
        />

        {/* 12. Instagram / Community Feed (@craveboxng) */}
        <InstagramGrid />

        {/* 13. FAQ Section */}
        <FaqSection />

        {/* 14. Dramatic Final CTA */}
        <FinalCta
          onOrderNow={() => {
            scrollToMenu();
          }}
          onViewMenu={scrollToMenu}
        />
      </main>

      {/* 15. Dark Sophisticated Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        promoCode={promoCode}
        onApplyPromo={(code) => {
          setPromoCode(code);
          showToast('Promo code CRAVE20 applied!');
        }}
        selectedZone={selectedZone}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Meal Customizer & Detail Modal */}
      <MealDetailModal
        item={activeDetailItem}
        onClose={() => setActiveDetailItem(null)}
        onAddToCart={handleAddCustomizedMeal}
      />

      {/* Frictionless Guest Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        promoCode={promoCode}
        selectedZone={selectedZone}
        onOrderComplete={handleOrderComplete}
      />

      {/* Live Order Confirmation & Status Tracker Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

    </div>
  );
}
