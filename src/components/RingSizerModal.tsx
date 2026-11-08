import React, { useState } from 'react';
import { X, Ruler, ShieldCheck } from 'lucide-react';

interface RingSizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: number) => void;
}

export const RingSizerModal: React.FC<RingSizerModalProps> = ({
  isOpen,
  onClose,
  onSelectSize
}) => {
  const [diameterMm, setDiameterMm] = useState<number>(17.1);

  if (!isOpen) return null;

  // Indian ring size approximation: Indian size = (diameter in mm - 12.7) * 3.14 (roughly 10 to 22)
  const calculateIndianSize = (mm: number): number => {
    if (mm < 15.6) return 9;
    if (mm < 16.0) return 10;
    if (mm < 16.3) return 11;
    if (mm < 16.6) return 12;
    if (mm < 17.0) return 13;
    if (mm < 17.4) return 14;
    if (mm < 17.8) return 15;
    if (mm < 18.2) return 16;
    if (mm < 18.6) return 17;
    if (mm < 19.0) return 18;
    if (mm < 19.4) return 19;
    if (mm < 19.8) return 20;
    return 21;
  };

  const calculateUsSize = (mm: number): number => {
    if (mm < 15.3) return 4.5;
    if (mm < 15.7) return 5.0;
    if (mm < 16.1) return 5.5;
    if (mm < 16.5) return 6.0;
    if (mm < 16.9) return 6.5;
    if (mm < 17.3) return 7.0;
    if (mm < 17.7) return 7.5;
    if (mm < 18.2) return 8.0;
    if (mm < 18.6) return 8.5;
    if (mm < 19.0) return 9.0;
    return 9.5;
  };

  const indianSize = calculateIndianSize(diameterMm);
  const usSize = calculateUsSize(diameterMm);
  const circumferenceMm = (diameterMm * Math.PI).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-md bg-[#FCF9F5] border border-[#E8E2D9] rounded-sm p-6 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#745548]">
              BESPOKE FITTING BENCH
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-normal text-[#1C1C1A]">
              Interactive Ring Caliper
            </h2>
          </div>
          <button onClick={onClose} className="text-[#6B6560] hover:text-[#1C1C1A] p-1" aria-label="Close Ring Caliper">
            <X size={20} />
          </button>
        </div>

        {/* Instructions */}
        <div className="my-3 text-center text-xs text-[#6B6560] leading-relaxed font-light">
          Place your existing ring over the golden circular ring below. Slide the gauge until the boundary aligns with the inner edge of your ring band.
        </div>

        {/* Dynamic Ring Circle Calibration Graphic */}
        <div className="flex justify-center items-center py-5">
          <div 
            className="flex flex-col items-center justify-center rounded-full border-2 border-[#D6BD9A] bg-[#D6BD9A]/15 transition-all duration-75 shadow-inner"
            style={{
              width: `${diameterMm * 9.5}px`,
              height: `${diameterMm * 9.5}px`
            }}
          >
            <span className="font-serif text-lg font-medium text-[#292522]">Size {indianSize}</span>
            <span className="text-[10px] text-[#745548] font-medium">{diameterMm.toFixed(1)} mm</span>
          </div>
        </div>

        {/* Millimetric Slider */}
        <div className="mt-2 mb-4">
          <div className="flex justify-between text-[11px] font-medium text-[#6B6560] mb-1.5">
            <span>15.0 mm (Size 8)</span>
            <span className="text-[#745548] font-semibold bg-[#D6BD9A]/20 px-2 py-0.5 rounded-xs">
              {diameterMm.toFixed(1)} mm
            </span>
            <span>20.5 mm (Size 21)</span>
          </div>
          <input
            type="range"
            min="15.0"
            max="20.5"
            step="0.1"
            value={diameterMm}
            onChange={(e) => setDiameterMm(parseFloat(e.target.value))}
            className="w-full accent-[#292522] cursor-pointer"
          />
        </div>

        {/* Size Chart Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-white border border-[#E8E2D9] rounded-xs text-center mb-4">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#745548] font-semibold">Indian Size</div>
            <div className="font-serif text-base font-medium text-[#292522]">{indianSize}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#6B6560]">US / CA</div>
            <div className="font-serif text-base font-medium text-[#292522]">{usSize}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#6B6560]">Circumference</div>
            <div className="font-serif text-base font-medium text-[#292522]">{circumferenceMm} mm</div>
          </div>
        </div>

        <div className="p-2.5 bg-[#D6BD9A]/15 border border-[#D6BD9A]/30 rounded-xs text-[10px] text-[#745548] mb-4 flex items-center gap-2">
          <ShieldCheck size={14} className="shrink-0" />
          <span>Complimentary 30-day resizing is included with every Riva Jewels acquisition.</span>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            if (onSelectSize) onSelectSize(indianSize);
            onClose();
          }}
          className="w-full py-3 bg-[#292522] text-[#FAF7F3] text-xs font-semibold tracking-widest uppercase hover:bg-[#A17E70] transition-colors rounded-xs shadow"
        >
          Confirm Size ({indianSize} Indian Standard)
        </button>
      </div>
    </div>
  );
};
