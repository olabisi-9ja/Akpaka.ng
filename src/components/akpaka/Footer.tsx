'use client';

import React from 'react';
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { useAppStore, View } from '@/store/useAppStore';

const shopLinks: { label: string; action: () => void }[] = [];

export function Footer() {
  const { setView, selectCollection, setSelectedDepartment } = useAppStore();

  const go = (view: View) => setView(view);
  const goCategory = (collection: string | null) => {
    selectCollection(collection);
    setSelectedDepartment(null);
    setView('collections');
  };

  const columns: { title: string; links: { label: string; action: () => void }[] }[] = [
    {
      title: 'Shop',
      links: [
        { label: 'New in', action: () => { setSelectedDepartment('new-in'); go('collections'); } },
        { label: 'Womenswear', action: () => { setSelectedDepartment('women'); go('collections'); } },
        { label: 'Menswear', action: () => { setSelectedDepartment('men'); go('collections'); } },
        { label: 'Bespoke', action: () => go('commission') },
        { label: 'Sale', action: () => { setSelectedDepartment('sale'); go('collections'); } },
      ],
    },
    {
      title: 'Collections',
      links: [
        { label: 'Oxford Collection', action: () => goCategory('Oxford Collection') },
        { label: 'Loafers & Moccasins', action: () => goCategory('Loafers & Moccasins') },
        { label: 'Boots Collection', action: () => goCategory('Boots Collection') },
        { label: 'Wedding Special', action: () => goCategory('Wedding Special') },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'How to shop', action: () => go('policies') },
        { label: 'FAQs', action: () => go('policies') },
        { label: 'Sizing guide', action: () => go('policies') },
        { label: 'Delivery & returns', action: () => go('policies') },
        { label: 'Contact us', action: () => go('contact') },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our story', action: () => go('about') },
        { label: 'The atelier', action: () => go('craftsmanship') },
        { label: 'Journal', action: () => go('journal') },
        { label: 'Masterclass', action: () => go('masterclass') },
        { label: 'Track a commission', action: () => go('dashboard') },
      ],
    },
  ];

  void shopLinks;

  return (
    <footer className="mt-auto bg-white text-black">
      <div className="mx-auto max-w-[1680px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-10 border-b border-black/10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <p className="text-[26px] font-bold leading-none tracking-[-0.07em]">AKPÁKA</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/60">
              Handcrafted shoes from Port Harcourt for the people moving with purpose.
            </p>
            <div className="mt-6 flex gap-3">
              <a aria-label="Akpaka on Instagram" href="https://instagram.com/akpaka.ng" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-black/20 transition-colors hover:bg-black hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
              <a aria-label="Akpaka on Facebook" href="https://facebook.com/akpakaboy" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-black/20 transition-colors hover:bg-black hover:text-white">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button onClick={link.action} className="text-sm text-black/75 transition-colors hover:text-black hover:underline underline-offset-4">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">Need a hand?</p>
            <ul className="mt-5 space-y-3 text-sm text-black/75">
              <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />No. 1 Doxa Road, Rivers State, Nigeria</li>
              <li><a href="tel:+2348180474183" className="flex gap-2 hover:text-black"><Phone className="h-4 w-4" />+234 818 047 4183</a></li>
              <li><a href="mailto:info@akpaka.ng" className="hover:text-black hover:underline underline-offset-4">info@akpaka.ng</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-[11px] text-black/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Akpaka Shoe Enterprise. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <button onClick={() => go('policies')} className="hover:text-black">Privacy</button>
            <button onClick={() => go('policies')} className="hover:text-black">Terms</button>
            <button onClick={() => go('policies')} className="hover:text-black">Cookies</button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-black">Back to top ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
