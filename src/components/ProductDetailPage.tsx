import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, ShoppingBag, ShieldCheck, Sparkles, 
  Ruler, Box, Truck, RotateCcw, Award, CheckCircle2 
} from 'lucide-react';
import { JewelryItem, MetalOption } from '../types/jewelry';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  item: JewelryItem;
  relatedItems: JewelryItem[];
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (item: JewelryItem, metal: MetalOption, size: number | undefined, engraving: string, quantity: number) => void;
  onSelectProduct: (item: JewelryItem) => void;
  onOpen3DStudio: (metalId: string) => void;
  onOpenRingSizer: () => void;
  onOpenConsultation: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  item,
  relatedItems,
  isFavorite,
  onBack,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
  onOpen3DStudio,
  onOpenRingSizer,
  onOpenConsultation
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState<MetalOption>(item.metalOptions[0]);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(item.availableSizes?.[0]);
  const [engraving, setEngraving] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'SPECS' | 'DELIVERY' | 'CARE'>('DETAILS');

  const effectivePrice = item.price + selectedMetal.priceAdjustment;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-[#FCF9F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#745548] hover:text-[#292522] mb-6 font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Collections</span>
        </button>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Gallery & 3D Launcher (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Viewport */}
            <div className="relative aspect-square w-full bg-white border border-[#E8E2D9] rounded-sm overflow-hidden shadow-sm">
              <img
                src={item.images[selectedImageIndex] || item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {item.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#745548] bg-[#D6BD9A]/30 border border-[#D6BD9A]/50 rounded-xs font-semibold backdrop-blur-xs">
                  {item.badge}
                </span>
              )}

              <button
                onClick={() => onToggleFavorite(item.id)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#292522] shadow-sm transition-colors"
                title="Wishlist"
              >
                <Heart size={20} className={isFavorite ? 'fill-[#A17E70] text-[#A17E70]' : 'text-[#6B6560]'} />
              </button>
            </div>

            {/* Thumbnail Row + 3D Feature Button */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white border border-[#E8E2D9] rounded-sm">
              <div className="flex gap-2.5">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xs overflow-hidden border-2 transition-all ${
                      idx === selectedImageIndex ? 'border-[#292522] scale-102 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => onOpen3DStudio(selectedMetal.id)}
                className="flex items-center gap-2 px-4 py-3 bg-[#292522] text-[#FAF7F3] rounded-xs text-[11px] uppercase tracking-widest hover:bg-[#A17E70] transition-colors shadow-sm"
              >
                <Box size={16} className="text-[#D6BD9A]" />
                <span className="font-medium">Launch 3D Riva Studio</span>
              </button>
            </div>

            {/* Quality & Authenticity Guarantee Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-4 bg-white border border-[#E8E2D9] rounded-sm text-center">
                <Award size={22} className="mx-auto text-[#D6BD9A] mb-2" />
                <h4 className="font-serif text-xs font-medium text-[#1C1C1A]">100% Certified Diamonds</h4>
                <p className="text-[10px] text-[#6B6560] mt-0.5">Natural conflict-free stones GIA & IGI verified</p>
              </div>
              <div className="p-4 bg-white border border-[#E8E2D9] rounded-sm text-center">
                <ShieldCheck size={22} className="mx-auto text-[#D6BD9A] mb-2" />
                <h4 className="font-serif text-xs font-medium text-[#1C1C1A]">BIS Hallmarked</h4>
                <p className="text-[10px] text-[#6B6560] mt-0.5">Government stamped 18K gold and 950 platinum</p>
              </div>
              <div className="p-4 bg-white border border-[#E8E2D9] rounded-sm text-center">
                <Truck size={22} className="mx-auto text-[#D6BD9A] mb-2" />
                <h4 className="font-serif text-xs font-medium text-[#1C1C1A]">Insured Courier</h4>
                <p className="text-[10px] text-[#6B6560] mt-0.5">Complimentary armored transit across India</p>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing Configuration (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E8E2D9] rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                {item.collection}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1C1A] mt-1 leading-tight">
                {item.title}
              </h1>
              <p className="text-xs text-[#6B6560] mt-1.5 font-light">{item.subtitle}</p>

              {/* Price & Taxes */}
              <div className="mt-5 pb-5 border-b border-[#E8E2D9]">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-medium text-[#292522]">
                    {formatPrice(effectivePrice)}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#745548] bg-[#D6BD9A]/20 px-2 py-0.5 rounded-xs">
                    In Stock • Ready to Dispatch
                  </span>
                </div>
                <p className="text-[10px] text-[#82746F] mt-1">Inclusive of all applicable Indian taxes (GST) and luxury packaging.</p>
              </div>

              {/* Metal Customisation Selection */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#745548]">
                    Select Precious Metal
                  </span>
                  <span className="text-xs font-medium text-[#1C1C1A]">{selectedMetal.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {item.metalOptions.map((metal) => {
                    const isSelected = metal.id === selectedMetal.id;
                    return (
                      <button
                        key={metal.id}
                        onClick={() => setSelectedMetal(metal)}
                        className={`flex items-center gap-2 p-2.5 rounded-xs border text-xs transition-all ${
                          isSelected
                            ? 'border-[#292522] bg-[#292522] text-[#FAF7F3] shadow-xs'
                            : 'border-[#E8E2D9] bg-[#FCF9F5] text-[#292522] hover:border-[#82746F]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: metal.colorHex }}
                        />
                        <span className="text-[11px] font-medium truncate">{metal.karat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ring / Bangle Sizing */}
              {item.availableSizes && item.availableSizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#745548]">
                      Select Size ({item.category === 'BANGLES' ? 'Indian Bangle Size' : 'Indian Ring Size'})
                    </span>
                    <button
                      onClick={onOpenRingSizer}
                      className="flex items-center gap-1 text-[11px] text-[#A17E70] hover:underline font-medium"
                    >
                      <Ruler size={13} />
                      <span>Interactive Caliper</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.availableSizes.map((sz) => {
                      const isSelected = sz === selectedSize;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-10 h-10 text-xs font-medium rounded-xs border transition-colors flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#292522] text-[#FAF7F3] border-[#292522]'
                              : 'bg-white text-[#292522] border-[#E8E2D9] hover:border-[#82746F]'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Complimentary Hand Engraving */}
              {item.allowsEngraving && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#745548]">
                      Complimentary Monogram Engraving
                    </span>
                    <span className="text-[10px] text-[#82746F]">Max 25 Characters</span>
                  </div>
                  <input
                    type="text"
                    maxLength={25}
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    placeholder="e.g. A & R • 2026 • Eternal"
                    className="w-full text-xs p-2.5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                  />
                  {engraving && (
                    <p className="mt-1 text-[11px] text-[#745548] italic font-serif">
                      Preview Inscription: "{engraving}"
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#745548]">Quantity</span>
                <div className="flex items-center border border-[#E8E2D9] rounded-xs bg-[#FCF9F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-[#292522] hover:bg-[#E8E2D9]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-[#292522]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-[#292522] hover:bg-[#E8E2D9]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-[#E8E2D9] space-y-3">
              <button
                onClick={() => onAddToCart(item, selectedMetal, selectedSize, engraving, quantity)}
                className="w-full py-4 bg-[#292522] text-[#FAF7F3] text-xs font-semibold tracking-widest uppercase hover:bg-[#A17E70] transition-colors rounded-xs shadow flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                <span>Add to Shopping Bag • {formatPrice(effectivePrice * quantity)}</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="w-full py-3 bg-transparent text-[#292522] border border-[#292522] text-xs font-medium tracking-widest uppercase hover:bg-[#292522] hover:text-[#FAF7F3] transition-colors rounded-xs"
              >
                Book Private Salon Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Care Dossier */}
        <div className="mt-16 bg-white border border-[#E8E2D9] rounded-sm p-6 sm:p-10 shadow-xs">
          <div className="flex border-b border-[#E8E2D9] gap-8 pb-4 text-xs uppercase tracking-widest font-medium overflow-x-auto">
            <button
              onClick={() => setActiveTab('DETAILS')}
              className={`pb-2 transition-colors ${activeTab === 'DETAILS' ? 'text-[#A17E70] border-b-2 border-[#A17E70]' : 'text-[#6B6560] hover:text-[#292522]'}`}
            >
              Description & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('SPECS')}
              className={`pb-2 transition-colors ${activeTab === 'SPECS' ? 'text-[#A17E70] border-b-2 border-[#A17E70]' : 'text-[#6B6560] hover:text-[#292522]'}`}
            >
              Gemological Dossier
            </button>
            <button
              onClick={() => setActiveTab('DELIVERY')}
              className={`pb-2 transition-colors ${activeTab === 'DELIVERY' ? 'text-[#A17E70] border-b-2 border-[#A17E70]' : 'text-[#6B6560] hover:text-[#292522]'}`}
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => setActiveTab('CARE')}
              className={`pb-2 transition-colors ${activeTab === 'CARE' ? 'text-[#A17E70] border-b-2 border-[#A17E70]' : 'text-[#6B6560] hover:text-[#292522]'}`}
            >
              Jewellery Care Guide
            </button>
          </div>

          <div className="py-6 text-xs text-[#292522] leading-relaxed">
            {activeTab === 'DETAILS' && (
              <div className="space-y-4 max-w-3xl">
                <p className="text-sm font-serif leading-relaxed text-[#1C1C1A]">{item.description}</p>
                <div className="p-4 bg-[#FCF9F5] border-l-2 border-[#A17E70] rounded-xs">
                  <h5 className="font-medium text-[#745548] uppercase tracking-wider text-[11px] mb-1">Ancestral Atelier Technique</h5>
                  <p className="text-xs text-[#6B6560]">{item.craftsmanshipStory}</p>
                </div>
              </div>
            )}

            {activeTab === 'SPECS' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                <div className="p-3 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs">
                  <span className="text-[10px] text-[#745548] uppercase tracking-wider font-semibold block">Metal & Purity</span>
                  <span className="text-xs font-medium text-[#1C1C1A]">{item.metalPurity}</span>
                </div>
                <div className="p-3 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs">
                  <span className="text-[10px] text-[#745548] uppercase tracking-wider font-semibold block">Gross Weight</span>
                  <span className="text-xs font-medium text-[#1C1C1A]">{item.specifications?.grossWeight || 'Approx. 5.2g'}</span>
                </div>
                <div className="p-3 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs">
                  <span className="text-[10px] text-[#745548] uppercase tracking-wider font-semibold block">Diamonds / Gemstones</span>
                  <span className="text-xs font-medium text-[#1C1C1A]">{item.gemstoneSpecs}</span>
                </div>
                <div className="p-3 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs">
                  <span className="text-[10px] text-[#745548] uppercase tracking-wider font-semibold block">Hallmark & Certification</span>
                  <span className="text-xs font-medium text-[#1C1C1A]">{item.specifications?.hallmarkCertification || 'BIS 750 Hallmark'}</span>
                </div>
              </div>
            )}

            {activeTab === 'DELIVERY' && (
              <div className="space-y-3 max-w-3xl text-xs text-[#6B6560]">
                <p>• <strong>White-Glove Insured Delivery:</strong> Shipped in discreet, tamper-proof security cases via specialized luxury armored couriers across all pin codes in India.</p>
                <p>• <strong>Dispatch Timeline:</strong> Ready-to-wear pieces ship within 48 business hours. Bespoke engraved pieces require 4 business days.</p>
                <p>• <strong>Complimentary 30-Day Resizing:</strong> If the ring or bangle size requires adjustment, our Mumbai atelier provides one complimentary resizing.</p>
              </div>
            )}

            {activeTab === 'CARE' && (
              <div className="space-y-3 max-w-3xl text-xs text-[#6B6560]">
                <p>• Clean gently using lukewarm water, mild chemical-free soap, and our complimentary camel-hair brush.</p>
                <p>• Store individual jewels inside the supplied suede-lined Riva Keepsake Box to avoid abrasive contact with other gemstones.</p>
                <p>• Bring your piece into any Riva Jewels Salon (Mumbai, New Delhi, or Bengaluru) for annual complimentary ultrasonic steam cleaning and prong inspection.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Creations */}
        {relatedItems.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                COMPLEMENTARY PIECES
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#1C1C1A] mt-1">
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedItems.slice(0, 4).map((rel) => (
                <ProductCard
                  key={rel.id}
                  item={rel}
                  isFavorite={false}
                  onToggleFavorite={onToggleFavorite}
                  onViewProduct={onSelectProduct}
                  onQuickView={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
