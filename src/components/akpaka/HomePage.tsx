'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, ChevronRight, Sparkles, Gem, Clock, Award } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string;
  category: string;
  featured: boolean;
  craftingHours: string | null;
  leatherSource: string | null;
  artisanQuote: string | null;
  reviews: { rating: number }[];
}

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  products: Product[];
}

export function HomePage() {
  const { setView, selectProduct, startCommission } = useAppStore();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/products/collections').then(r => r.json()),
      fetch('/api/products?featured=true').then(r => r.json()),
    ]).then(([cols, prods]) => {
      setCollections(cols);
      setFeaturedProducts(prods);
    });
  }, []);

  return (
    <div className="bg-cream">
      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1600&q=80"
            alt="AkpakaNG Handcrafted Leather"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <p className="text-gold-light/80 text-sm sm:text-base tracking-[0.4em] uppercase mb-4 sm:mb-6">
              Handcrafted in Port Harcourt
            </p>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Where Leather
              <br />
              <span className="text-gold">Meets Excellence</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Bespoke luxury shoes crafted by master artisan Prince Sunday Achase. 
              Each pair is a testament to Nigerian craftsmanship — hand-cut, hand-stitched, 
              and hand-finished with unrivalled precision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => setView('collections')}
                className="bg-gold hover:bg-gold-light text-charcoal font-semibold px-8 py-6 text-base tracking-wider"
              >
                Explore Collections
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => startCommission(null)}
                variant="outline"
                className="border-gold/50 text-gold-light hover:bg-gold/10 px-8 py-6 text-base tracking-wider"
              >
                Commission Bespoke
              </Button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
              <div className="w-1 h-2 bg-gold rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="bg-charcoal py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-white/40 text-xs sm:text-sm tracking-widest uppercase">
          <span className="flex items-center gap-2"><Gem className="w-4 h-4 text-gold/60" /> Italian Leather</span>
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold/60" /> Hand-Burnished Patina</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold/60" /> 40+ Hours Per Pair</span>
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-gold/60" /> Goodyear Welt</span>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Our Portfolio</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">Curated Collections</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Each collection is an exhibition of craftsmanship — from the selection of the leather to the final mirror-shine polish.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {collections.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group cursor-pointer"
                onClick={() => { setView('collections'); }}
              >
                <div className="relative h-72 sm:h-80 overflow-hidden rounded-lg">
                  <img
                    src={collection.coverImage}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-gold-light/70 text-xs tracking-widest uppercase mb-1">
                      {collection.products.length} Styles
                    </p>
                    <h3 className="font-serif text-2xl text-white font-semibold mb-2">
                      {collection.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gold-light text-sm group-hover:gap-2 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Signature Pieces</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">Featured Creations</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => selectProduct(product.id)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
                  <img
                    src={product.images.split(',')[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold"
                      onClick={(e) => { e.stopPropagation(); selectProduct(product.id); }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <h4 className="font-serif text-base font-semibold text-charcoal group-hover:text-gold transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  ₦{product.price.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => setView('collections')}
              variant="outline"
              className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8"
            >
              View All Collections
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP HIGHLIGHT */}
      <section className="py-20 sm:py-28 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1600&q=40"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">The Atelier</p>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-6">
                Crafted By Hand,
                <br />
                <span className="text-gold">Perfected By Passion</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Every Akpaka shoe passes through the hands of master artisans, 
                each step executed with the precision and patience that defines true luxury. 
                From selecting the finest Italian calfskin to the final mirror-shine polish, 
                our process is uncompromising.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '40+', label: 'Hours Per Pair' },
                  { value: '100%', label: 'Handcrafted' },
                  { value: '10+', label: 'Years Mastery' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-serif text-2xl sm:text-3xl font-bold text-gold">{stat.value}</p>
                    <p className="text-xs text-white/50 mt-1 tracking-wider uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setView('craftsmanship')}
                className="bg-gold hover:bg-gold-light text-charcoal font-semibold"
              >
                Explore Our Craft
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80"
                  alt="AkpakaNG Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold text-charcoal p-6 rounded-lg shadow-xl max-w-xs hidden sm:block">
                <p className="font-serif text-lg font-semibold italic">
                  &ldquo;I have been working non-stop for almost 10 years.&rdquo;
                </p>
                <p className="text-sm mt-2 font-medium">— Prince Sunday Achase, Founder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMMISSION CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Bespoke Service</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mb-6">
              Commission Your
              <br />
              <span className="text-gold">Perfect Pair</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Not just a purchase — an experience. From the initial consultation to the final fitting, 
              our bespoke commission process ensures every detail of your shoe is crafted to your 
              exact specifications. Choose your leather, select your patina, and let our artisans 
              bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => startCommission(null)}
                className="bg-charcoal hover:bg-charcoal/90 text-gold font-semibold px-8 py-6 text-base"
              >
                Start Your Commission
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a
                href="https://wa.me/2348180474183?text=Hello%20AkpakaNG!%20I%20would%20like%20to%20discuss%20a%20bespoke%20commission."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-base">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">What Our Clients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Chidi Okafor',
                quote: 'The patina is unlike anything I have seen. Worth every naira.',
                title: 'Lagos',
              },
              {
                name: 'Emeka Nwankwo',
                quote: 'I have bought shoes from Italy and England. These rival the best of them.',
                title: 'Abuja',
              },
              {
                name: 'Tunde Adebayo',
                quote: 'My wedding shoes were the highlight of my outfit. Guests could not stop talking about them.',
                title: 'Port Harcourt',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-cream/50 rounded-lg"
              >
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-serif text-lg text-charcoal italic mb-4 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-semibold text-charcoal text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS MENTIONS */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-6">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {['Legit.ng', 'ConnectNigeria', 'Tunde Ednut', 'TikTok Nigeria'].map((pub) => (
              <span key={pub} className="font-serif text-xl sm:text-2xl text-charcoal/30 hover:text-charcoal/60 transition-colors">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
