import React, { useState } from 'react';
import { X, Flame, Star, Clock, Plus, Minus, Check } from 'lucide-react';
import { FoodItem } from '../types';

interface MealDetailModalProps {
  item: FoodItem | null;
  onClose: () => void;
  onAddToCart: (
    item: FoodItem,
    quantity: number,
    options?: {
      spiceLevel?: string;
      extras?: string[];
    }
  ) => void;
}

export const MealDetailModal: React.FC<MealDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<string>('Medium');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const availableExtras = [
    { id: 'extra-plantain', name: 'Fried Sweet Plantain (Dodo)', price: 1200 },
    { id: 'extra-protein', name: 'Extra Char-Grilled Chicken Quarter', price: 2500 },
    { id: 'slaw', name: 'Crunchy Chef Slaw', price: 800 },
    { id: 'zobo-drink', name: 'Chilled Spiced Hibiscus Zobo (500ml)', price: 1500 },
  ];

  const toggleExtra = (extraName: string) => {
    if (selectedExtras.includes(extraName)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== extraName));
    } else {
      setSelectedExtras([...selectedExtras, extraName]);
    }
  };

  const calculateTotalPrice = () => {
    let base = item.price;
    selectedExtras.forEach((extraName) => {
      const found = availableExtras.find((e) => e.name === extraName);
      if (found) base += found.price;
    });
    return base * quantity;
  };

  const handleAdd = () => {
    onAddToCart(item, quantity, {
      spiceLevel,
      extras: selectedExtras,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#181615] border border-[#2D2A27] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-0 flex-1">
          {/* Top Image Banner */}
          <div className="relative h-52 sm:h-72 w-full bg-[#121110]">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181615] via-transparent to-black/30" />
            
            {item.badge && (
              <span className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 px-2.5 py-1 rounded-md bg-[#E8590C] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">
                {item.badge}
              </span>
            )}
          </div>

          {/* Details Body */}
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {item.name}
                </h2>
                <span className="text-xl sm:text-2xl font-extrabold text-[#E8590C] tabular-nums whitespace-nowrap">
                  ₦{item.price.toLocaleString()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A29E] mt-1.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Quick stats / Nutrition badges - 2 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 p-3 rounded-2xl bg-[#1F1D1A] border border-[#2B2825] text-center">
              <div>
                <p className="text-[10px] sm:text-[11px] text-[#8C8680]">Calories</p>
                <p className="text-xs sm:text-sm font-bold text-white tabular-nums">{item.calories} kcal</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] text-[#8C8680]">Protein</p>
                <p className="text-xs sm:text-sm font-bold text-[#16A34A] tabular-nums">{item.protein}g</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] text-[#8C8680]">Carbs</p>
                <p className="text-xs sm:text-sm font-bold text-white tabular-nums">{item.carbs}g</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] text-[#8C8680]">Healthy Fats</p>
                <p className="text-xs sm:text-sm font-bold text-white tabular-nums">{item.fat}g</p>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-[#A8A29E]">
              <span className="flex items-center gap-1 text-[#F59E0B] font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                {item.rating} ({item.reviewCount} reviews)
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E8590C]" />
                {item.prepTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#38BDF8]">
                Sealed fresh box
              </span>
            </div>

            {/* Customization 1: Spice Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#C8C2BC] uppercase tracking-wider">
                Select Spice Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Mild', 'Medium', 'Extra Hot 🔥'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSpiceLevel(level)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      spiceLevel === level
                        ? 'border-[#E8590C] bg-[#E8590C]/15 text-[#E8590C]'
                        : 'border-[#2D2A28] bg-[#141312] text-[#A8A29E] hover:border-[#3D3A37]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization 2: Add-ons & Sides */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#C8C2BC] uppercase tracking-wider">
                Add Premium Sides & Drinks
              </label>
              <div className="space-y-2">
                {availableExtras.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.name);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.name)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#E8590C]/60 bg-[#E8590C]/10 text-white'
                          : 'border-[#2D2A28] bg-[#141312] text-[#A8A29E] hover:border-[#3D3A37]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-[#E8590C] border-[#E8590C] text-white'
                              : 'border-[#403C38] bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{extra.name}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#F9F7F4] tabular-nums">
                        +₦{extra.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Add To Order Bar */}
        <div className="p-4 sm:p-5 border-t border-[#262422] bg-[#141312] flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-[#1F1D1A] border border-[#2B2825] rounded-xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A8A29E] hover:text-white hover:bg-[#2A2724] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A8A29E] hover:text-white hover:bg-[#2A2724] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-5 text-sm sm:text-base font-bold text-white bg-[#E8590C] hover:bg-[#D44F0A] rounded-xl transition-all shadow-lg shadow-[#E8590C]/25 flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order</span>
            <span className="tabular-nums">₦{calculateTotalPrice().toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
