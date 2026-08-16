import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Menu, X, Calendar, Clock, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenAiAssistant: () => void;
  onBookClick: () => void;
  onOpenVoiceAi?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAiAssistant, onBookClick, onOpenVoiceAi }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Top emergency micro-bar */}
      <div className="bg-[#140D1F]/90 border-b border-white/5 py-1.5 px-4 text-xs text-white/60 hidden sm:block backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-orange-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></span>
              Emergency Same-Day Slots Available
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 text-white/50">
              <Clock className="w-3.5 h-3.5" /> Mon-Sat: 9:00 AM – 7:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            {onOpenVoiceAi ? (
              <button
                onClick={onOpenVoiceAi}
                className="flex items-center gap-1.5 text-orange-300 hover:text-orange-400 font-semibold transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span>Voice AI Receptionist: +91 9953239674</span>
              </button>
            ) : (
              <a href="tel:+919953239674" className="flex items-center gap-1.5 text-white/70 hover:text-orange-400 transition">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>Call: +91 9953239674</span>
              </a>
            )}
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 text-white/50">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Painless Tech
            </span>
          </div>
        </div>
      </div>

      <nav
        className={`mx-auto mt-2 sm:mt-3 flex max-w-7xl items-center justify-between px-4 sm:px-8 transition-all duration-300 ${
          isScrolled ? 'py-1' : 'py-2'
        }`}
      >
        {/* Brand Logo */}
        <a
          id="nav-brand-logo"
          href="#"
          className="glass rounded-full px-5 py-2.5 sm:py-3 text-sm font-bold tracking-wider flex items-center gap-1.5 shadow-lg border-white/10 hover:border-orange-400/40 transition group"
        >
          <span className="text-xl text-orange-400 group-hover:rotate-12 transition-transform">🦷</span>
          <span className="text-white font-extrabold tracking-wide">DENTAL</span>
          <span className="text-orange-400 font-black text-base">+</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 rounded-full glass px-7 py-3 shadow-lg border-white/10">
          <a
            id="nav-link-services"
            href="#services"
            className="text-sm font-medium text-white/70 transition hover:text-orange-400"
          >
            Services
          </a>
          <a
            id="nav-link-why-us"
            href="#why-us"
            className="text-sm font-medium text-white/70 transition hover:text-orange-400"
          >
            Why Us
          </a>
          <a
            id="nav-link-tools"
            href="#patient-tools"
            className="text-sm font-medium text-white/70 transition hover:text-orange-400 flex items-center gap-1"
          >
            Patient Tools
            <span className="text-[10px] bg-orange-400/20 text-orange-300 px-1.5 py-0.5 rounded-full font-semibold">AI</span>
          </a>
          <a
            id="nav-link-reviews"
            href="#reviews"
            className="text-sm font-medium text-white/70 transition hover:text-orange-400"
          >
            Reviews
          </a>
          <a
            id="nav-link-contact"
            href="#contact"
            className="text-sm font-medium text-white/70 transition hover:text-orange-400"
          >
            Contact
          </a>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            id="nav-ai-assistant-btn"
            onClick={onOpenAiAssistant}
            className="glass rounded-full px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-orange-300 border-orange-400/30 hover:bg-orange-400/10 transition flex items-center gap-1.5 shadow-glow-sm"
            title="Ask Dr. Pearl (AI Dental Assistant)"
          >
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Ask AI Assistant</span>
            <span className="sm:hidden">AI Chat</span>
          </button>

          <button
            id="nav-book-appointment-btn"
            onClick={onBookClick}
            className="orange-gradient rounded-full px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-[#1B0D05] shadow-lg transition hover:-translate-y-0.5 hover:shadow-orange-500/25 flex items-center gap-1.5 active:translate-y-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Visit</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden glass rounded-full p-2.5 text-white/80 hover:text-white border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-4 mt-2 rounded-3xl glass border border-white/10 p-5 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col gap-4">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-orange-400 rounded-xl hover:bg-white/5 transition"
            >
              Services & Treatments
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-orange-400 rounded-xl hover:bg-white/5 transition"
            >
              Why Choose DENTAL+
            </a>
            <a
              href="#patient-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-orange-400 rounded-xl hover:bg-white/5 transition flex items-center justify-between"
            >
              <span>AI Symptom & Cost Tools</span>
              <span className="text-xs bg-orange-400/20 text-orange-300 px-2 py-0.5 rounded-full">New</span>
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-orange-400 rounded-xl hover:bg-white/5 transition"
            >
              Patient Stories
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-orange-400 rounded-xl hover:bg-white/5 transition"
            >
              Clinic Hours & Location
            </a>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {onOpenVoiceAi && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVoiceAi();
                  }}
                  className="w-full py-3 rounded-2xl glass border border-orange-400/40 text-orange-200 font-bold text-sm flex items-center justify-center gap-2 bg-orange-500/10"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  Voice AI Receptionist (Mock Call)
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="w-full py-3 rounded-2xl glass border border-orange-400/30 text-orange-300 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-orange-400" />
                Chat with Dr. Pearl (AI)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 rounded-2xl orange-gradient text-[#1B0D05] font-bold text-sm shadow-md"
              >
                Book Appointment Online
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
