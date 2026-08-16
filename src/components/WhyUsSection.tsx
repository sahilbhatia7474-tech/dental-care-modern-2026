import React, { useState } from 'react';
import { Check, ShieldCheck, UserCheck, Microscope, VolumeX, Cpu } from 'lucide-react';

interface WhyUsSectionProps {
  onBookClick: () => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onBookClick }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="why-us" className="border-y border-white/10 bg-white/[0.02] py-24 relative overflow-hidden">
      
      {/* Background accent */}
      <div className="absolute -right-24 top-1/3 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">

        {/* Left Column: Core Value Propositions */}
        <div>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-orange-400 flex items-center gap-2">
            <span>Why Choose Us</span>
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
            <span className="text-white/40 normal-case font-normal text-xs">Patient-First Philosophy</span>
          </div>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Dentistry without the unnecessary stress.
          </h2>

          <p className="mt-6 leading-relaxed text-white/60 text-base sm:text-lg">
            We combine board-certified dental specialists, micro-invasive treatment
            techniques, and a calm, spa-like environment designed to eliminate dental anxiety forever.
          </p>

          <div className="mt-9 space-y-6">
            
            {/* Feature 1 */}
            <div className="flex gap-4.5 items-start">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-400 border border-orange-400/20">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg">Clear, transparent treatment plans</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/50">
                  Review every option, timeline, and exact out-of-pocket cost upfront before making any decision. No hidden fees.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4.5 items-start">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-400 border border-orange-400/20">
                <VolumeX className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg">Comfort & anxiety-free atmosphere</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/50">
                  Enjoy noise-canceling headphones, warm blankets, soothing ambient lighting, and gentle single-tooth computer anesthesia.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4.5 items-start">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-400 border border-orange-400/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg">Modern 3D digital technology</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/50">
                  Instant 3D intraoral optical scanning eliminates messy silicone molds. Low-dose digital X-rays and computer-guided implant precision.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-10">
            <button
              onClick={onBookClick}
              className="orange-gradient rounded-2xl px-7 py-3.5 font-bold text-[#1B0D05] shadow-lg transition hover:-translate-y-0.5"
            >
              Experience The DENTAL+ Difference
            </button>
          </div>
        </div>

        {/* Right Column: Step-by-Step Experience Container */}
        <div className="glass rounded-[2.2rem] p-4 sm:p-6 border border-white/10 shadow-2xl">
          <div className="rounded-[1.6rem] bg-gradient-to-br from-orange-500/15 via-[#18111D] to-[#0E0A14] p-6 sm:p-8 border border-white/5">
            
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-300">YOUR VISIT JOURNEY</div>
              <span className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-full">3 Easy Steps</span>
            </div>

            <div className="mt-3 text-2xl sm:text-3xl font-bold text-white">Simple from start to finish.</div>
            <p className="mt-2 text-xs sm:text-sm text-white/50">
              Click each step to see what happens during your appointment.
            </p>

            <div className="mt-7 space-y-3.5">
              
              {/* Step 1 */}
              <div
                onClick={() => setActiveStep(1)}
                className={`cursor-pointer transition-all duration-300 rounded-2xl p-4.5 border ${
                  activeStep === 1
                    ? 'bg-black/40 border-orange-400/50 shadow-glow-sm'
                    : 'bg-black/20 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl orange-gradient font-black text-[#1B0D05]">
                      01
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">Book Seamlessly</div>
                      <div className="text-xs text-white/50">Choose your specialist and convenient time online or via AI.</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${activeStep === 1 ? 'text-orange-400' : 'text-white/30'}`}>
                    {activeStep === 1 ? 'Active' : 'View'}
                  </span>
                </div>
                {activeStep === 1 && (
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/70 leading-relaxed animate-fade-in">
                    ✓ Instant calendar sync with text reminders.<br />
                    ✓ Fast digital check-in to avoid clipboard waiting room queues.<br />
                    ✓ Emergency same-day bookings handled on priority.
                  </div>
                )}
              </div>

              {/* Step 2 */}
              <div
                onClick={() => setActiveStep(2)}
                className={`cursor-pointer transition-all duration-300 rounded-2xl p-4.5 border ${
                  activeStep === 2
                    ? 'bg-black/40 border-orange-400/50 shadow-glow-sm'
                    : 'bg-black/20 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl orange-gradient font-black text-[#1B0D05]">
                      02
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">Consult & 3D Scan</div>
                      <div className="text-xs text-white/50">Discuss your dental goals with real-time digital imaging.</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${activeStep === 2 ? 'text-orange-400' : 'text-white/30'}`}>
                    {activeStep === 2 ? 'Active' : 'View'}
                  </span>
                </div>
                {activeStep === 2 && (
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/70 leading-relaxed animate-fade-in">
                    ✓ 5-Minute high-definition 3D digital intraoral scan.<br />
                    ✓ Chairside high-res monitor view so you see exactly what the doctor sees.<br />
                    ✓ Zero pressure consultations with clear pricing breakdowns.
                  </div>
                )}
              </div>

              {/* Step 3 */}
              <div
                onClick={() => setActiveStep(3)}
                className={`cursor-pointer transition-all duration-300 rounded-2xl p-4.5 border ${
                  activeStep === 3
                    ? 'bg-black/40 border-orange-400/50 shadow-glow-sm'
                    : 'bg-black/20 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl orange-gradient font-black text-[#1B0D05]">
                      03
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">Gentle Treatment & Follow-Up</div>
                      <div className="text-xs text-white/50">Get personalized, painless care in complete comfort.</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${activeStep === 3 ? 'text-orange-400' : 'text-white/30'}`}>
                    {activeStep === 3 ? 'Active' : 'View'}
                  </span>
                </div>
                {activeStep === 3 && (
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/70 leading-relaxed animate-fade-in">
                    ✓ Computer-assisted gentle numbing technique for pain-free treatment.<br />
                    ✓ Same-day digital restorative solutions.<br />
                    ✓ Dedicated post-care follow-up with direct doctor access.
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
