import React, { useState } from 'react';
import { X, Calendar, MapPin } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (booking: {
    name: string;
    email: string;
    phone: string;
    salon: string;
    date: string;
    time: string;
    notes: string;
  }) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onBook
}) => {
  const [salon, setSalon] = useState('Flagship Salon — Mumbai (Bandra West)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-18');
  const [time, setTime] = useState('14:00 IST');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const salons = [
    'Flagship Salon — Mumbai (Bandra West)',
    'Heritage Salon — New Delhi (South Ex)',
    'Luxury Salon — Bengaluru (Lavelle Rd)',
    'Private Virtual Salon (Worldwide)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook({
      name: name || 'Distinguished Patron',
      email: email || 'patron@rivajewels.com',
      phone: phone || '+91 98200 12345',
      salon,
      date,
      time,
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FCF9F5] border border-[#E8E2D9] rounded-sm p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
          <div>
            <h2 className="font-serif text-lg font-medium text-[#1C1C1A]">PRIVATE APPOINTMENT</h2>
            <p className="text-[11px] text-[#6B6560]">Consult with our Master Gemologist</p>
          </div>
          <button onClick={onClose} className="text-[#6B6560] hover:text-[#1C1C1A] p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-medium text-[#745548] mb-1.5">
              Select Riva Jewels Boutique Salon
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {salons.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSalon(s)}
                  className={`flex items-center gap-2 p-2.5 text-xs text-left rounded-sm border transition-colors ${
                    salon === s 
                      ? 'bg-[#292522] text-[#FAF7F3] border-[#292522]' 
                      : 'bg-white text-[#292522] border-[#E8E2D9] hover:border-[#82746F]'
                  }`}
                >
                  <MapPin size={13} className={salon === s ? 'text-[#D6BD9A]' : 'text-[#6B6560]'} />
                  <span className="truncate">{s}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-medium text-[#745548] mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-[#E8E2D9] rounded-sm focus:outline-none focus:border-[#292522]"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-medium text-[#745548] mb-1">
                Time Slot
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-[#E8E2D9] rounded-sm focus:outline-none focus:border-[#292522]"
              >
                <option>11:00 AM IST</option>
                <option>02:00 PM IST</option>
                <option>04:00 PM IST</option>
                <option>06:00 PM IST</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-medium text-[#745548] mb-1">
              Your Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Ananya Singhania"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs p-2 bg-white border border-[#E8E2D9] rounded-sm focus:outline-none focus:border-[#292522]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-medium text-[#745548] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="patron@luxury.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-[#E8E2D9] rounded-sm focus:outline-none focus:border-[#292522]"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-medium text-[#745548] mb-1">
                Telephone
              </label>
              <input
                type="tel"
                placeholder="+91 98200 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-[#E8E2D9] rounded-sm focus:outline-none focus:border-[#292522]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-medium text-[#745548] mb-1">
              Bespoke Inquiries / Gemstone Desires
            </label>
            <textarea
              rows={3}
              placeholder="Tell our master jeweler about your ideal cut, karat, or custom heirloom redesign..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2 bg-white border border-[#E8E2D9] rounded-sm focus:outline-none focus:border-[#292522]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#292522] text-[#FAF7F3] text-xs font-medium tracking-widest uppercase hover:bg-[#A17E70] transition-colors rounded-sm shadow mt-2"
          >
            Confirm Private Appointment
          </button>
        </form>
      </div>
    </div>
  );
};
