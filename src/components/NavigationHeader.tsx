import React, { useState } from 'react';
import { 
  Search, Heart, ShoppingBag, Box, Menu, X, ChevronDown, Sparkles 
} from 'lucide-react';
import { RivaLogo } from './RivaLogo';
import { ActivePageView, JewelryCategory } from '../types/jewelry';

interface NavigationHeaderProps {
  activeView: ActivePageView;
  onNavigate: (view: ActivePageView) => void;
  onSelectCategory: (cat: JewelryCategory) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpen3DStudio: () => void;
  onOpenConsultation: () => void;
  onOpenRingSizer: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeView,
  onNavigate,
  onSelectCategory,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenSearch,
  onOpen3DStudio,
  onOpenConsultation,
  onOpenRingSizer
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const categories: { label: string; cat: JewelryCategory }[] = [
    { label: 'All Collections', cat: 'ALL' },
    { label: 'Engagement Rings', cat: 'ENGAGEMENT_RINGS' },
    { label: 'Diamond Rings', cat: 'DIAMOND_RINGS' },
    { label: 'Necklaces', cat: 'NECKLACES' },
    { label: 'Earrings', cat: 'EARRINGS' },
    { label: 'Bracelets', cat: 'BRACELETS' },
    { label: 'Bangles', cat: 'BANGLES' },
    { label: 'Pendants', cat: 'PENDANTS' },
    { label: 'Fine Jewellery', cat: 'FINE_JEWELLERY' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F5]/95 backdrop-blur-md border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#292522] md:hidden hover:text-[#A17E70]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            onClick={() => {
              onNavigate('HOME');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left focus:outline-none"
          >
            <RivaLogo variant="full" />
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[12px] uppercase tracking-[0.16em] font-medium text-[#292522]">
          <button
            onClick={() => {
              onNavigate('HOME');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors py-1 ${activeView === 'HOME' ? 'text-[#A17E70] border-b-2 border-[#A17E70]' : 'hover:text-[#A17E70]'}`}
          >
            Home
          </button>

          {/* Categories Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setCategoryDropdownOpen(true)}
            onMouseLeave={() => setCategoryDropdownOpen(false)}
          >
            <button
              onClick={() => {
                onSelectCategory('ALL');
                onNavigate('CATALOGUE');
              }}
              className={`flex items-center gap-1 transition-colors py-1 ${activeView === 'CATALOGUE' ? 'text-[#A17E70] border-b-2 border-[#A17E70]' : 'hover:text-[#A17E70]'}`}
            >
              <span>Collections</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180 text-[#A17E70]' : ''}`} />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute top-full -left-4 w-56 bg-[#FCF9F5] border border-[#E8E2D9] shadow-xl rounded-sm py-2 z-50 animate-fade-in">
                {categories.map((c) => (
                  <button
                    key={c.cat}
                    onClick={() => {
                      onSelectCategory(c.cat);
                      onNavigate('CATALOGUE');
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[11px] uppercase tracking-wider text-[#292522] hover:bg-[#D6BD9A]/20 hover:text-[#A17E70] transition-colors"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpen3DStudio}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#D6BD9A]/25 border border-[#D6BD9A]/50 text-[#745548] rounded-sm hover:bg-[#D6BD9A]/40 transition-colors shadow-xs"
          >
            <Box size={13} className="text-[#745548]" />
            <span>3D Riva Studio</span>
          </button>

          <button
            onClick={onOpenRingSizer}
            className="hover:text-[#A17E70] transition-colors py-1"
          >
            Ring Caliper
          </button>

          <button
            onClick={onOpenConsultation}
            className="hover:text-[#A17E70] transition-colors py-1"
          >
            Salons
          </button>
        </nav>

        {/* Right: Actions (Search, Wishlist, Bag) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#292522] hover:text-[#A17E70] transition-colors"
            title="Search Catalogue"
          >
            <Search size={20} />
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#292522] hover:text-[#A17E70] transition-colors relative"
            title="Curated Wishlist"
          >
            <Heart size={20} className={wishlistCount > 0 ? 'fill-[#A17E70] text-[#A17E70]' : ''} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#A17E70] text-white text-[9px] flex items-center justify-center font-medium">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="p-2 text-[#292522] hover:text-[#A17E70] transition-colors relative"
            title="Shopping Bag"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#292522] text-[#FAF7F3] text-[9px] flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCF9F5] border-t border-[#E8E2D9] px-5 py-6 space-y-4 shadow-lg animate-fade-in">
          <div className="space-y-2 border-b border-[#E8E2D9] pb-4">
            <span className="text-[10px] uppercase tracking-widest text-[#745548] font-semibold">Store Sections</span>
            <button
              onClick={() => {
                onNavigate('HOME');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm uppercase tracking-wider font-medium text-[#292522] hover:text-[#A17E70]"
            >
              Home
            </button>
            <button
              onClick={() => {
                onSelectCategory('ALL');
                onNavigate('CATALOGUE');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm uppercase tracking-wider font-medium text-[#292522] hover:text-[#A17E70]"
            >
              All Jewellery Catalogue
            </button>
            <button
              onClick={() => {
                onOpen3DStudio();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left py-2 text-sm uppercase tracking-wider font-medium text-[#745548]"
            >
              <Box size={16} />
              <span>3D Riva Studio Configurator</span>
            </button>
          </div>

          <div className="space-y-1.5 border-b border-[#E8E2D9] pb-4">
            <span className="text-[10px] uppercase tracking-widest text-[#745548] font-semibold">Browse By Category</span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {categories.filter(c => c.cat !== 'ALL').map((c) => (
                <button
                  key={c.cat}
                  onClick={() => {
                    onSelectCategory(c.cat);
                    onNavigate('CATALOGUE');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs text-[#6B6560] hover:text-[#292522] py-1"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 border-b border-[#E8E2D9] pb-4">
            <span className="text-[10px] uppercase tracking-widest text-[#745548] font-semibold">The Maison & Client Services</span>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-[#6B6560]">
              <button
                onClick={() => {
                  onNavigate('ABOUT');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-1 hover:text-[#292522]"
              >
                Our Story & Benchwork
              </button>
              <button
                onClick={() => {
                  onNavigate('CARE_GUIDE');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-1 hover:text-[#292522]"
              >
                Jewellery Care Guide
              </button>
              <button
                onClick={() => {
                  onNavigate('SHIPPING_RETURNS');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-1 hover:text-[#292522]"
              >
                Shipping & Returns
              </button>
              <button
                onClick={() => {
                  onNavigate('CONTACT');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-1 hover:text-[#292522]"
              >
                Concierge Contact
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-[#292522] text-[#FAF7F3] text-xs uppercase tracking-widest text-center rounded-xs font-medium"
            >
              Book Salon
            </button>
            <button
              onClick={() => {
                onOpenRingSizer();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 border border-[#292522] text-[#292522] text-xs uppercase tracking-widest text-center rounded-xs font-medium"
            >
              Ring Caliper
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
