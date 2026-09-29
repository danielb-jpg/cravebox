import React, { useState } from 'react';
import { Activity, Dumbbell, Flame, HeartPulse, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../data/menuData';

interface HealthySectionProps {
  onExploreHealthy: () => void;
}

export const HealthySection: React.FC<HealthySectionProps> = ({ onExploreHealthy }) => {
  const [activeTab, setActiveTab] = useState<'protein' | 'lowcal' | 'balanced' | 'fuel' | 'veg'>('protein');

  const categories = [
    { id: 'protein', name: 'High Protein', desc: '40g+ per portion for muscle recovery and satiety', icon: Dumbbell, stat: '42g - 52g Protein' },
    { id: 'lowcal', name: 'Low Calorie', desc: 'Under 550 kcal with uncompromised rich flavor', icon: Flame, stat: '< 550 kcal' },
    { id: 'balanced', name: 'Balanced', desc: 'Optimal 40/30/30 macro split for daily cognitive energy', icon: Activity, stat: 'Macro Optimized' },
    { id: 'fuel', name: 'Muscle Fuel', desc: 'Clean complex carbs paired with prime lean meats', icon: HeartPulse, stat: 'Clean Fuel' },
    { id: 'veg', name: 'Vegetarian', desc: 'Plant-forward dishes with lentils, beans & quinoa', icon: Activity, stat: '100% Plant Rich' },
  ];

  return (
    <section id="healthy" className="py-20 lg:py-28 bg-[#121110] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Healthy Food Photography with Macro Callouts */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-[#2B2825] shadow-2xl bg-[#1A1817] group">
              <img
                src={ASSET_IMAGES.proteinBowl}
                alt="High-Protein CraveBox power bowl with sliced seared chicken, avocado, and chickpeas"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Floating Macro HUD */}
              <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#141312]/90 backdrop-blur-md border border-[#2D2A28] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center font-extrabold text-sm">
                  46g
                </div>
                <div>
                  <p className="text-[10px] text-[#8C8680] uppercase tracking-wider font-bold">Pure Protein</p>
                  <p className="text-xs font-bold text-white">Power Bowl</p>
                </div>
              </div>

              {/* Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#141312]/90 backdrop-blur-md border border-[#2D2A28] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider">Nutritionist Verified</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Zero refined sugar · Healthy cold-pressed oils</h4>
                </div>
                <button
                  onClick={onExploreHealthy}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl transition-colors cursor-pointer"
                >
                  View Bowls
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Segmented Selectors */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18231A] border border-[#243E29] text-xs font-semibold text-[#16A34A]">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Clean Nutrition · Big Taste</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F9F7F4] font-display tracking-tight leading-tight">
              Eat better without <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#16A34A] to-[#15803D]">
                eating boring.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#A8A29E] leading-relaxed">
              High-protein, balanced and calorie-conscious meals designed to help you stay on track without sacrificing flavour. No soggy broccoli, no cardboard chicken — just real, mouth-watering fuel.
            </p>

            {/* Interactive Category Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const isActive = activeTab === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveTab(c.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#16A34A] text-white shadow-md shadow-[#16A34A]/25'
                          : 'bg-[#1C1A18] text-[#A8A29E] hover:text-white border border-[#2B2825]'
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>

              {/* Explanatory description card */}
              <div className="p-4 rounded-2xl bg-[#181615] border border-[#282522] mt-3">
                {categories
                  .filter((c) => c.id === activeTab)
                  .map((activeCat) => (
                    <div key={activeCat.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{activeCat.name} Blueprint</p>
                        <p className="text-xs text-[#9E9790] mt-0.5">{activeCat.desc}</p>
                      </div>
                      <span className="text-xs font-bold text-[#16A34A] px-2.5 py-1 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-lg">
                        {activeCat.stat}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onExploreHealthy}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#E8590C] hover:bg-[#D44F0A] rounded-xl shadow-lg shadow-[#E8590C]/20 transition-all cursor-pointer group"
              >
                <span>Explore Healthy Meals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
