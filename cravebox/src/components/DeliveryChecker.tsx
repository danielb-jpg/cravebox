import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle, Clock, Search, ChevronRight } from 'lucide-react';
import { DELIVERY_ZONES } from '../data/menuData';
import { DeliveryZone } from '../types';

interface DeliveryCheckerProps {
  onSelectZone: (zone: DeliveryZone) => void;
  selectedZone: DeliveryZone;
}

export const DeliveryChecker: React.FC<DeliveryCheckerProps> = ({
  onSelectZone,
  selectedZone,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [checkedResult, setCheckedResult] = useState<DeliveryZone | null>(selectedZone);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setHasSearched(true);
    const query = searchInput.trim().toLowerCase();
    if (!query) {
      setCheckedResult(selectedZone);
      return;
    }

    const match = DELIVERY_ZONES.find(
      (z) =>
        z.name.toLowerCase().includes(query) ||
        z.city.toLowerCase().includes(query)
    );

    if (match) {
      setCheckedResult(match);
      onSelectZone(match);
    } else {
      setCheckedResult(null);
    }
  };

  const handleZoneClick = (zone: DeliveryZone) => {
    setCheckedResult(zone);
    setSearchInput(zone.name);
    setHasSearched(true);
    onSelectZone(zone);
  };

  return (
    <section id="delivery-zones" className="py-20 lg:py-24 bg-[#121110] border-t border-[#242220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Input and interactive lookup */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201D1A] border border-[#2F2B28] text-xs font-semibold text-[#E8590C]">
              <Truck className="w-3.5 h-3.5" />
              <span>Fast Doorstep Logistics</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F9F7F4] font-display tracking-tight">
              Fresh food, wherever you are.
            </h2>

            <p className="text-sm sm:text-base text-[#9E9790] leading-relaxed">
              Same-day delivery available across selected areas in Lagos and Abuja. Hot orders travel in insulated thermal dispatch cases to preserve authentic aroma and crunch.
            </p>

            {/* Input Search Form */}
            <form onSubmit={handleCheck} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E8590C]" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter your neighborhood (e.g. Lekki, Ikeja, Wuse)"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#1A1817] border border-[#2D2A27] text-sm text-white placeholder-[#78726B] focus:outline-none focus:border-[#E8590C] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-[#E8590C] hover:bg-[#D44F0A] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Delivery</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#8C8680] pt-1">
                <span>Delivery from <strong className="text-white">₦1,500</strong></span>
                <span>Free delivery on orders above ₦25,000</span>
              </div>
            </form>

            {/* Result Box */}
            {hasSearched && (
              <div className="mt-4 p-4 rounded-2xl bg-[#181615] border border-[#2D2A27] animate-in fade-in">
                {checkedResult ? (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        Yes! We deliver to {checkedResult.name} ({checkedResult.city})
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#A8A29E] mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#E8590C]" />
                          {checkedResult.deliveryTime}
                        </span>
                        <span>·</span>
                        <span>Standard Fee: <strong>₦{checkedResult.fee.toLocaleString()}</strong></span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-[#EAB308]">
                    We couldn't match "{searchInput}". Please choose one of our active coverage zones below.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Stylized Delivery Zone Directory Card */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#181615] border border-[#2A2724] shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#242220] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Live Dispatch Hubs Active
                  </span>
                </div>
                <span className="text-xs text-[#8C8680]">Lagos & Abuja Metros</span>
              </div>

              {/* Zone List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {DELIVERY_ZONES.map((zone) => {
                  const isCurrent = checkedResult?.id === zone.id;

                  return (
                    <div
                      key={zone.id}
                      onClick={() => handleZoneClick(zone)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-left ${
                        isCurrent
                          ? 'border-[#E8590C] bg-[#E8590C]/10 text-white'
                          : 'border-[#262320] bg-[#141312] text-[#A8A29E] hover:border-[#383430] hover:text-white'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold">{zone.name}</p>
                        <p className="text-[11px] text-[#78726B]">{zone.deliveryTime} · ₦{zone.fee.toLocaleString()}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#E8590C] shrink-0" />
                    </div>
                  );
                })}
              </div>

              {/* Bottom trust note */}
              <div className="pt-2 text-center text-xs text-[#78726B]">
                Looking for corporate catering or event trays? <span className="text-[#E8590C] font-semibold cursor-pointer">Chat with concierge</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
