import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ASSET_IMAGES } from '../data/menuData';

interface FinalCtaProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOrderNow, onViewMenu }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#100F0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with dramatic food photography background */}
        <div className="relative rounded-3xl overflow-hidden border border-[#33261C] p-8 sm:p-14 lg:p-20 text-center flex flex-col items-center justify-center shadow-2xl">
          {/* Background image with dark warm gradient overlay */}
          <img
            src={ASSET_IMAGES.heroJollof}
            alt="Delicious CraveBox meal spread"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

          {/* Glow center */}
          <div className="absolute w-96 h-96 bg-[#E8590C]/20 blur-[130px] rounded-full pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8590C]/20 border border-[#E8590C]/40 text-xs font-bold text-[#FF7A29]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dinner Solved Tonight</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.15]">
              Your next favourite meal is one click away.
            </h2>

            <p className="text-base sm:text-lg text-[#D6D0C9] max-w-lg mx-auto leading-relaxed">
              Fresh food. Big flavour. Delivered to your door. Indulge yourself without the hours spent in the kitchen.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-[#E8590C] hover:bg-[#D44F0A] rounded-xl shadow-2xl shadow-[#E8590C]/35 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewMenu}
                className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-white bg-[#221F1C]/80 hover:bg-[#2C2824] border border-[#3A3530] rounded-xl transition-all cursor-pointer"
              >
                View Menu
              </button>
            </div>

            <p className="text-xs text-[#8C8680] pt-2">
              Average delivery time: <strong className="text-white">28 minutes</strong> · Hot & tamper-proof sealed
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
