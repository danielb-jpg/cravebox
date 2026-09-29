import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Instagram, Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0C0B] border-t border-[#1F1E1C] text-[#A8A29E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#1C1A19]">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                Crave<span className="text-[#E8590C]">Box</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-[#E8590C]" />
            </div>

            <p className="text-sm font-semibold text-white">
              “Good Food. Zero Stress.”
            </p>

            <p className="text-xs text-[#8C8680] leading-relaxed max-w-sm">
              Chef-made meals delivered fresh across Lagos and Abuja. Premium ingredients, zero preservatives, and seamless weekly plans designed for your lifestyle.
            </p>

            {/* Social badges */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1817] hover:bg-[#252220] border border-[#2B2826] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1817] hover:bg-[#252220] border border-[#2B2826] text-white flex items-center justify-center transition-colors font-bold text-xs"
                aria-label="TikTok"
              >
                TT
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1817] hover:bg-[#252220] border border-[#2B2826] text-white flex items-center justify-center transition-colors font-bold text-xs"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#16A34A]/20 hover:bg-[#16A34A]/30 border border-[#16A34A]/30 text-[#16A34A] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('menu')} className="hover:text-white transition-colors cursor-pointer">
                  Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('meal-prep')} className="hover:text-white transition-colors cursor-pointer">
                  Meal Prep
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('healthy')} className="hover:text-white transition-colors cursor-pointer">
                  Healthy Meals
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Chef Concierge
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-white">
                <MessageSquare className="w-3.5 h-3.5 text-[#16A34A]" />
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-[#C8C2BC]"
                >
                  WhatsApp: +234 800 CRAVE BOX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E8590C]" />
                <span>Hotline: +234 (01) 888 2728</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>support@cravebox.ng</span>
              </li>
              <li className="text-[11px] text-[#78726B] pt-1">
                Kitchen hours: 8:00 AM – 10:30 PM (Mon - Sun)
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Get tasty updates.
            </h4>
            <p className="text-xs text-[#8C8680] leading-relaxed">
              New weekly drops, secret chef discounts & weekend party jollof specials.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161514] border border-[#282522] text-xs text-white placeholder-[#78726B] focus:outline-none focus:border-[#E8590C]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#E8590C] hover:bg-[#D44F0A] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Subscribed! Check inbox</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78726B]">
          <p>© 2026 CraveBox Nigeria Ltd. All rights reserved.</p>

          {/* Verified payment logos text */}
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-[#8C8680]">Frictionless & Encrypted:</span>
            <span className="px-2 py-0.5 rounded bg-[#1A1817] border border-[#2B2826] text-[#A8A29E] font-medium">Paystack</span>
            <span className="px-2 py-0.5 rounded bg-[#1A1817] border border-[#2B2826] text-[#A8A29E] font-medium">Flutterwave</span>
            <span className="px-2 py-0.5 rounded bg-[#1A1817] border border-[#2B2826] text-[#A8A29E] font-medium">Cards & Transfer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
