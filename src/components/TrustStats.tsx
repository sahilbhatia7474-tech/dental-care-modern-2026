import React from 'react';
import { Star, ShieldCheck, Heart, Clock } from 'lucide-react';

export const TrustStats: React.FC = () => {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] backdrop-blur-md relative z-10 w-full max-w-[100vw] overflow-hidden">
      <div className="mx-auto grid max-w-7xl w-full grid-cols-2 px-4 py-8 sm:px-6 lg:px-8 md:grid-cols-4 gap-y-6">
        
        {/* Stat 1 */}
        <div className="border-white/10 px-2 sm:px-5 py-2 text-center md:border-r flex flex-col items-center justify-center min-w-0">
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-1">
            <span>10</span>
            <span className="text-orange-400 font-bold">+</span>
          </div>
          <div className="mt-1 text-xs sm:text-sm font-medium text-white/50">Years of Experience</div>
          <div className="mt-1 text-[11px] text-orange-300/80 font-medium">Board-Certified Team</div>
        </div>

        {/* Stat 2 */}
        <div className="border-white/10 px-2 sm:px-5 py-2 text-center md:border-r flex flex-col items-center justify-center min-w-0">
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-1">
            <span>5K</span>
            <span className="text-orange-400 font-bold">+</span>
          </div>
          <div className="mt-1 text-xs sm:text-sm font-medium text-white/50">Patients Cared For</div>
          <div className="mt-1 text-[11px] text-orange-300/80 font-medium">From Routine to Implants</div>
        </div>

        {/* Stat 3 */}
        <div className="border-white/10 px-2 sm:px-5 py-2 text-center md:border-r flex flex-col items-center justify-center min-w-0">
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-1.5">
            <span>4.9</span>
            <span className="text-orange-400 font-semibold text-2xl">/5</span>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-orange-400 inline" />
          </div>
          <div className="mt-1 text-xs sm:text-sm font-medium text-white/50">Patient Satisfaction</div>
          <div className="mt-1 text-[11px] text-orange-300/80 font-medium">1,200+ Verified Reviews</div>
        </div>

        {/* Stat 4 */}
        <div className="px-2 sm:px-5 py-2 text-center flex flex-col items-center justify-center min-w-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
            <span className="text-orange-400">Same Day</span>
          </div>
          <div className="mt-1 text-xs sm:text-sm font-medium text-white/50">Emergency Support</div>
          <div className="mt-1 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Direct On-Call Triage
          </div>
        </div>

      </div>
    </section>
  );
};
