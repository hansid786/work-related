import React, { useState } from 'react';
import { Search, X, ArrowRight, Box } from 'lucide-react';
import { JewelryItem } from '../types/jewelry';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  catalog: JewelryItem[];
  onSelectProduct: (item: JewelryItem) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  catalog,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? catalog.filter(
        (i) =>
          i.title.toLowerCase().includes(query.toLowerCase()) ||
          i.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          i.metalPurity.toLowerCase().includes(query.toLowerCase()) ||
          i.collection.toLowerCase().includes(query.toLowerCase()) ||
          i.categoryLabel?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#292522]/90 backdrop-blur-md flex flex-col items-center p-4 sm:p-10 animate-fade-in">
      {/* Top Close Button */}
      <div className="w-full max-w-3xl flex justify-end">
        <button
          onClick={onClose}
          className="p-2 text-[#FAF7F3] hover:text-[#D6BD9A] transition-colors"
          aria-label="Close Search"
        >
          <X size={26} />
        </button>
      </div>

      {/* Search Input */}
      <div className="w-full max-w-3xl mt-6">
        <div className="relative border-b-2 border-[#D6BD9A]/60 pb-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search high jewellery, solitaires, karat purity, bangles..."
            className="w-full bg-transparent text-xl sm:text-2xl font-serif text-[#FAF7F3] placeholder:text-[#FAF7F3]/40 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FAF7F3]/60 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Popular Search Tags */}
        {!query && (
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#FAF7F3]/70 items-center">
            <span className="uppercase tracking-widest text-[10px] text-[#D6BD9A]">Suggested:</span>
            {['Solstice Solitaire', 'Tennis Bracelet', '18K Yellow Gold', 'Platinum 950', 'Emerald-Cut', 'Bangles'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-xs text-[#FAF7F3] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Results Showcase */}
        {query && (
          <div className="mt-8 max-h-[60vh] overflow-y-auto pr-2 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#D6BD9A] font-semibold">
              {results.length} Found for "{query}"
            </p>

            {results.length === 0 ? (
              <div className="py-12 text-center text-[#FAF7F3]/60">
                <p className="text-sm">No creations matched your criteria.</p>
                <p className="text-xs mt-1">Try searching for "Solstice", "Diamond", or "Gold".</p>
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/15 rounded-xs cursor-pointer transition-colors border border-white/10 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-xs bg-[#FCF9F5]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#FAF7F3] group-hover:text-[#D6BD9A] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#FAF7F3]/70">{item.metalPurity}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-serif text-sm font-semibold text-[#D6BD9A]">
                      {formatPrice(item.price)}
                    </span>
                    <ArrowRight size={16} className="text-[#FAF7F3]/40 group-hover:text-[#D6BD9A] transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
