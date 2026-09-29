import React, { useState } from 'react';
import { Plus, SlidersHorizontal, Star, Flame, Sparkles } from 'lucide-react';
import { FoodItem } from '../types';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';

interface BestsellersProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onQuickAdd: (item: FoodItem) => void;
  onOpenDetailModal: (item: FoodItem) => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({
  selectedCategory,
  onSelectCategory,
  onQuickAdd,
  onOpenDetailModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#141312] border-t border-[#242220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201D1A] border border-[#2F2B28] text-xs font-semibold text-[#E8590C] mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Chef's Daily Selection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F9F7F4] font-display tracking-tight">
            The meals everyone is talking about.
          </h2>
          <p className="text-sm sm:text-base text-[#9E9790] mt-2">
            Cooked to order with premium cuts, fresh produce, and intense aromatic spices. Delivered steaming hot.
          </p>
        </div>

        {/* Filter Bar with interactive segmented controls */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#E8590C] text-white shadow-lg shadow-[#E8590C]/25'
                    : 'bg-[#1C1A18] text-[#A8A29E] hover:text-white hover:bg-[#252320] border border-[#2D2A27]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Food Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-[#181615] rounded-3xl border border-[#2B2825] hover:border-[#3D3834] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70"
            >
              {/* Image Frame */}
              <div 
                className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#1D1B19] cursor-pointer"
                onClick={() => onOpenDetailModal(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181615] via-transparent to-black/20" />

                {/* Badge if present */}
                {item.badge && (
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-[#E8590C] text-white shadow-md">
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Rating pill top right */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1 text-xs font-bold text-white">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="tabular-nums">{item.rating}</span>
                </div>

                {/* Prep time badge bottom left */}
                <div className="absolute bottom-3 left-3 text-[11px] font-medium text-[#C8C2BC] bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
                  {item.prepTime}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 
                      onClick={() => onOpenDetailModal(item)}
                      className="text-lg sm:text-xl font-bold text-[#F9F7F4] hover:text-[#FF7A29] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9E9790] mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-[#8C8680] mt-3">
                    <span className="text-[#16A34A] font-semibold">{item.protein}g Protein</span>
                    <span>·</span>
                    <span className="tabular-nums">{item.calories} kcal</span>
                    {item.spicyLevel && item.spicyLevel > 1 && (
                      <>
                        <span>·</span>
                        <span className="text-[#FF7A29] flex items-center gap-0.5">
                          <Flame className="w-3 h-3 fill-current" />
                          {item.spicyLevel === 3 ? 'Extra Spicy' : 'Spicy'}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Pricing & Order Actions */}
                <div className="pt-4 border-t border-[#262320] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#8C8680] block">Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                        ₦{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-[#78726B] line-through tabular-nums">
                          ₦{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Customize button */}
                    <button
                      onClick={() => onOpenDetailModal(item)}
                      className="p-2.5 rounded-xl bg-[#22201D] hover:bg-[#2C2926] text-[#C8C2BC] hover:text-white border border-[#302D2A] transition-colors cursor-pointer"
                      title="Customize portion & sides"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>

                    {/* Quick Add button */}
                    <button
                      onClick={() => onQuickAdd(item)}
                      className="px-4 py-2.5 rounded-xl bg-[#E8590C] hover:bg-[#D44F0A] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-[#E8590C]/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search or category is empty */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#181615] rounded-3xl border border-[#2B2825] p-8">
            <p className="text-lg font-bold text-white">No meals found in this category.</p>
            <p className="text-sm text-[#9E9790] mt-1">Try switching to another category or reset your filter.</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-4 px-5 py-2.5 text-xs font-bold text-white bg-[#E8590C] rounded-xl"
            >
              Reset to All Cravings
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
