import React, { useState } from 'react';
import { 
  ArrowLeft, Sparkles, ShieldCheck, Mail, MapPin, Phone, 
  Clock, ChevronDown, CheckCircle, Award, Truck, Gem, RefreshCw 
} from 'lucide-react';
import { ActivePageView } from '../types/jewelry';

interface InformationalViewsProps {
  view: ActivePageView;
  onBack: () => void;
  onOpenConsultation: () => void;
  onNavigateTab?: (v: ActivePageView) => void;
}

export const InformationalViews: React.FC<InformationalViewsProps> = ({
  view,
  onBack,
  onOpenConsultation,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<ActivePageView>(view);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleTabChange = (t: ActivePageView) => {
    setActiveTab(t);
    if (onNavigateTab) onNavigateTab(t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setContactSubmitted(true);
  };

  const faqs = [
    {
      q: 'How are Riva Jewels diamonds certified and verified?',
      a: 'Every solitaire diamond above 0.30 carats in our atelier is accompanied by an independent certificate from the Gemological Institute of America (GIA) or International Gemological Institute (IGI). Each stone features a microscopic laser inscription on its girdle matching its unique laboratory dossier.'
    },
    {
      q: 'What is the BIS Hallmark and what does it certify?',
      a: 'All Riva Jewels gold and platinum creations carry the official Bureau of Indian Standards (BIS) Hallmark stamp. This incorporates the BIS logo, purity grade mark (e.g. 750 for 18K Gold, 950 for Platinum), the Assaying and Hallmarking Centre’s identification mark, and our registered Maison jewelers hallmark.'
    },
    {
      q: 'How does complimentary insured delivery work across India?',
      a: 'We partner with specialized high-security armored logistics couriers (including Sequel Logistics and BVC Logistics). Every consignment is 100% insured from our vault to your doorstep. Deliveries are packaged in tamper-evident security containers requiring photo ID and confidential OTP verification upon handover.'
    },
    {
      q: 'Can I request a bespoke ring size or custom adjustment?',
      a: 'Yes. Riva Jewels offers one complimentary ring resizing within 30 days of receiving your piece. You may also use our on-screen Interactive Ring Caliper tool or request a physical ring sizing gauge to be dispatched to your home.'
    },
    {
      q: 'What is your returns and lifetime exchange policy?',
      a: 'We offer a 14-day unworn return window with full refund in original packaging with tamper tags intact. Furthermore, Riva Jewels provides a Lifetime Exchange & Buyback policy on natural diamonds and hallmarked gold at prevailing market bullion and gemological rates.'
    },
    {
      q: 'How do I book a private consultation at a Riva Jewels Salon?',
      a: 'You can schedule a complimentary one-on-one appointment at our flagship salon in Bandra West, Mumbai, or our heritage salon in South Extension, New Delhi. Virtual appointments with senior gemologists via high-definition camera stream are also available worldwide.'
    }
  ];

  return (
    <div className="bg-[#FCF9F5] min-h-screen py-10 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb / Back Link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#745548] hover:text-[#292522] mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Return to Storefront</span>
        </button>

        {/* Tab Navigation Bar */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-4 border-b border-[#E8E2D9] mb-8">
          {[
            { id: 'ABOUT' as ActivePageView, label: 'The Maison' },
            { id: 'CARE_GUIDE' as ActivePageView, label: 'Jewellery Care' },
            { id: 'SHIPPING_RETURNS' as ActivePageView, label: 'Shipping & Returns' },
            { id: 'CARE_GUIDE' as ActivePageView, label: 'Authenticity & BIS' },
            { id: 'PRIVACY_TERMS' as ActivePageView, label: 'Privacy & Terms' },
            { id: 'CONTACT' as ActivePageView, label: 'Boutiques & Contact' }
          ].map((tab, idx) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={idx}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-[11px] uppercase tracking-widest font-medium rounded-xs border whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#292522] text-[#FAF7F3] border-[#292522] shadow-xs'
                    : 'bg-white text-[#292522] border-[#E8E2D9] hover:border-[#82746F]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* VIEW 1: THE MAISON (ABOUT) */}
        {activeTab === 'ABOUT' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white border border-[#E8E2D9] rounded-sm p-8 sm:p-12 shadow-xs">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                MAISON RIVA JEWELS
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1C1A] mt-2 mb-6">
                Quiet Luxury & Ancestral Indian Benchwork
              </h1>
              <p className="text-sm text-[#6B6560] leading-relaxed font-light mb-4">
                Founded with a singular vision to redefine Indian fine jewellery for the modern connoisseur, Riva Jewels fuses timeless royal craftsmanship with contemporary architectural grace. We reject superficial ostentation in favour of immaculate proportions, hand-rubbed bezels, and the natural fire of untamed diamonds.
              </p>
              <p className="text-sm text-[#6B6560] leading-relaxed font-light mb-8">
                Every solitaire in our collection is hand-selected in Mumbai and Jaipur by graduate gemologists. Forged in 100% recycled 18-karat BIS hallmarked gold and dense Platinum 950, our pieces are conceived as future heirlooms designed to be worn effortlessly from dawn to midnight.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8E2D9]">
                <div className="p-4 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs text-center">
                  <Award size={24} className="mx-auto text-[#D6BD9A] mb-2" />
                  <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">Generational Benchwork</h4>
                  <p className="text-[11px] text-[#6B6560] mt-1">Master artisans with over three decades of ancestral cold-forging and micro-pavé mastery.</p>
                </div>
                <div className="p-4 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs text-center">
                  <ShieldCheck size={24} className="mx-auto text-[#D6BD9A] mb-2" />
                  <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">100% BIS Hallmarked</h4>
                  <p className="text-[11px] text-[#6B6560] mt-1">Government-certified purity stamp with individual assay identification on every alloy.</p>
                </div>
                <div className="p-4 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs text-center">
                  <Sparkles size={24} className="mx-auto text-[#D6BD9A] mb-2" />
                  <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">Conflict-Free Diamonds</h4>
                  <p className="text-[11px] text-[#6B6560] mt-1">Ethically sourced natural stones compliant with the Kimberley Process & GIA/IGI verified.</p>
                </div>
              </div>
            </div>

            {/* Atelier Craftsmanship Photo Essay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-[4/3] rounded-xs overflow-hidden border border-[#E8E2D9] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1000&q=80"
                  alt="Jewelry Bench"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 bg-white border border-[#E8E2D9] rounded-xs flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#745548] mb-1">
                  OUR WORKSHOP PROCESS
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#1C1C1A] mb-3">
                  From Gouache Sketch to Optical Polish
                </h3>
                <p className="text-xs text-[#6B6560] leading-relaxed mb-4 font-light">
                  Before a single gram of gold is poured, our senior designers render gouache watercolours studying light fall. Models are then carved in green jeweller's wax, cast in vacuum chambers, and set with diamonds under stereoscopic microscopes.
                </p>
                <button
                  onClick={onOpenConsultation}
                  className="self-start px-5 py-2.5 bg-[#292522] text-[#FAF7F3] text-xs uppercase tracking-widest rounded-xs hover:bg-[#A17E70] transition-colors"
                >
                  Book Private Salon Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CARE & PRESERVATION GUIDE */}
        {activeTab === 'CARE_GUIDE' && (
          <div className="bg-white border border-[#E8E2D9] rounded-sm p-8 sm:p-12 shadow-xs space-y-8 animate-fade-in">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                LIFETIME PRESERVATION
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1C1A] mt-1 mb-3">
                Jewellery Care & Preservation Guide
              </h1>
              <p className="text-xs text-[#6B6560] max-w-2xl font-light leading-relaxed">
                Fine jewellery is an enduring heirloom created to withstand generations when treated with mindful rituals. Follow our master jewelers' guidance below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs space-y-2">
                <div className="flex items-center gap-2 font-serif text-base font-medium text-[#1C1C1A]">
                  <Gem size={18} className="text-[#D6BD9A]" />
                  <span>Diamonds & Gemstones</span>
                </div>
                <p className="text-xs text-[#6B6560] leading-relaxed">
                  Natural diamonds naturally attract body oils and lotions, which dull their refractive brilliance. Clean them bi-weekly in lukewarm water with mild plant soap. Gently brush around prongs with an extra-soft baby toothbrush, rinse with clean warm water, and dry with a lint-free silk or microfiber cloth.
                </p>
              </div>

              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs space-y-2">
                <div className="flex items-center gap-2 font-serif text-base font-medium text-[#1C1C1A]">
                  <Award size={18} className="text-[#D6BD9A]" />
                  <span>18K Gold & Platinum Alloys</span>
                </div>
                <p className="text-xs text-[#6B6560] leading-relaxed">
                  Store each piece in its individual velvet-lined Riva Jewels travel compartment to prevent metal-on-metal friction. Platinum develops a soft natural patina over time that many collectors cherish; if desired, mirror finish can be refreshed during your annual salon appointment.
                </p>
              </div>

              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs space-y-2">
                <div className="flex items-center gap-2 font-serif text-base font-medium text-[#1C1C1A]">
                  <Sparkles size={18} className="text-[#D6BD9A]" />
                  <span>Natural Pearls & Emeralds</span>
                </div>
                <p className="text-xs text-[#6B6560] leading-relaxed">
                  Pearls and natural emeralds are organic and porous. Never expose them to ultrasonic cleaners, steam, perfume sprays, or alcohol. Apply perfumes and hairsprays before putting on pearls, and wipe gently with a damp chamois cloth after wearing.
                </p>
              </div>

              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs space-y-2">
                <div className="flex items-center gap-2 font-serif text-base font-medium text-[#1C1C1A]">
                  <RefreshCw size={18} className="text-[#D6BD9A]" />
                  <span>Annual Salon Checkup</span>
                </div>
                <p className="text-xs text-[#6B6560] leading-relaxed">
                  We invite our patrons for complimentary annual prong audits, ultrasonic steam cleaning, and security latch tension inspection at any Riva Jewels salon in Mumbai, New Delhi, or Bengaluru.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SHIPPING, ASSURANCE & RETURNS */}
        {activeTab === 'SHIPPING_RETURNS' && (
          <div className="bg-white border border-[#E8E2D9] rounded-sm p-8 sm:p-12 shadow-xs space-y-8 animate-fade-in">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                WHITE-GLOVE LOGISTICS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1C1A] mt-1 mb-3">
                Shipping, Insurance & Returns
              </h1>
              <p className="text-xs text-[#6B6560] max-w-2xl font-light leading-relaxed">
                Every acquisition leaves our vault enclosed in security-sealed containers and travels with comprehensive transit insurance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs">
                <div className="flex items-center gap-2 text-sm font-medium text-[#1C1C1A] mb-2 font-serif">
                  <Truck size={18} className="text-[#D6BD9A]" />
                  <span>Complimentary Armored Courier Transit</span>
                </div>
                <p className="text-xs text-[#6B6560] leading-relaxed">
                  We provide complimentary armored courier delivery across 200+ cities in India within 48 to 72 business hours. For international patrons in the UAE, UK, and US, orders are dispatched via secure FedEx Priority International with customs clearance support.
                </p>
              </div>

              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs">
                <div className="flex items-center gap-2 text-sm font-medium text-[#1C1C1A] mb-2 font-serif">
                  <ShieldCheck size={18} className="text-[#D6BD9A]" />
                  <span>Tamper-Evident Security Packaging</span>
                </div>
                <p className="text-xs text-[#6B6560] leading-relaxed">
                  Each piece is presented inside our signature heavy keepsake velvet case, accompanied by physical GIA/IGI diamond certificates and BIS Hallmarking documentation. Deliveries require matching government photo ID and single-use mobile OTP.
                </p>
              </div>

              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs">
                <div className="flex items-center gap-2 text-sm font-medium text-[#1C1C1A] mb-2 font-serif">
                  <RefreshCw size={18} className="text-[#D6BD9A]" />
                  <span>14-Day Returns & Complimentary Resizing</span>
                </div>
                <p className="text-xs text-[#6B6560] leading-relaxed">
                  If you are not thoroughly captivated by your creation, you may return it within 14 days of delivery for a full refund or exchange. Custom engraved items or bespoke salon commissions are eligible for lifetime exchange and complimentary resizing.
                </p>
              </div>
            </div>

            {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
            <div className="pt-8 border-t border-[#E8E2D9]">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548] block mb-2">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#1C1C1A] mb-6">
                Client Questions & Clarifications
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#E8E2D9] rounded-xs bg-white overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between text-xs font-medium text-[#1C1C1A] hover:bg-[#FCF9F5] transition-colors"
                      >
                        <span className="font-serif text-sm text-[#292522]">{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`text-[#745548] transition-transform duration-200 shrink-0 ml-3 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-[#6B6560] font-light leading-relaxed border-t border-[#E8E2D9]/60 pt-3 bg-[#FCF9F5]/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PRIVACY POLICY & CLIENT TERMS */}
        {activeTab === 'PRIVACY_TERMS' && (
          <div className="bg-white border border-[#E8E2D9] rounded-sm p-8 sm:p-12 shadow-xs space-y-6 animate-fade-in">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
              DISCRETION & COMPLIANCE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1C1A]">
              Privacy Policy & Client Terms of Service
            </h1>
            <div className="space-y-4 text-xs text-[#6B6560] leading-relaxed font-light">
              <p>
                <strong>1. Client Discretion & Data Encryption:</strong> Riva Jewels operates with absolute discretion. All personal records, shipping coordinates, and bespoke inquiries are encrypted according to 256-bit SSL protocols. We never disclose, sell, or license patron data to third-party commercial marketing entities.
              </p>
              <p>
                <strong>2. Product Representation & Purity Standards:</strong> Every item displayed represents genuine benchmark craftsmanship. Natural diamonds and gemstones exhibit slight organic color nuances that reflect their geological authenticity. Gross weights and diamond carat weights are calibrated to within ±0.01 carats.
              </p>
              <p>
                <strong>3. Demonstration Prototype Notice:</strong> This digital storefront is a high-fidelity frontend customer experience prototype. No live banking, UPI, or credit card transactions are executed. Orders created in this portal generate bespoke prototype acquisitions for review.
              </p>
              <p>
                <strong>4. Intellectual Property:</strong> All designs, proprietary bezel geometries, photography, 3D procedural models, and the trademark "RIVA JEWELS" are protected under applicable intellectual property laws.
              </p>
            </div>
          </div>
        )}

        {/* VIEW 5: BOUTIQUES & CONTACT */}
        {activeTab === 'CONTACT' && (
          <div className="bg-white border border-[#E8E2D9] rounded-sm p-8 sm:p-12 shadow-xs space-y-8 animate-fade-in">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                SALONS & PRIVATE INQUIRIES
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1C1A] mt-1 mb-3">
                Connect with the Riva Jewels Concierge
              </h1>
              <p className="text-xs text-[#6B6560] font-light leading-relaxed">
                Whether commissioning a bespoke engagement solitaire, inquiring about diamond availability, or planning a private salon viewing, our concierge is at your service.
              </p>
            </div>

            {/* Salon Locations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs space-y-2">
                <MapPin size={20} className="text-[#A17E70]" />
                <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">Bandra West Salon</h4>
                <p className="text-xs text-[#6B6560] font-light">
                  42 Pali Hill Road, Bandra West<br />
                  Mumbai, Maharashtra 400050<br />
                  +91 (022) 2640-1920
                </p>
                <span className="text-[10px] uppercase tracking-wider text-[#745548] font-semibold block pt-1">
                  Private Valet Parking Available
                </span>
              </div>

              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs space-y-2">
                <MapPin size={20} className="text-[#A17E70]" />
                <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">South Extension Salon</h4>
                <p className="text-xs text-[#6B6560] font-light">
                  Part II, D-Block Boulevard<br />
                  New Delhi 110049<br />
                  +91 (011) 4105-8822
                </p>
                <span className="text-[10px] uppercase tracking-wider text-[#745548] font-semibold block pt-1">
                  By Private Appointment Only
                </span>
              </div>

              <div className="p-5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs space-y-2">
                <MapPin size={20} className="text-[#A17E70]" />
                <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">Lavelle Road Atelier</h4>
                <p className="text-xs text-[#6B6560] font-light">
                  18 Lavelle Road, Shanthala Nagar<br />
                  Bengaluru, Karnataka 560001<br />
                  +91 (080) 2221-7711
                </p>
                <span className="text-[10px] uppercase tracking-wider text-[#745548] font-semibold block pt-1">
                  Gemological Viewing Suite
                </span>
              </div>
            </div>

            {/* Direct Contact Inquiries Form */}
            <div className="pt-8 border-t border-[#E8E2D9]">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#745548] block mb-1">
                  DIRECT CONCIERGE DISPATCH
                </span>
                <h3 className="font-serif text-xl font-normal text-[#1C1C1A] mb-4">
                  Send a Private Note to Our Master Jeweler
                </h3>

                {contactSubmitted ? (
                  <div className="p-4 bg-[#D6BD9A]/20 border border-[#D6BD9A]/50 rounded-xs flex items-center gap-3 text-xs text-[#745548]">
                    <CheckCircle size={18} className="text-[#745548] shrink-0" />
                    <span>Your private message has been received. Our senior salon concierge will contact you within 4 business hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full text-xs p-3 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                      />
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Your Email Address"
                        className="w-full text-xs p-3 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                      />
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Share details regarding your bespoke inquiry, piece of interest, or appointment request..."
                      className="w-full text-xs p-3 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#292522] text-[#FAF7F3] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#A17E70] transition-colors"
                      >
                        Transmit Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={onOpenConsultation}
                        className="px-6 py-3 bg-white border border-[#292522] text-[#292522] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#292522] hover:text-[#FAF7F3] transition-colors"
                      >
                        Schedule Salon Visit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
