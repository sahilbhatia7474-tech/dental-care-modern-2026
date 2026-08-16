import React, { useState } from 'react';
import { ArrowRight, Eye, Calendar, Check } from 'lucide-react';
import { CLINIC_SERVICES } from '../data/mockData';
import { DentalService } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onOpenAiAssistantWithTopic: (topic: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenAiAssistantWithTopic
}) => {
  const [selectedService, setSelectedService] = useState<DentalService | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'general' | 'cosmetic' | 'restorative' | 'emergency'>('all');

  const filteredServices = CLINIC_SERVICES.filter((srv) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'restorative') return srv.category === 'restorative' || srv.category === 'ortho';
    return srv.category === activeFilter;
  });

  const handleBookFromModal = (service: DentalService) => {
    setSelectedService(null);
    onSelectServiceForBooking(service.name);
    const aptEl = document.getElementById('appointment');
    if (aptEl) {
      aptEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAskAiFromModal = (service: DentalService) => {
    setSelectedService(null);
    onOpenAiAssistantWithTopic(`I would like to learn more about the ${service.name} procedure, preparation steps, and what to expect during treatment.`);
  };

  return (
    <section id="services" className="w-full max-w-[100vw] overflow-x-hidden py-24 relative">
      
      {/* Ambient background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl min-w-0">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-orange-400 flex items-center gap-2">
            <span>Our Services</span>
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
            <span className="text-white/50 normal-case font-normal text-xs">Comprehensive Oral Health</span>
          </div>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl text-white break-words">
            Complete care for every smile.
          </h2>
          <p className="mt-5 leading-relaxed text-white/70 text-base sm:text-lg">
            From preventive hygiene to cosmetic smile makeovers and restorative 3D implants, our approach
            focuses on long-term oral wellness, absolute comfort, and radiant aesthetics.
          </p>
        </div>

        {/* Filter Pills with 3D Gloss */}
        <div className="flex flex-wrap gap-2 rounded-2xl glass p-1.5 border border-white/15 shadow-lg w-full sm:w-fit backdrop-blur-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'all'
                ? 'tab-3d-active'
                : 'text-white/60 hover:text-white'
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setActiveFilter('general')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'general'
                ? 'tab-3d-active'
                : 'text-white/60 hover:text-white'
            }`}
          >
            General & Hygiene
          </button>
          <button
            onClick={() => setActiveFilter('cosmetic')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'cosmetic'
                ? 'tab-3d-active'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Cosmetic & Whitening
          </button>
          <button
            onClick={() => setActiveFilter('restorative')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'restorative'
                ? 'tab-3d-active'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Implants & Ortho
          </button>
          <button
            onClick={() => setActiveFilter('emergency')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'emergency'
                ? 'tab-3d-active'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Emergency
          </button>
        </div>
      </div>

      {/* Services Grid with 3D Glossy Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <article
            key={service.id}
            id={`service-card-${service.id}`}
            className="gloss-card-3d group rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/50 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Specular Highlight Strip */}
            <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

            {/* Top Row */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-400 text-2xl border border-orange-400/30 shadow-[0_4px_20px_rgba(255,138,61,0.25)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {service.icon}
                </div>
                <span className="text-[11px] font-semibold text-orange-300 bg-white/[0.08] px-3 py-1 rounded-full border border-white/10 shadow-sm">
                  {service.duration}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {service.shortDesc}
              </p>

              {/* Mini feature points */}
              <div className="mt-4 space-y-1.5">
                {service.features.slice(0, 2).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/75">
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedService(service)}
                className="text-xs font-semibold text-white/70 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-orange-300" /> Details & Pricing
              </button>

              <button
                onClick={() => {
                  onSelectServiceForBooking(service.name);
                  const el = document.getElementById('appointment');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition group-hover:translate-x-1 cursor-pointer"
              >
                <span>Book visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={handleBookFromModal}
        onAskAiAboutService={handleAskAiFromModal}
      />
    </section>
  );
};

