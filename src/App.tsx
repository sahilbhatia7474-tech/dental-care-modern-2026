/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { ServicesSection } from './components/ServicesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { PatientTools } from './components/PatientTools';
import { ReviewsSection } from './components/ReviewsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactFooter } from './components/ContactFooter';
import { AiAssistantModal } from './components/AiAssistantModal';
import { VoiceAiModal } from './components/VoiceAiModal';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomBar } from './components/MobileBottomBar';
import { MessageCircle, MessageSquare } from 'lucide-react';

export default function App() {
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isVoiceAiOpen, setIsVoiceAiOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [aiInitialTopic, setAiInitialTopic] = useState<string>('');
  const [selectedBookingService, setSelectedBookingService] = useState<string>('General checkup');
  const [bookingNotes, setBookingNotes] = useState<string>('');

  const handleOpenAiAssistant = (topic?: string) => {
    if (topic) {
      setAiInitialTopic(topic);
    } else {
      setAiInitialTopic('');
    }
    setIsAiModalOpen(true);
  };

  const handleOpenVoiceAi = () => {
    setIsVoiceAiOpen(true);
  };

  const handleBookWithService = (serviceName: string, notes?: string) => {
    setSelectedBookingService(serviceName);
    if (notes) {
      setBookingNotes(notes);
    }
    setIsBookingModalOpen(true);
  };

  const handleBookClick = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0E0A14] text-white selection:bg-orange-400/30 pb-20 md:pb-0 w-full max-w-[100vw] overflow-x-hidden">
      {/* Header Navigation */}
      <Header
        onOpenAiAssistant={() => handleOpenAiAssistant()}
        onBookClick={handleBookClick}
        onOpenVoiceAi={handleOpenVoiceAi}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onBookClick={handleBookClick}
          onOpenAiAssistant={() => handleOpenAiAssistant()}
        />

        {/* Key Trust Stats Bar */}
        <TrustStats />

        {/* Services & Treatment Offerings */}
        <ServicesSection
          onSelectServiceForBooking={handleBookWithService}
          onOpenAiAssistantWithTopic={handleOpenAiAssistant}
        />

        {/* Why Choose Us & Patient Journey */}
        <WhyUsSection onBookClick={handleBookClick} />

        {/* Interactive Patient Tools (Symptom Triage, Cost Estimator, First-Aid) */}
        <PatientTools
          onBookWithService={handleBookWithService}
          onOpenAiAssistant={() => handleOpenAiAssistant()}
        />

        {/* Patient Reviews & Stories */}
        <ReviewsSection />

        {/* Appointment Booking & Lookup Section */}
        <AppointmentSection
          prefilledService={selectedBookingService}
          prefilledNotes={bookingNotes}
          onOpenVoiceAi={handleOpenVoiceAi}
        />

        {/* Clinic Info, Hours, Location & Google Maps */}
        <ContactFooter onOpenVoiceAi={handleOpenVoiceAi} onBookClick={handleBookClick} />
      </main>

      {/* 3D Popping Floating WhatsApp Button (Bottom Left) */}
      <FloatingWhatsApp />

      {/* Floating AI Assistant Trigger Button (Desktop & Tablet - Bottom Right) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2">
        {/* Subtle tooltip chip */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-orange-400/30 text-[11px] font-semibold text-orange-200 shadow-glow-sm animate-bounce">
          <MessageSquare className="w-3 h-3 text-orange-400" />
          <span>Ask Dr. Pearl (AI)</span>
        </div>

        <button
          id="floating-ai-assistant-btn"
          aria-label="Open dental assistant"
          onClick={() => handleOpenAiAssistant()}
          className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full orange-gradient text-xl sm:text-2xl text-[#1B0D05] shadow-[0_10px_40px_rgba(255,138,61,.35)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-7 h-7 text-[#1B0D05] fill-[#1B0D05] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-[#0E0A14]"></span>
          </span>
        </button>
      </div>

      {/* Sticky Bottom Bar on Mobile: [AI Chat] [Call Now] [Book Visit] */}
      <MobileBottomBar
        onOpenAiChat={() => handleOpenAiAssistant()}
        onOpenVoiceAi={handleOpenVoiceAi}
        onBookVisit={handleBookClick}
      />

      {/* Interactive Booking Modal (Name / Phone / Date / Time / Doctor) */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={selectedBookingService}
      />

      {/* AI Assistant Chat Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onBookAppointmentWithService={handleBookWithService}
        onOpenVoiceAi={handleOpenVoiceAi}
        initialTopic={aiInitialTopic}
      />

      {/* Voice AI Receptionist Modal */}
      <VoiceAiModal
        isOpen={isVoiceAiOpen}
        onClose={() => setIsVoiceAiOpen(false)}
        onBookAppointmentWithService={handleBookWithService}
      />
    </div>
  );
}
