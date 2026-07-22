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
      {/* 1. HERO - FULL WIDTH EDITORIAL */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784679463902.png" alt="Akpaka Atelier" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/30" />
        </div>
        <div className="relative text-center z-10 px-4">
          <p className="text-white text-xs tracking-[0.2em] uppercase mb-4">Discover the Collection</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-white font-medium mb-6 drop-shadow-sm">
            All shades of leather
          </h1>
        </div>
      </section>

      {/* 2. CATEGORY NAVIGATION STRIP */}
      <section className="py-8 bg-white border-b border-charcoal/10">
        <div className="max-w-[1600px] mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 md:justify-center min-w-max">
            {['NEW', 'Oxfords', 'Loafers', 'Boots', 'Bespoke', 'Accessories'].map((cat, i) => (
              <button key={cat} onClick={() => setView('collections')} className="group flex flex-col items-center gap-3">
                <div className="w-24 h-24 bg-[#f8f7f5] flex items-center justify-center overflow-hidden border border-charcoal/5">
                   {cat === 'Oxfords' ? (
                     <img src="/images/editorial/media__1784681124466.jpg" alt={cat} className="w-20 h-20 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                   ) : cat === 'Loafers' ? (
                     <img src="/images/editorial/media__1784681124508.jpg" alt={cat} className="w-20 h-20 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                   ) : (
                     <span className="font-serif text-lg text-charcoal">{cat === 'NEW' ? 'NEW' : ''}</span>
                   )}
                </div>
                <span className="text-xs uppercase tracking-wider text-charcoal/70 group-hover:text-charcoal transition-colors">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 50/50 SPLIT BANNERS */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto md:h-[800px] overflow-hidden group cursor-pointer" onClick={() => setView('collections')}>
          <img src="/images/editorial/media__1784676808363.png" alt="Illuminate your moments" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium mb-4">Illuminate your steps</h2>
            <p className="text-white text-xs uppercase tracking-widest underline underline-offset-4 decoration-1">Shop now</p>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-auto md:h-[800px] overflow-hidden group cursor-pointer" onClick={() => setView('collections')}>
          <img src="/images/editorial/media__1784681124508.jpg" alt="The Loafer Edit" className="w-full h-full object-cover bg-[#f4f2ef] mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-medium mb-4 drop-shadow-sm bg-white/40 p-4 backdrop-blur-sm rounded-sm">The Loafer Edit</h2>
          </div>
        </div>
      </section>

      {/* 4. MEET THE FOUNDER */}
      <section className="bg-[#f4f2ef] border-t border-charcoal/5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[80vh] overflow-hidden">
            <img src="/images/editorial/media__1784681124579.jpg" alt="Prince Sunday Achase - Founder" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex flex-col justify-center items-center text-center px-6 py-16 md:px-12 md:py-24">
            <span className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-4">Meet the Artisan</span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-medium mb-6">Mastering the craft of luxury.</h2>
            <p className="text-charcoal/70 mb-8 max-w-md leading-relaxed">
              Every pair of Akpaka shoes tells a story of dedication, precision, and passion. Master shoemaker Prince Sunday Achase brings bespoke, handcrafted African luxury to life.
            </p>
            <Button onClick={() => setView('about')} variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8 py-6 rounded-none text-xs uppercase tracking-widest transition-colors">
              Read his story
            </Button>
          </div>
        </div>
      </section>

      {/* 5. TRIPLE GRID */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'The Oxford', img: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784679479513.png', bg: 'bg-[#e8e6e1]', action: () => setView('collections') },
            { title: 'The Workshop', img: '/images/editorial/media__1784677550865.png', bg: 'bg-charcoal', action: () => setView('craftsmanship') },
            { title: 'The Details', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', bg: 'bg-[#f4f2ef]', action: () => setView('about') }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer" onClick={item.action}>
              <div className={`relative aspect-[3/4] overflow-hidden mb-4 ${item.bg}`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
              </div>
              <h3 className="font-serif text-xl text-charcoal px-2">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 6. "AKPAKA COLLECTION" GRID */}
      <section className="max-w-[1600px] mx-auto px-4 py-16">
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-medium uppercase">Akpaka Collection</h2>
          <button onClick={() => setView('collections')} className="text-xs uppercase tracking-widest text-charcoal/60 underline underline-offset-4 hover:text-charcoal transition-colors">Shop all</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Large Lifestyle */}
          <div className="relative aspect-[4/5] lg:aspect-auto h-full overflow-hidden group cursor-pointer bg-[#e8e6e1]" onClick={() => setView('collections')}>
            <img src="/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784679463902.png" alt="Collection Lifestyle" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          
          {/* Right 2x2 Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.slice(0, 4).map((product, i) => (
              <div key={product.id} className="group cursor-pointer flex flex-col" onClick={() => selectProduct(product.id)}>
                <div className="relative aspect-[3/4] bg-[#f8f7f5] mb-4 overflow-hidden flex items-center justify-center p-4 border border-charcoal/5">
                   <img src={product.images.split(',')[0]} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                   <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button size="icon" variant="ghost" className="rounded-full bg-white text-charcoal shadow-sm h-8 w-8 hover:bg-gold hover:text-white">
                        <ShoppingBag className="w-4 h-4" />
                     </Button>
                   </div>
                </div>
                <h4 className="font-serif text-sm font-medium text-charcoal group-hover:text-gold transition-colors">{product.name}</h4>
                <p className="text-sm text-charcoal/60 mt-1">₦{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROMOTIONAL TEXT BANNER */}
      <section className="bg-[#e8e4db] py-20 px-6 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-medium max-w-3xl mx-auto leading-tight">
          Special and exclusive bespoke commissions available upon request.
        </h2>
        <div className="mt-8">
          <Button onClick={() => startCommission(null)} variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8 py-6 rounded-none text-xs uppercase tracking-widest transition-colors">
            Inquire Now
          </Button>
        </div>
      </section>

      {/* 8. BOTTOM HIGHLIGHTS */}
      <section className="max-w-[1600px] mx-auto px-4 py-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative aspect-square overflow-hidden group cursor-pointer bg-charcoal" onClick={() => setView('craftsmanship')}>
             <img src="/images/editorial/media__1784677550865.png" alt="Promo 1" className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-serif">The Patina Process<br/>Behind the scenes</p>
             </div>
          </div>
          <div className="relative aspect-square overflow-hidden group cursor-pointer bg-charcoal" onClick={() => setView('about')}>
             <img src="/images/editorial/media__1784674915830.jpg" alt="Promo 2" className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-serif">Italian Calfskin<br/>Materials matter</p>
             </div>
          </div>
          <div className="relative aspect-square bg-[#adcbe3] flex flex-col items-center justify-center p-8 group cursor-pointer hover:bg-[#9cbcd4] transition-colors" onClick={() => setView('masterclass')}>
             <span className="text-7xl font-serif text-white mb-4">%</span>
             <p className="text-white text-lg font-serif text-center">Exclusive member<br/>discounts</p>
          </div>
        </div>
      </section>

    </div>
  );
}
