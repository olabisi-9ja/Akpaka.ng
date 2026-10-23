'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, MoveRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, View } from '@/store/useAppStore';
import { ProductCarousel, CarouselProduct } from '@/components/akpaka/ProductCarousel';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string;
  category: string;
  productType: string;
  stockStatus: string;
  baseLeather?: string | null;
  featured: boolean;
}

const heroSlides = [
  {
    image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784679463902.png',
    eyebrow: 'The 2026 signature edit',
    title: 'Made to make an entrance.',
    copy: 'Handcrafted leather shoes from Port Harcourt — built for the rooms you want to own.',
    cta: 'Shop the new edit',
    action: 'collections' as const,
  },
  {
    image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784679471629.png',
    eyebrow: 'One pair. Entirely yours.',
    title: 'Bespoke, from first fitting to final polish.',
    copy: 'Choose your leather, last, sole and patina with an Akpaka artisan.',
    cta: 'Begin a commission',
    action: 'commission' as const,
  },
  {
    image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784679479513.png',
    eyebrow: 'The atelier way',
    title: 'Forty hours. One pair. No compromise.',
    copy: 'Goodyear welted, hand-burnished, finished to develop a patina that ages with you.',
    cta: 'Meet the atelier',
    action: 'craftsmanship' as const,
  },
];

const departments = [
  { label: 'Womenswear', note: 'Oxfords, loafers & wedding', image: '/images/editorial/media__1784681124508.jpg', department: 'women' },
  { label: 'Menswear', note: 'Brogues, boots & classics', image: '/images/editorial/media__1784681124466.jpg', department: 'men' },
  { label: 'Bespoke', note: 'Made to measure, entirely yours', image: '/images/editorial/media__1784681124579.jpg', department: 'bespoke' },
];

const categoryGrids = [
  {
    department: 'womenswear',
    tiles: [
      { label: 'New In', image: '/images/akpaka-hero-campaign.jpg', action: 'new-in' },
      { label: 'Oxfords', image: '/images/editorial/media__1784681124466.jpg', action: 'oxford' },
      { label: 'Loafers', image: '/images/editorial/media__1784681124508.jpg', action: 'loafer' },
      { label: 'Wedding', image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683717547.jpg', action: 'wedding' },
    ],
  },
  {
    department: 'menswear',
    tiles: [
      { label: 'New In', image: '/images/akpaka-hero-campaign.jpg', action: 'new-in' },
      { label: 'Oxfords', image: '/images/editorial/media__1784681124466.jpg', action: 'oxford' },
      { label: 'Boots', image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683705976.jpg', action: 'boot' },
      { label: 'Loafers', image: '/images/editorial/media__1784681124508.jpg', action: 'loafer' },
    ],
  },
  {
    department: 'bespoke',
    tiles: [
      { label: 'Begin a commission', image: '/images/editorial/media__1784681124579.jpg', action: 'commission' },
      { label: 'How bespoke works', image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683729580.png', action: 'craftsmanship' },
      { label: 'Track your commission', image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683749061.png', action: 'dashboard' },
      { label: 'Masterclass', image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683882227.png', action: 'masterclass' },
    ],
  },
];

const trending = ['Oxfords', 'Loafers', 'Chelsea boots', 'Wedding shoes', 'Goodyear welt', 'Bespoke'];

const atelierFavourites = ['Oxford Collection', 'Loafers & Moccasins', 'Boots Collection', 'Wedding Special'];

export function HomePage() {
  const { setView, selectProduct, selectCollection, setSelectedDepartment, startCommission } = useAppStore();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((catalogue) => {
        const list = Array.isArray(catalogue) ? catalogue : [];
        setAllProducts(list);
        setFeaturedProducts(list.filter((item: Product) => item.featured));
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((index) => (index + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (view: string) => {
    if (view === 'collections') setView('collections');
    else if (view === 'commission') startCommission(null);
    else if (view === 'product') selectProduct('');
    else setView(view as never);
  };

  const openCategory = (action: string) => {
    if (action === 'new-in') {
      setSelectedDepartment('new-in');
      selectCollection(null);
      setView('collections');
      return;
    }
    if (['commission', 'craftsmanship', 'dashboard', 'masterclass', 'journal'].includes(action)) {
      setView(action as never);
      return;
    }
    selectCollection(
      action === 'oxford'
        ? 'Oxford Collection'
        : action === 'loafer'
          ? 'Loafers & Moccasins'
          : action === 'boot'
            ? 'Boots Collection'
            : action === 'wedding'
              ? 'Wedding Special'
              : null
    );
    setSelectedDepartment(null);
    setView('collections');
  };

  const newIn: CarouselProduct[] = featuredProducts.slice(0, 8).map((product) => ({
    ...product,
    badge: 'New Season',
  }));

  const samples: CarouselProduct[] = allProducts
    .filter((product) => product.stockStatus !== 'bespoke-only')
    .slice(0, 8)
    .map((product) => ({
      ...product,
      badge: 'Special Offer',
      originalPrice: Math.round((product.price / 0.85) / 100) * 100,
      discount: '-15%',
    }));

  const editorial: CarouselProduct[] = allProducts.slice(4, 8).map((product) => ({ ...product }));

  return (
    <div className="bg-white pb-20 pt-[92px] text-black lg:pt-[92px]">
      {/* Hero carousel */}
      <section className="relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[420px] sm:min-h-[540px] lg:min-h-[calc(100vh-108px)]"
          >
            <img
              src={heroSlides[heroIndex].image}
              alt={heroSlides[heroIndex].title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
            <div className="relative mx-auto flex min-h-[420px] max-w-[1680px] items-end px-6 py-14 sm:min-h-[540px] sm:px-10 sm:py-20 lg:min-h-[calc(100vh-108px)] lg:px-16 lg:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-[620px] text-white"
              >
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{heroSlides[heroIndex].eyebrow}</p>
                <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{heroSlides[heroIndex].title}</h1>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">{heroSlides[heroIndex].copy}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => go(heroSlides[heroIndex].action)}
                    className="rounded-full bg-white px-6 py-3.5 text-xs font-bold text-black transition-transform hover:scale-[1.03]"
                  >
                    {heroSlides[heroIndex].cta}
                  </button>
                  <button
                    onClick={() => setView('collections')}
                    className="rounded-full border border-white/70 px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Shop all
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setHeroIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${index === heroIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
        <button
          aria-label="Previous slide"
          onClick={() => setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-black lg:grid"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => setHeroIndex((heroIndex + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-black lg:grid"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </section>

      {/* Choose a department */}
      <section className="mx-auto max-w-[1680px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Choose a department</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {departments.map((department) => (
            <button
              key={department.label}
              onClick={() => {
                setSelectedDepartment(department.department);
                setView('collections');
              }}
              className="group relative block min-h-[220px] overflow-hidden text-left sm:min-h-[300px]"
            >
              <img src={department.image} alt={department.label} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">{department.label}</p>
                <p className="mt-1 text-sm text-white/75">{department.note}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] underline underline-offset-4">
                  Shop now <MoveRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Department category grids */}
      {categoryGrids.map((grid) => (
        <section key={grid.department} className="mx-auto max-w-[1680px] px-4 pb-14 sm:px-6 lg:px-10 lg:pb-20">
          <h2 className="mb-6 text-xl font-bold tracking-[-0.03em] capitalize sm:text-2xl">{grid.department}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {grid.tiles.map((tile) => (
              <button key={tile.label} onClick={() => openCategory(tile.action)} className="group text-left">
                <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                  <img src={tile.image} alt={tile.label} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-3 text-[13px] font-bold">{tile.label}</p>
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* Editorial carousel */}
      <section className="mx-auto grid max-w-[1680px] grid-cols-1 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-10 lg:pb-24">
        <div className="relative min-h-[420px] overflow-hidden bg-[#1c1917] sm:min-h-[560px]">
          <img src="/images/editorial/media__1784681124579.jpg" alt="A shoemaker at work in the Akpaka atelier" className="absolute inset-0 h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/65">The Akpaka way</p>
            <h2 className="mt-3 max-w-md text-4xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-5xl">Craft has a point of view.</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">The hands behind your next pair. The process behind every confident step.</p>
            <button onClick={() => setView('craftsmanship')} className="mt-7 rounded-full bg-white px-6 py-3 text-xs font-bold text-black">Meet the atelier</button>
          </div>
        </div>
        <div className="flex min-h-[420px] flex-col justify-center bg-[#efece7] px-8 py-14 sm:min-h-[560px] sm:px-14 lg:px-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/55">From the bench</p>
          <h2 className="mt-4 max-w-md text-4xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-5xl">New in: handpicked daily from the atelier.</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-black/70">Every release is cut, stitched and burnished in Port Harcourt. When a sell-out, it is gone — the next bench begins immediately.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => openCategory('new-in')} className="rounded-full bg-black px-6 py-3 text-xs font-bold text-white">Shop new in</button>
            <button onClick={() => setView('journal')} className="rounded-full border border-black px-6 py-3 text-xs font-bold">Read the journal</button>
          </div>
        </div>
      </section>

      {/* New in carousel */}
      <section className="mx-auto max-w-[1680px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="mb-8">
          <p className="ff-eyebrow">Fresh from the bench</p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">New in: handpicked daily</h2>
        </div>
        <ProductCarousel products={newIn} shopNowLabel="Shop all new in" onShopNow={() => openCategory('new-in')} />
      </section>

      {/* Sale carousel */}
      <section className="border-y border-black/10 bg-[#fafafa] py-14 lg:py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="ff-eyebrow">Special offer</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">15% off atelier samples</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-black/55">One-of-a-kind samples and prototypes from the bench, finished to the same standard as every commission.</p>
          </div>
          <ProductCarousel products={samples} shopNowLabel="Shop all samples" onShopNow={() => { setSelectedDepartment('sale'); setView('collections'); }} />
        </div>
      </section>

      {/* Trending now */}
      <section className="mx-auto max-w-[1680px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <h2 className="mb-6 text-xl font-bold tracking-[-0.03em] sm:text-2xl">Trending now</h2>
        <div className="flex flex-wrap gap-2">
          {trending.map((term) => (
            <button
              key={term}
              onClick={() => { setSelectedDepartment(null); selectCollection(null); setView('collections'); }}
              className="rounded-full border border-black/15 px-5 py-2.5 text-[13px] font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial section */}
      <section className="mx-auto max-w-[1680px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="ff-eyebrow">Wear the story</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">The collections, in motion.</h2>
          </div>
          <button onClick={() => setView('collections')} className="hidden items-center gap-1 text-[13px] font-bold underline underline-offset-4 sm:inline-flex">
            Shop all <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <ProductCarousel products={editorial} shopNowLabel="Shop all shoes" onShopNow={() => setView('collections')} />
      </section>

      {/* Atelier favourites (brands of the moment) */}
      <section className="mx-auto max-w-[1680px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <h2 className="mb-6 text-xl font-bold tracking-[-0.03em] sm:text-2xl">Atelier favourites</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {atelierFavourites.map((name) => (
            <button
              key={name}
              onClick={() => openCategory(name === 'Oxford Collection' ? 'oxford' : name === 'Loafers & Moccasins' ? 'loafer' : name === 'Boots Collection' ? 'boot' : 'wedding')}
              className="text-[15px] font-medium underline underline-offset-4 hover:text-black/55"
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-y border-black/10">
        <div className="mx-auto max-w-[1680px] px-4 py-16 text-center sm:px-6 lg:px-10 lg:py-20">
          <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Never miss a thing</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-black/60">
            Sign up for promotions, tailored new arrivals, stock updates and more – straight to your inbox
          </p>
          {subscribed ? (
            <p className="mx-auto mt-7 max-w-sm rounded-full border border-black/20 px-6 py-3 text-sm font-semibold">You are on the list. Welcome to the atelier.</p>
          ) : (
            <form
              className="mx-auto mt-7 flex max-w-sm items-center border-b border-black pb-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (email.includes('@')) setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/35"
              />
              <button type="submit" className="shrink-0 text-sm font-bold uppercase tracking-wide hover:underline">Sign up</button>
            </form>
          )}
          <p className="mx-auto mt-4 max-w-md text-[11px] leading-relaxed text-black/45">
            By signing up, you consent to receiving marketing by email and/or SMS and acknowledge you have read our
            <button onClick={() => setView('policies')} className="mx-1 underline underline-offset-2">Privacy Policy</button>.
            Unsubscribe anytime at the bottom of our emails or by replying STOP to any of our SMS.
          </p>
        </div>
      </section>

      {/* Help strip */}
      <section className="mx-auto grid max-w-[1680px] grid-cols-1 gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6 lg:px-10">
        {[
          { title: 'How to shop', copy: 'Your guide to shopping and placing orders', action: 'policies' as View },
          { title: 'FAQs', copy: 'Your questions answered', action: 'policies' as View },
          { title: 'Need help?', copy: 'Contact our customer service team', action: 'contact' as View },
        ].map((item) => (
          <button key={item.title} onClick={() => setView(item.action)} className="group flex items-start gap-4 border-b border-black/10 pb-8 text-left">
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span>
              <span className="block text-[15px] font-bold">{item.title}</span>
              <span className="mt-1 block text-sm text-black/55">{item.copy}</span>
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}
