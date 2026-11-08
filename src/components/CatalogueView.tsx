import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { JewelryItem, JewelryCategory } from '../types/jewelry';
import { ProductCard } from './ProductCard';

interface CatalogueViewProps {
  catalog: JewelryItem[];
  selectedCategory: JewelryCategory;
  onSelectCategory: (cat: JewelryCategory) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onViewProduct: (item: JewelryItem) => void;
  onQuickView: (item: JewelryItem) => void;
  onQuickAddToCart: (item: JewelryItem) => void;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  catalog,
  selectedCategory,
  onSelectCategory,
  favorites,
  onToggleFavorite,
  onViewProduct,
  onQuickView,
  onQuickAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'FEATURED' | 'PRICE_LOW_HIGH' | 'PRICE_HIGH_LOW' | 'NEWEST'>('FEATURED');
  const [filterMetal, setFilterMetal] = useState<string>('ALL');

  const categories: { label: string; cat: JewelryCategory }[] = [
    { label: 'All Pieces', cat: 'ALL' },
    { label: 'Engagement Rings', cat: 'ENGAGEMENT_RINGS' },
    { label: 'Diamond Rings', cat: 'DIAMOND_RINGS' },
    { label: 'Necklaces', cat: 'NECKLACES' },
    { label: 'Earrings', cat: 'EARRINGS' },
    { label: 'Bracelets', cat: 'BRACELETS' },
    { label: 'Bangles', cat: 'BANGLES' },
    { label: 'Pendants', cat: 'PENDANTS' },
    { label: 'Fine Jewellery', cat: 'FINE_JEWELLERY' },
  ];

  // Filtering
  const filtered = catalog.filter((item) => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (filterMetal !== 'ALL') {
      if (filterMetal === 'YELLOW' && !item.metalPurity.includes('YELLOW')) return false;
      if (filterMetal === 'ROSE' && !item.metalPurity.includes('ROSE')) return false;
      if (filterMetal === 'PLATINUM' && !item.metalPurity.includes('PLATINUM') && !item.metalPurity.includes('WHITE')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.collection.toLowerCase().includes(q) ||
        item.metalPurity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'PRICE_LOW_HIGH') return a.price - b.price;
    if (sortBy === 'PRICE_HIGH_LOW') return b.price - a.price;
    if (sortBy === 'NEWEST') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    return 0; // FEATURED
  });

  return (
    <div className="bg-[#FCF9F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
            RIVA JEWELS CURATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1C1A] mt-1">
            {categories.find((c) => c.cat === selectedCategory)?.label || 'High Jewellery Catalogue'}
          </h1>
          <p className="text-xs text-[#6B6560] mt-2 max-w-xl mx-auto font-light">
            Each creation is an interplay of rare natural gemstones, 18-karat BIS hallmarked gold, and master craftsmanship.
          </p>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex gap-2 pb-4 overflow-x-auto scrollbar-none border-b border-[#E8E2D9] mb-8">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.cat;
            return (
              <button
                key={c.cat}
                onClick={() => onSelectCategory(c.cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-widest font-medium rounded-xs border whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#292522] text-[#FAF7F3] border-[#292522] shadow-xs'
                    : 'bg-white text-[#292522] border-[#E8E2D9] hover:border-[#82746F]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Filter & Sort Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#E8E2D9] rounded-sm mb-8 shadow-xs">
          {/* Search in catalogue */}
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82746F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by gem, gold, cut..."
              className="w-full text-xs pl-8 pr-3 py-2 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs focus:outline-none focus:border-[#745548]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#82746F]">
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Metal Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#6B6560]">
              <span className="text-[10px] uppercase tracking-wider font-semibold">Alloy:</span>
              <select
                value={filterMetal}
                onChange={(e) => setFilterMetal(e.target.value)}
                className="text-xs p-1.5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs focus:outline-none text-[#292522]"
              >
                <option value="ALL">All Metals</option>
                <option value="YELLOW">Yellow Gold</option>
                <option value="ROSE">Rose Gold</option>
                <option value="PLATINUM">Platinum / White Gold</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 text-xs text-[#6B6560]">
              <span className="text-[10px] uppercase tracking-wider font-semibold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs p-1.5 bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs focus:outline-none text-[#292522]"
              >
                <option value="FEATURED">Curated Picks</option>
                <option value="PRICE_LOW_HIGH">Price: Low to High</option>
                <option value="PRICE_HIGH_LOW">Price: High to Low</option>
                <option value="NEWEST">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E8E2D9] rounded-sm p-8 max-w-md mx-auto">
            <h3 className="font-serif text-lg text-[#1C1C1A] mb-1">No pieces match your filters</h3>
            <p className="text-xs text-[#6B6560] mb-4">Try clearing your search query or selecting a different metal alloy.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterMetal('ALL');
                onSelectCategory('ALL');
              }}
              className="px-4 py-2 bg-[#292522] text-[#FAF7F3] text-xs uppercase tracking-wider rounded-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sorted.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                isFavorite={favorites.has(item.id)}
                onToggleFavorite={onToggleFavorite}
                onViewProduct={onViewProduct}
                onQuickView={onQuickView}
                onQuickAddToCart={onQuickAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
