'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Sparkles, Gem, Clock, Award, BadgeCheck, ShieldCheck, Wrench, FileText } from 'lucide-react';

interface Product {
  id: string; name: string; slug: string; description: string; price: number; images: string;
  category: string; featured: boolean; productType: string; stockStatus: string;
  craftingHours: string | null; leatherSource: string | null; artisanQuote: string | null;
  reviews: { rating: number }[];
}

interface Collection {
  id: string; name: string; slug: string; description: string; coverImage: string; products: Product[];
}

const stockBadges: Record<string, { label: string; cls: string }> = {
  'in-stock': { label: 'Available', cls: 'bg-green-100 text-green-800' },
  'low-stock': { label: 'Few Remaining', cls: 'bg-amber-100 text-amber-800' },
  'made-to-order': { label: 'Made to Order', cls: 'bg-blue-100 text-blue-800' },
  'bespoke-only': { label: 'Bespoke', cls: 'bg-purple-100 text-purple-800' },
  'waitlist': { label: 'Waitlist', cls: 'bg-red-100 text-red-800' },
};

export function HomePage() {
  const { setView, selectProduct, startCommission } = useAppStore();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/products/collections').then(r => r.json()),
      fetch('/api/products?featured=true').then(r => r.json()),
    ]).then(([cols, prods]) => {
      setCollections(Array.isArray(cols) ? cols : []);
      setFeaturedProducts(Array.isArray(prods) ? prods : []);
    });
  }, []);

  return (
    <div className="bg-cream">
      {/* ─── HERO ─── */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1600&q=75"
            alt="AkpakaNG Handcrafted Leather"
            width={1600}
            height={900}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <p className="text-gold-light/70 text-xs sm:text-sm tracking-[0.5em] uppercase mb-6 sm:mb-8">
              Handcrafted in Port Harcourt
            </p>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] mb-6 sm:mb-8">
              Where Leather
              <br />
              <span className="text-gold">Meets Excellence</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-10 sm:mb-12 leading-relaxed">
              Bespoke luxury shoes crafted by master artisan Prince Sunday Achase. 
              Hand-cut, hand-stitched, hand-finished.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => setView('collections')} className="bg-gold hover:bg-gold-light text-charcoal font-semibold px-8 py-6 text-sm tracking-wider">
                Explore Collections <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button onClick={() => startCommission(null)} variant="outline" className="border-gold/40 text-gold-light hover:bg-gold/10 px-8 py-6 text-sm tracking-wider">
                Commission Bespoke
              </Button>
            </div>
          </motion.div>

          <motion.div className="absolute bottom-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <div className="w-5 h-9 border border-white/20 rounded-full flex items-start justify-center pt-2">
              <div className="w-0.5 h-1.5 bg-gold rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BRAND STRIP ─── */}
      <section className="bg-charcoal py-5 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-5 sm:gap-10 text-white/30 text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          <span className="flex items-center gap-1.5"><Gem className="w-3.5 h-3.5 text-gold/50" /> Italian Leather</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-gold/50" /> Hand-Burnished Patina</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold/50" /> 40+ Hours Per Pair</span>
          <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-gold/50" /> Goodyear Welt</span>
        </div>
      </section>

      {/* ─── FEATURED COLLECTIONS — generous whitespace ─── */}
      <section className="py-24 sm:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Our Portfolio</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">Curated Collections</h2>
            <p className="text-muted-foreground/70 mt-5 max-w-md mx-auto text-sm leading-relaxed">
              Each collection is an exhibition — from the selection of the leather to the final mirror-shine polish.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {collections.map((collection, i) => (
              <motion.div key={collection.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="group cursor-pointer" onClick={() => setView('collections')}>
                <div className="relative h-72 sm:h-[22rem] overflow-hidden rounded-lg">
                  <img src={collection.coverImage} alt={collection.name} width={600} height={352} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-gold-light/60 text-[10px] tracking-[0.3em] uppercase mb-1.5">{collection.products.length} Styles</p>
                    <h3 className="font-serif text-2xl text-white font-semibold mb-2">{collection.name}</h3>
                    <span className="flex items-center gap-1 text-gold-light/80 text-xs group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS — editorial restraint ─── */}
      <section className="py-24 sm:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Signature Pieces</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">Featured Creations</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product, i) => {
              const badge = stockBadges[product.stockStatus] || stockBadges['made-to-order'];
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer" onClick={() => selectProduct(product.id)}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
                    <img src={product.images.split(',')[0]} alt={product.name} width={400} height={533} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
                    {/* Stock badge */}
                    <span className={`absolute top-3 left-3 text-[9px] px-2 py-0.5 rounded-full font-medium ${badge.cls}`}>{badge.label}</span>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold"
                        onClick={(e) => { e.stopPropagation(); selectProduct(product.id); }}>
                        {product.productType === 'bespoke-only' ? 'Commission' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-charcoal group-hover:text-gold transition-colors">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">₦{product.price.toLocaleString()}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Button onClick={() => setView('collections')} variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8 text-sm">
              View All Collections <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── CRAFTSMANSHIP HIGHLIGHT ─── */}
      <section className="py-24 sm:py-36 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1600&q=30" alt="" width={1600} height={900} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">The Atelier</p>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-8 leading-tight">
                Crafted By Hand,<br /><span className="text-gold">Perfected By Passion</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 text-sm">
                Every Akpaka shoe passes through the hands of master artisans, each step executed with 
                the precision and patience that defines true luxury. From selecting the finest Italian 
                calfskin to the final mirror-shine polish, our process is uncompromising.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { value: '40+', label: 'Hours Per Pair' },
                  { value: '100%', label: 'Handcrafted' },
                  { value: '10+', label: 'Years Mastery' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-3xl sm:text-4xl font-bold text-gold">{stat.value}</p>
                    <p className="text-[10px] text-white/40 mt-1 tracking-wider uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => setView('craftsmanship')} className="bg-gold hover:bg-gold-light text-charcoal font-semibold">
                Explore Our Craft <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80" alt="AkpakaNG Workshop" width={800} height={1000} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gold text-charcoal p-5 rounded-lg shadow-xl max-w-[16rem] hidden sm:block">
                <p className="font-serif text-base font-semibold italic leading-snug">
                  &ldquo;I have been working non-stop for almost 10 years.&rdquo;
                </p>
                <p className="text-xs mt-2 font-medium">— Prince Sunday Achase</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── COMMISSION CTA ─── */}
      <section className="py-24 sm:py-36">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Bespoke Service</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mb-6 leading-tight">
              Commission Your<br /><span className="text-gold">Perfect Pair</span>
            </h2>
            <p className="text-muted-foreground/70 leading-relaxed mb-10 text-sm max-w-lg mx-auto">
              Not just a purchase — an experience. From the initial consultation to the final fitting, 
              our bespoke commission process ensures every detail of your shoe is crafted to your 
              exact specifications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => startCommission(null)} className="bg-charcoal hover:bg-charcoal/90 text-gold font-semibold px-8 py-6 text-sm">
                Begin Commission <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a href="https://wa.me/2348180474183?text=Hello%20AkpakaNG!%20I%20would%20like%20to%20discuss%20a%20bespoke%20commission." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-sm">Chat on WhatsApp</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── VERIFIED TESTIMONIALS ─── */}
      <section className="py-24 sm:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Testimonials</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">What Our Clients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Chidi Okafor', quote: 'The patina is unlike anything I have seen. Worth every naira.', location: 'Lagos', source: 'WhatsApp' },
              { name: 'Emeka Nwankwo', quote: 'I have bought shoes from Italy and England. These rival the best of them.', location: 'Abuja', source: 'Instagram' },
              { name: 'Tunde Adebayo', quote: 'My wedding shoes were the highlight of my outfit. Guests could not stop talking about them.', location: 'Port Harcourt', source: 'WhatsApp' },
            ].map((testimonial, i) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 sm:p-10">
                <div className="flex items-center justify-center gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                </div>
                <p className="font-serif text-lg text-charcoal italic mb-5 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-semibold text-charcoal text-sm">{testimonial.name}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{testimonial.location}</span>
                  <span className="text-[9px] text-muted-foreground/50">&middot;</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-green-700">
                    <BadgeCheck className="w-3 h-3" /> Verified via {testimonial.source}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ─── */}
      <section className="py-12 bg-charcoal">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-white/40 text-[10px] tracking-wider uppercase">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-gold/50" /> Certificate of Authenticity</span>
          <span className="flex items-center gap-1.5"><Wrench className="w-4 h-4 text-gold/50" /> Lifetime Resoling</span>
          <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-gold/50" /> 14-Day Returns</span>
        </div>
      </section>

      {/* ─── PRESS MENTIONS ─── */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground/50 text-[10px] tracking-[0.3em] uppercase mb-8">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {['Legit.ng', 'ConnectNigeria', 'Tunde Ednut', 'TikTok Nigeria'].map((pub) => (
              <span key={pub} className="font-serif text-lg sm:text-xl text-charcoal/20 hover:text-charcoal/50 transition-colors">{pub}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
