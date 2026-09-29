import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToMenu: () => void;
  selectedZoneName?: string;
  onOpenDeliveryChecker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateToMenu,
  selectedZoneName = 'Lekki & VI',
  onOpenDeliveryChecker,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121110]/90 backdrop-blur-md border-b border-[#242220]">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-2xl font-bold tracking-tight text-[#F9F7F4] flex items-center gap-1.5 group"
          >
            <span className="font-display font-extrabold text-2xl tracking-tight">Crave<span className="text-[#E8590C]">Box</span></span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#E8590C] animate-pulse"></span>
          </a>

          {/* Location quick check */}
          <button
            onClick={onOpenDeliveryChecker}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#A8A29E] bg-[#1A1918] hover:bg-[#252321] border border-[#2B2826] rounded-full transition-colors"
            title="Check delivery area"
          >
            <MapPin className="w-3.5 h-3.5 text-[#E8590C]" />
            <span className="truncate max-w-[120px]">{selectedZoneName}</span>
            <span className="text-[#16A34A] font-semibold text-[10px]">· 25-35m</span>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#C8C2BC]">
          <button
            onClick={() => scrollToSection('menu')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection('meal-prep')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Meal Prep
          </button>
          <button
            onClick={() => scrollToSection('healthy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Healthy
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection('delivery-zones')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Delivery
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary actions */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#1C1A18] hover:bg-[#262421] text-[#F9F7F4] border border-[#2B2826] transition-all hover:scale-105 active:scale-95"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 text-[#E8590C]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-bold text-white bg-[#E8590C] rounded-full shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onNavigateToMenu}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#E8590C] hover:bg-[#D44F0A] active:bg-[#B84206] rounded-xl shadow-lg shadow-[#E8590C]/20 transition-all hover:shadow-[#E8590C]/35 cursor-pointer whitespace-nowrap"
          >
            Order Now
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#C8C2BC] hover:text-white hover:bg-[#1C1A18] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161514] border-b border-[#242220] px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#242220]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeliveryChecker();
              }}
              className="flex items-center gap-2 text-xs text-[#A8A29E]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E8590C]" />
              <span>Deliver to: {selectedZoneName}</span>
            </button>
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#C8C2BC]">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Explore Menu
            </button>
            <button
              onClick={() => scrollToSection('meal-prep')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Weekly Meal Prep
            </button>
            <button
              onClick={() => scrollToSection('healthy')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Healthy & Fit Bowls
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => scrollToSection('delivery-zones')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Delivery Areas
            </button>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToMenu();
            }}
            className="w-full mt-2 py-3 text-sm font-semibold text-center text-white bg-[#E8590C] rounded-xl"
          >
            Order Your Meal
          </button>
        </div>
      )}
    </header>
  );
};
