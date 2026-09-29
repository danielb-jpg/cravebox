import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../data/menuData';

interface CategoriesProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categoriesList = [
    {
      id: 'chicken',
      name: 'Chicken & Protein',
      tagline: 'Char-grilled, seasoned & tender cuts',
      image: ASSET_IMAGES.heroJollof,
      emoji: '🍗',
      dishPreview: 'Quarter Chicken & Teriyaki',
    },
    {
      id: 'nigerian',
      name: 'Nigerian Favourites',
      tagline: 'Smoky party jollof, suya & sweet dodo',
      image: ASSET_IMAGES.heroJollof,
      emoji: '🍚',
      dishPreview: 'Firewood Jollof & Suya Bowl',
    },
    {
      id: 'healthy',
      name: 'Healthy & Fit',
      tagline: 'High-protein, clean carbs & nutrient bowls',
      image: ASSET_IMAGES.proteinBowl,
      emoji: '🥗',
      dishPreview: '46g Protein Power Bowl',
    },
    {
      id: 'comfort',
      name: 'Comfort Food',
      tagline: 'Rich garlic pastas & smash burger combos',
      image: ASSET_IMAGES.creamyPasta,
      emoji: '🍝',
      dishPreview: 'Creamy Garlic Herb Pasta',
    },
    {
      id: 'quick',
      name: 'Quick Bites',
      tagline: 'Honey suya wings, rolls & fast snacks',
      image: ASSET_IMAGES.heroJollof,
      emoji: '🌯',
      dishPreview: 'Glazed Suya Wings',
    },
    {
      id: 'family',
      name: 'Family Meals',
      tagline: 'Generous party trays for 4-6 people',
      image: ASSET_IMAGES.heroJollof,
      emoji: '🥘',
      dishPreview: 'Weekend Jollof Platter',
    },
  ];

  const handleCardClick = (id: string) => {
    onSelectCategory(id);
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#121110]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#E8590C] uppercase tracking-wider">
              Explore Cravings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F9F7F4] mt-1 font-display">
              What are you craving?
            </h2>
            <p className="text-sm sm:text-base text-[#9E9790] mt-1.5">
              Pick your mood. We'll handle the cooking.
            </p>
          </div>
          
          <button
            onClick={() => handleCardClick('all')}
            className="mt-4 md:mt-0 text-sm font-semibold text-[#E8590C] hover:text-[#FF7A29] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View all dishes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCardClick(cat.id)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isSelected
                    ? 'border-[#E8590C] bg-[#1E1B19] shadow-[#E8590C]/20 shadow-lg'
                    : 'border-[#262321] bg-[#161514] hover:border-[#3A3532]'
                }`}
              >
                {/* Visual Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-[#1E1C1A]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-[#161514]/40 to-transparent" />
                  
                  {/* Category Emoji Badge */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-black/70 backdrop-blur-md flex items-center justify-center text-lg shadow-md border border-white/10">
                    {cat.emoji}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF7A29] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-semibold text-[#E8590C] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-xs text-[#9E9790] mt-1.5 leading-relaxed">
                    {cat.tagline}
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#24211F] flex items-center justify-between text-[11px] text-[#78726B]">
                    <span>Popular: {cat.dishPreview}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
