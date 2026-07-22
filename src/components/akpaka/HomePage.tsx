'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface Product {
  id: string; name: string; slug: string; description: string; price: number; images: string;
  category: string; featured: boolean; productType: string; stockStatus: string;
  craftingHours: string | null; leatherSource: string | null; artisanQuote: string | null;
  reviews: { rating: number }[];
}

export function HomePage() {
  const { setView, selectProduct, startCommission } = useAppStore();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(r => r.json())
      .then(prods => {
        setFeaturedProducts(Array.isArray(prods) ? prods : []);
      });
  }, []);

  return (
    <div className="bg-[#FAF9F6] text-charcoal font-sans">

      {/* 1. HERO - FULL WIDTH EDITORIAL using real shoe image */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1600&q=80"
            alt="Akpaka Handcrafted Oxfords"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 via-charcoal/20 to-charcoal/60" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-10 sm:p-16 z-10">
          <span className="text-white/70 text-xs tracking-[0.25em] uppercase block mb-3">Handcrafted in Nigeria</span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-medium leading-tight max-w-2xl mb-6">
            All shades of leather.
          </h1>
          <button
            onClick={() => setView('collections')}
            className="text-white text-xs uppercase tracking-widest underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all"
          >
            Explore the collection
          </button>
        </div>
      </section>

      {/* 2. CATEGORY NAVIGATION STRIP */}
      <section className="py-8 bg-white border-b border-charcoal/10">
        <div className="max-w-[1600px] mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 md:justify-center min-w-max">
            {['NEW', 'Oxfords', 'Loafers', 'Boots', 'Bespoke', 'Accessories'].map((cat) => (
              <button key={cat} onClick={() => setView('collections')} className="group flex flex-col items-center gap-3">
                <div className="w-24 h-24 bg-[#f8f7f5] flex items-center justify-center overflow-hidden border border-charcoal/5">
                  {cat === 'Oxfords' ? (
                    <img src="/images/editorial/media__1784681124466.jpg" alt={cat} className="w-20 h-20 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  ) : cat === 'Loafers' ? (
                    <img src="/images/editorial/media__1784681124508.jpg" alt={cat} className="w-20 h-20 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="font-serif text-base text-charcoal/60">{cat === 'NEW' ? 'NEW' : cat[0]}</span>
                  )}
                </div>
                <span className="text-xs uppercase tracking-wider text-charcoal/70 group-hover:text-charcoal transition-colors">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 50/50 SPLIT - Oxford vs Loafer */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Oxford Edit */}
        <div className="relative aspect-square md:h-[700px] overflow-hidden group cursor-pointer bg-[#f4f2ef]" onClick={() => setView('collections')}>
          <img
            src="/images/editorial/media__1784681124466.jpg"
            alt="The Oxford Edit"
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-10 pointer-events-none">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium mb-2">The Oxford Edit</h2>
            <p className="text-charcoal/60 text-xs uppercase tracking-widest underline underline-offset-4 decoration-1">Shop now</p>
          </div>
        </div>
        {/* Loafer Edit */}
        <div className="relative aspect-square md:h-[700px] overflow-hidden group cursor-pointer bg-[#e8f0ef]" onClick={() => setView('collections')}>
          <img
            src="/images/editorial/media__1784681124508.jpg"
            alt="The Loafer Edit"
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-10 pointer-events-none">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium mb-2">The Loafer Edit</h2>
            <p className="text-charcoal/60 text-xs uppercase tracking-widest underline underline-offset-4 decoration-1">Shop now</p>
          </div>
        </div>
      </section>

      {/* 4. AKPAKA COLLECTION GRID */}
      <section className="max-w-[1600px] mx-auto px-4 py-16">
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium uppercase">Akpaka Collection</h2>
          <button onClick={() => setView('collections')} className="text-xs uppercase tracking-widest text-charcoal/60 underline underline-offset-4 hover:text-charcoal transition-colors">Shop all</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left — large shoe lifestyle */}
          <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden group cursor-pointer bg-[#f0eeea]" onClick={() => setView('collections')}>
            <img
              src="/images/editorial/media__1784681124592.jpg"
              alt="Craftsmanship"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/20 transition-colors" />
          </div>

          {/* Right 2x2 Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="group cursor-pointer flex flex-col" onClick={() => selectProduct(product.id)}>
                <div className="relative aspect-[3/4] bg-[#f8f7f5] mb-4 overflow-hidden flex items-center justify-center p-4 border border-charcoal/5">
                  <img src={product.images.split(',')[0]} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="rounded-full bg-white text-charcoal shadow-sm h-8 w-8 hover:bg-charcoal hover:text-white">
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h4 className="font-serif text-sm font-medium text-charcoal group-hover:text-charcoal/70 transition-colors">{product.name}</h4>
                <p className="text-sm text-charcoal/60 mt-1">₦{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEET THE FOUNDER - uses actual founder photos you uploaded */}
      <section className="bg-[#f4f2ef] border-t border-charcoal/5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[80vh] overflow-hidden bg-charcoal/10">
            {/* Use the founder photos you attached — the two portrait images of Prince Achase */}
            <img
              src="/images/editorial/founder-prince-achase.jpg"
              alt="Prince Sunday Achase — Master Shoemaker"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center items-start px-10 py-16 md:px-16 md:py-24">
            <span className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-4">The Artisan</span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-medium mb-6 leading-tight">
              Prince Sunday Achase.
            </h2>
            <p className="text-charcoal/70 mb-8 max-w-md leading-relaxed text-sm">
              From a university dropout in Port Harcourt to Nigeria's most celebrated bespoke shoemaker. Every pair tells his story.
            </p>
            <Button
              onClick={() => setView('about')}
              variant="outline"
              className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8 py-6 rounded-none text-xs uppercase tracking-widest transition-colors"
            >
              Read his story
            </Button>
          </div>
        </div>
      </section>

      {/* 6. PROMOTIONAL BESPOKE BANNER */}
      <section className="bg-[#e8e4db] py-20 px-6 text-center">
        <span className="text-charcoal/50 text-xs tracking-[0.25em] uppercase block mb-4">Made to Order</span>
        <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-medium max-w-3xl mx-auto leading-tight mb-8">
          Special and exclusive bespoke commissions, crafted entirely for you.
        </h2>
        <Button
          onClick={() => startCommission(null)}
          variant="outline"
          className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8 py-6 rounded-none text-xs uppercase tracking-widest transition-colors"
        >
          Commission Yours
        </Button>
      </section>

      {/* 6. BOTTOM HIGHLIGHTS */}
      <section className="max-w-[1600px] mx-auto px-4 py-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative aspect-square overflow-hidden group cursor-pointer bg-[#f4f2ef]" onClick={() => setView('craftsmanship')}>
            <img src="/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683705976.jpg" alt="The Oxford" className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-charcoal text-lg font-serif">The Oxford<br /><span className="text-sm font-sans text-charcoal/60">Patina Collection</span></p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden group cursor-pointer bg-[#e8f0ef]" onClick={() => setView('collections')}>
            <img src="/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683717547.jpg" alt="The Loafer" className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-charcoal text-lg font-serif">The Loafer<br /><span className="text-sm font-sans text-charcoal/60">Signature Collection</span></p>
            </div>
          </div>
          <div className="relative aspect-square bg-charcoal flex flex-col items-center justify-center p-8 group cursor-pointer hover:bg-charcoal/90 transition-colors" onClick={() => setView('masterclass')}>
            <span className="text-7xl font-serif text-white mb-4">%</span>
            <p className="text-white text-lg font-serif text-center">Exclusive member<br />discounts</p>
          </div>
        </div>
      </section>

    </div>
  );
}
