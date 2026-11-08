import React from 'react';
import { X, Heart, ShoppingBag, Eye, Trash2, ArrowRight } from 'lucide-react';
import { JewelryItem } from '../types/jewelry';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: JewelryItem[];
  onRemoveFromWishlist: (id: string) => void;
  onMoveToBag: (item: JewelryItem) => void;
  onViewProduct: (item: JewelryItem) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToBag,
  onViewProduct
}) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#FCF9F5] border border-[#E8E2D9] rounded-sm p-6 shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
          <div className="flex items-center gap-2">
            <Heart size={20} className="fill-[#A17E70] text-[#A17E70]" />
            <div>
              <h2 className="font-serif text-xl font-medium text-[#1C1C1A]">CURATED WISHLIST</h2>
              <p className="text-[11px] text-[#6B6560]">{wishlistItems.length} Saved Fine Creations</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#6B6560] hover:text-[#1C1C1A]">
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 text-[#6B6560]">
              <Heart size={36} className="mx-auto text-[#D6BD9A] mb-3 stroke-1" />
              <h3 className="font-serif text-base text-[#1C1C1A] mb-1">Your wishlist is empty</h3>
              <p className="text-xs">Explore our jewellery catalogue and save your desired monographs.</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between gap-4 p-3 bg-white border border-[#E8E2D9] rounded-xs"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-xs cursor-pointer bg-[#FCF9F5]"
                  onClick={() => {
                    onViewProduct(item);
                    onClose();
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      onViewProduct(item);
                      onClose();
                    }}
                    className="font-serif text-sm font-medium text-[#1C1C1A] truncate cursor-pointer hover:text-[#A17E70]"
                  >
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6560] truncate">{item.metalPurity}</p>
                  <p className="font-sans text-xs font-semibold text-[#292522] mt-1">{formatPrice(item.price)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onMoveToBag(item);
                      onRemoveFromWishlist(item.id);
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-[#292522] text-[#FAF7F3] rounded-xs text-[10px] uppercase tracking-wider hover:bg-[#A17E70] transition-colors"
                  >
                    <ShoppingBag size={12} />
                    <span>Move to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="p-2 text-[#6B6560] hover:text-red-700"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="pt-3 border-t border-[#E8E2D9] flex justify-between items-center text-xs text-[#6B6560]">
            <span>Wishlist preserved in your browser session</span>
            <button
              onClick={onClose}
              className="text-[#292522] hover:text-[#A17E70] font-medium uppercase tracking-wider text-[11px]"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
