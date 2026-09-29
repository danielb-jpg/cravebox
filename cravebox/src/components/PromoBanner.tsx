import React, { useState } from 'react';
import { Tag, Check, ArrowRight, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  onApplyPromo: (code: string) => void;
  isApplied: boolean;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onApplyPromo, isApplied }) => {
  const [copied, setCopied] = useState(false);

  const handleClaim = () => {
    onApplyPromo('CRAVE20');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-[#1E1510] via-[#241710] to-[#1E1510] border-y border-[#382618] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,89,12,0.18),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-10 rounded-3xl bg-[#181310]/80 backdrop-blur-md border border-[#3E291B]">
          
          {/* Promo Text */}
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8590C]/20 border border-[#E8590C]/40 text-xs font-bold text-[#FF7A29]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited-Time Welcome Privilege</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight">
              First order? Make it count.
            </h3>
            
            <p className="text-sm sm:text-base text-[#D4C9BF] max-w-xl">
              Enjoy an instant <strong className="text-white font-bold">20% discount</strong> across our entire chef menu or your first weekly meal-prep box.
            </p>
          </div>

          {/* Action & Code Box */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Promo Code Box */}
            <div className="flex items-center bg-[#130E0B] border border-[#3E291B] rounded-2xl p-1.5 pl-4 shadow-inner">
              <div className="flex items-center gap-2 mr-4">
                <Tag className="w-4 h-4 text-[#E8590C]" />
                <span className="font-mono text-base font-extrabold tracking-widest text-white">
                  CRAVE20
                </span>
              </div>
              <button
                onClick={handleClaim}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isApplied || copied
                    ? 'bg-[#16A34A] text-white'
                    : 'bg-[#2B1B12] hover:bg-[#3B2519] text-[#E8590C] hover:text-white border border-[#482D1E]'
                }`}
              >
                {isApplied || copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Applied to Cart</span>
                  </>
                ) : (
                  <span>Copy & Apply</span>
                )}
              </button>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClaim}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-[#E8590C] hover:bg-[#D44F0A] rounded-2xl shadow-xl shadow-[#E8590C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Claim My Discount</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
