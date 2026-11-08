import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onBookAppointment: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onBookAppointment }) => {
  return (
    <div className="bg-[#292522] text-[#FAF7F3] text-[11px] py-2 px-4 border-b border-[#D6BD9A]/20 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-[#D6BD9A] hidden sm:inline" />
          <span className="tracking-wider uppercase font-light">
            Complimentary Insured White-Glove Shipping across India • BIS Hallmarked 100% Certified Natural Diamonds
          </span>
        </div>
        <button
          onClick={onBookAppointment}
          className="text-[#D6BD9A] hover:text-white font-medium flex items-center gap-1 uppercase tracking-widest text-[10px] transition-colors"
        >
          <span>Private Salon Appointments</span>
          <ArrowRight size={10} />
        </button>
      </div>
    </div>
  );
};
