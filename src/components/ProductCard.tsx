import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { JewelryItem } from '../types/jewelry';

interface ProductCardProps {
  item: JewelryItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewProduct: (item: JewelryItem) => void;
  onQuickView: (item: JewelryItem) => void;
  onQuickAddToCart?: (item: JewelryItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onViewProduct,
  onQuickView,
  onQuickAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div
      className="group bg-white border border-[#E8E2D9] rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewProduct(item)}
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-square w-full bg-[#FCF9F5] overflow-hidden">
        {/* Shimmer skeleton before image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer-loading z-0" />
        )}

        {/* Main Image */}
        <img
          src={item.images[0]}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isHovered && item.images[1] ? 'opacity-0' : 'opacity-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />

        {/* Secondary Angle on Hover */}
        {item.images[1] && (
          <img
            src={item.images[1]}
            alt={`${item.title} Alternate Angle`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}

        {/* Luxury Badge */}
        {item.badge && (
          <span className="absolute top-3 left-3 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] text-[#745548] bg-[#D6BD9A]/30 border border-[#D6BD9A]/60 rounded-xs font-semibold backdrop-blur-xs">
            {item.badge}
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#292522] shadow-xs flex items-center justify-center transition-all z-10"
          title={isFavorite ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart
            size={16}
            className={isFavorite ? 'fill-[#A17E70] text-[#A17E70]' : 'text-[#6B6560]'}
          />
        </button>

        {/* Floating Quick Action Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(item);
            }}
            className="flex-1 py-2 bg-white/95 text-[#292522] hover:bg-[#292522] hover:text-[#FAF7F3] text-[10px] uppercase tracking-widest font-medium rounded-xs border border-[#E8E2D9] shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye size={12} />
            <span>Quick View</span>
          </button>
          {onQuickAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAddToCart(item);
              }}
              className="p-2 bg-[#292522] text-[#FAF7F3] hover:bg-[#A17E70] rounded-xs shadow-sm transition-colors"
              title="Add to Bag"
              aria-label="Quick Add to Bag"
            >
              <ShoppingBag size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Information Container */}
      <div className="p-4 sm:p-5 text-center flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#745548] font-semibold block truncate mb-1">
            {item.metalPurity}
          </span>
          <h3 className="font-serif text-sm sm:text-base font-normal text-[#1C1C1A] group-hover:text-[#A17E70] transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-[11px] text-[#6B6560] font-light mt-1 line-clamp-1">
            {item.subtitle}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E8E2D9]/70 mt-3 flex items-center justify-between">
          <span className="text-[10px] tracking-wider text-[#A17E70] font-medium uppercase">
            BIS Hallmarked
          </span>
          <span className="font-serif text-sm sm:text-base font-semibold text-[#292522]">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    </div>
  );
};
