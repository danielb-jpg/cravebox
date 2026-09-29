import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, MessageSquare, ChevronRight, Sparkles, ChefHat } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // 25 mins countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:p-6 flex items-center justify-center animate-in fade-in">
      <div 
        className="relative w-full max-w-xl bg-[#161413] border border-[#2F2B28] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Banner */}
        <div className="p-4 sm:p-8 bg-gradient-to-b from-[#221711] via-[#1A1614] to-[#161413] border-b border-[#282421] text-center space-y-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40 flex items-center justify-center mx-auto text-[#16A34A]">
            <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.5]" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8590C]/20 border border-[#E8590C]/30 text-xs font-bold text-[#FF7A29] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Received · Kitchen Cooking</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white font-display">
              Order {order.orderId} Confirmed!
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A29E] max-w-sm mx-auto mt-1">
              Hang tight, {order.customerName.split(' ')[0]}! Our culinary team is firing up your dishes right now.
            </p>
          </div>

          {/* Live Estimated Arrival Clock */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 px-4 sm:px-5 rounded-2xl bg-[#1F1C1A] border border-[#302B27]">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8590C] animate-pulse" />
            <div className="text-left">
              <p className="text-[9px] sm:text-[10px] text-[#8C8680] uppercase tracking-wider">Estimated Delivery</p>
              <p className="text-xs sm:text-sm font-extrabold text-white tabular-nums font-mono">
                {formatTimer(timerSeconds)} minutes
              </p>
            </div>
          </div>
        </div>

        {/* Live Stepper Tracker */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#8C8680] uppercase tracking-wider">
              Live Preparation Timeline
            </h3>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">Order Confirmed & Payment Verified</p>
                  <p className="text-[11px] text-[#8C8680]">Dispatched to main kitchen floor · {order.createdAt}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#E8590C] text-white flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#FF7A29]">Chef Preparing & Seasoning</p>
                  <p className="text-[11px] text-[#A8A29E]">Fresh cuts seared and flame-grilled to order</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-[#262320] text-[#78726B] border border-[#3A3530] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">Thermal Packaging & Sealing</p>
                  <p className="text-[11px] text-[#78726B]">Tamper-evident security tape applied</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-[#262320] text-[#78726B] border border-[#3A3530] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">4</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">Express Courier Handover</p>
                  <p className="text-[11px] text-[#78726B]">Rider heads to {order.deliveryArea}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Snapshot */}
          <div className="p-4 rounded-2xl bg-[#1B1917] border border-[#2B2724] space-y-2 text-xs text-[#A8A29E]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#E8590C] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">{order.deliveryAddress}</p>
                <p className="text-[11px] text-[#8C8680]">{order.deliveryArea} · Slot: {order.deliverySlot}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-[#26221E] text-[11px]">
              <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Contact: {order.customerPhone} ({order.customerName})</span>
            </div>
          </div>

          {/* Ordered items pill list */}
          <div className="space-y-1.5 pt-1 text-xs">
            <p className="text-[11px] font-bold text-[#8C8680] uppercase tracking-wider">Ordered Items</p>
            <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
              {order.items.map((i) => (
                <div key={i.id} className="flex justify-between text-[#C8C2BC] py-1 border-b border-[#201D1A]">
                  <span>{i.quantity}x {i.name}</span>
                  <span className="font-semibold text-white tabular-nums">₦{(i.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-extrabold text-sm text-white pt-2">
              <span>Paid Total:</span>
              <span className="text-[#E8590C] tabular-nums">₦{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <a
              href={`https://wa.me/2348000000000?text=Hi%20CraveBox!%20Tracking%20Order%20${order.orderId}%20for%20${encodeURIComponent(order.customerName)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Track Live on WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-[#23201D] hover:bg-[#2C2825] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Done & Return to CraveBox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
