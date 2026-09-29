import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, DeliveryZone } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  promoCode: string;
  onApplyPromo: (code: string) => void;
  selectedZone: DeliveryZone;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  promoCode,
  onApplyPromo,
  selectedZone,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isDiscountActive = promoCode.toUpperCase() === 'CRAVE20';
  const discountAmount = isDiscountActive ? Math.round(subtotal * 0.2) : 0;
  
  // Delivery fee is waived if subtotal after discount >= minOrderFree
  const isFreeDelivery = subtotal >= selectedZone.minOrderFree;
  const deliveryFee = items.length > 0 ? (isFreeDelivery ? 0 : selectedZone.fee) : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    if (promoInput.trim().toUpperCase() === 'CRAVE20') {
      onApplyPromo('CRAVE20');
      setPromoInput('');
    } else {
      setPromoError('Invalid discount code. Try CRAVE20 for 20% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full sm:w-[440px] max-w-full bg-[#161413] border-l border-[#282522] shadow-2xl flex flex-col text-left">
          
          {/* Header */}
          <div className="px-4 py-4 sm:px-5 sm:py-5 border-b border-[#24211E] flex items-center justify-between bg-[#191716]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E8590C]/15 border border-[#E8590C]/30 flex items-center justify-center text-[#E8590C] shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Your Order</h3>
                <p className="text-xs text-[#8C8680]">{items.length} {items.length === 1 ? 'dish' : 'dishes'} in bag</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A8A29E] hover:text-white hover:bg-[#252220] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List or Empty state */}
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#201D1A] border border-[#2D2A27] flex items-center justify-center mx-auto text-[#78726B]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Your cart is feeling light</p>
                  <p className="text-xs text-[#8C8680] mt-1 max-w-xs mx-auto">
                    Explore our Smoky Jollof, High-Protein Bowls, or Creamy Pastas to begin.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#E8590C] text-white text-xs font-bold hover:bg-[#D44F0A] transition-colors cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 sm:p-3.5 rounded-2xl bg-[#1D1B19] border border-[#282522] flex gap-3 sm:gap-3.5 items-start"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 border border-[#302C28]"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate pr-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#78726B] hover:text-[#EF4444] transition-colors p-1 shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Selected options if any */}
                    {item.selectedOptions && (
                      <div className="text-[11px] text-[#A8A29E] space-y-0.5 mt-0.5">
                        {item.selectedOptions.spiceLevel && (
                          <p>Spice: {item.selectedOptions.spiceLevel}</p>
                        )}
                        {item.selectedOptions.extras && item.selectedOptions.extras.length > 0 && (
                          <p className="text-[#8C8680] truncate">
                            +{item.selectedOptions.extras.join(', ')}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Price & Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-xs sm:text-sm font-extrabold text-[#E8590C] tabular-nums">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>

                      <div className="flex items-center bg-[#151413] border border-[#2B2825] rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#A8A29E] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#A8A29E] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Calculation */}
          {items.length > 0 && (
            <div className="px-4 py-4 sm:px-5 sm:py-5 border-t border-[#24211E] bg-[#191716] space-y-3.5">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1 min-w-0">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C8680] shrink-0" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Discount code (e.g. CRAVE20)"
                      className="w-full pl-8 sm:pl-9 pr-3 py-2 text-xs rounded-xl bg-[#131211] border border-[#2B2825] text-white placeholder-[#68625C] focus:outline-none focus:border-[#E8590C]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#282421] hover:bg-[#342F2B] text-xs font-bold text-white border border-[#3A3530] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>

                {/* Promo Applied Chip */}
                {isDiscountActive && (
                  <div className="flex items-center justify-between text-xs text-[#16A34A] bg-[#16A34A]/10 border border-[#16A34A]/20 px-2.5 py-1.5 rounded-lg">
                    <span className="flex items-center gap-1.5 font-bold truncate pr-1">
                      <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                      <span>CRAVE20 (20% Off)</span>
                    </span>
                    <span className="font-extrabold tabular-nums shrink-0">-₦{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                {promoError && (
                  <p className="text-[11px] text-[#EF4444]">{promoError}</p>
                )}
              </form>

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs text-[#A8A29E] pt-1 border-t border-[#262320]">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white tabular-nums">₦{subtotal.toLocaleString()}</span>
                </div>

                {isDiscountActive && (
                  <div className="flex justify-between items-center text-[#16A34A]">
                    <span>Welcome Discount (20%)</span>
                    <span className="font-semibold tabular-nums">-₦{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="truncate pr-2">Estimated Delivery ({selectedZone.name})</span>
                  <span className="font-semibold text-white tabular-nums shrink-0">
                    {deliveryFee === 0 ? (
                      <span className="text-[#16A34A] font-bold">FREE</span>
                    ) : (
                      `₦${deliveryFee.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base font-extrabold text-white pt-2 border-t border-[#262320]">
                  <span>Total</span>
                  <span className="text-[#E8590C] tabular-nums text-base sm:text-lg">₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Frictionless guest checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#E8590C] hover:bg-[#D44F0A] active:scale-[0.99] shadow-lg shadow-[#E8590C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Guest Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#78726B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <span>Zero Account Signup Required · 1-Click Ordering</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
