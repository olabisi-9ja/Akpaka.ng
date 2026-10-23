'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useAppStore, View } from '@/store/useAppStore';
import { MegaMenu, MegaMenuPanel } from '@/components/akpaka/MegaMenu';

const megaPanels: MegaMenuPanel[] = [
  {
    department: 'women',
    headline: 'Womenswear',
    image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683717547.jpg',
    imageLabel: 'Wedding special',
    imageAction: 'wedding',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'New in', action: 'new-in' },
          { label: 'Oxfords', category: 'Oxford Collection' },
          { label: 'Loafers', category: 'Loafers & Moccasins' },
          { label: 'Boots', category: 'Boots Collection' },
          { label: 'Wedding', category: 'Wedding Special' },
        ],
      },
      {
        title: 'The atelier',
        links: [
          { label: 'Bespoke commissions', action: 'bespoke' },
          { label: 'Craftsmanship', action: 'craft' },
          { label: 'Journal', action: 'journal' },
          { label: 'Masterclass', action: 'masterclass' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'How to shop', action: 'policies' },
          { label: 'Sizing guide', action: 'policies' },
          { label: 'Delivery & returns', action: 'policies' },
          { label: 'Contact us', action: 'contact' },
        ],
      },
    ],
  },
  {
    department: 'men',
    headline: 'Menswear',
    image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683705976.jpg',
    imageLabel: 'The oxford collection',
    imageAction: 'oxford',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'New in', action: 'new-in' },
          { label: 'Oxfords', category: 'Oxford Collection' },
          { label: 'Loafers', category: 'Loafers & Moccasins' },
          { label: 'Boots', category: 'Boots Collection' },
        ],
      },
      {
        title: 'The atelier',
        links: [
          { label: 'Bespoke commissions', action: 'bespoke' },
          { label: 'Craftsmanship', action: 'craft' },
          { label: 'Journal', action: 'journal' },
          { label: 'Masterclass', action: 'masterclass' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'How to shop', action: 'policies' },
          { label: 'Sizing guide', action: 'policies' },
          { label: 'Delivery & returns', action: 'policies' },
          { label: 'Contact us', action: 'contact' },
        ],
      },
    ],
  },
  {
    department: 'bespoke',
    headline: 'Bespoke',
    image: '/images/editorial/media__1784681124579.jpg',
    imageLabel: 'Inside the atelier',
    imageAction: 'craft',
    columns: [
      {
        title: 'Commissions',
        links: [
          { label: 'Begin a commission', action: 'bespoke' },
          { label: 'How bespoke works', action: 'craft' },
          { label: 'Track your commission', action: 'dashboard' },
        ],
      },
      {
        title: 'The atelier',
        links: [
          { label: 'Craftsmanship', action: 'craft' },
          { label: 'Our story', action: 'about' },
          { label: 'Masterclass', action: 'masterclass' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'How to shop', action: 'policies' },
          { label: 'Sizing guide', action: 'policies' },
          { label: 'Contact us', action: 'contact' },
        ],
      },
    ],
  },
];

const navItems: { label: string; view: View; department?: string }[] = [
  { label: 'New In', view: 'collections', department: 'new-in' },
  { label: 'Women', view: 'home', department: 'women' },
  { label: 'Men', view: 'home', department: 'men' },
  { label: 'Bespoke', view: 'home', department: 'bespoke' },
  { label: 'Sale', view: 'collections', department: 'sale' },
];

interface SearchProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string;
}

export function Navbar() {
  const {
    currentView,
    setView,
    selectProduct,
    toggleCart,
    getCartCount,
    mobileMenuOpen,
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    setSelectedDepartment,
    selectCollection,
  } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [openDepartment, setOpenDepartment] = useState<string | null>(null);
  const cartCount = getCartCount();

  useEffect(() => {
    if (!searchOpen || products.length) return;
    fetch('/api/products')
      .then((response) => response.json())
      .then((catalogue) => setProducts(Array.isArray(catalogue) ? catalogue : []))
      .catch(() => setProducts([]));
  }, [searchOpen, products.length]);

  const results = products
    .filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 4);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  const visitProduct = (id: string) => {
    selectProduct(id);
    closeSearch();
  };

  const openMega = (department: string | undefined, view: View) => {
    if (department && department !== 'new-in' && department !== 'sale') {
      setOpenDepartment(department);
      return;
    }
    setOpenDepartment(null);
    if (department === 'new-in') {
      setSelectedDepartment('new-in');
      setView('collections');
    } else if (department === 'sale') {
      setSelectedDepartment('sale');
      setView('collections');
    } else {
      setView(view);
    }
  };

  return (
    <>
      {/* Promo bar */}
      <div className="fixed inset-x-0 top-0 z-50 bg-black px-4 py-1.5 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-white">
        Enjoy 15% off atelier samples — while stock lasts
      </div>

      <header className="fixed inset-x-0 top-7 z-50 bg-white text-black shadow-[0_1px_0_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-[64px] max-w-[1680px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3 lg:gap-8">
            <button
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-black/5 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <button onClick={() => setView('home')} className="flex items-baseline gap-2 text-left" aria-label="Akpaka home">
              <span className="text-[22px] font-bold leading-none tracking-[-0.06em] sm:text-[26px]">AKPÁKA</span>
              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45 sm:block">Port Harcourt</span>
            </button>
            <nav
              className="hidden items-center gap-7 xl:flex"
              onMouseLeave={() => setOpenDepartment(null)}
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => openMega(item.department, item.view)}
                  onMouseEnter={() => item.department && item.department !== 'new-in' && item.department !== 'sale' && setOpenDepartment(item.department)}
                  className={`whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-black/50 ${
                    currentView === item.view && !item.department ? 'underline decoration-1 underline-offset-8' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5"
            >
              <Search className="h-[18px] w-[18px] stroke-[1.8]" />
            </button>
            <button
              aria-label="My account"
              onClick={() => setView('dashboard')}
              className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5 sm:grid"
            >
              <UserRound className="h-[18px] w-[18px] stroke-[1.7]" />
            </button>
            <button
              aria-label="Open bag"
              onClick={toggleCart}
              className="relative grid h-10 min-w-10 place-items-center rounded-full px-2 transition-colors hover:bg-black/5"
            >
              <ShoppingBag className="h-[18px] w-[18px] stroke-[1.7]" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {openDepartment && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <MegaMenu panels={megaPanels} open={openDepartment} onClose={() => setOpenDepartment(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[92px] z-40 min-h-[calc(100vh-92px)] bg-white px-6 py-8 lg:hidden"
          >
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">Departments</p>
            <nav className="flex flex-col border-t border-black/10">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => openMega(item.department, item.view)}
                  className="flex items-center justify-between border-b border-black/10 py-4 text-left text-[22px] font-semibold tracking-[-0.03em]"
                >
                  {item.label} <ArrowRight className="h-5 w-5" />
                </button>
              ))}
              <button onClick={() => { setView('craftsmanship'); setMobileMenuOpen(false); }} className="flex items-center justify-between border-b border-black/10 py-4 text-left text-[22px] font-semibold tracking-[-0.03em]">
                The Atelier <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => { setView('journal'); setMobileMenuOpen(false); }} className="flex items-center justify-between border-b border-black/10 py-4 text-left text-[22px] font-semibold tracking-[-0.03em]">
                Journal <ArrowRight className="h-5 w-5" />
              </button>
            </nav>
            <div className="mt-8 rounded-sm bg-[#f5f5f5] p-5">
              <p className="text-sm font-bold">Made to measure.</p>
              <p className="mt-1 text-sm text-black/60">Start a one-to-one bespoke commission with our atelier.</p>
              <button
                onClick={() => { setView('commission'); setMobileMenuOpen(false); }}
                className="mt-4 rounded-full bg-black px-5 py-3 text-xs font-bold text-white"
              >
                Begin bespoke
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-white" >
            <section className="mx-auto min-h-full max-w-[900px] px-5 pb-16 pt-20 sm:px-9">
              <div className="flex items-center gap-3 border-b border-black text-[#111] pb-4">
                <Search className="h-5 w-5 shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') closeSearch();
                    if (event.key === 'Enter' && results[0]) visitProduct(results[0].id);
                  }}
                  placeholder="Search shoes, leather, collections"
                  className="min-w-0 flex-1 bg-transparent text-xl outline-none placeholder:text-black/35 sm:text-2xl"
                />
                <button onClick={closeSearch} className="shrink-0 text-xs font-bold uppercase tracking-wider hover:underline">Close</button>
              </div>
              <div className="mt-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                  {searchQuery ? 'Products' : 'Popular searches'}
                </p>
                {!searchQuery && (
                  <div className="mb-8 flex flex-wrap gap-2">
                    {['Oxfords', 'Loafers', 'Chelsea boots', 'Wedding', 'Bespoke'].map((term) => (
                      <button key={term} onClick={() => setSearchQuery(term)} className="rounded-full bg-[#f5f5f5] px-4 py-2 text-sm transition-colors hover:bg-black hover:text-white">
                        {term}
                      </button>
                    ))}
                  </div>
                )}
                <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                  {results.map((product) => (
                    <button key={product.id} onClick={() => visitProduct(product.id)} className="flex items-center gap-4 text-left">
                      <img src={product.images.split(',')[0]} alt="" className="h-24 w-20 shrink-0 bg-[#f5f5f5] object-cover" />
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">Akpaka</span>
                        <span className="mt-0.5 block truncate text-sm font-medium">{product.name.toLowerCase()}</span>
                        <span className="mt-1 block text-sm text-black/55">₦{product.price.toLocaleString()}</span>
                      </span>
                    </button>
                  ))}
                </div>
                {searchQuery && results.length === 0 && (
                  <div>
                    <p className="text-lg font-semibold">Nothing found for “{searchQuery}”.</p>
                    <p className="mt-2 text-sm text-black/55">Try Oxford, Loafer, Boot or Wedding.</p>
                    <button
                      onClick={() => { setSelectedDepartment(null); selectCollection(null); setView('collections'); closeSearch(); }}
                      className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold underline underline-offset-4"
                    >
                      Shop all shoes <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
