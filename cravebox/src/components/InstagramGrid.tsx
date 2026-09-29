import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { ASSET_IMAGES } from '../data/menuData';

export const InstagramGrid: React.FC = () => {
  const [likedIndex, setLikedIndex] = useState<number | null>(null);

  const posts = [
    {
      id: 1,
      image: ASSET_IMAGES.heroJollof,
      caption: 'Party jollof straight out of the cast iron pot. The bottom pot aroma is non-negotiable 🔥',
      likes: '1.2k',
      comments: '84',
    },
    {
      id: 2,
      image: ASSET_IMAGES.mealPrep,
      caption: 'Sundays are for weekly prep delivery. 10 clean meals in the fridge = 0 weekday cooking stress.',
      likes: '954',
      comments: '46',
    },
    {
      id: 3,
      image: ASSET_IMAGES.creamyPasta,
      caption: 'Tagliatelle smothered in roasted garlic cream sauce. Who said comfort food has to be complicated?',
      likes: '2.4k',
      comments: '138',
    },
    {
      id: 4,
      image: ASSET_IMAGES.proteinBowl,
      caption: '46 grams of pure clean fuel. Seared chicken breast, avocado, and spiced chickpeas.',
      likes: '1.8k',
      comments: '92',
    },
    {
      id: 5,
      image: ASSET_IMAGES.heroJollof,
      caption: 'Behind the scenes at our Lagos kitchen: fresh morning produce prep with zero compromise.',
      likes: '810',
      comments: '39',
    },
    {
      id: 6,
      image: ASSET_IMAGES.mealPrep,
      caption: 'Tamper-proof thermal sealed boxes ready for evening dispatch across Lekki & VI.',
      likes: '1.5k',
      comments: '77',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#141312] border-t border-[#242220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E8590C] uppercase tracking-wider mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>@craveboxng</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F9F7F4] font-display">
              Your feed deserves better food.
            </h2>
            <p className="text-sm text-[#9E9790] mt-1">
              Join over 25,000 foodies tagging their cravings every week.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F1C1A] hover:bg-[#2A2623] border border-[#2F2B28] text-xs font-bold text-white transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#E8590C]" />
            <span>Follow @craveboxng</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8C8680]" />
          </a>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#1D1B19] border border-[#262320] cursor-pointer"
              onClick={() => setLikedIndex(likedIndex === idx ? null : idx)}
            >
              <img
                src={post.image}
                alt="CraveBox culinary community post"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover overlay with likes & comments */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white">
                <div className="flex items-center gap-3 text-xs font-bold mb-2">
                  <span className="flex items-center gap-1">
                    <Heart className={`w-4 h-4 ${likedIndex === idx ? 'fill-[#EF4444] text-[#EF4444]' : 'fill-white'}`} />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    {post.comments}
                  </span>
                </div>
                <p className="text-[10px] text-[#D6D0C9] line-clamp-3 leading-tight">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
