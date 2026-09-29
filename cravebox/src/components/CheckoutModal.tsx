import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Building2, Smartphone, Banknote, MapPin, AlertCircle, Copy, Check, ChevronDown, Lock } from 'lucide-react';
import { CartItem, DeliveryZone, OrderDetails } from '../types';
import { DELIVERY_ZONES } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  promoCode: string;
  selectedZone: DeliveryZone;
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  promoCode,
  selectedZone,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zoneId, setZoneId] = useState(selectedZone.id);
  const [deliverySlot, setDeliverySlot] = useState('Immediate (30-45 mins)');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'applepay' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const currentZone = DELIVERY_ZONES.find((z) => z.id === zoneId) || selectedZone;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isDiscountActive = promoCode.toUpperCase() === 'CRAVE20';
  const discountAmount = isDiscountActive ? Math.round(subtotal * 0.2) : 0;
  const isFreeDelivery = subtotal >= currentZone.minOrderFree;
  const deliveryFee = items.length > 0 ? (isFreeDelivery ? 0 : currentZone.fee) : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'Please provide your full name';
    if (!phone.trim() || phone.trim().length < 8) errors.phone = 'Valid phone number is required';
    if (!address.trim()) errors.address = 'Please specify street / house address';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('0124892910');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `CRV-${Math.floor(1000 + Math.random() * 9000)}`;
      const order: OrderDetails = {
        orderId,
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address,
        deliveryArea: currentZone.name,
        deliveryNotes: deliveryNotes || undefined,
        deliverySlot,
        paymentMethod,
        items,
        subtotal,
        discount: discountAmount,
        deliveryFee,
        total,
        promoCodeApplied: isDiscountActive ? 'CRAVE20' : undefined,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'preparing',
      };

      setIsProcessing(false);
      onOrderComplete(order);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-2 sm:p-4 md:p-6 flex items-center justify-center animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#161413] border border-[#2B2825] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4.5 border-b border-[#25221F] bg-[#1A1817] flex items-center justify-between shrink-0">
          <div className="min-w-0 pr-3">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#E8590C] uppercase tracking-wider block">
              Frictionless Guest Checkout
            </span>
            <h2 className="text-base sm:text-xl font-bold text-white font-display truncate mt-0.5">
              Where should we deliver?
            </h2>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden xs:flex flex-col text-right">
              <span className="text-[10px] text-[#8C8680] uppercase">Total</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#E8590C] tabular-nums">₦{total.toLocaleString()}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#24211E] hover:bg-[#302C28] text-[#C8C2BC] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close checkout"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form id="checkout-form" onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 space-y-5">
          
          {/* Section 1: Customer Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#C8C2BC] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E8590C]/20 text-[#E8590C] flex items-center justify-center text-xs shrink-0 font-bold">1</span>
              <span>Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-[#A8A29E] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Daniel Adeleke"
                  className={`w-full h-11 px-3.5 rounded-xl bg-[#131211] border text-xs sm:text-sm text-white placeholder-[#68625C] focus:outline-none transition-colors ${
                    formErrors.name ? 'border-[#EF4444]' : 'border-[#2C2926] focus:border-[#E8590C]'
                  }`}
                />
                {formErrors.name && <p className="text-[11px] text-[#EF4444] mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="text-xs text-[#A8A29E] block mb-1">Phone Number (For Delivery Rider)</label>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +234 812 345 6789"
                  className={`w-full h-11 px-3.5 rounded-xl bg-[#131211] border text-xs sm:text-sm text-white placeholder-[#68625C] focus:outline-none transition-colors ${
                    formErrors.phone ? 'border-[#EF4444]' : 'border-[#2C2926] focus:border-[#E8590C]'
                  }`}
                />
                {formErrors.phone && <p className="text-[11px] text-[#EF4444] mt-1">{formErrors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Destination */}
          <div className="space-y-3 pt-3 border-t border-[#23201D]">
            <h3 className="text-xs font-bold text-[#C8C2BC] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E8590C]/20 text-[#E8590C] flex items-center justify-center text-xs shrink-0 font-bold">2</span>
              <span>Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-[#A8A29E] block mb-1">Neighborhood / Hub</label>
                <div className="relative">
                  <select
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-8 rounded-xl bg-[#131211] border border-[#2C2926] text-xs sm:text-sm text-white focus:outline-none focus:border-[#E8590C] appearance-none transition-colors truncate"
                  >
                    {DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} ({zone.city}) — ₦{zone.fee.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78726B] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#A8A29E] block mb-1">Preferred Time Window</label>
                <div className="relative">
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-8 rounded-xl bg-[#131211] border border-[#2C2926] text-xs sm:text-sm text-white focus:outline-none focus:border-[#E8590C] appearance-none transition-colors truncate"
                  >
                    <option value="Immediate (30-45 mins)">⚡ Immediate Dispatch (30-45 mins)</option>
                    <option value="Lunch Window (12:30 PM - 1:30 PM)">🍱 Lunch Slot (12:30 PM - 1:30 PM)</option>
                    <option value="Evening Window (6:30 PM - 8:00 PM)">🌙 Dinner Slot (6:30 PM - 8:00 PM)</option>
                    <option value="Tomorrow Morning (9:00 AM - 10:30 AM)">☀️ Tomorrow Morning</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78726B] pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#A8A29E] block mb-1">Street Address, Flat / Estate Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoComplete="street-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Plot 14, Admiralty Way, Lekki Phase 1 (Apartment 4B)"
                  className={`w-full h-11 pl-9 pr-3.5 rounded-xl bg-[#131211] border text-xs sm:text-sm text-white placeholder-[#68625C] focus:outline-none transition-colors ${
                    formErrors.address ? 'border-[#EF4444]' : 'border-[#2C2926] focus:border-[#E8590C]'
                  }`}
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E8590C]" />
              </div>
              {formErrors.address && <p className="text-[11px] text-[#EF4444] mt-1">{formErrors.address}</p>}
            </div>

            <div>
              <label className="text-xs text-[#A8A29E] block mb-1">Rider Instructions (Optional)</label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="e.g. White gate next to the mango tree, buzz flat 4"
                className="w-full h-11 px-3.5 rounded-xl bg-[#131211] border border-[#2C2926] text-xs sm:text-sm text-white placeholder-[#68625C] focus:outline-none focus:border-[#E8590C] transition-colors"
              />
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-3 pt-3 border-t border-[#23201D]">
            <h3 className="text-xs font-bold text-[#C8C2BC] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E8590C]/20 text-[#E8590C] flex items-center justify-center text-xs shrink-0 font-bold">3</span>
              <span>Seamless Payment</span>
            </h3>

            {/* Payment Method Cards - fluid responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {[
                { id: 'card', name: 'Card', icon: CreditCard, subtitle: 'Paystack/Flutter' },
                { id: 'transfer', name: 'Bank Transfer', icon: Building2, subtitle: 'Virtual Account' },
                { id: 'applepay', name: 'Apple Pay', icon: Smartphone, subtitle: '1-Touch Express' },
                { id: 'cod', name: 'POS Delivery', icon: Banknote, subtitle: 'Swipe at door' },
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;

                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border cursor-pointer transition-all text-center flex flex-col items-center justify-center space-y-1 select-none ${
                      isSelected
                        ? 'border-[#E8590C] bg-[#E8590C]/10 text-white shadow-md'
                        : 'border-[#292623] bg-[#141211] text-[#9E9790] hover:border-[#38332E]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-[#E8590C]' : 'text-[#78726B]'}`} />
                    <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate w-full">{method.name}</p>
                    <p className="text-[9px] sm:text-[10px] text-[#78726B] leading-tight truncate w-full">{method.subtitle}</p>
                  </div>
                );
              })}
            </div>

            {/* Payment Details Drawer based on selection */}
            {paymentMethod === 'transfer' && (
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#1D1A18] border border-[#342D26] space-y-2 text-xs text-[#C8C2BC]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase">Automated Virtual Transfer Account</span>
                  <span className="text-[10px] sm:text-[11px] text-[#16A34A] font-bold">Instant Reconciliation</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#141211] border border-[#2A2622] gap-2">
                  <div>
                    <p className="text-[11px] text-[#8C8680]">Providus Bank · CraveBox Logistics</p>
                    <p className="text-base sm:text-lg font-extrabold text-white tracking-widest font-mono">
                      0124892910
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-[#26221E] hover:bg-[#342E28] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedAccount ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccount ? 'Copied' : 'Copy Account'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-[#8C8680]">
                  Transfer exact amount <strong>₦{total.toLocaleString()}</strong>. Order automatically activates once funds land.
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#1D1A18] border border-[#342D26] flex items-center justify-between text-xs text-[#C8C2BC] gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A] shrink-0" />
                  <span className="text-[11px] sm:text-xs">256-bit TLS encrypted via Paystack & Flutterwave. We never store raw card CVVs.</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#E8590C] font-bold uppercase tracking-wider shrink-0">Zero Fees</span>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#1D1A18] border border-[#342D26] text-xs text-[#A8A29E] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#EAB308] shrink-0" />
                <span className="text-[11px] sm:text-xs">Our riders carry portable POS terminals. You can tap or swipe cards at your doorstep upon handover.</span>
              </div>
            )}
          </div>

          {/* Section 4: Live Order Summary */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#121110] border border-[#24211E] space-y-2 text-xs text-[#A8A29E]">
            <div className="flex justify-between items-center">
              <span>{items.reduce((s, i) => s + i.quantity, 0)} Items Subtotal</span>
              <span className="text-white font-semibold tabular-nums">₦{subtotal.toLocaleString()}</span>
            </div>

            {isDiscountActive && (
              <div className="flex justify-between items-center text-[#16A34A]">
                <span>Promo CRAVE20 (20% Off)</span>
                <span className="font-semibold tabular-nums">-₦{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="truncate pr-2">Delivery Fee ({currentZone.name})</span>
              <span className="text-white font-semibold tabular-nums shrink-0">
                {deliveryFee === 0 ? <span className="text-[#16A34A] font-bold">FREE</span> : `₦${deliveryFee.toLocaleString()}`}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm sm:text-base font-extrabold text-white pt-2 border-t border-[#23201D]">
              <span>Final Total</span>
              <span className="text-[#E8590C] tabular-nums text-base sm:text-lg">₦{total.toLocaleString()}</span>
            </div>
          </div>
        </form>

        {/* Sticky Action Footer */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-[#25221F] bg-[#191716] shrink-0 space-y-2">
          <button
            type="submit"
            form="checkout-form"
            disabled={isProcessing}
            className="w-full h-12 sm:h-13 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-[#E8590C] hover:bg-[#D44F0A] text-white text-sm sm:text-base font-bold shadow-xl shadow-[#E8590C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.99]"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Securing your order...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Confirm & Pay ₦{total.toLocaleString()}</span>
              </div>
            )}
          </button>

          <p className="text-center text-[10px] text-[#78726B]">
            By placing this order you agree to CraveBox Terms of Service. Prepared fresh to order.
          </p>
        </div>

      </div>
    </div>
  );
};
