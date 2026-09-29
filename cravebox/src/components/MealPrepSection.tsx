import React from 'react';
import { Check, Sparkles, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { MealPrepPlan } from '../types';
import { MEAL_PREP_PLANS, ASSET_IMAGES } from '../data/menuData';

interface MealPrepSectionProps {
  onSelectPlan: (plan: MealPrepPlan) => void;
}

export const MealPrepSection: React.FC<MealPrepSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="meal-prep" className="py-20 lg:py-28 bg-[#100F0E] relative overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#E8590C]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Split Header: Title + Big Visual Container arrangement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201D1A] border border-[#2F2B28] text-xs font-semibold text-[#E8590C]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Chef Subscription</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F9F7F4] font-display tracking-tight leading-tight">
              Your week just got <br className="hidden sm:inline" />
              <span className="text-[#E8590C]">a whole lot easier.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A8A29E] leading-relaxed max-w-xl">
              Skip the cooking, meal planning and supermarket stress. Choose your meals once and let our chefs take care of the rest. Restaurant-grade meals chilled and ready in 3 minutes.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#8C8680]">
              <span className="flex items-center gap-1.5 text-white">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" /> Microwave & Oven Safe Glass/Eco Trays
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-white">
                <Sparkles className="w-4 h-4 text-[#E8590C]" /> Fresh for 6 Days Chilled
              </span>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#2F2B28] shadow-2xl bg-[#181615] group">
              <img
                src={ASSET_IMAGES.mealPrep}
                alt="Arrangement of weekly CraveBox meal prep containers"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#141312]/90 backdrop-blur-md border border-[#2D2A28] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#E8590C] uppercase tracking-wider">Zero Cooking Guarantee</p>
                  <p className="text-sm font-semibold text-white">Pre-portioned with certified macro labels</p>
                </div>
                <span className="text-xs text-[#16A34A] bg-[#16A34A]/10 border border-[#16A34A]/30 px-3 py-1 rounded-full font-bold">
                  BPA-Free
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Tier Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEAL_PREP_PLANS.map((plan) => {
            const isHighlight = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHighlight
                    ? 'bg-[#1C1917] border-2 border-[#E8590C] shadow-2xl shadow-[#E8590C]/15 -translate-y-2'
                    : 'bg-[#161514] border border-[#262321] hover:border-[#383330]'
                }`}
              >
                {/* Popular ribbon */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E8590C] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & subtitle */}
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      {plan.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#E8590C] mt-1">
                      {plan.subtitle}
                    </p>
                    <p className="text-xs text-[#9E9790] mt-2 leading-relaxed">
                      {plan.recommendedFor}
                    </p>
                  </div>

                  {/* Pricing block */}
                  <div className="p-4 rounded-2xl bg-[#121110] border border-[#242220]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white tabular-nums">
                        ₦{plan.pricePerWeek.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#8C8680]">/ week</span>
                    </div>
                    <p className="text-xs text-[#16A34A] font-semibold mt-1">
                      ₦{plan.pricePerMeal.toLocaleString()} per delicious meal
                    </p>
                  </div>

                  {/* Included benefits list */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold text-[#A8A29E] uppercase tracking-wider">
                      Included in Plan:
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#C8C2BC] leading-relaxed">
                          <Check className="w-4 h-4 text-[#E8590C] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select Plan Button */}
                <div className="pt-8">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isHighlight
                        ? 'bg-[#E8590C] hover:bg-[#D44F0A] text-white shadow-lg shadow-[#E8590C]/25'
                        : 'bg-[#24211E] hover:bg-[#2F2B28] text-white border border-[#332E2A]'
                    }`}
                  >
                    <span>Choose {plan.title} Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
