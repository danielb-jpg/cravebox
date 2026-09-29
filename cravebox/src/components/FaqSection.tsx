import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/menuData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-[#121110] border-t border-[#242220]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201D1A] border border-[#2F2B28] text-xs font-semibold text-[#E8590C] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F9F7F4] font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#9E9790] mt-2">
            Everything you need to know about CraveBox delivery, ingredients, and weekly plans.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#E8590C]/50 bg-[#1A1816]'
                    : 'border-[#262320] bg-[#161514] hover:border-[#38332F]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center bg-[#23201D] text-[#C8C2BC] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#E8590C]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#A8A29E] leading-relaxed border-t border-[#23201D] animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support helper */}
        <div className="mt-10 text-center text-xs text-[#8C8680]">
          Still have a unique craving or dietary question?{' '}
          <a
            href="https://wa.me/2348000000000?text=Hi%20CraveBox!%20I%20have%20a%20question%20about%20ordering."
            target="_blank"
            rel="noreferrer"
            className="text-[#E8590C] font-bold hover:underline"
          >
            Chat directly with our Chef Concierge on WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};
