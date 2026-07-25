'use client';

import React from 'react';
import { ArrowUpRight, Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { useAppStore, View } from '@/store/useAppStore';

const explore: { label: string; view: View }[] = [
  { label: 'All shoes', view: 'collections' },
  { label: 'Bespoke', view: 'commission' },
  { label: 'The atelier', view: 'craftsmanship' },
  { label: 'Journal', view: 'journal' },
  { label: 'Masterclass', view: 'masterclass' },
];

export function Footer() {
  const { setView } = useAppStore();

  return (
    <footer className="mt-auto bg-[#111] text-white">
      <div className="mx-auto max-w-[1680px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-12 border-b border-white/20 pb-12 lg:grid-cols-[1.45fr_.8fr_.9fr_1.1fr]">
          <div><p className="text-4xl font-bold tracking-[-0.07em]">AKPÁKA</p><p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">Handcrafted shoes from Port Harcourt for the people moving with purpose.</p><button onClick={() => setView('commission')} className="mt-6 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4">Begin your bespoke story <ArrowUpRight className="h-4 w-4" /></button></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Explore</p><ul className="mt-5 space-y-3">{explore.map((item) => <li key={item.label}><button onClick={() => setView(item.view)} className="text-sm text-white/80 hover:text-white hover:underline">{item.label}</button></li>)}</ul></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Need a hand?</p><ul className="mt-5 space-y-3"><li><button onClick={() => setView('policies')} className="text-sm text-white/80 hover:underline">Sizing guide</button></li><li><button onClick={() => setView('policies')} className="text-sm text-white/80 hover:underline">Delivery & returns</button></li><li><button onClick={() => setView('contact')} className="text-sm text-white/80 hover:underline">Contact us</button></li><li><a href="/admin" className="text-sm text-white/80 hover:underline">Admin portal</a></li></ul></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">From Port Harcourt</p><div className="mt-5 space-y-3 text-sm text-white/70"><p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />No. 1 Doxa Road, Rivers State, Nigeria</p><a href="tel:+2348180474183" className="flex gap-2 hover:text-white"><Phone className="h-4 w-4" />+234 818 047 4183</a><a href="mailto:info@akpaka.ng" className="block hover:text-white">info@akpaka.ng</a></div><div className="mt-6 flex gap-3"><a aria-label="Akpaka on Instagram" href="https://instagram.com/akpaka.ng" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/30 hover:bg-white hover:text-black"><Instagram className="h-4 w-4" /></a><a aria-label="Akpaka on Facebook" href="https://facebook.com/akpakaboy" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/30 hover:bg-white hover:text-black"><Facebook className="h-4 w-4" /></a></div></div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-[11px] text-white/45 sm:flex-row"><p>© {new Date().getFullYear()} Akpaka Shoe Enterprise. All rights reserved.</p><div className="flex gap-5"><button onClick={() => setView('policies')} className="hover:text-white">Privacy</button><button onClick={() => setView('policies')} className="hover:text-white">Terms</button><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white">Back to top ↑</button></div></div>
      </div>
    </footer>
  );
}
