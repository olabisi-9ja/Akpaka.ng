'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, ShoppingBag, UserRound, X, ArrowRight } from 'lucide-react';
import { useAppStore, View } from '@/store/useAppStore';

const navItems: { label: string; view: View }[] = [
  { label: 'New & Featured', view: 'home' },
  { label: 'Shoes', view: 'collections' },
  { label: 'The Atelier', view: 'craftsmanship' },
  { label: 'Bespoke', view: 'commission' },
  { label: 'Journal', view: 'journal' },
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
  } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState<SearchProduct[]>([]);
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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white text-[#111] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
        <div className="hidden h-8 items-center justify-between border-b border-black/5 bg-[#f5f5f5] px-6 text-[10px] font-medium tracking-[0.04em] lg:flex">
          <p>Crafted in Port Harcourt · Delivered across Nigeria</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setView('contact')} className="hover:underline">Find our atelier</button>
            <span className="h-3 w-px bg-black/20" />
            <button onClick={() => setView('policies')} className="hover:underline">Help</button>
            <span className="h-3 w-px bg-black/20" />
            <button onClick={() => setView('dashboard')} className="hover:underline">My account</button>
          </div>
        </div>

        <div className="mx-auto flex h-[68px] max-w-[1680px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3 lg:gap-9">
            <button
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-left" aria-label="Akpaka home">
              <span className="font-serif text-[26px] font-bold leading-none tracking-[-0.07em] sm:text-[30px]">AKPÁKA</span>
              <span className="mt-1 hidden border-l border-black/30 pl-2 text-[8px] font-semibold uppercase tracking-[0.18em] sm:block">Made in<br />Africa</span>
            </button>
            <nav className="hidden items-center gap-6 xl:flex">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setView(item.view)}
                  className={`text-[13px] font-medium tracking-[-0.01em] transition-opacity hover:opacity-55 ${
                    currentView === item.view ? 'underline decoration-1 underline-offset-8' : ''
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
              <Search className="h-5 w-5 stroke-[1.8]" />
            </button>
            <button
              aria-label="My account"
              onClick={() => setView('dashboard')}
              className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5 sm:grid"
            >
              <UserRound className="h-5 w-5 stroke-[1.7]" />
            </button>
            <button
              aria-label="Open bag"
              onClick={toggleCart}
              className="relative grid h-10 min-w-10 place-items-center rounded-full px-2 transition-colors hover:bg-black/5"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.7]" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#111] px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[68px] z-40 min-h-[calc(100vh-68px)] bg-white px-6 py-10 lg:hidden"
          >
            <p className="mb-7 text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">Explore Akpaka</p>
            <nav className="flex flex-col border-t border-black/10">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setView(item.view)}
                  className="flex items-center justify-between border-b border-black/10 py-5 text-left text-2xl font-semibold tracking-[-0.04em]"
                >
                  {item.label} <ArrowRight className="h-5 w-5" />
                </button>
              ))}
            </nav>
            <div className="mt-10 rounded-2xl bg-[#f5f5f5] p-5">
              <p className="text-sm font-semibold">Make it yours.</p>
              <p className="mt-1 text-sm text-black/60">Start a one-to-one bespoke consultation with our atelier.</p>
              <button onClick={() => setView('commission')} className="mt-4 rounded-full bg-black px-5 py-3 text-xs font-bold text-white">Begin bespoke</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/35 p-0 backdrop-blur-[2px]" onMouseDown={closeSearch}>
            <motion.section
              initial={{ y: -24 }}
              animate={{ y: 0 }}
              exit={{ y: -24 }}
              transition={{ duration: 0.2 }}
              className="mx-auto min-h-[300px] max-w-[900px] bg-white px-5 pb-8 pt-7 shadow-2xl sm:px-9"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-black/15 pb-4">
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
                  className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-black/35"
                />
                <button onClick={closeSearch} className="text-xs font-bold uppercase tracking-wider hover:underline">Close</button>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                  {searchQuery ? 'Products' : 'Popular searches'}
                </p>
                {!searchQuery && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {['Oxfords', 'Loafers', 'Wedding shoes', 'Bespoke'].map((term) => (
                      <button key={term} onClick={() => setSearchQuery(term)} className="rounded-full bg-[#f5f5f5] px-4 py-2 text-sm hover:bg-black hover:text-white">{term}</button>
                    ))}
                  </div>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  {results.map((product) => (
                    <button key={product.id} onClick={() => visitProduct(product.id)} className="flex items-center gap-4 rounded-xl p-2 text-left hover:bg-[#f5f5f5]">
                      <img src={product.images.split(',')[0]} alt="" className="h-14 w-16 rounded-lg bg-[#f5f5f5] object-contain mix-blend-multiply" />
                      <span><span className="block text-sm font-semibold">{product.name}</span><span className="text-sm text-black/55">₦{product.price.toLocaleString()}</span></span>
                    </button>
                  ))}
                  {searchQuery && results.length === 0 && <p className="text-sm text-black/55">No styles match “{searchQuery}”. Try Oxford or Loafer.</p>}
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
