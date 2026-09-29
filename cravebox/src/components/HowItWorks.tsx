import React from 'react';
import { Utensils, Flame, Truck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose',
      subtitle: 'Browse our menu & select cravings',
      description: 'Explore gourmet Nigerian favourites, high-protein bowls, pastas, or pick a hassle-free 5-to-15 meal weekly prep plan.',
      icon: Utensils,
      tag: 'Over 20+ Rotating Recipes',
    },
    {
      number: '02',
      title: 'We Cook',
      subtitle: 'Kitchen prepares your meal fresh',
      description: 'Our certified culinary team cooks each plate from scratch using fresh, locally sourced non-frozen ingredients and authentic herbs.',
      icon: Flame,
      tag: 'Zero Chemical Preservatives',
    },
    {
      number: '03',
      title: 'We Deliver',
      subtitle: 'Arrives piping fresh & sealed',
      description: 'Your courier delivers in a tamper-proof insulated thermal container. Ready to devour immediately or reheat in under 3 minutes.',
      icon: Truck,
      tag: 'Average 30-45 Mins Transit',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-24 bg-[#141312] border-t border-[#242220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#E8590C] uppercase tracking-wider">
            Simple & Seamless
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F9F7F4] font-display mt-1">
            Dinner in 3 easy steps.
          </h2>
          <p className="text-sm sm:text-base text-[#9E9790] mt-2">
            No cooking, no recipe searching, no messy sinks. Just exceptional food on your schedule.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative bg-[#181615] rounded-3xl p-8 border border-[#282522] hover:border-[#3D3833] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-extrabold font-display text-[#E8590C]/30 group-hover:text-[#E8590C] transition-colors tabular-nums">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#221F1C] border border-[#2E2A27] flex items-center justify-center text-[#E8590C] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-2xl font-bold text-white font-display mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#E8590C] mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Trust Tag */}
                <div className="mt-6 pt-4 border-t border-[#24211F] flex items-center gap-2 text-xs text-[#78726B]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{step.tag}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
