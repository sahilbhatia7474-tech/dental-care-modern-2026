import React from 'react';
import { X, CheckCircle2, Clock, DollarSign, Activity, Calendar, MessageSquare } from 'lucide-react';
import { DentalService } from '../types';

interface ServiceDetailModalProps {
  service: DentalService | null;
  onClose: () => void;
  onBookService: (service: DentalService) => void;
  onAskAiAboutService: (service: DentalService) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
  onAskAiAboutService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#140E1B] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col custom-scrollbar overflow-y-auto">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-start justify-between relative z-10 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-400 text-2xl border border-orange-400/20">
              {service.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                CLINICAL PROCEDURE
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">{service.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition"
            aria-label="Close procedure modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-6 relative z-10">
          <div>
            <h4 className="text-xs uppercase font-bold text-white/40 tracking-wider mb-2">Overview</h4>
            <p className="text-sm sm:text-base leading-relaxed text-white/75">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl glass p-3.5 border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-orange-400" />
                <span>Estimated Cost</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">{service.estimatedCost}</div>
            </div>

            <div className="rounded-2xl glass p-3.5 border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Duration</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">{service.duration}</div>
            </div>

            <div className="rounded-2xl glass p-3.5 border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recovery</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-emerald-300">{service.recovery}</div>
            </div>
          </div>

          {/* Included Features */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white/40 tracking-wider mb-3">
              What Is Included In Your Visit
            </h4>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] p-3 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white/80">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 relative z-10">
          <button
            onClick={() => onAskAiAboutService(service)}
            className="flex-1 rounded-2xl glass border border-orange-400/30 px-5 py-3.5 text-center text-sm font-semibold text-orange-300 transition hover:bg-orange-400/10 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span>Ask Dr. Pearl (AI) Questions</span>
          </button>

          <button
            onClick={() => onBookService(service)}
            className="flex-1 rounded-2xl orange-gradient px-6 py-3.5 text-center text-sm font-bold text-[#1B0D05] shadow-lg transition hover:-translate-y-0.5 hover:shadow-orange-500/30 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
