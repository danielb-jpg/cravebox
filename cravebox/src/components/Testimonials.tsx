import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/menuData';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-24 bg-[#141312] border-t border-[#242220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201D1A] border border-[#2F2B28] text-xs font-semibold text-[#E8590C] mb-3">
            <Quote className="w-3 h-3" />
            <span>Real Stories · Verified Orders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F9F7F4] font-display">
            Don't just take our word for it.
          </h2>
          <p className="text-sm sm:text-base text-[#9E9790] mt-2">
            Loved by founders, bankers, fitness coaches, and foodies across Lagos and Abuja.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#181615] rounded-3xl p-6 border border-[#282522] hover:border-[#38332F] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-[#D6D0C9] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verified Tag */}
              <div className="pt-6 mt-6 border-t border-[#24211F] space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {rev.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                    </h4>
                    <p className="text-[11px] text-[#8C8680]">{rev.role} · {rev.location}</p>
                  </div>
                </div>

                <div className="text-[11px] text-[#E8590C] font-medium pt-1">
                  Ordered: {rev.dishOrdered}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate proof ribbon */}
        <div className="mt-12 p-6 rounded-2xl bg-[#1A1817] border border-[#2A2724] text-center max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#A8A29E]">
          <div className="flex -space-x-2 overflow-hidden">
            {CUSTOMER_REVIEWS.map((r, i) => (
              <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-[#121110] bg-[#292522] flex items-center justify-center text-xs font-bold text-white">
                {r.name.slice(0, 1)}
              </div>
            ))}
          </div>
          <div>
            <span className="font-bold text-white">Over 5,000+ meals served</span> with 98.4% five-star satisfaction this quarter.
          </div>
        </div>

      </div>
    </section>
  );
};
