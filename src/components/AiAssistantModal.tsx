import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, AlertTriangle, Calendar, RefreshCw, Volume2, ArrowRight, Clock, HelpCircle, PhoneCall } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointmentWithService: (serviceName: string, notes?: string) => void;
  onOpenVoiceAi?: () => void;
  initialTopic?: string;
}

// Built-in comprehensive mock dental knowledge bank (Works with or without Gemini API key)
function getMockDentalAnswer(query: string): { content: string; urgencyLevel?: 'low' | 'moderate' | 'high' | 'emergency'; suggestedService?: string } {
  const q = query.toLowerCase();

  // 1. Whitening Cost
  if (q.includes('whiten') || q.includes('bleach') || q.includes('shade') || (q.includes('cost') && q.includes('teeth'))) {
    return {
      content: `🦷 **Teeth Whitening Options & Costs at DENTAL+:**\n\n• **1-Hour In-Office Power Laser Whitening:** **$380** (Regular Fee) | **$285** (for DENTAL+ Members).\n• **Expected Results:** Lifts stains up to **8 shades brighter** safely in a single 60-minute visit.\n• **What's Included:** Clinical pre-shade assessment, gum barrier protection, desensitizing therapy, and a take-home maintenance kit.\n• **Financing & EMI:** Available from **$32/month** at 0% APR via CareCredit/Sunbit.\n\nWould you like to reserve a 1-Hour Whitening session or digital smile shade preview?`,
      urgencyLevel: 'low',
      suggestedService: 'Cosmetic dentistry'
    };
  }

  // 2. Implant Pain
  if (q.includes('implant') && (q.includes('pain') || q.includes('hurt') || q.includes('scared') || q.includes('sore') || q.includes('feel'))) {
    return {
      content: `🦷 **Is a Dental Implant Procedure Painful?**\n\n**Short Answer: No — it is much gentler than most people expect!**\n\n• **During Surgery:** You will feel **zero sharp pain**. We use targeted high-precision local anesthesia and optional gentle nitrous oxide or oral twilight sedation so you stay relaxed.\n• **Post-Procedure Recovery:** Most patients describe mild tenderness comparable to a minor filling or simple tooth extraction, lasting only **2 to 3 days** and easily managed with regular ibuprofen.\n• **Advanced 3D Guidance:** We use 3D computer-guided surgical templates which minimize incision size, eliminate guesswork, and cut healing time by over 50%.\n• **Patient Feedback:** Over 98% of our implant patients report that the procedure was substantially easier than they anticipated!\n\nWould you like to book a complimentary 3D digital implant consultation?`,
      urgencyLevel: 'low',
      suggestedService: 'Dental implants'
    };
  }

  // 3. Emergency First-Aid
  if (q.includes('emergency') || q.includes('first aid') || q.includes('first-aid') || q.includes('knocked') || q.includes('broken tooth') || q.includes('swelling') || (q.includes('severe') && q.includes('pain'))) {
    return {
      content: `🚨 **Immediate Dental Emergency First-Aid Steps:**\n\n1. **Severe Toothache / Throbbing Pain:**\n   • Rinse gently with warm salt water (1/2 tsp salt in 8 oz warm water).\n   • Apply a cold ice pack to the outside cheek (15 mins on, 15 mins off).\n   • Take over-the-counter anti-inflammatory (ibuprofen). *Never place aspirin directly on the gums as it causes chemical burns.*\n\n2. **Knocked-Out (Avulsed) Tooth:**\n   • Pick up tooth ONLY by the crown (top), DO NOT touch the root.\n   • If dirty, gently rinse with milk or saline.\n   • Place tooth back in socket or submerge in cold milk / saliva.\n   • **Crucial:** Reach our clinic within 30–60 minutes for highest re-implantation success.\n\n3. **Broken or Chipped Tooth:**\n   • Save broken fragments in milk; rinse mouth with warm water.\n   • Apply sterile gauze if bleeding occurs.\n\n⚡ We reserve dedicated same-day emergency slots every day. You can call our emergency line or click below to schedule immediate priority relief.`,
      urgencyLevel: 'emergency',
      suggestedService: 'Emergency Care'
    };
  }

  // 4. Clinic Timings
  if (q.includes('timing') || q.includes('hours') || q.includes('time') || q.includes('open') || q.includes('schedule') || q.includes('when')) {
    return {
      content: `⏰ **DENTAL+ Clinic Operating Hours & Availability:**\n\n• **Monday – Friday:** 9:00 AM – 7:00 PM\n• **Saturday:** 9:00 AM – 4:00 PM\n• **Sunday:** Open for Urgent Care & Scheduled Specialty Procedures\n• **Emergency Coverage:** 24/7 On-Call Patient Hotline at **+91 9953239674**\n\n📍 **Location:** 123 Wellness Avenue, Suite 400, Metro Health District (Complimentary garage parking provided).\n\nWould you like to book a slot for this morning, afternoon, or Saturday?`,
      urgencyLevel: 'low',
      suggestedService: 'General checkup'
    };
  }

  // 5. Implants general cost / steps
  if (q.includes('implant')) {
    return {
      content: `💎 **Dental Implants at DENTAL+:**\n\n• **Single Tooth Complete Implant & Zirconia Crown:** ~$2,850 (insurance typically covers $1,000–$1,500).\n• **Financing:** Low monthly installments from **$99/month** (36 months, 0% APR available).\n• **Procedure:** High-precision 3D CBCT scan, titanium fixture placement, biological integration, and permanent custom crown restoration.\n\nWould you like to book a 3D scan & consultation?`,
      urgencyLevel: 'low',
      suggestedService: 'Dental implants'
    };
  }

  // 6. Aligners
  if (q.includes('align') || q.includes('invisalign') || q.includes('brace') || q.includes('straight')) {
    return {
      content: `◇ **Clear Aligners (Invisible Orthodontics):**\n\n• **Price Range:** $2,800 – $3,600 (or **$89/month** with financing).\n• **Benefits:** Completely removable, nearly invisible, no food restrictions, and average treatment time of only 6–12 months.\n• **Free 3D Smile Simulator:** We can show you a 3D digital simulation of your finished smile before you begin!`,
      urgencyLevel: 'low',
      suggestedService: 'Orthodontic Care'
    };
  }

  // 7. General toothache or cavity
  if (q.includes('pain') || q.includes('ache') || q.includes('cavity') || q.includes('filling') || q.includes('sensitive')) {
    return {
      content: `🩺 **Toothache & Sensitivity Assessment:**\n\n• **Possible causes:** Enamel erosion, microscopic cavity, cracked filling, or localized pulp inflammation.\n• **Immediate Relief:** Warm saltwater rinse, avoid extremes of hot/cold, and use gentle desensitizing toothpaste.\n• **Recommendation:** A quick 15-minute diagnostic exam with digital low-radiation X-rays will identify the exact cause before it progresses.`,
      urgencyLevel: 'moderate',
      suggestedService: 'General checkup'
    };
  }

  // Default fallback
  return {
    content: `Hello! I am Dr. Pearl, your AI Dental Care Assistant. I can assist you with:\n\n• **Whitening costs** and cosmetic treatment plans\n• **Implant pain questions** & 3D guided surgery steps\n• **Emergency first-aid** & toothache soothing tips\n• **Clinic timings**, parking, and insurance coverage\n\nHow can I help you achieve your healthiest smile today?`,
    urgencyLevel: 'low',
    suggestedService: 'General checkup'
  };
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onBookAppointmentWithService,
  onOpenVoiceAi,
  initialTopic
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Hello! I am Dr. Pearl, your AI Dental Care Assistant at DENTAL+. How can I help you today? You can ask me about whitening cost, whether dental implants hurt, emergency first-aid, or our clinic timings.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      urgencyLevel: 'low'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 3 Quick Suggestion Chips below chat as requested
  const quickSuggestionChips = [
    { label: '✨ Whitening Cost & Details', query: 'What is the teeth whitening cost and options?' },
    { label: '🦷 Is Dental Implant Painful?', query: 'Does a dental implant hurt? How is the pain during and after surgery?' },
    { label: '⏰ Clinic Timings & Emergency', query: 'What are your clinic timings, hours, and emergency first-aid advice?' }
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // If opened with an initial topic
  useEffect(() => {
    if (initialTopic && isOpen) {
      sendMessage(initialTopic);
    }
  }, [initialTopic, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // First attempt server endpoint (which uses Gemini or smart fallback)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          userMessage: text.trim()
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: ChatMessage = {
          id: `msg-ast-${Date.now()}`,
          role: 'assistant',
          content: data.content || getMockDentalAnswer(text).content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          urgencyLevel: data.urgencyLevel,
          suggestedService: data.suggestedService
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('Server chat fallback');
      }
    } catch (err) {
      // Instant intelligent mock dental knowledge (no API key needed!)
      const mock = getMockDentalAnswer(text);
      const fallbackMsg: ChatMessage = {
        id: `msg-mock-${Date.now()}`,
        role: 'assistant',
        content: mock.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        urgencyLevel: mock.urgencyLevel,
        suggestedService: mock.suggestedService
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks for cleaner speech
      const cleanText = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative flex flex-col w-full max-w-2xl h-[90vh] max-h-[720px] rounded-[2rem] border border-orange-400/30 bg-[#120B19] shadow-2xl overflow-hidden">
        
        {/* Top Glow */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full orange-gradient text-[#1B0D05] shadow font-bold text-lg">
              🦷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base">Dr. Pearl</h3>
                <span className="text-[10px] font-black uppercase bg-orange-400/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-400/30">
                  AI Dental Assistant
                </span>
              </div>
              <div className="text-xs text-white/50 flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Knowledge Base • Instant Answers</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenVoiceAi && (
              <button
                onClick={() => {
                  onClose();
                  onOpenVoiceAi();
                }}
                className="px-3 py-1.5 rounded-xl glass border border-orange-400/30 text-orange-300 text-xs font-bold hover:bg-orange-400/15 transition flex items-center gap-1.5"
                title="Switch to Voice AI Call"
              >
                <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden sm:inline">Voice AI Call</span>
              </button>
            )}

            <button
              onClick={() =>
                setMessages([
                  {
                    id: 'welcome-reset',
                    role: 'assistant',
                    content: 'Chat refreshed. You can ask me about whitening costs, implant pain questions, emergency first-aid, or clinic timings.',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ])
              }
              title="Reset conversation"
              className="p-2 text-white/40 hover:text-white rounded-full hover:bg-white/5 transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white rounded-full hover:bg-white/5 transition"
              aria-label="Close AI Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar relative z-10">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full orange-gradient flex items-center justify-center text-xs font-bold text-[#1B0D05] shrink-0 mt-1">
                  🦷
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-orange-400 text-[#1B0D05] font-medium shadow-md ml-auto'
                    : 'glass border border-white/10 text-white/90 shadow'
                }`}
              >
                {/* Assistant Urgency Badge */}
                {msg.role === 'assistant' && msg.urgencyLevel && msg.urgencyLevel !== 'low' && (
                  <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold">
                    {msg.urgencyLevel === 'emergency' ? (
                      <span className="bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Potential Dental Emergency
                      </span>
                    ) : msg.urgencyLevel === 'high' ? (
                      <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded-full">
                        High Priority Attention
                      </span>
                    ) : (
                      <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                        Moderate Discomfort
                      </span>
                    )}
                  </div>
                )}

                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Direct Action Link if Suggested Service is provided */}
                {msg.role === 'assistant' && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    {msg.suggestedService && (
                      <button
                        onClick={() => {
                          onClose();
                          onBookAppointmentWithService(
                            msg.suggestedService || 'General Dentistry',
                            `AI Consultation: ${msg.content.slice(0, 80)}...`
                          );
                          const el = document.getElementById('appointment');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="orange-gradient text-[#1B0D05] px-3.5 py-1.5 rounded-xl font-bold text-xs shadow flex items-center gap-1.5 hover:opacity-95 transition"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book for {msg.suggestedService}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    <button
                      onClick={() => handleSpeak(msg.content)}
                      className="text-white/40 hover:text-orange-300 text-xs flex items-center gap-1 transition ml-auto"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    msg.role === 'user' ? 'text-black/50' : 'text-white/30'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs text-white/80 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-white/50 text-xs">
              <div className="w-8 h-8 rounded-full orange-gradient flex items-center justify-center text-xs font-bold text-[#1B0D05]">
                🦷
              </div>
              <div className="glass px-4 py-2.5 rounded-2xl flex items-center gap-2 border border-white/10">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-400" />
                <span>Dr. Pearl is analyzing clinical dental knowledge...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 3 Quick Suggestion Chips below chat as requested */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-white/[0.02] flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[10px] font-bold text-white/40 uppercase shrink-0">Quick Topics:</span>
          {quickSuggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(chip.query)}
              className="text-xs px-3.5 py-1.5 rounded-full glass border border-orange-400/25 text-orange-200 hover:text-white hover:bg-orange-400/20 hover:border-orange-400 transition shrink-0 shadow-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-4 border-t border-white/10 bg-[#0E0A14] flex gap-2 relative z-10"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about whitening cost, implant pain, emergency steps, timings..."
            className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs sm:text-sm text-white outline-none placeholder:text-white/30 focus:border-orange-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="orange-gradient px-5 py-3 rounded-2xl font-bold text-[#1B0D05] transition hover:opacity-90 disabled:opacity-50 flex items-center justify-center shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

