import React, { useState } from 'react';
import { Calendar, ArrowRight, Shield, Award, CheckCircle2, Check, HeartPulse, RefreshCw, MessageSquare } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onOpenAiAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onOpenAiAssistant }) => {
  const [activeSmileMode, setActiveSmileMode] = useState<'whitening' | 'aligner' | 'implants'>('whitening');
  const [sliderPosition, setSliderPosition] = useState<number>(65);

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 sm:pt-36 hero-glow grid-bg pb-16">
      {/* Ambient background overlay */}
      <div className="absolute inset-0 bg-[#0E0A14]/50 pointer-events-none"></div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:gap-16 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:py-20">
        
        {/* Left Hero Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Tagline Pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-white/85 border border-white/10 w-fit shadow-glow-sm">
            <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_#FF8A3D] animate-pulse"></span>
            <span>Modern dentistry. Human care.</span>
            <span className="text-white/30">|</span>
            <span className="text-orange-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> AI Patient Triage Ready
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl text-white">
            Your healthiest
            <span className="text-gradient"> smile</span>
            <br className="hidden sm:inline" /> starts here.
          </h1>

          {/* Subtext */}
          <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            Personalized dental care designed around you — from routine checkups and 
            painless cleanings to 3D-guided implants and smile transformations, delivered with comfort and precision.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <button
              id="hero-schedule-btn"
              onClick={onBookClick}
              className="orange-gradient rounded-2xl px-8 py-4 text-center font-bold text-[#1B0D05] shadow-glow transition duration-300 hover:-translate-y-1 hover:shadow-orange-500/30 flex items-center justify-center gap-2 text-base active:translate-y-0"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Your Visit</span>
            </button>

            <button
              id="hero-ai-consult-btn"
              onClick={onOpenAiAssistant}
              className="rounded-2xl border border-white/15 bg-white/[0.05] px-7 py-4 text-center font-semibold text-white transition hover:bg-white/[0.1] hover:border-orange-400/40 flex items-center justify-center gap-2 text-base group"
            >
              <MessageSquare className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              <span>Ask AI Dental Assistant</span>
              <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Value props / micro-proofs */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> Gentle, anxiety-free care
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> 3D Digital scans (no molds)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> 100% Upfront transparent pricing
            </span>
          </div>

          {/* Live Availability Status */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl glass-card px-4 py-2.5 border-white/10 w-fit">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-orange-400/30 border border-orange-400 flex items-center justify-center text-xs font-bold text-orange-200">
                SC
              </div>
              <div className="w-7 h-7 rounded-full bg-purple-500/30 border border-purple-400 flex items-center justify-center text-xs font-bold text-purple-200">
                MV
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-200">
                PP
              </div>
            </div>
            <div className="text-xs">
              <span className="text-white/40">Next available slot:</span>{' '}
              <span className="font-semibold text-orange-300">Today at 2:30 PM</span>
              <span className="text-white/40"> • 3 Specialists on duty</span>
            </div>
          </div>

        </div>

        {/* Right Hero Visual Card */}
        <div className="lg:col-span-5 relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -inset-10 rounded-full bg-orange-500/15 blur-3xl pointer-events-none"></div>

          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-white/[0.045] p-3.5 shadow-2xl backdrop-blur-xl">
            <div className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#271B28] via-[#1A121E] to-[#0E0A14] p-6 sm:p-7">
              
              {/* Background ambient light */}
              <div className="absolute right-[-15%] top-[-15%] h-80 w-80 rounded-full bg-orange-500/20 blur-3xl pointer-events-none"></div>

              {/* Floating Top Chips */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="rounded-2xl glass px-4 py-2.5 border-white/10 shadow-lg">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-orange-300/80">PATIENT EXPERIENCE</div>
                  <div className="mt-0.5 text-sm font-bold text-white flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-orange-400" /> Comfort First
                  </div>
                </div>

                <div className="rounded-2xl glass px-4 py-2.5 border-white/10 shadow-lg flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF8A3D] text-white shadow-md">
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-white/40">CARE QUALITY</div>
                    <div className="text-xs font-bold text-white">Personalized</div>
                  </div>
                </div>
              </div>

              {/* Center Interactive Smile Preview Container */}
              <div className="relative z-10 my-6">
                <div className="rounded-[1.8rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl shadow-2xl">
                  
                  {/* Mode Selector Tabs */}
                  <div className="flex rounded-xl bg-white/5 p-1 mb-4 border border-white/5">
                    <button
                      id="hero-tab-whitening"
                      onClick={() => setActiveSmileMode('whitening')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                        activeSmileMode === 'whitening'
                          ? 'bg-orange-400 text-[#1B0D05] shadow'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Whitening
                    </button>
                    <button
                      id="hero-tab-aligner"
                      onClick={() => setActiveSmileMode('aligner')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                        activeSmileMode === 'aligner'
                          ? 'bg-orange-400 text-[#1B0D05] shadow'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Aligners
                    </button>
                    <button
                      id="hero-tab-implants"
                      onClick={() => setActiveSmileMode('implants')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                        activeSmileMode === 'implants'
                          ? 'bg-orange-400 text-[#1B0D05] shadow'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Implants
                    </button>
                  </div>

                  {/* Visual Smile Icon Graphic */}
                  <div className="relative flex flex-col items-center justify-center py-2">
                    <div className="relative">
                      <div className="mx-auto flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600 text-5xl shadow-[0_0_60px_rgba(255,138,61,.35)] animate-pulse">
                        🦷
                      </div>
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-[#1B0D05] font-black text-[10px] px-2 py-0.5 rounded-full shadow">
                        3D READY
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="text-lg font-extrabold text-white">
                        {activeSmileMode === 'whitening' && '1-Hour Power Laser Whitening'}
                        {activeSmileMode === 'aligner' && 'Custom Invisible Clear Aligners'}
                        {activeSmileMode === 'implants' && '3D Guided Computer Implants'}
                      </div>
                      <p className="mt-1.5 text-xs text-white/50 max-w-xs mx-auto leading-relaxed">
                        {activeSmileMode === 'whitening' && 'Achieve up to 8 shades lighter safely in a single comfortable 60-minute visit.'}
                        {activeSmileMode === 'aligner' && 'Discreetly straighten teeth with precision 3D scans and no dietary restrictions.'}
                        {activeSmileMode === 'implants' && 'Permanent, natural-feeling restorations engineered for a lifetime of chewing.'}
                      </p>
                    </div>

                    {/* Interactive Slider simulation */}
                    <div className="w-full mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-[11px] text-white/60 mb-1.5">
                        <span>Before Treatment</span>
                        <span className="text-orange-300 font-semibold">Simulation: {sliderPosition}%</span>
                        <span>After Result</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="w-full accent-orange-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                        aria-label="Treatment simulation slider"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Quick-Action bar inside card */}
              <div className="relative z-10 flex items-center justify-between gap-3 pt-2">
                <button
                  id="hero-card-symptom-btn"
                  onClick={onOpenAiAssistant}
                  className="flex-1 py-2.5 rounded-xl glass border border-orange-400/20 hover:border-orange-400/50 text-xs font-semibold text-orange-200 transition flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                  Ask AI About {activeSmileMode === 'whitening' ? 'Whitening' : activeSmileMode === 'aligner' ? 'Aligners' : 'Implants'}
                </button>
                <button
                  id="hero-card-quickbook-btn"
                  onClick={onBookClick}
                  className="py-2.5 px-4 rounded-xl orange-gradient text-[#1B0D05] font-bold text-xs shadow hover:opacity-95 transition"
                >
                  Book Now
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
