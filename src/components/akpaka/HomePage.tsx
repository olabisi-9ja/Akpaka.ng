'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Heart, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string;
  category: string;
  baseLeather?: string | null;
  productType: string;
  stockStatus: string;
  featured: boolean;
}

const styleLinks = [
  { label: 'Oxfords', note: 'The formal edit', image: '/images/editorial/media__1784681124466.jpg' },
  { label: 'Loafers', note: 'Made for every day', image: '/images/editorial/media__1784681124508.jpg' },
  { label: 'Boots', note: 'Built to go further', image: '/images/akpaka-hero-campaign.jpg' },
  { label: 'Wedding', note: 'For the moment', image: '/images/editorial/media_48b217fb-dfdd-4f23-92a3-a698d0274a2c_1784683717547.jpg' },
];

const campaignCards = [
  {
    eyebrow: 'AKPÁKA FORMAL',
    title: 'Built for the room you want to own.',
    description: 'Hand-burnished Oxfords, cut with conviction.',
    image: '/images/editorial/media__1784681124466.jpg',
    tone: 'light',
  },
  {
    eyebrow: 'THE LOAFER EDIT',
    title: 'Ease, without compromise.',
    description: 'Soft structure. Serious presence.',
    image: '/images/editorial/media__1784681124508.jpg',
    tone: 'light',
  },
  {
    eyebrow: 'FROM THE ATELIER',
    title: 'Every line earns its place.',
    description: 'Watch the craft take shape in Port Harcourt.',
    image: '/images/editorial/media__1784681124579.jpg',
    tone: 'dark',
  },
];

export function HomePage() {
  const { setView, selectProduct, startCommission } = useAppStore();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((response) => response.json())
      .then((catalogue) => setFeaturedProducts(Array.isArray(catalogue) ? catalogue : []))
      .catch(() => setFeaturedProducts([]));
  }, []);

  const toggleSaved = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <div className="bg-white pb-16 pt-[68px] text-[#111] lg:pt-[100px]">
      <section className="border-b border-black/10 bg-[#f5f5f5] px-4 py-2 text-center text-[11px] font-medium sm:text-xs">
        Complimentary delivery on orders over ₦75,000 <span className="mx-2 text-black/30">|</span> Easy WhatsApp fitting support
      </section>

      <section className="relative min-h-[590px] overflow-hidden bg-[#c58a67] sm:min-h-[650px] lg:min-h-[calc(100vh-145px)]">
        <img src="/images/akpaka-hero-campaign.jpg" alt="Hand-burnished Akpaka Oxford shoes" className="absolute inset-0 h-full w-full object-cover object-[61%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/12 to-transparent" />
        <div className="relative mx-auto flex min-h-[590px] max-w-[1680px] items-end px-6 py-12 sm:min-h-[650px] sm:px-10 sm:py-16 lg:min-h-[calc(100vh-145px)] lg:px-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[620px] text-white">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] sm:text-xs">The 2026 Signature Edit</p>
            <h1 className="max-w-[580px] text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl lg:text-[92px]">
              MADE TO<br />MAKE AN<br />ENTRANCE.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">Handcrafted leather shoes with the confidence of where they come from. From Port Harcourt to wherever you are going.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setView('collections')} className="rounded-full bg-white px-6 py-3.5 text-xs font-bold text-black transition-transform hover:scale-[1.03]">Shop the new edit</button>
              <button onClick={() => startCommission(null)} className="rounded-full border border-white/70 bg-black/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black">Create your pair</button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1680px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mb-8 flex items-end justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Shop by style</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Find your form.</h2></div>
          <button onClick={() => setView('collections')} className="hidden items-center gap-1 text-sm font-semibold underline underline-offset-4 sm:flex">Shop all <ArrowRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {styleLinks.map((style) => (
            <button key={style.label} onClick={() => setView('collections')} className="group text-left">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-[#f5f5f5]">
                <img src={style.image} alt={style.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-sm font-bold">{style.label}</p>
              <p className="mt-1 text-xs text-black/55">{style.note}</p>
            </button>
          ))}
        </div>
        <button onClick={() => setView('collections')} className="mt-7 flex items-center gap-1 text-sm font-semibold underline underline-offset-4 sm:hidden">Shop all styles <ArrowRight className="h-4 w-4" /></button>
      </section>

      <section className="mx-auto max-w-[1680px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Fresh from the bench</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">New &amp; notable</h2></div>
          <button onClick={() => setView('collections')} className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">View all shoes <ArrowRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <article key={product.id} onClick={() => selectProduct(product.id)} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
                <img src={product.images.split(',')[0]} alt={product.name} className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-[1.035]" />
                <button onClick={(event) => toggleSaved(event, product.id)} aria-label={`Save ${product.name}`} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm hover:bg-white">
                  <Heart className={`h-[18px] w-[18px] ${saved.includes(product.id) ? 'fill-[#8d3d27] text-[#8d3d27]' : ''}`} />
                </button>
                <span className="absolute bottom-3 left-3 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide">{product.stockStatus === 'in-stock' ? 'Ready to wear' : product.stockStatus === 'bespoke-only' ? 'Bespoke' : 'Made to order'}</span>
              </div>
              <div className="mt-3 flex gap-3">
                <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold sm:text-base">{product.name}</h3><p className="mt-1 truncate text-xs text-black/55">{product.baseLeather || 'Hand-finished leather'}</p></div>
                <p className="whitespace-nowrap text-sm">₦{product.price.toLocaleString()}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1680px] grid-cols-1 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div className="relative min-h-[510px] overflow-hidden bg-[#39302b] sm:min-h-[650px]">
          <img src="/images/editorial/media__1784681124579.jpg" alt="A shoemaker at work in the Akpaka atelier" className="absolute inset-0 h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/65">The Akpaka way</p>
            <h2 className="mt-3 max-w-md text-4xl font-bold leading-[0.94] tracking-[-0.055em] sm:text-5xl">Craft has a point of view.</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">The hands behind your next pair. The process behind every confident step.</p>
            <button onClick={() => setView('craftsmanship')} className="mt-7 rounded-full bg-white px-5 py-3 text-xs font-bold text-black">Meet the atelier</button>
          </div>
        </div>
        <div className="flex min-h-[510px] flex-col justify-center bg-[#e3d6c5] px-8 py-14 sm:min-h-[650px] sm:px-14 lg:px-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/55">One pair. Entirely yours.</p>
          <h2 className="mt-4 max-w-md text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-6xl">YOUR<br />NEXT PAIR<br />STARTS HERE.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-black/70">Choose your leather, last, sole and finish with an Akpaka artisan. We build around your fit, not a standard.</p>
          <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => startCommission(null)} className="rounded-full bg-black px-6 py-3.5 text-xs font-bold text-white">Start a commission</button><button onClick={() => setView('commission')} className="rounded-full border border-black px-6 py-3.5 text-xs font-bold">How bespoke works</button></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1680px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Wear the story</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">The collections, in motion.</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          {campaignCards.map((card) => (
            <button key={card.title} onClick={() => card.tone === 'dark' ? setView('craftsmanship') : setView('collections')} className="group relative min-h-[470px] overflow-hidden text-left sm:min-h-[550px]">
              <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 ${card.tone === 'dark' ? 'bg-gradient-to-t from-black/80 to-black/5 text-white' : 'bg-gradient-to-t from-black/55 to-transparent text-white'}`} />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8"><p className="text-[10px] font-bold tracking-[0.17em]">{card.eyebrow}</p><h3 className="mt-3 max-w-xs text-3xl font-bold leading-[0.95] tracking-[-0.05em]">{card.title}</h3><p className="mt-3 text-sm text-white/80">{card.description}</p><span className="mt-6 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">Explore <MoveRight className="h-4 w-4" /></span></div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10"><div className="flex flex-col items-center justify-between gap-5 border-y border-black/10 py-9 text-center sm:flex-row sm:text-left"><p className="text-xl font-bold tracking-[-0.04em]">Keep up with the atelier.</p><button onClick={() => setView('journal')} className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">Stories, care &amp; new releases <ChevronRight className="h-4 w-4" /></button></div></section>
    </div>
  );
}
