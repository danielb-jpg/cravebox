import React from 'react';
import { ArrowRight, Sparkles, Clock, Flame, Star } from 'lucide-react';
import heroJollofImg from '../assets/images/hero_gourmet_jollof_chicken_1790691892922.jpg';

interface HeroProps {
  onOrderClick: () => void;
  onExploreMenu: () => void;
  onQuickAddHeroMeal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderClick,
  onExploreMenu,
  onQuickAddHeroMeal,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#121110] via-[#161413] to-[#121110]">
      {/* Subtle radial ambient warmth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8590C]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201D1A] border border-[#2F2B28] text-xs font-semibold text-[#E8590C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef-made meals · Delivered fresh</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F9F7F4] tracking-tight leading-[1.1] font-display">
              Good Food. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A29] via-[#E8590C] to-[#D44F0A]">
                Zero Stress.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#C8C2BC] max-w-xl leading-relaxed font-normal">
              Freshly prepared meals delivered straight to your door — delicious, convenient, and made around your lifestyle. Skip the supermarket lines and cooking fatigue.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-[#E8590C] hover:bg-[#D44F0A] active:scale-[0.99] rounded-xl shadow-xl shadow-[#E8590C]/25 transition-all cursor-pointer group"
              >
                <span>Order Your Meal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-[#F9F7F4] bg-[#1C1A18] hover:bg-[#252320] border border-[#2F2C29] rounded-xl transition-all cursor-pointer"
              >
                Explore Menu
              </button>
            </div>

            {/* Trust Statement */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 text-xs font-medium text-[#9E9790]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Freshly prepared daily
              </span>
              <span className="mx-2.5 text-[#403B36]">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E8590C]" />
                30-45 min delivery
              </span>
              <span className="mx-2.5 text-[#403B36]">·</span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#FF7A29]" />
                Quality ingredients only
              </span>
            </div>

            {/* Micro rating preview */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#C8C2BC]">
                <strong className="text-white font-semibold">4.9/5</strong> from 1,400+ food lovers in Lagos & Abuja
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Interactive Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Gourmet Photography Container */}
              <div className="relative rounded-3xl overflow-hidden border border-[#2E2A27] shadow-2xl shadow-black/80 bg-[#1A1817] group">
                <img
                  src={heroJollofImg}
                  alt="Smoky Jollof Rice with Char-Grilled Chicken and Plantains"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Visual gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Bottom Overlay card on image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#141312]/90 backdrop-blur-md border border-[#2D2A28] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#E8590C] uppercase tracking-wider">Today's Star Meal</span>
                      <span className="text-xs text-[#8C8680]">·</span>
                      <span className="text-xs text-[#8C8680]">38g Protein</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      Smoky Jollof & Grilled Chicken
                    </h3>
                    <p className="text-sm font-extrabold text-[#F9F7F4] tabular-nums">
                      ₦6,500 <span className="text-xs font-normal text-[#8A847E] line-through">₦7,500</span>
                    </p>
                  </div>
                  
                  <button
                    onClick={onQuickAddHeroMeal}
                    className="px-4 py-2.5 text-xs font-bold text-white bg-[#E8590C] hover:bg-[#D44F0A] rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    + Add to Order
                  </button>
                </div>
              </div>

              {/* Floating Badge 1: Top Left - Speed & Freshness */}
              <div className="absolute -top-4 -left-3 sm:-left-6 p-3 rounded-2xl bg-[#181615]/95 backdrop-blur-md border border-[#2F2B28] shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8590C]/15 border border-[#E8590C]/30 flex items-center justify-center text-[#E8590C]">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-[11px] text-[#A8A29E] font-medium">Fire-Smoked Recipe</p>
                  <p className="text-xs font-bold text-white">Party Jollof & Dodo</p>
                </div>
              </div>

              {/* Floating Badge 2: Top Right - Live Prep Status */}
              <div className="absolute -bottom-3 -right-2 sm:-right-4 p-3 rounded-2xl bg-[#181615]/95 backdrop-blur-md border border-[#2F2B28] shadow-xl flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping" />
                <div>
                  <p className="text-[10px] text-[#A8A29E]">Dispatched in</p>
                  <p className="text-xs font-bold text-[#F9F7F4] tabular-nums">Average 28 Mins</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
