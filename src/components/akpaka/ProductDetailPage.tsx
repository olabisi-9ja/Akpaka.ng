'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Clock, MapPin, MessageSquare, Heart, Share2, ChevronRight, Gem } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string;
  category: string;
  baseLeather: string | null;
  soleType: string | null;
  craftingHours: string | null;
  leatherSource: string | null;
  artisanQuote: string | null;
  collection: { name: string } | null;
  reviews: Review[];
}

export function ProductDetailPage() {
  const { selectedProductId, setView, selectProduct, startCommission, addToCart } = useAppStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'story' | 'materials' | 'reviews'>('story');

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
        <p className="text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  const reviews = product.reviews ?? [];
  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={() => setView('home')} className="hover:text-gold transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => setView('collections')} className="hover:text-gold transition-colors">Collections</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-charcoal">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-4">
              <img
                src={product.images.split(',')[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.split(',').map((img, i) => (
                <div key={i} className="aspect-square rounded-md overflow-hidden bg-muted cursor-pointer hover:ring-2 ring-gold transition-all">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {product.collection && (
              <p className="text-gold text-sm tracking-widest uppercase mb-2">{product.collection.name}</p>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            {avgRating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(parseFloat(avgRating)) ? 'fill-gold text-gold' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{avgRating} ({reviews.length} reviews)</span>
              </div>
            )}

            {/* Price */}
            <p className="text-3xl font-serif font-bold text-gold mb-6">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.baseLeather && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <Gem className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{product.baseLeather}</span>
                </div>
              )}
              {product.craftingHours && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{product.craftingHours}</span>
                </div>
              )}
              {product.leatherSource && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{product.leatherSource}</span>
                </div>
              )}
              {product.soleType && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z" />
                  </svg>
                  <span className="text-sm text-muted-foreground">{product.soleType}</span>
                </div>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-charcoal mb-3">Select Size (EU)</p>
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
              <p className="text-xs text-muted-foreground mt-2">
                Don&apos;t know your size? <button className="text-gold underline">Download our sizing guide</button>
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <Button
                onClick={() => startCommission(product.id)}
                className="w-full bg-charcoal hover:bg-charcoal/90 text-gold font-semibold h-12 text-base"
              >
                Commission This Style
              </Button>
              <Button
                onClick={() => {
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.images.split(',')[0],
                    size: selectedSize || undefined,
                  });
                }}
                className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold h-12 text-base"
              >
                Add to Collection
              </Button>
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

            {/* Artisan Quote */}
            {product.artisanQuote && (
              <div className="bg-charcoal text-white p-6 rounded-lg mb-6">
                <p className="font-serif text-lg italic text-gold-light leading-relaxed">
                  &ldquo;{product.artisanQuote}&rdquo;
                </p>
                <p className="text-sm text-white/50 mt-3">— Prince Sunday Achase, Master Artisan</p>
              </div>
            )}

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-6">
                {(['story', 'materials', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-charcoal border-b-2 border-gold'
                        : 'text-muted-foreground hover:text-charcoal'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'story' && (
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Every Akpaka shoe begins with a conversation — understanding not just what you want to wear, 
                  but how you want to feel. This design was born from Prince Achase&apos;s dedication to 
                  pushing the boundaries of Nigerian luxury craftsmanship, combining time-honoured 
                  techniques with contemporary aesthetics.
                </p>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                  <div className="w-16 h-16 bg-amber-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gem className="w-8 h-8 text-amber-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">{product.baseLeather || 'Premium Leather'}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sourced from {product.leatherSource || 'select international tanneries'}. 
                      Our leather is vegetable-tanned for a minimum of 6 weeks, producing a hide 
                      of extraordinary suppleness and depth of grain.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                  <div className="w-16 h-16 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">{product.soleType || 'Premium Sole Construction'}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our soles are built to last decades. Goodyear welt construction allows for 
                      easy resoling, while natural leather provides unmatched breathability and 
                      a refined aesthetic.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
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
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
