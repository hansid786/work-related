import React, { useState } from 'react';
import { X, CheckCircle, PackageCheck, ShieldCheck, Info, CreditCard, Building2, Truck } from 'lucide-react';
import { CartItem } from '../types/jewelry';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete
}) => {
  const [fullName, setFullName] = useState('Ananya Singhania');
  const [email, setEmail] = useState('ananya.s@patron.in');
  const [phone, setPhone] = useState('+91 98200 88990');
  const [address, setAddress] = useState('42 Pali Hill Road, Bandra West');
  const [city, setCity] = useState('Mumbai, Maharashtra 400050');
  const [giftNote, setGiftNote] = useState('Celebrating our timeless love and eternity.');
  const [paymentPreference, setPaymentPreference] = useState<'WIRE' | 'DELIVERY' | 'SALON'>('WIRE');
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, curr) => {
    const unitPrice = curr.item.price + curr.selectedMetal.priceAdjustment;
    return acc + unitPrice * curr.quantity;
  }, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = 'RIVA-' + Math.floor(1000 + Math.random() * 9000) + '-IN';
    setOrderConfirmedId(orderId);
    onOrderComplete(orderId);
  };

  if (orderConfirmedId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in font-sans">
        <div className="relative w-full max-w-lg bg-[#FCF9F5] border border-[#D6BD9A] rounded-sm p-6 sm:p-8 text-center shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#D6BD9A]/20 flex items-center justify-center text-[#745548] mb-4">
            <CheckCircle size={36} />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#A17E70] font-semibold">
            Prototype Demonstration • Acquisition Reserved
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1C1A] mt-1 mb-2">
            Acquisition Ref #{orderConfirmedId}
          </h2>
          <p className="text-xs text-[#6B6560] leading-relaxed mb-4">
            Thank you, {fullName}. Your bespoke jewelry acquisition configuration has been logged in this demonstration prototype.
          </p>

          <div className="p-3.5 bg-white border border-[#E8E2D9] rounded-xs text-left text-xs mb-6 space-y-1 text-[#6B6560]">
            <div className="flex justify-between">
              <span className="font-medium text-[#1C1C1A]">Client Destination:</span>
              <span className="truncate max-w-[200px]">{city}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#1C1C1A]">Curated Total:</span>
              <span className="font-serif font-semibold text-[#292522]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#1C1C1A]">Transit Protocol:</span>
              <span className="text-[#745548]">Insured Armored Courier</span>
            </div>
          </div>

          <div className="p-3 bg-[#D6BD9A]/15 border border-[#D6BD9A]/30 rounded-xs text-[11px] text-[#745548] mb-6 flex items-start gap-2 text-left">
            <Info size={16} className="shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> This is an interactive frontend demonstration. No real banking payment or order processing has occurred.
            </span>
          </div>

          <button
            onClick={() => {
              setOrderConfirmedId(null);
              onClose();
            }}
            className="w-full py-3.5 bg-[#292522] text-[#FAF7F3] text-xs font-semibold tracking-widest uppercase hover:bg-[#A17E70] transition-colors rounded-xs shadow"
          >
            Return to High Jewellery Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-[#FCF9F5] border border-[#E8E2D9] rounded-sm p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#745548]">
              DEMONSTRATION STOREFRONT
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1C1A]">
              Riva Jewels White-Glove Acquisition
            </h2>
          </div>
          <button onClick={onClose} className="text-[#6B6560] hover:text-[#1C1C1A] p-1" aria-label="Close Checkout">
            <X size={20} />
          </button>
        </div>

        {/* Prototype Notice Banner */}
        <div className="mt-3 p-3 bg-white border border-[#E8E2D9] rounded-xs text-[11px] text-[#6B6560] flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#D6BD9A] shrink-0" />
          <span>
            Prototype Demo: Real financial gateways are omitted. Test the complete luxury client acquisition journey.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Client Coordinates */}
          <div>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#745548] mb-1.5">
              1. Patron Coordinates & Delivery Destination
            </span>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Full Legal Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                  required
                />
                <input
                  type="tel"
                  placeholder="Mobile (For Delivery OTP)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Private Street Address / Residence"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                required
              />
              <input
                type="text"
                placeholder="City, State & Postal Pin Code"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
                required
              />
            </div>
          </div>

          {/* Complimentary Calligraphy Note */}
          <div>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#745548] mb-1">
              2. Handwritten Calligraphy Card Note (Complimentary)
            </span>
            <textarea
              rows={2}
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              placeholder="Inscribe a personal message enclosed in our gold-wax sealed envelope..."
              className="w-full text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#292522]"
            />
          </div>

          {/* Acquisition Settlement Method (Prototype Mode) */}
          <div>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#745548] mb-1.5">
              3. Preferred Acquisition Settlement
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentPreference('WIRE')}
                className={`p-2.5 text-left border rounded-xs transition-all flex flex-col justify-between ${
                  paymentPreference === 'WIRE'
                    ? 'border-[#292522] bg-[#292522] text-[#FAF7F3]'
                    : 'border-[#E8E2D9] bg-white text-[#292522] hover:border-[#82746F]'
                }`}
              >
                <Building2 size={16} className={paymentPreference === 'WIRE' ? 'text-[#D6BD9A]' : 'text-[#745548]'} />
                <span className="text-[11px] font-medium mt-1">Bank Wire Invoice</span>
                <span className="text-[9px] opacity-75">Direct Atelier RTGS</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentPreference('DELIVERY')}
                className={`p-2.5 text-left border rounded-xs transition-all flex flex-col justify-between ${
                  paymentPreference === 'DELIVERY'
                    ? 'border-[#292522] bg-[#292522] text-[#FAF7F3]'
                    : 'border-[#E8E2D9] bg-white text-[#292522] hover:border-[#82746F]'
                }`}
              >
                <Truck size={16} className={paymentPreference === 'DELIVERY' ? 'text-[#D6BD9A]' : 'text-[#745548]'} />
                <span className="text-[11px] font-medium mt-1">Armored Delivery</span>
                <span className="text-[9px] opacity-75">Concierge POS Handover</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentPreference('SALON')}
                className={`p-2.5 text-left border rounded-xs transition-all flex flex-col justify-between ${
                  paymentPreference === 'SALON'
                    ? 'border-[#292522] bg-[#292522] text-[#FAF7F3]'
                    : 'border-[#E8E2D9] bg-white text-[#292522] hover:border-[#82746F]'
                }`}
              >
                <CreditCard size={16} className={paymentPreference === 'SALON' ? 'text-[#D6BD9A]' : 'text-[#745548]'} />
                <span className="text-[11px] font-medium mt-1">Salon Private Vault</span>
                <span className="text-[9px] opacity-75">Pickup in Mumbai / Delhi</span>
              </button>
            </div>
          </div>

          {/* Investment Breakdown */}
          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xs text-xs space-y-2">
            <div className="flex justify-between text-[#6B6560]">
              <span>Curated Fine Pieces ({cartItems.reduce((acc, c) => acc + c.quantity, 0)}):</span>
              <span className="text-[#1C1C1A] font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#6B6560]">
              <span>Armored Insured Courier (India):</span>
              <span className="text-[#745548] uppercase tracking-wider text-[10px] font-semibold">Complimentary</span>
            </div>
            <div className="flex justify-between text-[#6B6560]">
              <span>BIS Hallmarking & GIA/IGI Certification:</span>
              <span className="text-[#745548] uppercase tracking-wider text-[10px] font-semibold">Included</span>
            </div>
            <div className="flex justify-between items-baseline pt-2.5 border-t border-[#E8E2D9]">
              <div>
                <span className="font-semibold text-[#1C1C1A] block">Total Acquisition:</span>
                <span className="text-[10px] text-[#82746F]">Inclusive of all GST & luxury velvet packaging</span>
              </div>
              <span className="font-serif text-xl sm:text-2xl font-medium text-[#292522]">
                {formatCurrency(subtotal)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#292522] text-[#FAF7F3] text-xs font-semibold tracking-widest uppercase hover:bg-[#A17E70] transition-colors rounded-xs shadow flex items-center justify-center gap-2"
          >
            <PackageCheck size={16} className="text-[#D6BD9A]" />
            <span>Complete Demonstration Order</span>
          </button>
        </form>
      </div>
    </div>
  );
};
