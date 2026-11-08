import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, Diamond } from 'lucide-react';
import { CartItem } from '../types/jewelry';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (cartId: string, qty: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, curr) => {
    const unitPrice = curr.item.price + curr.selectedMetal.priceAdjustment;
    return acc + unitPrice * curr.quantity;
  }, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FCF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E2D9] animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D9] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg tracking-widest font-medium text-[#1C1C1A]">SHOPPING BAG</h2>
            <p className="text-[11px] text-[#6B6560] tracking-wide">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Curated Pieces
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-[#6B6560] hover:text-[#1C1C1A]">
            <X size={20} />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 text-[#6B6560]">
              <Diamond size={48} className="text-[#D6BD9A] mb-3 stroke-1" />
              <h3 className="font-serif text-lg text-[#1C1C1A] mb-1">Your jewelry drawer is empty</h3>
              <p className="text-xs max-w-xs">Discover our handcrafted monographs and bespoke creations.</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => {
                const unitPrice = item.item.price + item.selectedMetal.priceAdjustment;
                return (
                  <div key={item.cartId} className="flex gap-3 p-3 bg-white border border-[#E8E2D9] rounded-sm">
                    <img 
                      src={item.item.images[0]} 
                      alt={item.item.title}
                      className="w-20 h-20 object-cover rounded-sm bg-[#FCF9F5]" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-medium text-[#1C1C1A] truncate">{item.item.title}</h4>
                      <div className="text-[11px] text-[#6B6560] mt-0.5">
                        {item.selectedMetal.name} {item.selectedSize ? `• Size ${item.selectedSize}` : ''}
                      </div>
                      {item.engravingText && (
                        <div className="text-[10px] text-[#A17E70] italic mt-0.5">
                          "{item.engravingText}"
                        </div>
                      )}
                      <div className="font-sans text-xs font-semibold text-[#292522] mt-1.5">
                        {formatCurrency(unitPrice * item.quantity)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQty(item.cartId, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center border border-[#E8E2D9] rounded-sm hover:border-[#1C1C1A] text-[#1C1C1A]"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs text-[#1C1C1A] w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center border border-[#E8E2D9] rounded-sm hover:border-[#1C1C1A] text-[#1C1C1A]"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-[#6B6560] hover:text-red-700 p-1 self-start"
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })}

              {/* Complimentary Services Card */}
              <div className="p-3.5 bg-[#D6BD9A]/15 border border-[#D6BD9A]/30 rounded-sm mt-4 text-[11px] text-[#6B6560]">
                <div className="flex items-center gap-1.5 font-medium text-[#745548] uppercase tracking-wider mb-1">
                  <ShieldCheck size={14} />
                  Riva Jewels Complimentary Services
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10px]">
                  <li>Handcrafted Riva Jewels monogram velvet keepsake box</li>
                  <li>Insured white-glove courier shipping across India</li>
                  <li>BIS Hallmark & IGI / GIA Diamond Certification included</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E8E2D9] bg-white space-y-3">
            <div className="flex justify-between text-xs text-[#6B6560]">
              <span>Subtotal</span>
              <span className="font-medium text-[#1C1C1A]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#6B6560]">
              <span>White-Glove Insured Courier</span>
              <span className="text-[#A17E70] font-medium uppercase tracking-wider text-[10px]">Complimentary</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[#E8E2D9]">
              <span className="font-sans text-xs font-semibold tracking-wider text-[#1C1C1A]">TOTAL</span>
              <span className="font-serif text-xl font-medium text-[#292522]">{formatCurrency(subtotal)}</span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-[#292522] text-[#FAF7F3] text-xs font-medium tracking-widest uppercase hover:bg-[#A17E70] transition-colors rounded-sm shadow"
            >
              Proceed to Secure Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
