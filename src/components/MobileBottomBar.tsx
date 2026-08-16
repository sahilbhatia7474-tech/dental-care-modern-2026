import React from 'react';
import { MessageSquare, PhoneCall, Calendar } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenAiChat: () => void;
  onOpenVoiceAi: () => void;
  onBookVisit: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenAiChat,
  onOpenVoiceAi,
  onBookVisit,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-4 bg-[#0E0A14]/92 backdrop-blur-xl border-t border-orange-400/30 shadow-[0_-8px_30px_rgba(255,138,61,0.18)]">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* 1. AI Chat Button */}
        <button
          onClick={onOpenAiChat}
          className="flex-1 py-2.5 px-2 rounded-xl glass border border-orange-400/30 bg-orange-400/10 hover:bg-orange-400/20 text-orange-200 flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition active:scale-95 shadow-sm"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <span>AI Chat</span>
        </button>

        {/* 2. Call Now (Voice AI Receptionist) Button */}
        <button
          onClick={onOpenVoiceAi}
          className="flex-1 py-2.5 px-2 rounded-xl glass border border-white/15 bg-white/5 hover:bg-white/10 text-white flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition active:scale-95 shadow-sm"
        >
          <PhoneCall className="w-4 h-4 text-orange-400" />
          <span>Call Now</span>
        </button>

        {/* 3. Book Visit Button (Orange Glow) */}
        <button
          onClick={onBookVisit}
          className="flex-[1.2] py-2.5 px-3 rounded-xl orange-gradient text-[#1B0D05] flex flex-col items-center justify-center gap-1 text-[11px] font-extrabold transition active:scale-95 shadow-[0_0_20px_rgba(255,138,61,0.4)]"
        >
          <Calendar className="w-4 h-4 text-[#1B0D05]" />
          <span>Book Visit</span>
        </button>

      </div>
    </div>
  );
};
