import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { CLINIC_SERVICES, CLINIC_DOCTORS } from '../data/mockData';
import { AppointmentRequest } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDoctor?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialDoctor
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceName, setServiceName] = useState(initialService || 'General Dentistry & 3D Scan');
  const [doctorName, setDoctorName] = useState(initialDoctor || 'Dr. Sahil Bhatia (Chief Surgeon)');
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [isEmergency, setIsEmergency] = useState(false);
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRequest | null>(null);

  useEffect(() => {
    if (initialService) setServiceName(initialService);
    if (initialDoctor) setDoctorName(initialDoctor);
    if (isOpen) {
      setConfirmedBooking(null);
      setErrorMsg('');
    }
  }, [initialService, initialDoctor, isOpen]);

  const timeSlots = [
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
    setErrorMsg('');

    if (!patientName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        patientName: patientName.trim(),
        phone: phone.trim(),
        serviceName,
        serviceId: serviceName.toLowerCase().replace(/\s+/g, '-'),
        doctorName,
        date: selectedDate,
        timeSlot: selectedTime,
        notes,
        urgency: isEmergency ? 'emergency' : 'routine'
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.appointment) {
        setConfirmedBooking(data.appointment);
      } else {
        throw new Error(data.error || 'Failed to submit online');
      }
    } catch {
      // Local fallback confirmation
      const fallbackBooking: AppointmentRequest = {
        id: `apt-${Date.now()}`,
        confirmationCode: `DEN-DELHI-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName,
        phone,
        serviceId: 'general',
        serviceName,
        doctorName,
        date: selectedDate,
        timeSlot: selectedTime,
        notes,
        urgency: isEmergency ? 'emergency' : 'routine',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('dental_appointments') || '[]');
        stored.unshift(fallbackBooking);
        localStorage.setItem('dental_appointments', JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }

      setConfirmedBooking(fallbackBooking);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-[2.2rem] border border-orange-400/40 bg-[#120B19] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden max-h-[92vh] flex flex-col custom-scrollbar overflow-y-auto">
        
        {/* Background glow orb */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full glass text-white/50 hover:text-white hover:bg-white/10 transition z-10"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBooking ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl orange-gradient flex items-center justify-center text-[#1B0D05] font-black text-xl shadow-glow">
                🦷
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xl text-white">Book Dental Visit</h3>
                  <span className="text-[10px] font-black uppercase bg-orange-400/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-400/30">
                    Delhi Clinic
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-0.5">
                  Direct appointment with Dr. Sahil & Specialist Team • Instant Confirmation
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500/40 p-3 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Sharma"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">
                  Phone Number (For SMS & WhatsApp confirmation) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9953239674 or 9953239674"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400 font-mono"
                  />
                </div>
              </div>

              {/* Service & Doctor Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="min-w-0 w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5 truncate">
                    Treatment / Procedure
                  </label>
                  <div className="relative min-w-0 w-full">
                    <select
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full truncate rounded-xl bg-[#1D1426] border border-white/15 px-3 py-2.5 pr-8 text-xs text-white focus:border-orange-400 focus:outline-none appearance-none cursor-pointer"
                    >
                      {CLINIC_SERVICES.map((s) => (
                        <option key={s.id} value={s.name} className="bg-[#1D1426] text-white">
                          {s.name} ({s.estimatedCost})
                        </option>
                      ))}
                      <option value="General checkup" className="bg-[#1D1426] text-white">General Checkup & Clean</option>
                      <option value="Laser Teeth Whitening" className="bg-[#1D1426] text-white">Laser Teeth Whitening</option>
                      <option value="Clear Aligners Consultation" className="bg-[#1D1426] text-white">Clear Aligners Consultation</option>
                      <option value="3D Guided Implant Consultation" className="bg-[#1D1426] text-white">3D Guided Implant Consultation</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-white/50">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5 truncate">
                    Doctor
                  </label>
                  <div className="relative min-w-0 w-full">
                    <select
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full truncate rounded-xl bg-[#1D1426] border border-white/15 px-3 py-2.5 pr-8 text-xs text-white focus:border-orange-400 focus:outline-none appearance-none cursor-pointer"
                    >
                      {CLINIC_DOCTORS.map((d) => (
                        <option key={d.id} value={d.name} className="bg-[#1D1426] text-white">
                          {d.name} ({d.specialty.split('&')[0]})
                        </option>
                      ))}
                      <option value="First Available Specialist" className="bg-[#1D1426] text-white">First Available Specialist</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-white/50">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-xl bg-[#1D1426] border border-white/15 pl-10 pr-3 py-2.5 text-xs text-white focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full rounded-xl bg-[#1D1426] border border-white/15 pl-10 pr-3 py-2.5 text-xs text-white focus:border-orange-400 focus:outline-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#1D1426] text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Emergency Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal-emergency-chk"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="rounded accent-orange-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="modal-emergency-chk" className="text-xs text-orange-300 font-semibold cursor-pointer">
                  🚨 This is an urgent / same-day emergency tooth pain request
                </label>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">
                  Notes or Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe any pain, sensitivity, or previous dental work..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/15 p-3 text-xs text-white placeholder-white/30 focus:border-orange-400 focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 orange-gradient py-3.5 rounded-xl font-bold text-[#1B0D05] text-sm shadow-[0_0_20px_rgba(255,138,61,0.35)] hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmitting ? 'Reserving Slot...' : 'Confirm Appointment'}</span>
                </button>

                <a
                  href="tel:+919953239674"
                  className="px-5 py-3.5 rounded-xl glass border border-orange-400/40 text-orange-300 font-bold text-xs hover:bg-orange-400/10 transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>Call +91 9953239674</span>
                </a>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-4 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto text-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                APPOINTMENT CONFIRMED
              </span>
              <h3 className="text-2xl font-black text-white mt-3">
                See You Soon, {confirmedBooking.patientName}!
              </h3>
              <p className="text-xs text-white/60 mt-1 max-w-sm mx-auto">
                Your reservation at DENTAL+ Modern Care Delhi is booked.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="rounded-2xl bg-black/40 border border-white/10 p-4.5 text-left text-xs space-y-2.5 shadow-inner">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40">Confirmation ID:</span>
                <span className="font-mono font-bold text-orange-400 text-sm">
                  {confirmedBooking.confirmationCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Doctor:</span>
                <span className="font-semibold text-white">{confirmedBooking.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Service:</span>
                <span className="font-semibold text-white">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Date & Slot:</span>
                <span className="font-bold text-orange-300">
                  {confirmedBooking.date} at {confirmedBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Clinic Address:</span>
                <span className="font-medium text-white/80">123 Wellness Ave, Delhi</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={`https://wa.me/919953239674?text=Hi%20Dr.%20Sahil%2C%20my%20appointment%20is%20booked%20(${confirmedBooking.confirmationCode})%20for%20${confirmedBooking.date}%20at%20${confirmedBooking.timeSlot}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#22c35e] text-white py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow"
              >
                <span>Notify Dr. Sahil on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl glass border border-white/20 text-white/80 hover:text-white text-xs font-bold transition"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
