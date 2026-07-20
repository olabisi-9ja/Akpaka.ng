'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Star, Clock, MapPin, ChevronRight, Gem, ShieldCheck, FileText, Wrench, BadgeCheck, Users } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  verified: boolean;
  source: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string;
  category: string;
  productType: string;
  stockStatus: string;
  stockQuantity: number;
  baseLeather: string | null;
  soleType: string | null;
  craftingHours: string | null;
  leatherSource: string | null;
  artisanQuote: string | null;
  collection: { name: string } | null;
  reviews: Review[];
}

const stockLabels: Record<string, { label: string; color: string }> = {
  'in-stock': { label: 'In Stock', color: 'bg-green-100 text-green-800' },
  'low-stock': { label: 'Only a Few Remaining', color: 'bg-amber-100 text-amber-800' },
  'made-to-order': { label: 'Made to Order', color: 'bg-blue-100 text-blue-800' },
  'bespoke-only': { label: 'Bespoke Commission Only', color: 'bg-purple-100 text-purple-800' },
  'waitlist': { label: 'Join the Waitlist', color: 'bg-red-100 text-red-800' },
};

export function ProductDetailPage() {
  const { selectedProductId, setView, startCommission, addToCart, trackEvent } = useAppStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'story' | 'materials' | 'reviews' | 'care'>('story');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ['38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'];

  useEffect(() => {
    if (selectedProductId) {
      fetch(`/api/products?id=${selectedProductId}`)
        .then(r => r.json())
        .then(setProduct);
    }
  }, [selectedProductId]);

  if (!product) {
    return (
      <div className="bg-cream pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="w-24 h-24 bg-muted rounded-full mx-auto" />
          <p className="text-muted-foreground text-sm">Loading details&hellip;</p>
        </div>
      </div>
    );
  }

  const reviews = product.reviews ?? [];
  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const stockInfo = stockLabels[product.stockStatus] || stockLabels['made-to-order'];
  const isBespokeOnly = product.productType === 'bespoke-only';
  const isWaitlist = product.stockStatus === 'waitlist';
  const isReadyToWear = product.productType === 'ready-to-wear';

  // Product structured data
  const productJsonLd = {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.images.split(',')[0],
      brand: { "@type": "Brand", name: "AkpakaNG" },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "NGN",
        availability: product.stockStatus === 'in-stock' ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
        seller: { "@type": "Organization", name: "AkpakaNG" },
      },
      aggregateRating: reviews.length > 0 ? {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        reviewCount: reviews.length,
      } : undefined,
    }),
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images.split(',')[0],
      size: selectedSize || undefined,
      type: isReadyToWear ? 'ready-to-wear' : 'bespoke',
      leather: product.baseLeather || undefined,
      sole: product.soleType || undefined,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWaitlist = async () => {
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, email: waitlistEmail, name: waitlistName }),
      });
      setWaitlistSubmitted(true);
      trackEvent('join_waitlist', { productId: product.id });
    } catch { /* silent */ }
  };

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={productJsonLd} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
          <button onClick={() => setView('home')} className="hover:text-gold transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => setView('collections')} className="hover:text-gold transition-colors">Collections</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images — editorial whitespace */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-4">
              <img
                src={product.images.split(',')[0]}
                alt={product.name}
                width={800}
                height={1000}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.split(',').map((img, i) => (
                <div key={i} className="aspect-square rounded-md overflow-hidden bg-muted cursor-pointer hover:ring-2 ring-gold transition-all">
                  <img src={img} alt="" width={200} height={200} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info — restrained, spacious layout */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col">
            {product.collection && (
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{product.collection.name}</p>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              {product.name}
            </h1>

            {/* Stock Status Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${stockInfo.color}`}>
                {isBespokeOnly && <BadgeCheck className="w-3 h-3" />}
                {stockInfo.label}
                {product.stockStatus === 'low-stock' && ` — ${product.stockQuantity} pairs`}
                {product.stockStatus === 'in-stock' && ` — ${product.stockQuantity} pairs available`}
              </span>
            </div>

            {/* Rating */}
            {avgRating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(parseFloat(avgRating)) ? 'fill-gold text-gold' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{avgRating} ({reviews.length} verified reviews)</span>
              </div>
            )}

            {/* Price with reassurance */}
            <div className="mb-8">
              <p className="text-3xl font-serif font-bold text-charcoal">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isReadyToWear ? 'Free shipping within Nigeria' : '30% deposit secures your commission. Balance upon completion.'}
              </p>
            </div>

            <p className="text-muted-foreground leading-[1.8] mb-8">{product.description}</p>

            {/* Quick Specs — editorial spacing */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {product.baseLeather && (
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-lg">
                  <Gem className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{product.baseLeather}</span>
                </div>
              )}
              {product.craftingHours && (
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-lg">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{product.craftingHours}</span>
                </div>
              )}
              {product.leatherSource && (
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-lg">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{product.leatherSource}</span>
                </div>
              )}
              {product.soleType && (
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-lg">
                  <Wrench className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{product.soleType}</span>
                </div>
              )}
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-white rounded-lg border border-gold/10">
              <div className="text-center">
                <ShieldCheck className="w-5 h-5 text-gold mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground leading-tight">Authenticity<br />Certificate</p>
              </div>
              <div className="text-center">
                <Wrench className="w-5 h-5 text-gold mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground leading-tight">Lifetime<br />Resoling</p>
              </div>
              <div className="text-center">
                <FileText className="w-5 h-5 text-gold mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground leading-tight">14-Day<br />Returns</p>
              </div>
            </div>

            {/* Size Selection */}
            {!isBespokeOnly && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-charcoal">Select Size (EU)</p>
                  <button className="text-xs text-gold underline">Sizing Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 text-sm rounded-lg border-2 transition-all flex items-center justify-center ${
                        selectedSize === size
                          ? 'border-gold bg-gold/10 text-charcoal font-semibold'
                          : 'border-border text-muted-foreground hover:border-gold/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Actions — clearly separated purchase models */}
            <div className="space-y-3 mb-8">
              {/* BESPOKE: Commission CTA */}
              {(isBespokeOnly || product.productType === 'made-to-order') && (
                <Button
                  onClick={() => startCommission(product.id)}
                  className="w-full bg-charcoal hover:bg-charcoal/90 text-gold font-semibold h-13 text-base tracking-wide"
                >
                  Begin Commission
                </Button>
              )}

              {/* READY-TO-WEAR: Add to Bag */}
              {(isReadyToWear && !isWaitlist) && (
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold h-13 text-base tracking-wide disabled:opacity-50"
                >
                  {addedToCart ? '✓ Added to Bag' : 'Add to Bag'}
                </Button>
              )}

              {/* WAITLIST */}
              {isWaitlist && !waitlistSubmitted && (
                <div className="space-y-3 p-4 bg-white rounded-lg border border-border">
                  <p className="text-sm font-semibold text-charcoal">This style is currently sold out</p>
                  <p className="text-xs text-muted-foreground">Join the waitlist to be notified when it becomes available again.</p>
                  <div className="flex gap-2">
                    <Input placeholder="Your name" value={waitlistName} onChange={(e) => setWaitlistName(e.target.value)} className="flex-1 h-10 text-sm" />
                    <Input placeholder="Email" type="email" value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)} className="flex-1 h-10 text-sm" />
                  </div>
                  <Button onClick={handleWaitlist} disabled={!waitlistEmail || !waitlistName} className="w-full bg-charcoal text-gold h-10 disabled:opacity-50">
                    Join Waitlist
                  </Button>
                </div>
              )}
              {isWaitlist && waitlistSubmitted && (
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-sm font-semibold text-green-800">You are on the waitlist</p>
                  <p className="text-xs text-green-600 mt-1">We will notify you when this style is available.</p>
                </div>
              )}

              {/* Always available: WhatsApp inquiry */}
              <a
                href={`https://wa.me/2348180474183?text=Hello%20AkpakaNG!%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 h-12">
                  Inquire on WhatsApp
                </Button>
              </a>
            </div>

            {/* Crafting Timeline micro-copy */}
            <div className="bg-charcoal/5 rounded-lg p-5 mb-8 space-y-3">
              <p className="text-xs font-semibold text-charcoal tracking-wider uppercase">What Happens Next</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { step: '1', label: 'Consultation' },
                  { step: '2', label: 'Crafting' },
                  { step: '3', label: 'Quality Check' },
                  { step: '4', label: 'Delivery' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-7 h-7 bg-gold/20 text-gold rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1">{item.step}</div>
                    <p className="text-[10px] text-muted-foreground leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {isReadyToWear ? 'Ships within 3-5 business days. Each pair comes with a certificate of authenticity and care kit.' : 'Bespoke commissions take 3-4 weeks. You will receive progress updates at every stage via WhatsApp.'}
              </p>
            </div>

            {/* Artisan Quote */}
            {product.artisanQuote && (
              <div className="bg-charcoal text-white p-6 rounded-lg mb-8">
                <p className="font-serif text-lg italic text-gold-light leading-relaxed">
                  &ldquo;{product.artisanQuote}&rdquo;
                </p>
                <p className="text-sm text-white/50 mt-3">— Prince Sunday Achase, Master Artisan</p>
              </div>
            )}

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-6">
                {(['story', 'materials', 'reviews', 'care'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold capitalize transition-colors ${
                      activeTab === tab ? 'text-charcoal border-b-2 border-gold' : 'text-muted-foreground hover:text-charcoal'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'story' && (
                <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <p className="text-muted-foreground leading-[1.8]">{product.description}</p>
                  <p className="text-muted-foreground leading-[1.8]">
                    Every Akpaka shoe begins with a conversation — understanding not just what you want to wear, 
                    but how you want to feel. This design was born from Prince Achase&apos;s dedication to 
                    pushing the boundaries of Nigerian luxury craftsmanship, combining time-honoured 
                    techniques with contemporary aesthetics.
                  </p>
                </motion.div>
              )}

              {activeTab === 'materials' && (
                <motion.div key="materials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                    <div className="w-14 h-14 bg-amber-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gem className="w-7 h-7 text-amber-800" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal">{product.baseLeather || 'Premium Leather'}</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Sourced from {product.leatherSource || 'select international tanneries'}. 
                        Our leather is vegetable-tanned for a minimum of 6 weeks, producing a hide 
                        of extraordinary suppleness and depth of grain.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                    <div className="w-14 h-14 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-7 h-7 text-stone-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal">{product.soleType || 'Premium Sole Construction'}</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Our soles are built to last decades. Goodyear welt construction allows for 
                        easy resoling, while natural leather provides unmatched breathability and 
                        a refined aesthetic.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to share your experience.</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="p-4 bg-white rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted'}`} />
                            ))}
                          </div>
                          <span className="font-semibold text-sm text-charcoal">{review.authorName}</span>
                          {review.verified && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                              <BadgeCheck className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'care' && (
                <motion.div key="care" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal mb-2">After-Sales Care</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Every Akpaka shoe comes with a lifetime resoling guarantee. Our Goodyear welt 
                      construction means your shoes can be resoled indefinitely, preserving the upper 
                      while refreshing the foundation. Resoling service is available at our Port Harcourt 
                      atelier or by post.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal mb-2">Returns Policy</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ready-to-wear shoes may be returned within 14 days of delivery in unworn condition 
                      with original packaging. Bespoke commissions are non-refundable once production has 
                      begun, but we offer complimentary adjustments to ensure perfect fit.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal mb-2">Sizing Guarantee</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Not sure about your size? We provide a complimentary sizing consultation via WhatsApp 
                      video call. If your shoes do not fit perfectly, we offer one free size exchange on 
                      ready-to-wear pairs within 14 days.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Input({ placeholder, value, onChange, className, type, disabled }: {
  placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string; type?: string; disabled?: boolean;
}) {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    />
  );
}
