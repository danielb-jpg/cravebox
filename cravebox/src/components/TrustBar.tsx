import React from 'react';
import { Star, Truck, Award, ShieldCheck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="border-y border-[#242220] bg-[#161514]/60 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#221F1C] border border-[#2F2C29] flex items-center justify-center shrink-0 text-[#F59E0B]">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tabular-nums">4.9 / 5.0</p>
              <p className="text-xs text-[#9E9790]">Customer Rating</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#221F1C] border border-[#2F2C29] flex items-center justify-center shrink-0 text-[#E8590C]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tabular-nums">5,000+ Meals</p>
              <p className="text-xs text-[#9E9790]">Delivered in Lagos & Abuja</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#221F1C] border border-[#2F2C29] flex items-center justify-center shrink-0 text-[#16A34A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">100% Fresh</p>
              <p className="text-xs text-[#9E9790]">No Frozen Compromises</p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#221F1C] border border-[#2F2C29] flex items-center justify-center shrink-0 text-[#38BDF8]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Same-Day Express</p>
              <p className="text-xs text-[#9E9790]">Thermal Tamper-Proof Box</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
