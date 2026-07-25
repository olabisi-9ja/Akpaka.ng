'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight, Heart, Ruler, ShieldCheck, Star, Truck } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface Review { id?: string; rating: number; comment?: string; authorName?: string; verified?: boolean; }
interface Product {
  id: string; name: string; description: string; price: number; images: string; category: string; productType: string; stockStatus: string;
  stockQuantity?: number; baseLeather?: string | null; soleType?: string | null; craftingHours?: string | null; leatherSource?: string | null;
  artisanQuote?: string | null; collection?: { name: string } | null; reviews?: Review[];
}

const sizes = ['38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'];

export function ProductDetailPage() {
  const { selectedProductId, setView, startCommission, addToCart, trackEvent } = useAppStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [waitlist, setWaitlist] = useState({ name: '', email: '' });
  const [waitlistSent, setWaitlistSent] = useState(false);

  useEffect(() => {
    if (!selectedProductId) return;
    let active = true;
    fetch(`/api/products?id=${selectedProductId}`)
      .then((response) => response.json())
      .then((item) => {
        if (!active) return;
        setProduct(item?.error ? null : item);
        setSelectedSize('');
        setActiveImage(0);
        setLoading(false);
      })
      .catch(() => { if (active) { setProduct(null); setLoading(false); } });
    return () => { active = false; };
  }, [selectedProductId]);

  const images = useMemo(() => product?.images.split(',').filter(Boolean) ?? [], [product]);
  const reviews = product?.reviews ?? [];
  const averageRating = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : null;

  if (loading) return <main className="grid min-h-screen place-items-center bg-white pt-[100px]"><div className="h-12 w-12 animate-spin rounded-full border-2 border-black/10 border-t-black" /></main>;
  if (!product) return <main className="grid min-h-screen place-items-center bg-white px-5 pt-[100px] text-center"><div><p className="text-3xl font-bold tracking-[-0.05em]">This style has moved on.</p><p className="mt-2 text-sm text-black/55">Explore the latest work from the Akpaka atelier.</p><button onClick={() => setView('collections')} className="mt-6 rounded-full bg-black px-6 py-3 text-xs font-bold text-white">Shop all shoes</button></div></main>;

  const isReadyToWear = product.productType === 'ready-to-wear';
  const isWaitlist = product.stockStatus === 'waitlist';
  const isBespoke = product.productType === 'bespoke-only' || product.productType === 'made-to-order';
  const stockCopy = isWaitlist ? 'Coming back soon' : isReadyToWear ? 'Ready to wear' : product.productType === 'bespoke-only' ? 'Bespoke commission' : 'Made to order';

  const add = () => {
    if (!selectedSize) return;
    addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1, image: images[0], size: selectedSize, type: 'ready-to-wear', leather: product.baseLeather || undefined, sole: product.soleType || undefined });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const joinWaitlist = async () => {
    if (!waitlist.name || !waitlist.email) return;
    await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product.id, ...waitlist }) }).catch(() => undefined);
    setWaitlistSent(true);
    trackEvent('join_waitlist', { productId: product.id });
  };

  return (
    <main className="min-h-screen bg-white pb-20 pt-[100px] text-[#111] lg:pt-[132px]">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <nav className="mb-5 flex items-center gap-1.5 text-xs text-black/55"><button onClick={() => setView('home')} className="hover:text-black">Home</button><ChevronRight className="h-3 w-3" /><button onClick={() => setView('collections')} className="hover:text-black">Shoes</button><ChevronRight className="h-3 w-3" /><span className="max-w-[200px] truncate text-black">{product.name}</span></nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,.65fr)] lg:gap-12">
          <section>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5] lg:hidden">
              <img src={images[activeImage] || images[0]} alt={product.name} className="h-full w-full object-cover mix-blend-multiply" />
              {images.length > 1 && <><button onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white"><ChevronLeft className="h-5 w-5" /></button><button onClick={() => setActiveImage((activeImage + 1) % images.length)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white"><ChevronRight className="h-5 w-5" /></button></>}
            </div>
            <div className="hidden grid-cols-2 gap-3 lg:grid">
              {images.map((image, index) => <button key={`${image}-${index}`} onClick={() => setActiveImage(index)} className={`relative aspect-[4/5] overflow-hidden bg-[#f5f5f5] ${activeImage === index ? 'ring-1 ring-black' : ''}`}><img src={image} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover mix-blend-multiply transition duration-500 hover:scale-105" /></button>)}
            </div>
            {images.length > 1 && <div className="mt-3 flex gap-2 lg:hidden">{images.map((image, index) => <button aria-label={`Show image ${index + 1}`} key={`${image}-thumb-${index}`} onClick={() => setActiveImage(index)} className={`h-1.5 flex-1 rounded-full ${activeImage === index ? 'bg-black' : 'bg-black/15'}`} />)}</div>}
          </section>

          <aside className="lg:sticky lg:top-[124px] lg:h-fit">
            <div className="flex items-start justify-between gap-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">{product.collection?.name || `${product.category} collection`}</p><h1 className="mt-2 text-3xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-4xl">{product.name}</h1></div><button onClick={() => setSaved(!saved)} aria-label="Save this product" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5f5f5]"><Heart className={`h-5 w-5 ${saved ? 'fill-[#8d3d27] text-[#8d3d27]' : ''}`} /></button></div>
            <p className="mt-4 text-lg">₦{product.price.toLocaleString()}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold"><span className={`h-2 w-2 rounded-full ${isWaitlist ? 'bg-amber-500' : 'bg-emerald-600'}`} />{stockCopy}</p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-black/65">{product.description}</p>

            {averageRating && <button className="mt-5 flex items-center gap-2 text-sm underline underline-offset-4"><span className="flex">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className={`h-4 w-4 ${index < Math.round(Number(averageRating)) ? 'fill-black' : 'fill-black/15 text-black/15'}`} />)}</span> {averageRating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})</button>}

            {!isBespoke && <div className="mt-8 border-t border-black/10 pt-6"><div className="flex items-center justify-between"><p className="text-sm font-bold">Select size</p><button onClick={() => setView('policies')} className="inline-flex items-center gap-1 text-xs underline underline-offset-4"><Ruler className="h-3.5 w-3.5" /> Size guide</button></div><div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6">{sizes.map((size) => <button key={size} onClick={() => setSelectedSize(size)} className={`h-11 border text-sm transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-black/15 hover:border-black'}`}>{size}</button>)}</div></div>}

            <div className="mt-7 space-y-3">
              {isReadyToWear && !isWaitlist && <button disabled={!selectedSize} onClick={add} className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-black/20">{added ? <><Check className="h-4 w-4" /> Added to bag</> : 'Add to bag'}</button>}
              {isBespoke && <button onClick={() => startCommission(product.id)} className="h-13 w-full rounded-full bg-black px-5 py-4 text-sm font-bold text-white">Begin your commission</button>}
              {isWaitlist && !waitlistSent && <div className="space-y-2 rounded-xl bg-[#f5f5f5] p-4"><p className="text-sm font-bold">Be first to know.</p><p className="text-xs text-black/55">This style is being prepared for its next release.</p><input value={waitlist.name} onChange={(event) => setWaitlist({ ...waitlist, name: event.target.value })} placeholder="Your name" className="h-10 w-full rounded-md border border-black/10 bg-white px-3 text-sm outline-none focus:border-black" /><input type="email" value={waitlist.email} onChange={(event) => setWaitlist({ ...waitlist, email: event.target.value })} placeholder="Email address" className="h-10 w-full rounded-md border border-black/10 bg-white px-3 text-sm outline-none focus:border-black" /><button disabled={!waitlist.name || !waitlist.email} onClick={joinWaitlist} className="h-10 w-full rounded-full bg-black text-xs font-bold text-white disabled:bg-black/20">Join waitlist</button></div>}
              {isWaitlist && waitlistSent && <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">You are on the list. We will get in touch when this pair is ready.</div>}
              <a href={`https://wa.me/2348180474183?text=Hello%20Akpaka!%20I%20would%20like%20to%20ask%20about%20${encodeURIComponent(product.name)}.`} target="_blank" rel="noreferrer" className="block"><button className="h-12 w-full rounded-full border border-black/20 bg-white text-sm font-bold hover:border-black">Ask about this pair</button></a>
            </div>

            <div className="mt-7 divide-y divide-black/10 border-y border-black/10">
              <details open className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold">Details <ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary><div className="pt-3 text-sm leading-relaxed text-black/60"><p>{product.baseLeather || 'Premium hand-selected leather'} · {product.soleType || 'Artisan-built sole'}</p>{product.craftingHours && <p className="mt-2">Crafted over {product.craftingHours} in our Port Harcourt atelier.</p>}</div></details>
              <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold"><span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Delivery & returns</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary><div className="pt-3 text-sm leading-relaxed text-black/60">Ready-to-wear pairs are dispatched in 3–5 business days. Made-to-order and bespoke pairs include a personal consultation before production. Unworn ready-to-wear shoes may be exchanged within 14 days.</div></details>
              <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> The Akpaka promise</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary><div className="pt-3 text-sm leading-relaxed text-black/60">Your pair is crafted and checked by our atelier. Ask us about care, fitting and resoling whenever you need us.</div></details>
            </div>
          </aside>
        </div>

        <section className="mt-16 border-t border-black/10 pt-12 lg:mt-24"><div className="grid gap-10 md:grid-cols-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">Material</p><p className="mt-3 text-lg font-semibold">{product.baseLeather || 'Premium leather'}</p><p className="mt-2 text-sm leading-relaxed text-black/60">Sourced for character, worked by hand and finished to develop a patina that gets better with wear.</p></div><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">Construction</p><p className="mt-3 text-lg font-semibold">{product.soleType || 'Made to endure'}</p><p className="mt-2 text-sm leading-relaxed text-black/60">A considered foundation that balances long wear, comfort and a clean profile.</p></div><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">Atelier note</p><p className="mt-3 text-lg font-semibold">Built in Port Harcourt.</p><p className="mt-2 text-sm leading-relaxed text-black/60">{product.artisanQuote ? `“${product.artisanQuote}”` : 'Made with the focus, patience and point of view that defines every Akpaka pair.'}</p></div></div></section>

        {reviews.length > 0 && <section className="mt-16 border-t border-black/10 pt-10"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">From the people who wear Akpaka</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.05em]">Reviews</h2><div className="mt-7 grid gap-4 md:grid-cols-2">{reviews.map((review, index) => <article key={review.id || index} className="rounded-xl bg-[#f5f5f5] p-5"><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className={`h-3.5 w-3.5 ${star < review.rating ? 'fill-black' : 'fill-black/20 text-black/20'}`} />)}</div><p className="mt-3 text-sm leading-relaxed">{review.comment || 'An exceptional pair — the finish and fit feel considered in every detail.'}</p><p className="mt-4 text-xs font-bold text-black/55">{review.authorName || 'Verified Akpaka customer'}</p></article>)}</div></section>}
      </div>
    </main>
  );
}
