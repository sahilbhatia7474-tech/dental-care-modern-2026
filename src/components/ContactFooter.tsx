import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ArrowUp, Navigation, ExternalLink } from 'lucide-react';
import { Glossy3DTooth } from './Glossy3DTooth';

interface ContactFooterProps {
  onOpenVoiceAi?: () => void;
  onBookClick?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenVoiceAi, onBookClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="border-t border-white/10 bg-white/[0.02] relative w-full max-w-[100vw] overflow-hidden py-16 sm:py-20">
        
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          
          {/* Main 4-Column Grid (Brand, Contact, Hours, Map) */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Column 1: Brand (4 cols) */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5">
                <Glossy3DTooth size="xs" showShadow={false} />
                <span className="text-2xl font-black tracking-wide text-white">DENTAL</span>
                <span className="text-orange-400 font-black text-3xl">+</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Modern dental care in Delhi with a patient-first approach. Combining 3D digital scans, 
                gentle painless techniques, single-sitting root canals, and computer-guided implants by <strong className="text-white">Dr. Sahil Bhatia</strong>.
              </p>
              
              <div className="mt-6 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-xs text-orange-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Accredited Indian Dental Association (IDA) Member</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span>Same-Day Emergency Dental Triage Active in Delhi NCR</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="tel:+919953239674"
                  className="rounded-xl orange-gradient px-4 py-2.5 text-xs font-bold text-[#1B0D05] shadow-[0_0_15px_rgba(255,138,61,0.3)] hover:opacity-95 transition flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +91 9953239674</span>
                </a>
                <a
                  href="https://wa.me/919953239674?text=Hi%20Dr.%20Sahil%2C%20I%20would%20like%20to%20book%20a%20dental%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 px-4 py-2.5 text-xs font-bold text-[#25D366] hover:bg-[#25D366]/30 transition flex items-center gap-1.5"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Column 2: Direct Contact & Hours (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Clinic Info & Delhi Location
                </div>
                
                <div className="mt-4 space-y-3 text-sm text-white/70">
                  <div className="flex items-center gap-2.5 text-white">
                    <span className="w-5 h-5 rounded-full bg-orange-400/20 text-orange-400 font-bold text-xs flex items-center justify-center">👤</span>
                    <span className="font-bold text-white">Dr. Sahil Bhatia (Chief Dental Surgeon)</span>
                  </div>

                  <a href="tel:+919953239674" className="flex items-center gap-2.5 text-white hover:text-orange-400 transition group font-semibold">
                    <Phone className="w-4 h-4 text-orange-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>+91 9953239674</span>
                  </a>

                  <a href="mailto:sahilbhatia7474@gmail.com" className="flex items-center gap-2.5 hover:text-white transition">
                    <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>sahilbhatia7474@gmail.com</span>
                  </a>

                  <a
                    href="https://wa.me/919953239674?text=Hi%20Dr.%20Sahil%2C%20I%20would%20like%20to%20book%20a%20dental%20appointment"
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
                    <span>123 Wellness Avenue, South Extension<br />Metro Health District, New Delhi 110049</span>
                  </div>
                </div>
              </div>

              {/* Clinic Timings */}
              <div className="rounded-2xl glass p-4 border border-white/10 text-xs">
                <div className="font-bold text-orange-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Working Hours
                </div>
                <div className="space-y-1.5 text-white/70">
                  <div className="flex justify-between">
                    <span>Mon — Sat:</span>
                    <span className="text-white font-semibold">9:00 AM — 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-orange-300 font-semibold">10:00 AM — 2:00 PM (Emergency)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Interactive Google Maps Embed (4 cols) */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent p-4 shadow-2xl backdrop-blur-xl group hover:border-orange-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-bold text-white">Find Us on Google Maps</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Delhi,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Google Map Iframe Container */}
                <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-inner">
                  <iframe
                    title="DENTAL+ Clinic Delhi Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192867!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0 filter invert-[0.88] hue-rotate-[180deg] contrast-[1.1] opacity-90 hover:opacity-100 transition-opacity"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  
                  {/* Overlay Clinic Pin Badge */}
                  <div className="absolute top-2 left-2 pointer-events-none rounded-xl glass px-3 py-1.5 border border-white/20 shadow-lg flex items-center gap-2 backdrop-blur-md">
                    <Glossy3DTooth size="xs" showShadow={false} />
                    <div>
                      <div className="text-[10px] font-bold text-white">Dr. Sahil Dental Clinic</div>
                      <div className="text-[9px] text-orange-300 font-semibold">123 Wellness Ave, Delhi</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-white/50 px-1">
                  <span>🚗 Free dedicated patient valet parking</span>
                  <span className="text-emerald-400 font-semibold">● Metro Connected</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer bottom bar */}
      <footer className="border-t border-white/10 bg-[#0E0A14] py-8 w-full max-w-[100vw] overflow-hidden">
        <div className="mx-auto flex max-w-7xl w-full flex-col gap-4 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between text-xs text-white/50">
          <div className="flex items-center gap-3">
            {/* SB Signature Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 border border-orange-400/35 shadow-[0_0_15px_rgba(255,138,61,0.2)]">
              <div className="h-5 w-5 rounded-full orange-gradient flex items-center justify-center text-[10px] font-black text-[#1B0D05] shadow">
                SB
              </div>
              <span className="text-[11px] font-bold text-orange-300">Crafted by SB</span>
            </div>
            <span className="text-white/30 hidden sm:inline">•</span>
            <p>© 2026 DENTAL+ Modern Care Clinic • Dr. Sahil Bhatia. All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#why-us" className="hover:text-white transition">Why Us</a>
            <a href="#patient-tools" className="hover:text-white transition">AI Symptom Tools</a>
            <a href="#reviews" className="hover:text-white transition">Patient Reviews</a>
            <a href="#appointment" className="hover:text-white transition">Book Visit</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full glass border border-white/10 text-white/60 hover:text-white hover:border-orange-400/40 transition flex items-center gap-1 cursor-pointer"
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
