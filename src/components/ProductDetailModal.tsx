import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Truck, Sparkles, Ruler, Box } from 'lucide-react';
import { JewelryItem, MetalOption } from '../types/jewelry';

interface ProductDetailModalProps {
  item: JewelryItem | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (item: JewelryItem, metal: MetalOption, size: number | undefined, engraving: string) => void;
  onOpenConsultation: () => void;
  onOpenRingSizer: () => void;
  onOpen3DStudio: (metalId: string) => void;
  onViewFullPage?: (item: JewelryItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenConsultation,
  onOpenRingSizer,
  onOpen3DStudio,
  onViewFullPage
}) => {
  if (!isOpen || !item) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState<MetalOption>(item.metalOptions[0]);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(item.availableSizes?.[0]);
  const [engraving, setEngraving] = useState('');

  const effectivePrice = item.price + selectedMetal.priceAdjustment;
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FCF9F5] border border-[#E8E2D9] rounded-sm shadow-2xl my-auto overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column: Gallery & 3D Launcher */}
        <div className="w-full md:w-1/2 flex flex-col bg-white border-b md:border-b-0 md:border-r border-[#E8E2D9]">
          <div className="relative aspect-square w-full bg-[#FCF9F5] overflow-hidden">
            <img
              src={item.images[selectedImageIndex] || item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {item.badge && (
              <span className="absolute top-4 left-4 px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#745548] bg-[#D6BD9A]/20 border border-[#D6BD9A]/40 rounded-sm font-medium">
                {item.badge}
              </span>
            )}
            <button
              onClick={() => onToggleFavorite(item.id)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#292522] shadow-sm transition-colors"
            >
              <Heart size={18} className={isFavorite ? 'fill-[#A17E70] text-[#A17E70]' : 'text-[#6B6560]'} />
            </button>
          </div>

          {/* Thumbnails + 3D trigger */}
          <div className="p-3 bg-[#FCF9F5] border-t border-[#E8E2D9] flex items-center justify-between gap-2">
            <div className="flex gap-2">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-12 h-12 rounded-sm overflow-hidden border transition-all ${
                    idx === selectedImageIndex ? 'border-[#292522] scale-105 shadow-sm' : 'border-[#E8E2D9] opacity-70'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                onClose();
                onOpen3DStudio(selectedMetal.id);
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#292522] text-[#FAF7F3] rounded-sm text-[10px] uppercase tracking-wider hover:bg-[#A17E70] transition-colors shadow-sm"
              title="Launch 360° WebGL 3D Examination"
            >
              <Box size={13} className="text-[#D6BD9A]" />
              <span>3D Riva Studio</span>
            </button>
          </div>
        </div>

        {/* Right Column: Piece Specifications & Customization */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-medium text-[#745548]">
                  {item.collection}
                </span>
                <h2 className="font-serif text-2xl font-normal text-[#1C1C1A] mt-0.5">{item.title}</h2>
                <p className="text-xs text-[#6B6560] mt-1">{item.subtitle}</p>
              </div>
              <button onClick={onClose} className="text-[#6B6560] hover:text-[#1C1C1A] p-1">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-b border-[#E8E2D9] pb-4">
              <span className="font-serif text-2xl font-medium text-[#292522]">
                {formatCurrency(effectivePrice)}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#745548] font-medium bg-[#D6BD9A]/15 border border-[#D6BD9A]/30 px-2 py-0.5 rounded-sm">
                BIS Hallmarked
              </span>
            </div>

            {/* Metal Selection */}
            <div className="mt-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase tracking-wider font-medium text-[#745548]">
                  Precious Metal
                </span>
                <span className="text-xs text-[#1C1C1A] font-medium">{selectedMetal.name}</span>
              </div>
              <div className="flex gap-2">
                {item.metalOptions.map((metal) => {
                  const isSelected = metal.id === selectedMetal.id;
                  return (
                    <button
                      key={metal.id}
                      onClick={() => setSelectedMetal(metal)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-sm border transition-colors ${
                        isSelected 
                          ? 'border-[#292522] bg-[#292522] text-[#FAF7F3]' 
                          : 'border-[#E8E2D9] bg-white text-[#292522] hover:border-[#82746F]'
                      }`}
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: metal.colorHex }}
                      />
                      <span className="text-[11px]">{metal.karat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ring Sizing */}
            {item.availableSizes && item.availableSizes.length > 0 && (
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-medium text-[#745548]">
                    Select Indian Ring Size
                  </span>
                  <button 
                    onClick={onOpenRingSizer}
                    className="flex items-center gap-1 text-[11px] text-[#A17E70] hover:underline"
                  >
                    <Ruler size={12} />
                    <span>Interactive Caliper</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.availableSizes.map((size) => {
                    const isSelected = size === selectedSize;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 text-xs rounded-sm border transition-colors flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#292522] text-[#FAF7F3] border-[#292522] font-semibold'
                            : 'bg-white text-[#292522] border-[#E8E2D9] hover:border-[#82746F]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bespoke Inside Engraving */}
            {item.allowsEngraving && (
              <div className="mt-5">
                <span className="block text-[10px] uppercase tracking-wider font-medium text-[#745548] mb-1">
                  Bespoke Hand-Engraving (Complimentary)
                </span>
                <input
                  type="text"
                  maxLength={25}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="e.g. A & R • Eternal Love (Max 25 chars)"
                  className="w-full text-xs p-2 bg-white border border-[#E8E2D9] rounded-sm focus:outline-none focus:border-[#292522]"
                />
                {engraving && (
                  <div className="mt-1 text-[11px] text-[#745548] italic font-serif">
                    Band Inscription Preview: "{engraving}"
                  </div>
                )}
              </div>
            )}

            {/* Gemological Specifications */}
            <div className="mt-6 p-3 bg-white border border-[#E8E2D9] rounded-sm text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-medium text-[#745548]">
                <Sparkles size={13} className="text-[#D6BD9A]" />
                Gemological Dossier
              </div>
              <p className="text-[#1C1C1A] text-[11px] leading-relaxed">{item.gemstoneSpecs}</p>
              <p className="text-[#6B6560] text-[11px] leading-relaxed pt-1 border-t border-[#E8E2D9]/70">
                {item.description}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-[#E8E2D9] space-y-2">
            <button
              onClick={() => {
                onAddToCart(item, selectedMetal, selectedSize, engraving);
                onClose();
              }}
              className="w-full py-3.5 bg-[#292522] text-[#FAF7F3] text-xs font-medium tracking-widest uppercase hover:bg-[#A17E70] transition-colors rounded-sm shadow"
            >
              Add to Shopping Bag • {formatCurrency(effectivePrice)}
            </button>
            {onViewFullPage && (
              <button
                onClick={() => {
                  onClose();
                  onViewFullPage(item);
                }}
                className="w-full py-2.5 bg-[#FCF9F5] text-[#292522] border border-[#E8E2D9] text-xs font-medium tracking-widest uppercase hover:border-[#292522] transition-colors rounded-sm"
              >
                View Full Product Details Page
              </button>
            )}
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full py-2.5 bg-transparent text-[#6B6560] text-xs font-medium tracking-widest uppercase hover:text-[#1C1C1A] transition-colors"
            >
              Request Bespoke Commission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
