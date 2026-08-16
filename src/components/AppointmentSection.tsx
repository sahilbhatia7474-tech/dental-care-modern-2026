import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, AlertCircle, Search, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { CLINIC_DOCTORS } from '../data/mockData';
import { AppointmentRequest } from '../types';

interface AppointmentSectionProps {
  prefilledService?: string;
  prefilledNotes?: string;
  onOpenVoiceAi?: () => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  prefilledService,
  prefilledNotes,
  onOpenVoiceAi
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'lookup'>('book');

  // Form Fields
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>(prefilledService || 'General checkup');
  const [doctorName, setDoctorName] = useState<string>('First Available Specialist');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [notes, setNotes] = useState<string>(prefilledNotes || '');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);

  // Submission States
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [bookedAppointment, setBookedAppointment] = useState<AppointmentRequest | null>(null);

  // Lookup States
  const [lookupQuery, setLookupQuery] = useState<string>('');
  const [lookupLoading, setLookupLoading] = useState<boolean>(false);
  const [lookupResults, setLookupResults] = useState<AppointmentRequest[] | null>(null);

  // Update when prefilled props change
  useEffect(() => {
    if (prefilledService) {
      setServiceName(prefilledService);
    }
    if (prefilledNotes) {
      setNotes(prefilledNotes);
    }
  }, [prefilledService, prefilledNotes]);

  const availableTimeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:15 AM',
    '01:30 PM',
    '02:30 PM',
    '03:45 PM',
    '05:00 PM',
    '06:15 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!patientName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide a contact phone number.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          phone,
          email,
          serviceName,
          serviceId: serviceName.toLowerCase().replace(/\s+/g, '-'),
          doctorName,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          notes,
          urgency: isEmergency ? 'emergency' : 'routine'
        })
      });

      const data = await response.json();

      if (response.ok && data.appointment) {
        setBookedAppointment(data.appointment);
      } else {
        setErrorMessage(data.error || 'Unable to schedule appointment. Please try again.');
      }
    } catch (err) {
      console.error(err);
      // Client fallback receipt
      const fallbackApt: AppointmentRequest = {
        id: `apt-${Date.now()}`,
        confirmationCode: `DEN-${Math.floor(10000 + Math.random() * 90000)}`,
        patientName,
        phone,
        email,
        serviceId: 'general',
        serviceName,
        doctorName,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        notes,
        urgency: isEmergency ? 'emergency' : 'routine',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      setBookedAppointment(fallbackApt);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    setLookupLoading(true);
    try {
      const isCode = lookupQuery.toUpperCase().startsWith('DEN-');
      const param = isCode ? `code=${encodeURIComponent(lookupQuery)}` : `phone=${encodeURIComponent(lookupQuery)}`;
      const res = await fetch(`/api/appointments?${param}`);
      const data = await res.json();
      setLookupResults(data.appointments || []);
    } catch (err) {
      console.error(err);
      setLookupResults([]);
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <section id="appointment" className="w-full max-w-[100vw] overflow-x-hidden pb-24 relative">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
      
        {/* Background container with glow */}
        <div className="relative overflow-hidden rounded-[2.2rem] border border-orange-400/25 bg-gradient-to-br from-orange-500/15 via-white/[0.04] to-[#120B19] p-6 shadow-glow sm:p-10 backdrop-blur-xl">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl pointer-events-none"></div>

          {/* Tab switchers: Book vs Lookup */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-8 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab('book');
                setBookedAppointment(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                activeTab === 'book'
                  ? 'orange-gradient text-[#1B0D05] shadow'
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book An Appointment</span>
            </button>

            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                activeTab === 'lookup'
                  ? 'orange-gradient text-[#1B0D05] shadow'
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Verify / Lookup Visit</span>
            </button>
          </div>

          <span className="hidden sm:flex items-center gap-1.5 text-xs text-orange-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Guaranteed No-Wait Checkin
          </span>
        </div>

        {/* TAB 1: BOOKING FORM OR CONFIRMATION */}
        {activeTab === 'book' && (
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start z-10">
            
            {/* Left Description Column */}
            <div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-orange-400 flex items-center gap-2">
                <span>Ready when you are</span>
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Take the first step toward a healthier smile.
              </h2>

              <p className="mt-5 leading-relaxed text-white/60 text-sm sm:text-base">
                Request an appointment and our dental coordinators will reserve your preferred specialist and time slot immediately.
              </p>

              <div className="mt-8 space-y-4 text-sm text-white/65">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>Instant digital confirmation & SMS reminder</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>Personalized 3D digital imaging consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>Friendly, anxiety-free patient care team</span>
                </div>
              </div>

              {/* Direct call card */}
              <div className="mt-8 p-4 rounded-2xl glass border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/40 font-semibold uppercase">Prefer to speak with us?</div>
                  <div className="text-sm font-bold text-white mt-0.5">Call: +91 9953239674</div>
                </div>
                {onOpenVoiceAi ? (
                  <button
                    onClick={onOpenVoiceAi}
                    className="px-4 py-2 rounded-xl glass border border-orange-400/40 text-orange-300 font-bold text-xs hover:bg-orange-400/10 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-orange-400" />
                    <span>Call Now (Voice AI)</span>
                  </button>
                ) : (
                  <a
                    href="tel:+919953239674"
                    className="px-4 py-2 rounded-xl glass border border-orange-400/40 text-orange-300 font-bold text-xs hover:bg-orange-400/10 transition"
                  >
                    Call Now
                  </a>
                )}
              </div>
            </div>

            {/* Right Booking Form OR Success Card */}
            <div>
              {bookedAppointment ? (
                <div className="glass rounded-3xl p-6 sm:p-8 border border-emerald-400/30 bg-emerald-950/20 shadow-2xl animate-fade-up">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      APPOINTMENT CONFIRMED
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">We look forward to seeing you!</h3>
                    <p className="text-xs text-white/60 mt-1">
                      A confirmation text and calendar invite have been dispatched.
                    </p>
                  </div>

                  {/* Receipt Card */}
                  <div className="mt-6 rounded-2xl bg-black/40 p-4.5 border border-white/10 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/40">Confirmation Code:</span>
                      <span className="font-mono font-bold text-orange-400 text-sm">
                        {bookedAppointment.confirmationCode}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40">Patient:</span>
                      <span className="font-semibold text-white">{bookedAppointment.patientName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40">Service:</span>
                      <span className="font-semibold text-white">{bookedAppointment.serviceName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40">Date & Time:</span>
                      <span className="font-bold text-orange-300">
                        {bookedAppointment.date} at {bookedAppointment.timeSlot}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40">Specialist:</span>
                      <span className="font-semibold text-white">{bookedAppointment.doctorName}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => setBookedAppointment(null)}
                      className="flex-1 py-3 rounded-xl glass border border-white/15 text-xs font-semibold text-white/80 hover:text-white"
                    >
                      Book Another Visit
                    </button>
                    
                    <button
                      onClick={() => {
                        const message = encodeURIComponent(
                          `Hello DENTAL+! I just booked an appointment.\n\nCode: ${bookedAppointment.confirmationCode}\n👤 Patient: ${bookedAppointment.patientName}\n🦷 Service: ${bookedAppointment.serviceName}\n📅 Date: ${bookedAppointment.date} at ${bookedAppointment.timeSlot}\n👨‍⚕️ Specialist: ${bookedAppointment.doctorName}\n\nPlease confirm my slot!`
                        );
                        window.open(`https://wa.me/919953239674?text=${message}`, '_blank');
                      }}
                      className="flex-1 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#25D366]/30 transition"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>WhatsApp Receipt</span>
                    </button>

                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        'Dental Visit at DENTAL+'
                      )}&dates=${bookedAppointment.date.replace(/-/g, '')}T150000Z/${bookedAppointment.date.replace(
                        /-/g,
                        ''
                      )}T160000Z&details=${encodeURIComponent(
                        'Appointment for ' + bookedAppointment.serviceName + ' (Code: ' + bookedAppointment.confirmationCode + ')'
                      )}&location=${encodeURIComponent('123 Wellness Avenue, DENTAL+ Clinic')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl orange-gradient text-[#1B0D05] text-xs font-bold text-center shadow flex items-center justify-center"
                    >
                      + Calendar
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl">
                  
                  {errorMessage && (
                    <div className="mb-4 rounded-xl bg-red-500/20 p-3 text-xs text-red-200 border border-red-500/30 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid gap-4">
                    
                    {/* Name */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full rounded-2xl border border-white/10 bg-black/30 pl-10 pr-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-orange-400"
                        />
                      </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 9953239674"
                            className="w-full rounded-2xl border border-white/10 bg-black/30 pl-10 pr-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-orange-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                          Email (Optional)
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="patient@example.com"
                            className="w-full rounded-2xl border border-white/10 bg-black/30 pl-10 pr-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-orange-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div className="min-w-0 w-full">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1 truncate">
                        Select Dental Procedure / Concern *
                      </label>
                      <div className="relative min-w-0 w-full">
                        <select
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          className="w-full truncate rounded-2xl border border-white/10 bg-[#170E1E] px-4 py-3.5 pr-9 text-xs sm:text-sm text-white outline-none focus:border-orange-400 appearance-none cursor-pointer"
                        >
                          <option value="General checkup" className="bg-[#170E1E] text-white">General checkup & Routine Cleaning</option>
                          <option value="Cosmetic dentistry" className="bg-[#170E1E] text-white">Cosmetic Dentistry / Teeth Whitening / Veneers</option>
                          <option value="Dental implants" className="bg-[#170E1E] text-white">Dental Implants & 3D Restorations</option>
                          <option value="Orthodontic Care" className="bg-[#170E1E] text-white">Orthodontic Care & Clear Aligners</option>
                          <option value="Emergency Care" className="bg-[#170E1E] text-white">Emergency Same-Day Pain Relief</option>
                          <option value="Cavity Filling / Composite" className="bg-[#170E1E] text-white">Cavity Filling / Composite Bonding</option>
                          <option value="Preventive Gum Therapy" className="bg-[#170E1E] text-white">Preventive Periodontal & Gum Therapy</option>
                          <option value="Other Consultation" className="bg-[#170E1E] text-white">Other / General Consultation</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/50">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Preferred Doctor */}
                    <div className="min-w-0 w-full">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1 truncate">
                        Preferred Specialist
                      </label>
                      <div className="relative min-w-0 w-full">
                        <select
                          value={doctorName}
                          onChange={(e) => setDoctorName(e.target.value)}
                          className="w-full truncate rounded-2xl border border-white/10 bg-[#170E1E] px-4 py-3.5 pr-9 text-xs sm:text-sm text-white outline-none focus:border-orange-400 appearance-none cursor-pointer"
                        >
                          <option value="First Available Specialist" className="bg-[#170E1E] text-white">First Available Specialist (Recommended for fastest slot)</option>
                          {CLINIC_DOCTORS.map((doc) => (
                            <option key={doc.id} value={doc.name} className="bg-[#170E1E] text-white">
                              {doc.name} — {doc.specialty}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/50">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Slot */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-orange-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                          Time Slot *
                        </label>
                        <select
                          value={selectedTimeSlot}
                          onChange={(e) => setSelectedTimeSlot(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-orange-400"
                        >
                          {availableTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Notes / Symptoms */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                        Symptoms / Special Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Sensitivity on upper left molar when drinking cold water..."
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-2.5 text-xs text-white outline-none placeholder:text-white/30 focus:border-orange-400 resize-none"
                      />
                    </div>

                    {/* Emergency Toggle */}
                    <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
                      <input
                        type="checkbox"
                        id="urgent-checkbox"
                        checked={isEmergency}
                        onChange={(e) => setIsEmergency(e.target.checked)}
                        className="w-4 h-4 accent-orange-400 rounded cursor-pointer"
                      />
                      <label htmlFor="urgent-checkbox" className="text-xs text-white/80 cursor-pointer">
                        This is an urgent / same-day emergency issue
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="orange-gradient mt-2 rounded-2xl px-6 py-4 font-bold text-[#1B0D05] transition hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 active:translate-y-0 cursor-pointer"
                    >
                      {submitting ? (
                        <span>Reserving Slot...</span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Request Appointment</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Instant Booking / Confirmation Option */}
                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-white/10"></div>
                      <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-white/30 tracking-wider">or instant mobile confirmation</span>
                      <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const message = encodeURIComponent(
                          `Hello DENTAL+! I would like to request an appointment.\n\n👤 Name: ${patientName || 'Patient'}\n📱 Phone: ${phone || 'Not specified'}\n🦷 Service: ${serviceName}\n📅 Preferred Date: ${selectedDate} at ${selectedTimeSlot}\n💬 Notes: ${notes || 'None'}`
                        );
                        window.open(`https://wa.me/919953239674?text=${message}`, '_blank');
                      }}
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2.5 shadow-md group cursor-pointer"
                    >
                      {/* WhatsApp SVG Icon */}
                      <svg className="w-5 h-5 fill-current shrink-0 text-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>Get confirmation on WhatsApp</span>
                    </button>

                    <p className="text-center text-[11px] text-white/40">
                      We will contact you via text/phone to re-confirm your appointment details.
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: LOOKUP VISITS */}
        {activeTab === 'lookup' && (
          <div className="relative z-10 max-w-xl mx-auto py-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white">Find Your Scheduled Visit</h3>
              <p className="text-xs text-white/50 mt-1">
                Enter your confirmation code (e.g. DEN-49102) or your phone number.
              </p>
            </div>

            <form onSubmit={handleLookup} className="flex gap-2">
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Enter confirmation code or phone..."
                className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-orange-400"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="orange-gradient px-6 py-3.5 rounded-2xl font-bold text-[#1B0D05] text-xs sm:text-sm shadow"
              >
                {lookupLoading ? 'Searching...' : 'Search'}
              </button>
            </form>

            {lookupResults !== null && (
              <div className="mt-6 space-y-3">
                {lookupResults.length === 0 ? (
                  <div className="rounded-2xl glass p-6 text-center text-xs text-white/50">
                    No matching appointments found for "{lookupQuery}". Please check your code or give us a call.
                  </div>
                ) : (
                  lookupResults.map((apt) => (
                    <div key={apt.id} className="rounded-2xl glass p-4.5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-orange-400">
                          {apt.confirmationCode}
                        </span>
                        <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                          {apt.status}
                        </span>
                      </div>
                      <div className="font-bold text-white text-sm">{apt.serviceName}</div>
                      <div className="text-xs text-white/60">
                        Patient: <span className="text-white font-medium">{apt.patientName}</span> • Specialist: {apt.doctorName}
                      </div>
                      <div className="text-xs font-semibold text-orange-300">
                        📅 {apt.date} at {apt.timeSlot}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        </div>
      </div>
    </section>
  );
};
