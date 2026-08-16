import React, { useState } from 'react';
import { Activity, DollarSign, AlertTriangle, ShieldCheck, Check, ArrowRight, Phone, RefreshCw, Info, CheckCircle2, MessageSquare } from 'lucide-react';
import { EMERGENCY_FIRST_AID_GUIDES } from '../data/mockData';
import { SymptomResult } from '../types';

interface PatientToolsProps {
  onBookWithService: (serviceName: string, notes?: string) => void;
  onOpenAiAssistant: () => void;
}

export const PatientTools: React.FC<PatientToolsProps> = ({
  onBookWithService,
  onOpenAiAssistant
}) => {
  const [activeTool, setActiveTool] = useState<'symptom' | 'pricing' | 'firstaid'>('symptom');

  // Symptom Triage Quiz State
  const [primaryConcern, setPrimaryConcern] = useState<string>('Severe or dull toothache');
  const [painLevel, setPainLevel] = useState<number>(5);
  const [duration, setDuration] = useState<string>('1-3 days');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Pain when biting']);
  const [triageLoading, setTriageLoading] = useState<boolean>(false);
  const [triageResult, setTriageResult] = useState<SymptomResult | null>(null);

  // Pricing Estimator & EMI Calculator State
  const [selectedTreatment, setSelectedTreatment] = useState<'cleaning' | 'whitening' | 'implant' | 'aligner' | 'filling'>('implant');
  const [insurancePlan, setInsurancePlan] = useState<'ppo' | 'membership' | 'self_pay'>('ppo');
  const [emiTenure, setEmiTenure] = useState<number>(24); // 6, 12, 24, 36 months

  const treatmentsData: Record<
    'cleaning' | 'whitening' | 'implant' | 'aligner' | 'filling',
    {
      name: string;
      icon: string;
      tag: string;
      priceRange: string;
      basePriceMin: number;
      basePriceMax: number;
      avgPrice: number;
      ppoCovered: number;
      memberDiscount: number;
      description: string;
      includes: string[];
    }
  > = {
    cleaning: {
      name: 'Painless Deep Cleaning & 3D Exam',
      icon: '🦷',
      tag: '100% PPO Covered',
      priceRange: '$150 – $220',
      basePriceMin: 150,
      basePriceMax: 220,
      avgPrice: 195,
      ppoCovered: 195, // typically 100% preventive
      memberDiscount: 195,
      description: 'Ultrasonic gentle plaque removal, diamond polish, full digital X-rays, and periodontal health charting.',
      includes: ['High-precision 3D scan', 'Gentle ultrasonic scaling', 'Fluoride enamel seal', 'Cancer screening']
    },
    whitening: {
      name: '1-Hour In-Office Power Laser Whitening',
      icon: '💎',
      tag: 'Up to 8 Shades Lighter',
      priceRange: '$350 – $480',
      basePriceMin: 350,
      basePriceMax: 480,
      avgPrice: 380,
      ppoCovered: 0, // Cosmetic
      memberDiscount: 95, // 25% off for members
      description: 'Advanced cold-light laser activation lifting years of coffee, tea, and age stains in a comfortable 60-minute visit.',
      includes: ['Pre-treatment shade match', 'Enamel desensitizer', 'Full laser cycle', 'Take-home booster gel']
    },
    implant: {
      name: '3D Computer-Guided Dental Implant',
      icon: '🦷',
      tag: 'Permanent Lifetime Solution',
      priceRange: '$2,400 – $3,500',
      basePriceMin: 2400,
      basePriceMax: 3500,
      avgPrice: 2850,
      ppoCovered: 1400,
      memberDiscount: 600,
      description: 'Medical-grade titanium root fixture with custom titanium abutment and hand-crafted monolithic zirconia crown.',
      includes: ['3D CBCT digital scan', 'Surgical template guide', 'Titanium fixture placement', 'Zirconia crown restoration']
    },
    aligner: {
      name: 'Custom Clear Invisible Aligners',
      icon: '🦷',
      tag: 'No Metal Brackets',
      priceRange: '$2,800 – $4,200',
      basePriceMin: 2800,
      basePriceMax: 4200,
      avgPrice: 3600,
      ppoCovered: 1500,
      memberDiscount: 800,
      description: 'Discreet, removable clear aligner series engineered via AI smile simulation to straighten teeth in 6-12 months.',
      includes: ['3D virtual smile preview', 'All alignment aligner trays', 'Virtual progress checks', 'Post-treatment retainers']
    },
    filling: {
      name: 'Tooth-Colored Composite Resin Filling',
      icon: '🛡️',
      tag: 'Natural Shade Matched',
      priceRange: '$180 – $280',
      basePriceMin: 180,
      basePriceMax: 280,
      avgPrice: 220,
      ppoCovered: 160,
      memberDiscount: 60,
      description: '100% mercury-free aesthetic composite resin bonding matched seamlessly to your natural tooth shade.',
      includes: ['Decay removal & prep', 'Biocompatible bonding', 'UV-light curing', 'Micro-bite calibration']
    }
  };

  const currentTreatment = treatmentsData[selectedTreatment];

  // Calculate Out of pocket based on insurance
  const estimatedCoverage =
    insurancePlan === 'ppo'
      ? currentTreatment.ppoCovered
      : insurancePlan === 'membership'
      ? currentTreatment.memberDiscount
      : 0;

  const outOfPocketMin = Math.max(0, currentTreatment.basePriceMin - estimatedCoverage);
  const outOfPocketMax = Math.max(0, currentTreatment.basePriceMax - estimatedCoverage);
  const avgOutOfPocket = Math.max(0, currentTreatment.avgPrice - estimatedCoverage);

  // Calculate EMI
  const monthlyEmi = Math.round(avgOutOfPocket / emiTenure);

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleRunTriage = async () => {
    setTriageLoading(true);
    try {
      const res = await fetch('/api/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryConcern,
          painScale: painLevel,
          duration,
          symptoms: selectedSymptoms
        })
      });
      const data = await res.json();
      setTriageResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setTriageResult({
        triageLevel: painLevel >= 7 ? 'Dental Emergency' : 'Moderate Attention',
        summary: `Assessment for ${primaryConcern}. Reported pain intensity is ${painLevel}/10 for ${duration}.`,
        recommendedService: painLevel >= 7 ? 'Emergency Care' : 'General Dentistry',
        homeCareTips: [
          'Rinse with warm salt water every 3-4 hours.',
          'Avoid very hot, cold, or hard foods on that tooth.',
          'Use cold compresses on the exterior cheek for 15 minutes to reduce discomfort.'
        ],
        whenToSeekImmediateCare: 'Seek immediate care if facial swelling, fever, or difficulty swallowing develops.'
      });
    } finally {
      setTriageLoading(false);
    }
  };

  return (
    <section id="patient-tools" className="w-full max-w-[100vw] overflow-x-hidden py-24 relative">
      
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-orange-400 border border-orange-400/20 mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>Interactive Patient Portal Tools</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white break-words">
          Smart tools to empower your smile.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/60">
          Check your symptoms with our AI triage assistant, calculate out-of-pocket costs with transparent pricing, or access immediate dental first-aid guides.
        </p>

        {/* Tab Navigator */}
        <div className="mt-8 flex flex-wrap sm:inline-flex justify-center gap-1.5 p-1.5 rounded-2xl glass border border-white/15 shadow-xl max-w-full backdrop-blur-xl">
          <button
            onClick={() => setActiveTool('symptom')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTool === 'symptom'
                ? 'tab-3d-active'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>AI Symptom Triage</span>
          </button>

          <button
            onClick={() => setActiveTool('pricing')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTool === 'pricing'
                ? 'tab-3d-active'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Cost & Insurance Estimator</span>
          </button>

          <button
            onClick={() => setActiveTool('firstaid')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTool === 'firstaid'
                ? 'tab-3d-active'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency First-Aid</span>
          </button>
        </div>
      </div>

      {/* TOOL 1: AI SYMPTOM TRIAGE */}
      {activeTool === 'symptom' && (
        <div className="mt-12 max-w-4xl mx-auto gloss-card-3d rounded-[2rem] p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          {/* Specular Highlight Strip */}
          <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Quiz inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6 min-w-0">
              <div className="min-w-0 w-full">
                <label className="text-xs uppercase font-bold text-white/50 tracking-wider block mb-2 truncate">
                  1. What is your primary dental concern?
                </label>
                <div className="relative min-w-0 w-full">
                  <select
                    value={primaryConcern}
                    onChange={(e) => setPrimaryConcern(e.target.value)}
                    className="w-full truncate rounded-2xl border border-white/15 bg-[#170E1E] px-4 py-3.5 pr-9 text-xs sm:text-sm text-white outline-none focus:border-orange-400 appearance-none cursor-pointer"
                  >
                    <option value="Severe or dull toothache" className="bg-[#170E1E] text-white">Toothache / Pain in tooth or jaw</option>
                    <option value="Hot/Cold/Sweet sensitivity" className="bg-[#170E1E] text-white">Sharp sensitivity to cold, hot, or sweet</option>
                    <option value="Chipped, cracked, or broken tooth" className="bg-[#170E1E] text-white">Chipped or cracked tooth fragment</option>
                    <option value="Bleeding or swollen gums" className="bg-[#170E1E] text-white">Bleeding, swollen, or tender gums</option>
                    <option value="Lost filling or crown" className="bg-[#170E1E] text-white">Lost filling, crown, or loose bridge</option>
                    <option value="Wisdom tooth pressure" className="bg-[#170E1E] text-white">Wisdom tooth ache / back jaw pressure</option>
                    <option value="Cosmetic smile upgrade" className="bg-[#170E1E] text-white">Cosmetic inquiry (whitening, veneers, gaps)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/50">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pain Scale */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase font-bold text-white/50 tracking-wider">
                    2. Discomfort / Pain Level:
                  </label>
                  <span className={`text-sm font-bold px-3 py-0.5 rounded-full ${
                    painLevel >= 7 ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                    painLevel >= 4 ? 'bg-orange-400/20 text-orange-300 border border-orange-400/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {painLevel}/10 {painLevel >= 8 ? '(Severe)' : painLevel >= 5 ? '(Moderate)' : '(Mild)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full accent-orange-400 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-white/40 mt-1">
                  <span>0 - No pain</span>
                  <span>5 - Noticeable ache</span>
                  <span>10 - Unbearable</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-xs uppercase font-bold text-white/50 tracking-wider block mb-2">
                  3. How long have you noticed this?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Just today', '1-3 days', '1-2 weeks', '1+ month'].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDuration(dur)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                        duration === dur
                          ? 'bg-orange-400/20 text-orange-300 border-orange-400/50'
                          : 'bg-white/5 text-white/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              {/* Associated Symptoms Tags */}
              <div>
                <label className="text-xs uppercase font-bold text-white/50 tracking-wider block mb-2">
                  4. Select all that apply:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Pain when biting',
                    'Visible facial/gum swelling',
                    'Bleeding gums',
                    'Fever or chills',
                    'Keeps me awake at night',
                    'Foul taste or odor',
                    'Loose tooth',
                    'Headache / earache'
                  ].map((sym) => {
                    const active = selectedSymptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition ${
                          active
                            ? 'bg-orange-400 text-[#1B0D05] font-bold border-orange-400'
                            : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {active ? '✓ ' : '+ '} {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleRunTriage}
                disabled={triageLoading}
                className="w-full orange-gradient py-4 rounded-2xl font-bold text-[#1B0D05] shadow-lg transition hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {triageLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Clinical Indicators...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    <span>Generate AI Triage Assessment</span>
                  </>
                )}
              </button>
            </div>

            {/* Assessment Result Panel (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-black/35 p-6 border border-white/10">
              {triageResult ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/40">AI TRIAGE RESULT</span>
                    <span
                      className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                        triageResult.triageLevel.includes('Emergency')
                          ? 'bg-red-500/30 text-red-300 border border-red-500/40 animate-pulse'
                          : triageResult.triageLevel.includes('Urgent')
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                          : 'bg-orange-400/20 text-orange-300 border border-orange-400/30'
                      }`}
                    >
                      {triageResult.triageLevel}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white">Recommended Specialty:</h4>
                    <div className="text-sm font-semibold text-orange-400 mt-0.5">
                      {triageResult.recommendedService}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                    {triageResult.summary}
                  </p>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-1.5">
                      Immediate Home Comfort Tips:
                    </span>
                    <ul className="space-y-1.5 text-xs text-white/75">
                      {triageResult.homeCareTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {triageResult.whenToSeekImmediateCare && (
                    <div className="rounded-xl bg-red-500/10 p-3 border border-red-500/20 text-[11px] text-red-200">
                      <span className="font-bold">⚠️ Warning: </span>
                      {triageResult.whenToSeekImmediateCare}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      onBookWithService(
                        triageResult.recommendedService,
                        `AI Triage Summary: ${primaryConcern} (${painLevel}/10 pain, ${duration}). Symptoms: ${selectedSymptoms.join(', ')}`
                      );
                      const el = document.getElementById('appointment');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full orange-gradient py-3 rounded-xl font-bold text-[#1B0D05] text-xs shadow hover:opacity-95 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Schedule Appointment For This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/40">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-2xl text-orange-400 mb-3 border border-white/5">
                    ✦
                  </div>
                  <h4 className="text-base font-bold text-white/70">Ready to Analyze</h4>
                  <p className="text-xs mt-1.5 leading-relaxed">
                    Select your symptoms on the left and click "Generate AI Triage Assessment" to receive immediate guidance and recommended clinical steps.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TOOL 2: PRICING & EMI COST CALCULATOR */}
      {activeTool === 'pricing' && (
        <div className="mt-12 max-w-5xl mx-auto gloss-card-3d rounded-[2rem] p-6 sm:p-10 border border-white/15 shadow-2xl animate-fade-in relative overflow-hidden">
          {/* Top specular highlight */}
          <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          
          {/* Section Subtitle */}
          <div className="mb-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">100% Upfront Transparency</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">Treatment Cost & EMI Calculator</h3>
            </div>
            <span className="text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 w-fit">
              No hidden fees • 0% APR financing options
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Left: Treatment Selection & Insurance */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="text-xs uppercase font-bold text-white/60 tracking-wider block mb-2.5">
                  1. Select Treatment (Cleaning, Whitening, Implant & more)
                </label>
                <div className="grid gap-2.5">
                  {(Object.keys(treatmentsData) as Array<keyof typeof treatmentsData>).map((key) => {
                    const item = treatmentsData[key];
                    const isSelected = selectedTreatment === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedTreatment(key)}
                        className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-black/60 border-orange-400 text-white shadow-glow-sm ring-1 ring-orange-400/40'
                            : 'bg-white/5 border-white/5 text-white/70 hover:border-white/20 hover:bg-white/[0.08]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl p-2 rounded-xl bg-white/5">{item.icon}</span>
                          <div>
                            <div className="text-sm font-bold flex items-center gap-2">
                              <span>{item.name}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-400/20 text-orange-300 border border-orange-400/30">
                                {item.tag}
                              </span>
                            </div>
                            <div className="text-xs text-white/40 mt-0.5">{item.description}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <div className="text-sm font-extrabold text-orange-400">{item.priceRange}</div>
                          <div className="text-[10px] text-white/40">price range</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Insurance / Payment Plan Selector */}
              <div>
                <label className="text-xs uppercase font-bold text-white/60 tracking-wider block mb-2">
                  2. Select Coverage / Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setInsurancePlan('ppo')}
                    className={`py-3 px-2.5 text-xs font-bold rounded-xl border transition text-center ${
                      insurancePlan === 'ppo'
                        ? 'orange-gradient text-[#1B0D05] shadow'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                    }`}
                  >
                    Dental PPO Insurance
                  </button>

                  <button
                    onClick={() => setInsurancePlan('membership')}
                    className={`py-3 px-2.5 text-xs font-bold rounded-xl border transition text-center ${
                      insurancePlan === 'membership'
                        ? 'orange-gradient text-[#1B0D05] shadow'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                    }`}
                  >
                    DENTAL+ Member Plan
                  </button>

                  <button
                    onClick={() => setInsurancePlan('self_pay')}
                    className={`py-3 px-2.5 text-xs font-bold rounded-xl border transition text-center ${
                      insurancePlan === 'self_pay'
                        ? 'orange-gradient text-[#1B0D05] shadow'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                    }`}
                  >
                    Self-Pay / Cash
                  </button>
                </div>
              </div>

              {/* What's Included Pills */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-2">
                  Included in this procedure:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentTreatment.includes.map((inc, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-black/40 text-orange-200 border border-white/5 flex items-center gap-1">
                      <Check className="w-3 h-3 text-orange-400" />
                      {inc}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Cost Range & EMI Calculator Card */}
            <div className="lg:col-span-5 rounded-3xl bg-black/50 p-6 sm:p-7 border border-orange-400/30 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1 flex items-center justify-between">
                  <span>Transparent Price Range</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Verified Estimate
                  </span>
                </div>
                
                <h4 className="text-xl font-extrabold text-white">{currentTreatment.name}</h4>

                {/* Price Range Display */}
                <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-white/50">Total Clinic Price Range:</div>
                  <div className="text-2xl font-black text-white mt-0.5">{currentTreatment.priceRange}</div>
                  
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between text-white/60">
                      <span>Standard Average:</span>
                      <span className="text-white font-semibold">${currentTreatment.avgPrice}</span>
                    </div>

                    <div className="flex justify-between text-emerald-400">
                      <span>Estimated Plan Savings:</span>
                      <span className="font-bold">
                        - ${estimatedCoverage}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                      <span className="font-bold text-white text-sm">Your Out-Of-Pocket:</span>
                      <span className="text-xl font-black text-orange-400">
                        {outOfPocketMin === outOfPocketMax ? `$${outOfPocketMin}` : `$${outOfPocketMin} – $${outOfPocketMax}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive EMI Options */}
                <div className="mt-5 p-4 rounded-2xl glass border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                      💳 Monthly EMI Option (0% APR)
                    </span>
                    <span className="text-xs font-black text-white bg-orange-500/20 px-2 py-0.5 rounded-md border border-orange-400/30">
                      ${monthlyEmi}/mo
                    </span>
                  </div>

                  <p className="text-[11px] text-white/50 leading-relaxed mb-3">
                    Split your payments with zero penalty or interest via CareCredit & Sunbit.
                  </p>

                  {/* Tenure selector */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {[6, 12, 24, 36].map((months) => (
                      <button
                        key={months}
                        onClick={() => setEmiTenure(months)}
                        className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                          emiTenure === months
                            ? 'bg-orange-400 text-[#1B0D05] border-orange-400 shadow'
                            : 'bg-white/5 text-white/60 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {months} mo
                      </button>
                    ))}
                  </div>

                  <div className="mt-2.5 text-[11px] text-center text-orange-300/80 font-medium">
                    {emiTenure} monthly installments of <span className="font-bold text-white">${monthlyEmi}</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    onBookWithService(
                      currentTreatment.name,
                      `Cost Calculation: ${currentTreatment.name} (${currentTreatment.priceRange}). Estimated Out-of-Pocket: $${outOfPocketMin}-$${outOfPocketMax} on ${insurancePlan.toUpperCase()} with ${emiTenure}-mo EMI ($${monthlyEmi}/mo).`
                    );
                    const el = document.getElementById('appointment');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full orange-gradient py-3.5 rounded-xl font-bold text-[#1B0D05] text-xs sm:text-sm shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  <span>Book Visit With This Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TOOL 3: EMERGENCY FIRST-AID GUIDES */}
      {activeTool === 'firstaid' && (
        <div className="mt-12 max-w-5xl mx-auto space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {EMERGENCY_FIRST_AID_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="gloss-card-3d rounded-3xl p-6 border border-white/15 flex flex-col justify-between hover:border-orange-400/50 transition-all duration-300 relative overflow-hidden shadow-xl"
              >
                {/* Specular line */}
                <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"></div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                      {guide.urgency}
                    </span>
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4">{guide.title}</h3>

                  <ol className="space-y-2.5 text-xs text-white/70 list-decimal pl-4 leading-relaxed">
                    {guide.steps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <a
                    href="tel:+919953239674"
                    className="w-full orange-gradient py-2.5 rounded-xl font-bold text-[#1B0D05] text-xs shadow flex items-center justify-center gap-2 hover:opacity-95 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Emergency Line Now (+91 9953239674)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl glass p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center font-bold">
                ⚠️
              </div>
              <div className="text-xs sm:text-sm text-white/70">
                <span className="text-white font-bold">Experiencing severe facial swelling or trauma? </span>
                Do not wait. We hold dedicated same-day emergency slots every morning and afternoon.
              </div>
            </div>
            <button
              onClick={() => {
                onBookWithService('Emergency Care', 'Emergency: Need same-day relief evaluation.');
                const el = document.getElementById('appointment');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="whitespace-nowrap px-5 py-2.5 rounded-xl orange-gradient text-[#1B0D05] font-bold text-xs shadow"
            >
              Request Same-Day Emergency Slot
            </button>
          </div>
        </div>
      )}

      </div>
    </section>
  );
};
