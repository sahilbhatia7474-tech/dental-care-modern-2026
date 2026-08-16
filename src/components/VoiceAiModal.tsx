import React, { useState, useEffect } from 'react';
import { X, PhoneCall, Mic, Volume2, Calendar, PhoneOff, CheckCircle2, ArrowRight } from 'lucide-react';

interface VoiceAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const VoiceAiModal: React.FC<VoiceAiModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [callState, setCallState] = useState<'idle' | 'countdown' | 'in_call' | 'completed'>('countdown');
  const [countdown, setCountdown] = useState<number>(10);
  const [audioWaves, setAudioWaves] = useState<number[]>([40, 65, 30, 85, 50, 95, 60, 45, 75, 90, 35, 70, 55]);
  const [transcriptIndex, setTranscriptIndex] = useState<number>(0);

  const mockDialogues = [
    { speaker: 'Dr. Pearl (Voice AI)', text: "Hello! This is Dr. Pearl from DENTAL+ Modern Care. I noticed you requested an immediate callback to schedule your visit." },
    { speaker: 'Patient (You)', text: "Hi Dr. Pearl! Yes, I'd like to book a dental consultation." },
    { speaker: 'Dr. Pearl (Voice AI)', text: "Wonderful! We have slots open today at 2:30 PM and tomorrow at 10:00 AM with Dr. Sarah Chen. Which works best for you?" },
    { speaker: 'Dr. Pearl (Voice AI)', text: "I've locked in your reservation. You'll receive a WhatsApp & SMS confirmation in seconds. Would you like me to reserve it now?" }
  ];

  // Animate voice wave bars
  useEffect(() => {
    if (!isOpen || callState !== 'in_call') return;
    const waveInterval = setInterval(() => {
      setAudioWaves([
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
        Math.floor(30 + Math.random() * 70),
        Math.floor(40 + Math.random() * 60),
        Math.floor(50 + Math.random() * 50),
        Math.floor(30 + Math.random() * 70),
        Math.floor(20 + Math.random() * 80),
        Math.floor(30 + Math.random() * 70),
        Math.floor(40 + Math.random() * 60),
        Math.floor(20 + Math.random() * 80),
        Math.floor(30 + Math.random() * 70),
        Math.floor(20 + Math.random() * 80),
      ]);
    }, 150);

    return () => clearInterval(waveInterval);
  }, [isOpen, callState]);

  // Countdown timer logic
  useEffect(() => {
    if (!isOpen) {
      setCallState('countdown');
      setCountdown(10);
      setTranscriptIndex(0);
      return;
    }

    if (callState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setCallState('in_call');
      }
    }
  }, [isOpen, callState, countdown]);

  // Transcript advancement
  useEffect(() => {
    if (callState === 'in_call' && transcriptIndex < mockDialogues.length - 1) {
      const dialogueTimer = setTimeout(() => {
        setTranscriptIndex((prev) => prev + 1);
      }, 3500);
      return () => clearTimeout(dialogueTimer);
    }
  }, [callState, transcriptIndex, mockDialogues.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-[2.2rem] border border-orange-400/40 bg-[#120B19] p-6 sm:p-8 shadow-glow text-white overflow-hidden">
        
        {/* Background glow orb */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full glass text-white/50 hover:text-white hover:bg-white/10 transition"
          aria-label="Close Voice AI"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full orange-gradient flex items-center justify-center text-[#1B0D05] font-black text-lg shadow-glow">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg text-white">Voice AI Receptionist</h3>
              <span className="text-[10px] font-black uppercase bg-orange-400/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-400/30">
                Live Voice Agent
              </span>
            </div>
            <p className="text-xs text-white/50">Instant autonomous phone receptionist by DENTAL+</p>
          </div>
        </div>

        {/* STATE 1: COUNTDOWN (AI is calling you in 10 sec) */}
        {callState === 'countdown' && (
          <div className="flex flex-col items-center text-center py-4 space-y-5 animate-fade-in">
            {/* Animated Ring Indicator */}
            <div className="relative flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-2 border-orange-400/40 flex items-center justify-center animate-ping absolute opacity-40"></div>
              <div className="w-24 h-24 rounded-full orange-gradient/20 border border-orange-400 flex flex-col items-center justify-center shadow-glow">
                <span className="text-3xl font-black text-orange-300 font-mono">{countdown}</span>
                <span className="text-[10px] uppercase font-bold text-orange-200/80">Seconds</span>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-white">
                AI is calling you in <span className="text-orange-400 font-black">{countdown} sec</span> to book appointment
              </h4>
              <p className="text-xs text-white/60 mt-1.5 max-w-sm mx-auto leading-relaxed">
                Dr. Pearl Voice AI is dispatching a call to verify your preferred specialist and lock in your priority time slot.
              </p>
            </div>

            {/* Simulated Incoming Call Banner */}
            <div className="w-full rounded-2xl glass p-4 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Incoming Call: DENTAL+ Voice AI</div>
                  <div className="text-[11px] text-emerald-400 font-mono">+91 9953239674</div>
                </div>
              </div>
              <button
                onClick={() => setCallState('in_call')}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition"
              >
                Answer Now
              </button>
            </div>

            <div className="flex gap-2 w-full pt-2">
              <button
                onClick={() => setCallState('in_call')}
                className="flex-1 orange-gradient py-3.5 rounded-xl font-bold text-[#1B0D05] text-xs shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Connect Immediately</span>
              </button>
            </div>
          </div>
        )}

        {/* STATE 2: ACTIVE IN-CALL SIMULATION */}
        {callState === 'in_call' && (
          <div className="space-y-5 animate-fade-in">
            {/* Live Audio Visualizer Wave */}
            <div className="rounded-2xl bg-black/50 p-4 border border-white/10 flex flex-col items-center justify-center">
              <div className="text-[11px] font-bold text-orange-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Audio Stream • HD Voice Active</span>
              </div>

              {/* Waveform Bars */}
              <div className="flex items-end justify-center gap-1.5 h-16 w-full px-4">
                {audioWaves.map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="w-2 rounded-full bg-gradient-to-t from-orange-500 via-orange-400 to-amber-300 transition-all duration-150 shadow-[0_0_8px_#FF8A3D]"
                  />
                ))}
              </div>
            </div>

            {/* Live Transcript Stream */}
            <div className="rounded-2xl glass p-4 border border-white/10 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
              <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Live AI Conversation</div>
              {mockDialogues.slice(0, transcriptIndex + 1).map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl text-xs ${
                    msg.speaker.includes('Voice AI')
                      ? 'bg-orange-400/15 border border-orange-400/25 text-orange-200'
                      : 'bg-white/5 border border-white/5 text-white/80'
                  }`}
                >
                  <span className="font-bold block text-[10px] text-white/50 mb-0.5">{msg.speaker}:</span>
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>

            {/* Call Action Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCallState('completed');
                  onBookAppointment();
                  onClose();
                }}
                className="flex-1 orange-gradient py-3.5 rounded-xl font-bold text-[#1B0D05] text-xs shadow hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm & Lock Appointment</span>
              </button>

              <button
                onClick={() => setCallState('completed')}
                className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition"
                title="End Voice Call"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STATE 3: COMPLETED */}
        {callState === 'completed' && (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Voice Call Completed</h4>
              <p className="text-xs text-white/60 mt-1">
                Your appointment inquiry was transferred to our reservation queue.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookAppointment();
              }}
              className="orange-gradient px-6 py-3.5 rounded-xl font-bold text-[#1B0D05] text-xs shadow flex items-center justify-center gap-2 mx-auto"
            >
              <span>View Booking Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
