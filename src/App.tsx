import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Check, ChevronRight, ArrowRight, ShieldCheck, 
  Award, Truck, Box, Calendar, Heart, Eye, ArrowLeft, Ruler, 
  Gem, RefreshCw, Lock 
} from 'lucide-react';
import { CATALOG } from './data/catalog';
import { JewelryItem, JewelryCategory, CartItem, MetalOption, ActivePageView } from './types/jewelry';
import { AnnouncementBar } from './components/AnnouncementBar';
import { NavigationHeader } from './components/NavigationHeader';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CatalogueView } from './components/CatalogueView';
import { ThreeJewelryStudio, DiamondShape } from './components/ThreeJewelryStudio';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RingSizerModal } from './components/RingSizerModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { SearchOverlay } from './components/SearchOverlay';
import { ConsultationModal } from './components/ConsultationModal';
import { CheckoutModal } from './components/CheckoutModal';
import { InformationalViews } from './components/InformationalViews';
import { RivaLogo } from './components/RivaLogo';

export const App: React.FC = () => {
  // Navigation View State
  const [activeView, setActiveView] = useState<ActivePageView>('HOME');
  const [activeCategory, setActiveCategory] = useState<JewelryCategory>('ALL');

  // Selected Product for Dedicated Page or Quick View Modal
  const [selectedProduct, setSelectedProduct] = useState<JewelryItem | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<JewelryItem | null>(null);

  // 3D Studio Settings
  const [is3DStudioOpen, setIs3DStudioOpen] = useState(false);
  const [initialStudioMetal, setInitialStudioMetal] = useState('18k_yellow');

  // Modals
  const [isRingSizerOpen, setIsRingSizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // User State (Persisted in localStorage)
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('riva_wishlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      // fallback
    }
    return new Set(['item_solstice_ring', 'item_etoile_tennis', 'item_cuff_bangle']);
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('riva_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [
      {
        cartId: 'cart_demo_1',
        item: CATALOG[0],
        selectedMetal: CATALOG[0].metalOptions[0],
        selectedSize: 14.0,
        engravingText: 'Eternal Love • R',
        quantity: 1
      }
    ];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('riva_wishlist', JSON.stringify(Array.from(favorites)));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('riva_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Piece removed from your wishlist');
      } else {
        next.add(id);
        showToast('Added piece to your curated wishlist');
      }
      return next;
    });
  };

  const addToCart = (
    item: JewelryItem, 
    metal: MetalOption, 
    size: number | undefined, 
    engraving: string, 
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (ci) => ci.item.id === item.id && ci.selectedMetal.id === metal.id && ci.selectedSize === size && ci.engravingText === engraving
      );
      if (existing) {
        return prev.map((ci) => (ci.cartId === existing.cartId ? { ...ci, quantity: ci.quantity + quantity } : ci));
      } else {
        const newItem: CartItem = {
          cartId: 'cart_' + Date.now(),
          item,
          selectedMetal: metal,
          selectedSize: size,
          engravingText: engraving,
          quantity
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${item.title} to your Shopping Bag`);
    setIsCartOpen(true);
  };

  const updateCartQty = (cartId: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
    } else {
      setCartItems((prev) => prev.map((i) => (i.cartId === cartId ? { ...i, quantity: qty } : i)));
    }
  };

  const removeCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
    showToast('Piece removed from bag');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    showToast('Welcome to the Riva Jewels Private Salon Gazette');
  };

  // Curated collections for Homepage
  const bestsellers = CATALOG.filter((i) => i.isBestseller);
  const newArrivals = CATALOG.filter((i) => i.isNewArrival);
  const wishlistItemsList = CATALOG.filter((i) => favorites.has(i.id));

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // If Full-Screen 3D Studio is open
  if (is3DStudioOpen) {
    return (
      <ThreeJewelryStudio
        initialMetalId={initialStudioMetal}
        onClose={() => setIs3DStudioOpen(false)}
        onAddToCart={(config) => {
          const baseItem = CATALOG[0];
          const chosenMetal = baseItem.metalOptions.find((m) => m.id === config.metalId) || baseItem.metalOptions[0];
          const customItem: JewelryItem = {
            ...baseItem,
            id: `bespoke_3d_${Date.now()}`,
            title: `Bespoke 3D ${config.shape.toUpperCase()} ${config.stoneName}`,
            subtitle: `Custom Configured in 3D Riva Studio • ${config.metalName}`,
            price: config.price - chosenMetal.priceAdjustment,
            gemstoneSpecs: `${config.stoneName} (${config.shape.toUpperCase()}) • Custom 3D Setting`
          };
          addToCart(customItem, chosenMetal, 14, `3D Atelier #${Math.floor(1000 + Math.random() * 9000)}`, 1);
          setIs3DStudioOpen(false);
        }}
        onOpenConsultation={() => {
          setIs3DStudioOpen(false);
          setIsConsultationOpen(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF9F5] text-[#1C1C1A] flex flex-col font-sans selection:bg-[#D6BD9A]/30">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#292522] text-[#FAF7F3] px-5 py-3 rounded-xs shadow-2xl border border-[#D6BD9A]/40 flex items-center gap-3 text-xs tracking-wide animate-slide-down">
          <Check size={16} className="text-[#D6BD9A]" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-3 text-white/60 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* 1. Announcement Bar */}
      <AnnouncementBar onBookAppointment={() => setIsConsultationOpen(true)} />

      {/* 2. Navigation Header */}
      <NavigationHeader
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveView('CATALOGUE');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        wishlistCount={favorites.size}
        cartCount={totalCartCount}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpen3DStudio={() => {
          setInitialStudioMetal('18k_yellow');
          setIs3DStudioOpen(true);
        }}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenRingSizer={() => setIsRingSizerOpen(true)}
      />

      {/* 3. Main Views Switching */}
      <main className="flex-1">
        {/* VIEW: DEDICATED PRODUCT DETAIL PAGE */}
        {activeView === 'PRODUCT_DETAIL' && selectedProduct && (
          <ProductDetailPage
            item={selectedProduct}
            relatedItems={CATALOG.filter((i) => i.id !== selectedProduct.id && (i.category === selectedProduct.category || i.isBestseller))}
            isFavorite={favorites.has(selectedProduct.id)}
            onBack={() => setActiveView('CATALOGUE')}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
            onSelectProduct={(item) => {
              setSelectedProduct(item);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpen3DStudio={(metalId) => {
              setInitialStudioMetal(metalId);
              setIs3DStudioOpen(true);
            }}
            onOpenRingSizer={() => setIsRingSizerOpen(true)}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}

        {/* VIEW: CATALOGUE PAGE */}
        {activeView === 'CATALOGUE' && (
          <CatalogueView
            catalog={CATALOG}
            selectedCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onViewProduct={(item) => {
              setSelectedProduct(item);
              setActiveView('PRODUCT_DETAIL');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickView={(item) => setQuickViewProduct(item)}
            onQuickAddToCart={(item) => addToCart(item, item.metalOptions[0], item.availableSizes?.[0], '')}
          />
        )}

        {/* VIEW: INFORMATIONAL / STATIC PAGES */}
        {(activeView === 'ABOUT' || activeView === 'CARE_GUIDE' || activeView === 'SHIPPING_RETURNS' || activeView === 'PRIVACY_TERMS' || activeView === 'CONTACT') && (
          <InformationalViews
            view={activeView}
            onBack={() => setActiveView('HOME')}
            onOpenConsultation={() => setIsConsultationOpen(true)}
            onNavigateTab={(tab) => setActiveView(tab)}
          />
        )}

        {/* VIEW: HOMEPAGE (EDITORIAL LUXURY STOREFRONT) */}
        {activeView === 'HOME' && (
          <>
            {/* Hero Section */}
            <section className="relative w-full aspect-[4/3] sm:aspect-[21/9] max-h-[640px] bg-[#292522] overflow-hidden flex items-end">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80"
                alt="Riva Jewels Campaign"
                className="absolute inset-0 w-full h-full object-cover opacity-60 scale-102 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-16 w-full text-white">
                <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#D6BD9A] bg-black/40 border border-[#D6BD9A]/40 rounded-xs mb-3 font-semibold">
                  RIVA JEWELS • HAUTE CREATIONS • MUMBAI • NEW DELHI
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight max-w-2xl">
                  The Riva Solstice Collection
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-stone-200 max-w-xl font-light leading-relaxed">
                  Mastercrafted 18-karat BIS hallmarked gold & certified natural diamonds sculpted for eternal brilliance.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setSelectedProduct(CATALOG[0]);
                      setActiveView('PRODUCT_DETAIL');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-[#FCF9F5] text-[#292522] hover:bg-white text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors shadow"
                  >
                    Discover Signature Piece
                  </button>
                  <button
                    onClick={() => {
                      setInitialStudioMetal('18k_yellow');
                      setIs3DStudioOpen(true);
                    }}
                    className="px-6 py-3 bg-[#D6BD9A] text-[#292522] hover:bg-[#e4cfb0] text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors shadow flex items-center gap-2"
                  >
                    <Box size={15} />
                    <span>3D Riva Studio Configurator</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory('ALL');
                      setActiveView('CATALOGUE');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 border border-white/70 hover:border-white text-white text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors"
                  >
                    Explore Catalogue
                  </button>
                </div>
              </div>
            </section>

            {/* Authenticity & Hallmark Strip */}
            <section className="bg-white border-b border-[#E8E2D9] py-5 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div className="flex flex-col items-center justify-center p-2">
                  <ShieldCheck size={20} className="text-[#D6BD9A] mb-1.5" />
                  <span className="font-serif text-xs font-medium text-[#1C1C1A]">100% BIS Hallmarked</span>
                  <span className="text-[10px] text-[#6B6560]">Government 750 & Pt950</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2">
                  <Award size={20} className="text-[#D6BD9A] mb-1.5" />
                  <span className="font-serif text-xs font-medium text-[#1C1C1A]">Certified Diamonds</span>
                  <span className="text-[10px] text-[#6B6560]">GIA & IGI Laser Inscribed</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2">
                  <Gem size={20} className="text-[#D6BD9A] mb-1.5" />
                  <span className="font-serif text-xs font-medium text-[#1C1C1A]">Conflict-Free Natural</span>
                  <span className="text-[10px] text-[#6B6560]">Kimberley Process</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2">
                  <Truck size={20} className="text-[#D6BD9A] mb-1.5" />
                  <span className="font-serif text-xs font-medium text-[#1C1C1A]">Armored Courier Transit</span>
                  <span className="text-[10px] text-[#6B6560]">Complimentary & Insured</span>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center p-2">
                  <RefreshCw size={20} className="text-[#D6BD9A] mb-1.5" />
                  <span className="font-serif text-xs font-medium text-[#1C1C1A]">Lifetime Exchange</span>
                  <span className="text-[10px] text-[#6B6560]">Buyback & 30-Day Resizing</span>
                </div>
              </div>
            </section>

            {/* Featured Collections Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
              <div className="text-center mb-10">
                <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                  EXQUISITE HIGH MONOGRAPHS
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C1C1A] mt-1">
                  Featured Collections
                </h2>
                <p className="text-xs text-[#6B6560] mt-2 max-w-xl mx-auto font-light">
                  Distinctive design monographs conceived to honor milestone ceremonies and daily quiet luxury.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Solstice Heritage',
                    tag: 'SIGNATURE SOLITAIRES',
                    desc: 'Organic fluid low-profile bezels hugging hand-selected oval and emerald-cut natural diamonds.',
                    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
                    cat: 'ENGAGEMENT_RINGS' as JewelryCategory
                  },
                  {
                    title: 'High Jewellery Suite',
                    tag: 'ROYAL GEMSTONES',
                    desc: 'Ceylon velvety blue sapphires, Zambian vivid emeralds, and continuous Riviera collar necklaces.',
                    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
                    cat: 'DIAMOND_RINGS' as JewelryCategory
                  },
                  {
                    title: 'Eternity Monograph',
                    tag: 'DIAMOND CONTINUUM',
                    desc: 'French-cut micro pavé eternity bands and articulated tennis bracelets with secret safety clasps.',
                    image: 'https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=800&q=80',
                    cat: 'BRACELETS' as JewelryCategory
                  }
                ].map((col, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveCategory(col.cat);
                      setActiveView('CATALOGUE');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group relative aspect-[4/5] rounded-xs overflow-hidden cursor-pointer border border-[#E8E2D9] shadow-sm flex flex-col justify-end p-6"
                  >
                    <img
                      src={col.image}
                      alt={col.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="relative z-10 text-white">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#D6BD9A] font-semibold block mb-1">
                        {col.tag}
                      </span>
                      <h3 className="font-serif text-2xl font-normal group-hover:text-[#D6BD9A] transition-colors">
                        {col.title}
                      </h3>
                      <p className="text-xs text-stone-300 font-light mt-1.5 line-clamp-2">
                        {col.desc}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-wider text-white font-semibold">
                        <span>Explore Collection</span>
                        <ArrowRight size={12} className="text-[#D6BD9A] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shop By Category Grid (All 8 Categories) */}
            <section className="bg-white border-y border-[#E8E2D9] py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                  <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                    CURATED SILHOUETTES
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C1C1A] mt-1">
                    Shop by Category
                  </h2>
                  <p className="text-xs text-[#6B6560] mt-1.5 font-light">
                    Select a silhouette to browse hand-crafted monographs and bespoke offerings.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    {
                      name: 'Engagement Rings',
                      cat: 'ENGAGEMENT_RINGS' as JewelryCategory,
                      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
                      desc: 'Solitaires & Bezels'
                    },
                    {
                      name: 'Diamond Rings',
                      cat: 'DIAMOND_RINGS' as JewelryCategory,
                      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80',
                      desc: 'Cocktail & Eternity'
                    },
                    {
                      name: 'Necklaces',
                      cat: 'NECKLACES' as JewelryCategory,
                      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
                      desc: 'Rivieras & Medallions'
                    },
                    {
                      name: 'Earrings',
                      cat: 'EARRINGS' as JewelryCategory,
                      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
                      desc: 'Studs & Chandelier Drops'
                    },
                    {
                      name: 'Bracelets',
                      cat: 'BRACELETS' as JewelryCategory,
                      image: 'https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=600&q=80',
                      desc: 'Tennis & Charms'
                    },
                    {
                      name: 'Bangles',
                      cat: 'BANGLES' as JewelryCategory,
                      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
                      desc: 'Fluted Cuffs & Polki Kadas'
                    },
                    {
                      name: 'Pendants',
                      cat: 'PENDANTS' as JewelryCategory,
                      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
                      desc: 'Solitaire & Halos'
                    },
                    {
                      name: 'Fine Jewellery',
                      cat: 'FINE_JEWELLERY' as JewelryCategory,
                      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80',
                      desc: 'Signets & Royal Suites'
                    }
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        setActiveCategory(item.cat);
                        setActiveView('CATALOGUE');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group relative aspect-[3/4] rounded-xs overflow-hidden cursor-pointer shadow-xs border border-[#E8E2D9]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-x-3 bottom-4 text-white text-center">
                        <span className="text-[9px] uppercase tracking-widest text-[#D6BD9A] font-medium block">
                          {item.desc}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-medium mt-0.5 group-hover:text-[#D6BD9A] transition-colors">
                          {item.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/80 group-hover:text-white mt-1">
                          <span>Explore Selection</span>
                          <ArrowRight size={10} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bestselling Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-10 text-center sm:text-left gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                    MOST REVERED CREATIONS
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C1C1A] mt-1">
                    Bestselling Monographs
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setActiveCategory('ALL');
                    setActiveView('CATALOGUE');
                  }}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#745548] hover:text-[#292522] border-b border-[#745548] pb-0.5"
                >
                  <span>View Entire Selection</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {bestsellers.slice(0, 4).map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isFavorite={favorites.has(item.id)}
                    onToggleFavorite={toggleFavorite}
                    onViewProduct={(p) => {
                      setSelectedProduct(p);
                      setActiveView('PRODUCT_DETAIL');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onQuickAddToCart={(p) => addToCart(p, p.metalOptions[0], p.availableSizes?.[0], '')}
                  />
                ))}
              </div>
            </section>

            {/* Interactive 3D Riva Studio Feature Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
              <div className="bg-white border border-[#E8E2D9] rounded-sm p-6 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm">
                <div className="max-w-xl">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#745548] flex items-center gap-2">
                    <Box size={14} className="text-[#D6BD9A]" />
                    <span>THREE.JS 3D RIVA JEWELS STUDIO</span>
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C1C1A] mt-3 mb-4 leading-tight">
                    Examine Solitaires in 360° Studio PBR
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed font-light mb-6">
                    Experience our composite 12-part procedural 3D jewelry model with physical ACES Filmic lighting,
                    diamond refractive index dispersion, real-time metal alloy switching, and cut silhouette options right in your browser.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setInitialStudioMetal('18k_yellow');
                        setIs3DStudioOpen(true);
                      }}
                      className="px-6 py-3 bg-[#292522] text-[#FAF7F3] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#A17E70] transition-colors shadow flex items-center gap-2"
                    >
                      <Box size={14} className="text-[#D6BD9A]" />
                      <span>Launch 3D Studio</span>
                    </button>
                    <button
                      onClick={() => setIsRingSizerOpen(true)}
                      className="px-5 py-3 border border-[#292522] text-[#292522] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#292522] hover:text-[#FAF7F3] transition-colors flex items-center gap-1.5"
                    >
                      <Ruler size={14} />
                      <span>Ring Caliper Tool</span>
                    </button>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setInitialStudioMetal('18k_yellow');
                    setIs3DStudioOpen(true);
                  }}
                  className="relative w-full max-w-sm aspect-square bg-[#FCF9F5] border border-[#E8E2D9] rounded-xs overflow-hidden flex items-center justify-center cursor-pointer group shadow-inner"
                >
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
                    alt="3D Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    <div className="px-5 py-2.5 bg-white/95 rounded-xs shadow-md flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#292522]">
                      <Box size={16} className="text-[#D6BD9A]" />
                      <span>Launch 3D Configurator</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* New Arrivals Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <div className="text-center mb-10">
                <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                  FRESH FROM THE BENCH
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C1C1A] mt-1">
                  New Season Arrivals
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {newArrivals.slice(0, 4).map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isFavorite={favorites.has(item.id)}
                    onToggleFavorite={toggleFavorite}
                    onViewProduct={(p) => {
                      setSelectedProduct(p);
                      setActiveView('PRODUCT_DETAIL');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onQuickAddToCart={(p) => addToCart(p, p.metalOptions[0], p.availableSizes?.[0], '')}
                  />
                ))}
              </div>
            </section>

            {/* Brand Craftsmanship Section */}
            <section className="bg-white border-y border-[#E8E2D9] my-16 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                      HERITAGE & CRAFTSMANSHIP
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C1C1A] mt-2 mb-5 leading-tight">
                      Ancestral Lost-Wax Casting & Master Benchwork
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed mb-4 font-light">
                      Each ring, necklace, and bangle begins with hand-carved jeweler's wax, cast in certified BIS hallmarked 18-karat gold or dense 950 platinum. Every diamond is conflict-free, hand-inspected under 40x magnification, and set into low-profile comfort baskets.
                    </p>
                    <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed mb-6 font-light">
                      From preliminary gouache drawings in our Mumbai atelier to optical mirror polishing, our master artisans bring decades of generational bench experience to every creation.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setIsConsultationOpen(true)}
                        className="px-6 py-3 bg-[#292522] text-[#FAF7F3] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#A17E70] transition-colors"
                      >
                        Request Bespoke Commission
                      </button>
                      <button
                        onClick={() => setActiveView('ABOUT')}
                        className="px-6 py-3 border border-[#292522] text-[#292522] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#292522] hover:text-[#FAF7F3] transition-colors"
                      >
                        Read Maison Story
                      </button>
                    </div>
                  </div>

                  <div className="aspect-[4/3] rounded-xs overflow-hidden border border-[#E8E2D9] shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1000&q=80"
                      alt="Jeweler workbench"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Customer Testimonials */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <div className="text-center mb-10">
                <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#745548]">
                  PATRON REFLECTIONS
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C1C1A] mt-1">
                  Words from Our Patrons
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "The Solstice ring exceeded every expectation. The low-profile bezel is seamless, and the GIA oval solitaire captures light with unbelievable depth.",
                    author: "Pooja & Sameer K.",
                    city: "Mumbai"
                  },
                  {
                    quote: "Commissioned the tennis bracelet for my wife's anniversary. The hidden double safety clasp and stone matching are benchmark luxury craftsmanship.",
                    author: "Vikram Singhania",
                    city: "New Delhi"
                  },
                  {
                    quote: "The 3D interactive viewer gave us total confidence in the setting proportions before visiting the Bandra salon. A truly elevated experience.",
                    author: "Ananya Mehta",
                    city: "Bengaluru"
                  }
                ].map((t, i) => (
                  <div key={i} className="p-6 sm:p-8 bg-white border border-[#E8E2D9] rounded-xs shadow-xs flex flex-col justify-between">
                    <p className="font-serif text-sm sm:text-base italic text-[#292522] leading-relaxed">
                      "{t.quote}"
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#E8E2D9] flex justify-between items-center text-xs">
                      <span className="font-medium text-[#1C1C1A]">{t.author}</span>
                      <span className="text-[#A17E70] text-[10px] uppercase tracking-wider">{t.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="bg-[#292522] text-white py-16 px-4 sm:px-6 text-center">
              <div className="max-w-xl mx-auto">
                <Sparkles size={24} className="mx-auto text-[#D6BD9A] mb-3" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6BD9A] font-semibold">
                  PRIVATE GAZETTE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-2 mb-3">
                  Join the Riva Jewels Inner Circle
                </h3>
                <p className="text-xs text-stone-300 font-light leading-relaxed mb-6">
                  Receive private invitations to seasonal high jewellery monographs, gemstone previews, and salon consultations.
                </p>

                {newsletterSubscribed ? (
                  <div className="p-4 bg-[#D6BD9A]/20 border border-[#D6BD9A]/40 rounded-xs text-xs text-[#D6BD9A] flex items-center justify-center gap-2">
                    <Check size={16} />
                    <span>Welcome to the Private Salon Gazette. Your invitation has been recorded.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-xs text-white placeholder:text-stone-400 rounded-xs focus:outline-none focus:border-[#D6BD9A]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#D6BD9A] text-[#292522] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#e4cfb0] transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {/* 4. Luxury Footer */}
      <footer className="border-t border-[#E8E2D9] bg-[#FAF7F3] pt-16 pb-12 px-4 sm:px-6 text-xs text-[#6B6560]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Salon Presence */}
          <div className="md:col-span-2 space-y-4">
            <RivaLogo variant="full" />
            <p className="text-xs text-[#6B6560] max-w-sm font-light leading-relaxed">
              Official online fine jewellery store for Riva Jewels. Handcrafted with certified natural diamonds, BIS hallmarked gold, and master craftsmanship.
            </p>
            <div className="text-[11px] text-[#745548] space-y-1 pt-2">
              <p>• Flagship Boutique: Pali Hill, Bandra West, Mumbai 400050</p>
              <p>• Heritage Salon: South Extension II, New Delhi 110049</p>
              <p>• Luxury Salon: Lavelle Road, Bengaluru 560001</p>
            </div>
          </div>

          {/* Col 2: High Jewellery */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">Collections</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => { setActiveCategory('ENGAGEMENT_RINGS'); setActiveView('CATALOGUE'); }} className="hover:text-[#292522]">
                  Engagement Rings
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('DIAMOND_RINGS'); setActiveView('CATALOGUE'); }} className="hover:text-[#292522]">
                  Diamond Rings
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('NECKLACES'); setActiveView('CATALOGUE'); }} className="hover:text-[#292522]">
                  Necklaces & Collars
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('EARRINGS'); setActiveView('CATALOGUE'); }} className="hover:text-[#292522]">
                  Earrings & Drops
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('BANGLES'); setActiveView('CATALOGUE'); }} className="hover:text-[#292522]">
                  Bangles & Cuffs
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('BRACELETS'); setActiveView('CATALOGUE'); }} className="hover:text-[#292522]">
                  Tennis Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('PENDANTS'); setActiveView('CATALOGUE'); }} className="hover:text-[#292522]">
                  Diamond Pendants
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('FINE_JEWELLERY'); setActiveView('CATALOGUE'); }} className="hover:text-[#292522]">
                  Fine Jewellery Suites
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">Client Care</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => setIsRingSizerOpen(true)} className="hover:text-[#292522]">
                  Interactive Ring Caliper
                </button>
              </li>
              <li>
                <button onClick={() => setIsConsultationOpen(true)} className="hover:text-[#292522]">
                  Salon Appointments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('CARE_GUIDE')} className="hover:text-[#292522]">
                  Jewellery Care Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('SHIPPING_RETURNS')} className="hover:text-[#292522]">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('SHIPPING_RETURNS')} className="hover:text-[#292522]">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('CONTACT')} className="hover:text-[#292522]">
                  Concierge Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: The Maison */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-medium text-[#1C1C1A]">The Maison</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => setActiveView('ABOUT')} className="hover:text-[#292522]">
                  Our Story & Benchwork
                </button>
              </li>
              <li>
                <button onClick={() => { setInitialStudioMetal('18k_yellow'); setIs3DStudioOpen(true); }} className="hover:text-[#292522]">
                  3D Riva Studio Configurator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('PRIVACY_TERMS')} className="hover:text-[#292522]">
                  Privacy & Client Terms
                </button>
              </li>
              <li>
                <button onClick={() => setIsConsultationOpen(true)} className="hover:text-[#292522]">
                  Bespoke Commissions
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} Riva Jewels. All rights reserved. 100% Certified Natural Diamonds & BIS Hallmarked.</p>
          <div className="flex gap-4 text-[#745548]">
            <button onClick={() => setActiveView('PRIVACY_TERMS')} className="hover:underline">Privacy Policy</button>
            <button onClick={() => setActiveView('SHIPPING_RETURNS')} className="hover:underline">Terms of Service</button>
            <button onClick={() => setActiveView('CONTACT')} className="hover:underline">Contact Concierge</button>
          </div>
        </div>
      </footer>

      {/* 5. Modals & Overlays */}
      {/* Quick View Modal */}
      <ProductDetailModal
        item={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        isFavorite={quickViewProduct ? favorites.has(quickViewProduct.id) : false}
        onToggleFavorite={toggleFavorite}
        onAddToCart={(item, metal, size, engraving) => addToCart(item, metal, size, engraving, 1)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenRingSizer={() => setIsRingSizerOpen(true)}
        onOpen3DStudio={(metalId) => {
          setInitialStudioMetal(metalId);
          setIs3DStudioOpen(true);
        }}
        onViewFullPage={(item) => {
          setSelectedProduct(item);
          setActiveView('PRODUCT_DETAIL');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Ring Caliper */}
      <RingSizerModal
        isOpen={isRingSizerOpen}
        onClose={() => setIsRingSizerOpen(false)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={updateCartQty}
        onRemoveItem={removeCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItemsList}
        onRemoveFromWishlist={toggleFavorite}
        onMoveToBag={(item) => addToCart(item, item.metalOptions[0], item.availableSizes?.[0], '')}
        onViewProduct={(item) => {
          setSelectedProduct(item);
          setActiveView('PRODUCT_DETAIL');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        catalog={CATALOG}
        onSelectProduct={(item) => {
          setSelectedProduct(item);
          setActiveView('PRODUCT_DETAIL');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Private Salon Appointment Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        onBook={(booking) => {
          showToast(`Consultation appointment requested for ${booking.name} at ${booking.salon}`);
        }}
      />

      {/* White-Glove Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={(orderId) => {
          setCartItems([]);
          showToast(`Acquisition ${orderId} confirmed. White-glove courier dispatched.`);
        }}
      />
    </div>
  );
};
