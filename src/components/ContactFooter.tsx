import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface ContactFooterProps {
  onOpenVoiceAi?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenVoiceAi }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="border-t border-white/10 bg-white/[0.02] relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
          
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-orange-400">🦷</span>
              <span className="text-xl font-extrabold tracking-wide text-white">DENTAL</span>
              <span className="text-orange-400 font-black text-2xl">+</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Modern dental care with a patient-first approach. Combining 3D precision imaging, 
              gentle sedation techniques, and compassionate hospitality.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-orange-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Accredited American Dental Association Member</span>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-orange-400">Contact Us</div>
            <div className="mt-4 space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-2.5 text-white">
                <span className="w-4 h-4 text-orange-400 font-bold text-xs flex items-center justify-center">👤</span>
                <span className="font-semibold text-white">Sahil Bhatia</span>
              </div>
              {onOpenVoiceAi ? (
                <button
                  onClick={onOpenVoiceAi}
                  className="flex items-center gap-2.5 hover:text-white text-orange-300 text-left transition cursor-pointer group"
                >
                  <Phone className="w-4 h-4 text-orange-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91 9953239674 <span className="text-xs bg-orange-400/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-400/30 ml-1">Voice AI</span></span>
                </button>
              ) : (
                <a href="tel:+919953239674" className="flex items-center gap-2.5 hover:text-white transition">
                  <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>+91 9953239674</span>
                </a>
              )}
              <a href="mailto:sahilbhatia7474@gmail.com" className="flex items-center gap-2.5 hover:text-white transition">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>sahilbhatia7474@gmail.com</span>
              </a>
              <a
                href="https://wa.me/919953239674?text=Hi%20I%20need%20a%20dental%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#25D366] hover:text-[#25D366]/80 font-medium transition"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp: +91 9953239674</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-1" />
                <span>123 Wellness Avenue, Suite 400<br />Metro Health District</span>
              </div>
            </div>
          </div>

          {/* Column 3: Clinic Hours & Emergency */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-orange-400">Clinic Hours</div>
            <div className="mt-4 space-y-2 text-sm text-white/60">
              <div className="flex justify-between">
                <span>Monday — Friday:</span>
                <span className="text-white font-medium">9:00 AM — 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-medium">9:00 AM — 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white font-medium">By Urgent Appointment</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-orange-400 font-semibold text-xs">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping"></span>
                <span>Same-day emergency response 24/7 on-call</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer bottom bar */}
      <footer className="border-t border-white/10 bg-[#0E0A14] py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:px-8 md:flex-row md:items-center md:justify-between text-xs text-white/40">
          <p>© 2026 DENTAL+ Modern Care Clinic. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#why-us" className="hover:text-white transition">Why Us</a>
            <a href="#patient-tools" className="hover:text-white transition">AI Symptom Tools</a>
            <a href="#appointment" className="hover:text-white transition">Book Visit</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full glass border border-white/10 text-white/60 hover:text-white hover:border-orange-400/40 transition flex items-center gap-1"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
