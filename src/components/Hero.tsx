import React, { useState, useRef } from 'react';
import { Calendar, ArrowRight, ShieldCheck, CheckCircle2, Check, HeartPulse, Sparkles, MessageSquare, Phone, Activity } from 'lucide-react';
import { Glossy3DTooth } from './Glossy3DTooth';

interface HeroProps {
  onBookClick: () => void;
  onOpenAiAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onOpenAiAssistant }) => {
  const [activeSmileMode, setActiveSmileMode] = useState<'whitening' | 'aligner' | 'implants'>('whitening');
  const [sliderPosition, setSliderPosition] = useState<number>(75);
  
  // 3D Card tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen w-full max-w-[100vw] overflow-hidden pt-28 sm:pt-36 hero-glow grid-bg pb-16">
      {/* 3D Ambient background lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-orange-500/20 blur-[130px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[150px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[#120B1C]/50 pointer-events-none"></div>

      <div className="relative mx-auto grid max-w-7xl w-full items-center gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 py-8 lg:py-16 lg:grid-cols-12">
        
        {/* Left Hero Content */}
        <div className="lg:col-span-7 flex flex-col justify-center min-w-0 z-10">
          
          {/* Tagline Pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-white/90 border border-orange-400/35 w-fit max-w-full shadow-[0_0_25px_rgba(255,138,61,0.25)] flex-wrap">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_12px_#FF8A3D] animate-pulse shrink-0"></span>
            <span className="font-semibold text-white">Modern Dentistry in Delhi</span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-orange-300 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" /> Dr. Sahil Bhatia
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] sm:leading-[1.04] tracking-tight text-white break-words">
            Precision 3D Dental Care.
            <br />
            <span className="text-gradient">Gentle & Painless.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            Experience painless dentistry with computer-guided 3D implants, invisible clear aligners, 
            and 1-hour laser teeth whitening in Delhi. Same-day emergency response with compassion.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <button
              id="hero-schedule-btn"
              onClick={onBookClick}
              className="orange-gradient rounded-2xl px-8 py-4 text-center font-black text-[#1B0D05] shadow-[0_0_35px_rgba(255,138,61,0.45),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(255,138,61,0.65)] flex items-center justify-center gap-2.5 text-base active:scale-98 cursor-pointer border border-white/20"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>

            <a
              id="hero-call-now-btn"
              href="tel:+919953239674"
              className="rounded-2xl border border-white/20 bg-white/[0.08] px-7 py-4 text-center font-bold text-white transition-all duration-300 hover:bg-white/[0.14] hover:border-orange-400/60 flex items-center justify-center gap-2.5 text-base group shadow-lg backdrop-blur-md"
            >
              <Phone className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              <span>Call +91 9953239674</span>
            </a>
          </div>

          {/* Value props / micro-proofs */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> Single-sitting painless RCT
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> 3D Guided implants
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> 100% Upfront pricing
            </span>
          </div>

          {/* Live Availability Status */}
          <div className="mt-7 inline-flex items-center gap-3 rounded-2xl gloss-card px-4 py-2.5 border-white/15 w-fit">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full orange-gradient border-2 border-[#120B19] flex items-center justify-center text-[10px] font-bold text-[#1B0D05] shadow">
                SB
              </div>
              <div className="w-7 h-7 rounded-full bg-purple-500/80 border-2 border-[#120B19] flex items-center justify-center text-[10px] font-bold text-white shadow">
                AS
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-500/80 border-2 border-[#120B19] flex items-center justify-center text-[10px] font-bold text-white shadow">
                RV
              </div>
            </div>
            <div className="text-xs">
              <span className="text-white/50">Next available slot:</span>{' '}
              <span className="font-bold text-orange-300">Today at 2:30 PM</span>
              <span className="text-white/50"> • Delhi Clinic Active</span>
            </div>
          </div>

        </div>

        {/* Right Hero Visual Card with 3D Tilt and Floating 3D Glossy Tooth */}
        <div className="lg:col-span-5 relative mx-auto w-full max-w-lg lg:max-w-none">
          
          {/* Ambient Glow */}
          <div className="absolute -inset-8 rounded-full bg-orange-500/25 blur-[100px] pointer-events-none"></div>

          {/* 3D Floating Mini Tooth Badge with soft parallax */}
          <div className="absolute -top-6 -right-4 z-30 rounded-2xl glass p-3 border border-orange-400/40 shadow-[0_20px_40px_rgba(255,138,61,0.35)] flex items-center gap-3 pointer-events-none hidden sm:flex backdrop-blur-xl">
            <Glossy3DTooth size="xs" showShadow={false} />
            <div>
              <div className="text-[10px] font-extrabold uppercase text-orange-300 tracking-wider">3D PRECISION</div>
              <div className="text-xs font-black text-white">Digital Smile Preview</div>
            </div>
          </div>

          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 ? 'all 0.5s ease-out' : 'transform 0.1s ease-out'
            }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/25 bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-black/50 p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-2xl"
          >
            {/* Top specular reflection line */}
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

            <div className="relative flex min-h-[510px] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2E1D36] via-[#1E1228] to-[#100918] p-6 sm:p-7 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              
              {/* Background ambient light inside card */}
              <div className="absolute right-[-15%] top-[-15%] h-80 w-80 rounded-full bg-orange-500/30 blur-3xl pointer-events-none"></div>

              {/* Floating Top Chips: Painless & Ratings with equal size */}
              <div className="relative z-10 grid grid-cols-2 gap-3 items-stretch">
                <div className="rounded-2xl glass px-3.5 py-2.5 border border-white/15 shadow-lg flex flex-col justify-center min-w-0">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-orange-300 truncate">PATIENT COMFORT</div>
                  <div className="mt-0.5 text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 truncate">
                    <HeartPulse className="w-4 h-4 text-orange-400 shrink-0" /> 100% Painless
                  </div>
                </div>

                <div className="rounded-2xl glass px-3.5 py-2.5 border border-white/15 shadow-lg flex items-center gap-2.5 min-w-0">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full orange-gradient text-[#1B0D05] shadow shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-white/50 truncate">RATINGS</div>
                    <div className="text-xs sm:text-sm font-black text-white truncate">4.9 ★ Delhi</div>
                  </div>
                </div>
              </div>

              {/* Center Interactive 3D Smile Preview Container */}
              <div className="relative z-10 my-4">
                <div className="rounded-[2rem] border border-white/20 bg-black/50 p-5 backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
                  
                  {/* Mode Selector Tabs with 3D Pressed Effect */}
                  <div className="flex rounded-xl bg-black/40 p-1 mb-4 border border-white/10 shadow-inner">
                    <button
                      id="hero-tab-whitening"
                      onClick={() => setActiveSmileMode('whitening')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                        activeSmileMode === 'whitening' ? 'tab-3d-active' : 'tab-3d-inactive'
                      }`}
                    >
                      Whitening
                    </button>
                    <button
                      id="hero-tab-aligner"
                      onClick={() => setActiveSmileMode('aligner')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                        activeSmileMode === 'aligner' ? 'tab-3d-active' : 'tab-3d-inactive'
                      }`}
                    >
                      Aligners
                    </button>
                    <button
                      id="hero-tab-implants"
                      onClick={() => setActiveSmileMode('implants')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                        activeSmileMode === 'implants' ? 'tab-3d-active' : 'tab-3d-inactive'
                      }`}
                    >
                      Implants
                    </button>
                  </div>

                  {/* 3D Glossy Floating Tooth Centerpiece */}
                  <div className="relative flex flex-col items-center justify-center py-2">
                    <div className="relative group cursor-pointer">
                      
                      {/* Glossy 3D Vector Tooth */}
                      <Glossy3DTooth size="lg" animated={true} withSparkles={true} />

                      <div className="absolute -top-2 -right-3 bg-emerald-400 text-[#1B0D05] font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.6)] border border-white/40 animate-pulse">
                        3D SCAN ACTIVE
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <div className="text-lg font-black text-white">
                        {activeSmileMode === 'whitening' && '1-Hour Laser Whitening'}
                        {activeSmileMode === 'aligner' && 'Custom Clear Aligners'}
                        {activeSmileMode === 'implants' && '3D Guided Dental Implants'}
                      </div>
                      <p className="mt-1 text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
                        {activeSmileMode === 'whitening' && 'Up to 8 shades brighter safely in a single comfortable 60-minute visit in Delhi.'}
                        {activeSmileMode === 'aligner' && 'Digitally planned tooth alignment with 3D intraoral scans and zero metal wires.'}
                        {activeSmileMode === 'implants' && 'Computer-guided permanent titanium roots placed with microscopic surgical accuracy.'}
                      </p>
                    </div>

                    {/* Interactive 3D simulation slider */}
                    <div className="w-full mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-[11px] text-white/70 mb-1.5">
                        <span>Before</span>
                        <span className="text-orange-300 font-bold">Preview: {sliderPosition}%</span>
                        <span>After Result</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="w-full accent-orange-400 cursor-pointer h-2 bg-white/15 rounded-lg"
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
                  className="flex-1 py-2.5 rounded-xl glass border border-orange-400/35 hover:border-orange-400/70 text-xs font-bold text-orange-200 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                  Ask AI About {activeSmileMode === 'whitening' ? 'Whitening' : activeSmileMode === 'aligner' ? 'Aligners' : 'Implants'}
                </button>
                <button
                  id="hero-card-quickbook-btn"
                  onClick={onBookClick}
                  className="py-2.5 px-4 rounded-xl orange-gradient text-[#1B0D05] font-black text-xs shadow-[0_0_20px_rgba(255,138,61,0.4),inset_0_1px_0_rgba(255,255,255,0.5)] hover:opacity-95 transition cursor-pointer border border-white/20"
                >
                  Book Slot
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

