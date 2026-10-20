'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight, Heart, MessageCircle, Ruler, ShieldCheck, Star, Truck } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { ProductCarousel, CarouselProduct } from '@/components/akpaka/ProductCarousel';

interface Review { id?: string; rating: number; comment?: string; authorName?: string; verified?: boolean; }
interface Product {
  id: string; name: string; description: string; price: number; images: string; category: string;
  productType: string; stockStatus: string; stockQuantity?: number; baseLeather?: string | null;
  soleType?: string | null; craftingHours?: string | null; leatherSource?: string | null;
  artisanQuote?: string | null; collection?: { name: string } | null; reviews?: Review[];
  featured?: boolean;
}

const sizes = ['38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'];

export function ProductDetailPage() {
  const { selectedProductId, setView, startCommission, addToCart, toggleWishlist, isWishlisted, selectProduct } = useAppStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
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

  useEffect(() => {
    if (!product) return;
    fetch('/api/products')
      .then((response) => response.json())
      .then((catalogue: Product[]) => {
        if (!Array.isArray(catalogue)) return;
        setRelated(catalogue.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 6));
      })
      .catch(() => undefined);
  }, [product]);

  const images = useMemo(() => product?.images.split(',').filter(Boolean) ?? [], [product]);
  const reviews = product?.reviews ?? [];
  const averageRating = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : null;

  if (loading) return <main className="grid min-h-screen place-items-center bg-white pt-[92px]"><div className="h-12 w-12 animate-spin rounded-full border-2 border-black/10 border-t-black" /></main>;
  if (!product) return <main className="grid min-h-screen place-items-center bg-white px-5 pt-[92px] text-center"><div><p className="text-3xl font-bold tracking-[-0.05em]">This style has moved on.</p><p className="mt-2 text-sm text-black/55">Explore the latest work from the Akpaka atelier.</p><button onClick={() => setView('collections')} className="mt-6 rounded-full bg-black px-6 py-3 text-xs font-bold text-white">Shop all shoes</button></div></main>;

  const isReadyToWear = product.productType === 'ready-to-wear';
  const isWaitlist = product.stockStatus === 'waitlist';
  const isBespoke = product.productType === 'bespoke-only' || product.productType === 'made-to-order';
  const stockCopy = isWaitlist ? 'Coming back soon' : isReadyToWear ? 'Ready to wear' : product.productType === 'bespoke-only' ? 'Bespoke commission' : 'Made to order';
  const wished = isWishlisted(product.id);

  const add = () => {
    if (!selectedSize) return;
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: images[0],
      size: selectedSize,
      type: 'ready-to-wear',
      leather: product.baseLeather || undefined,
      sole: product.soleType || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const joinWaitlist = async () => {
    if (!waitlist.name || !waitlist.email) return;
    await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product.id, ...waitlist }) }).catch(() => undefined);
    setWaitlistSent(true);
  };

  return (
    <main className="min-h-screen bg-white pb-20 pt-[92px] text-black lg:pt-[92px]">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10">
        {/* Breadcrumbs */}
        <nav className="mb-5 flex items-center gap-1.5 text-xs text-black/55">
          <button onClick={() => setView('home')} className="hover:text-black">Home</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => setView('collections')} className="hover:text-black">Shoes</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => setView('collections')} className="hover:text-black capitalize">{product.category}</button>
          <ChevronRight className="h-3 w-3" />
          <span className="max-w-[220px] truncate text-black">{product.name.toLowerCase()}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,.65fr)] lg:gap-14">
          {/* Gallery */}
          <section>
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] lg:hidden">
              <img src={images[activeImage] || images[0]} alt={product.name} className="h-full w-full object-cover" />
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white"><ChevronLeft className="h-5 w-5" /></button>
                  <button onClick={() => setActiveImage((activeImage + 1) % images.length)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white"><ChevronRight className="h-5 w-5" /></button>
                </>
              )}
              <span className="absolute bottom-3 right-3 bg-white px-2 py-1 text-[10px] font-semibold">Image {activeImage + 1} of {images.length}</span>
            </div>
            <div className="hidden gap-3 lg:grid lg:grid-cols-[64px_1fr]">
              <div className="flex flex-col gap-2">
                {images.map((image, index) => (
                  <button key={`${image}-${index}`} onClick={() => setActiveImage(index)} className={`relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] ${activeImage === index ? 'ring-1 ring-black' : ''}`}>
                    <img src={image} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                <img src={images[activeImage] || images[0]} alt={product.name} className="h-full w-full object-cover" />
                <button
                  aria-label={`Save ${product.name}`}
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white"
                >
                  <Heart className={`h-5 w-5 ${wished ? 'fill-black' : ''}`} />
                </button>
              </div>
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 lg:hidden">
                {images.map((image, index) => (
                  <button aria-label={`Show image ${index + 1}`} key={`${image}-thumb-${index}`} onClick={() => setActiveImage(index)} className={`h-1.5 flex-1 rounded-full ${activeImage === index ? 'bg-black' : 'bg-black/15'}`} />
                ))}
              </div>
            )}
          </section>

          {/* Buy column */}
          <aside className="lg:sticky lg:top-[124px] lg:h-fit">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                  {product.featured ? 'New Season' : product.collection?.name || `${product.category} collection`}
                </p>
                <h1 className="mt-2 flex flex-wrap items-baseline gap-x-2 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                  <button onClick={() => setView('collections')} className="font-bold hover:underline underline-offset-4">Akpaka</button>
                  <span className="font-normal text-black/85">{product.name.toLowerCase()}</span>
                </h1>
              </div>
            </div>
            <p className="mt-4 text-lg font-medium">₦{product.price.toLocaleString()}</p>

            {/* Service strip */}
            <div className="mt-5 flex items-center gap-2 rounded-sm bg-[#f5f5f5] px-4 py-3 text-xs text-black/75">
              <MessageCircle className="h-4 w-4 shrink-0" />
              Complimentary WhatsApp fitting support with every order
            </div>

            <p className="mt-4 text-sm font-semibold">{isBespoke ? 'Commission available' : 'EU sizes available'}</p>

            {!isBespoke && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Select size</p>
                  <button onClick={() => setView('policies')} className="inline-flex items-center gap-1 text-xs underline underline-offset-4"><Ruler className="h-3.5 w-3.5" /> Size guide</button>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 border text-sm transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-black/15 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3">
              {isReadyToWear && !isWaitlist && (
                <button disabled={!selectedSize} onClick={add} className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-black/20">
                  {added ? (<><Check className="h-4 w-4" /> Added to bag</>) : 'Add to bag'}
                </button>
              )}
              {isReadyToWear && !isWaitlist && (
                <p className="text-center text-xs text-black/55">Estimated dispatch: 3–5 business days</p>
              )}
              {isBespoke && (
                <button onClick={() => startCommission(product.id)} className="h-13 w-full rounded-full bg-black px-5 py-4 text-sm font-bold text-white">
                  Begin your commission
                </button>
              )}
              {isWaitlist && !waitlistSent && (
                <div className="space-y-2 rounded-sm bg-[#f5f5f5] p-4">
                  <p className="text-sm font-bold">Be first to know.</p>
                  <p className="text-xs text-black/55">This style is being prepared for its next release.</p>
                  <input value={waitlist.name} onChange={(event) => setWaitlist({ ...waitlist, name: event.target.value })} placeholder="Your name" className="h-10 w-full rounded-sm border border-black/10 bg-white px-3 text-sm outline-none focus:border-black" />
                  <input type="email" value={waitlist.email} onChange={(event) => setWaitlist({ ...waitlist, email: event.target.value })} placeholder="Email address" className="h-10 w-full rounded-sm border border-black/10 bg-white px-3 text-sm outline-none focus:border-black" />
                  <button disabled={!waitlist.name || !waitlist.email} onClick={joinWaitlist} className="h-10 w-full rounded-full bg-black text-xs font-bold text-white disabled:bg-black/20">Join waitlist</button>
                </div>
              )}
              {isWaitlist && waitlistSent && (
                <div className="rounded-sm bg-[#f5f5f5] p-4 text-sm">You are on the list. We will get in touch when this pair is ready.</div>
              )}
              <a
                href={`https://wa.me/2348180474183?text=Hello%20Akpaka!%20I%20would%20like%20to%20ask%20about%20${encodeURIComponent(product.name)}.`}
                target="_blank" rel="noreferrer" className="block"
              >
                <button className="h-12 w-full rounded-full border border-black/20 bg-white text-sm font-bold hover:border-black">Ask about this pair</button>
              </a>
            </div>

            {/* Also available in */}
            {related.length > 0 && (
              <div className="mt-7">
                <p className="ff-eyebrow">Also available in</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {related.slice(0, 4).map((item) => (
                    <button key={item.id} onClick={() => selectProduct(item.id)} className="group text-left">
                      <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                        <img src={item.images.split(',')[0]} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      </div>
                      <p className="mt-2 truncate text-[11px] text-black/70">{item.name.toLowerCase()}</p>
                      <p className="text-[11px] font-medium">₦{item.price.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* The Details accordion */}
            <div className="mt-7 divide-y divide-black/10 border-y border-black/10">
              <details open className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold">The Details <ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
                <div className="space-y-3 pt-3 text-sm leading-relaxed text-black/65">
                  <p className="font-semibold text-black">Highlights</p>
                  <p>{product.description}</p>
                  <ul className="list-disc space-y-1 pl-5">
                    {product.baseLeather && <li>{product.baseLeather} upper</li>}
                    {product.soleType && <li>{product.soleType}</li>}
                    {product.craftingHours && <li>Handcrafted over {product.craftingHours}</li>}
                    <li>Protective case and care guide included</li>
                  </ul>
                  <p className="pt-2 font-semibold text-black">Made in Port Harcourt, Nigeria</p>
                  <p>Akpaka ID: {product.id}</p>
                  {product.leatherSource && <p>Leather source: {product.leatherSource}</p>}
                </div>
              </details>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold"><span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Delivery & returns</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
                <div className="pt-3 text-sm leading-relaxed text-black/65">Ready-to-wear pairs are dispatched in 3–5 business days with free delivery on orders over ₦75,000. Made-to-order and bespoke pairs include a personal consultation before production. Unworn ready-to-wear shoes may be exchanged within 14 days.</div>
              </details>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> The Akpaka promise</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
                <div className="pt-3 text-sm leading-relaxed text-black/65">Every pair is crafted and checked by our atelier. Ask us about care, fitting and lifetime resoling whenever you need us.</div>
              </details>
            </div>
          </aside>
        </div>

        {/* Measurements & composition */}
        <section className="mt-16 border-t border-black/10 pt-12 lg:mt-24">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="ff-eyebrow">Material</p>
              <p className="mt-3 text-lg font-semibold">{product.baseLeather || 'Premium leather'}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/60">Sourced for character, worked by hand and finished to develop a patina that gets better with wear.</p>
            </div>
            <div>
              <p className="ff-eyebrow">Construction</p>
              <p className="mt-3 text-lg font-semibold">{product.soleType || 'Made to endure'}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/60">A considered foundation that balances long wear, comfort and a clean profile.</p>
            </div>
            <div>
              <p className="ff-eyebrow">Atelier note</p>
              <p className="mt-3 text-lg font-semibold">Built in Port Harcourt.</p>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{product.artisanQuote ? `“${product.artisanQuote}”` : 'Made with the focus, patience and point of view that defines every Akpaka pair.'}</p>
            </div>
          </div>
        </section>

        {/* Why Akpaka */}
        <section className="mt-16 border-y border-black/10 py-12 lg:mt-8">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-[-0.04em]">Why Akpaka?</h2>
          <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'The pair you want? We build it.', copy: 'Over forty styles on the bench, and bespoke for everything else.' },
              { title: '4.9/5 from our clients', copy: 'Verified reviews via WhatsApp and Instagram.' },
              { title: 'You know you can trust us', copy: 'Authenticity certificate with every commission. Lifetime resoling.' },
              { title: 'Changed your mind? No problem.', copy: '14-day exchanges on ready-to-wear, free returns within Nigeria.' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <p className="text-[15px] font-bold">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/60">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="mt-16 border-t border-black/10 pt-10">
            <div className="flex items-center gap-3">
              <p className="ff-eyebrow">From the people who wear Akpaka</p>
              <span className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-black" /> {averageRating} ({reviews.length})
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em]">Reviews</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {reviews.map((review, index) => (
                <article key={review.id || index} className="rounded-sm bg-[#f5f5f5] p-5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className={`h-3.5 w-3.5 ${star < review.rating ? 'fill-black' : 'fill-black/20 text-black/20'}`} />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{review.comment || 'An exceptional pair — the finish and fit feel considered in every detail.'}</p>
                  <p className="mt-4 text-xs font-bold text-black/55">{review.authorName || 'Verified Akpaka client'}{review.verified ? ' · Verified' : ''}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-black/10 pt-12">
            <div className="mb-8">
              <p className="ff-eyebrow">Keep looking</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em]">You may also like</h2>
            </div>
            <ProductCarousel
              products={related.slice(0, 8).map((item) => ({ ...item, badge: item.featured ? 'New Season' : undefined }))}
            />
          </section>
        )}
      </div>
    </main>
  );
}
