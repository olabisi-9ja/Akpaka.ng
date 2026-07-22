'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore, View } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export function Footer() {
  const { setView } = useAppStore();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-charcoal text-white/80 mt-auto overflow-hidden">
      {/* Cinematic Logo Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none flex items-center justify-center"
      >
        <img 
          src="/logo.png" 
          alt="AkpakaNG Background" 
          className="w-[120%] h-auto max-w-none md:w-full object-cover mix-blend-overlay"
        />
      </div>

      <div className="relative z-10">
        {/* Back to top */}
        <div className="flex justify-center -mt-5">
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-gold text-charcoal rounded-full flex items-center justify-center hover:bg-gold-light transition-colors shadow-lg"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          {/* Brand */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold/80 mb-4">Our Atelier</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Where leather meets excellence. Handcrafted luxury shoes from Port Harcourt, Nigeria.
              Every pair tells a story of dedication, precision, and unapologetic excellence.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/akpaka.ng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/akpakaboy" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@akpaka.ng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15a6.34 6.34 0 0 0 6.33 6.33 6.34 6.34 0 0 0 6.34-6.33V8.88a8.28 8.28 0 0 0 4.76 1.5V6.93a4.84 4.84 0 0 1-1-.24z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold/80 mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { label: 'Collections', view: 'collections' as View },
                { label: 'About Our Story', view: 'about' as View },
                { label: 'The Atelier', view: 'craftsmanship' as View },
                { label: 'Commission Bespoke', view: 'commission' as View },
                { label: 'Journal', view: 'journal' as View },
                { label: 'Academy', view: 'masterclass' as View },
              ].map((item) => (
                <li key={item.view}>
                  <button
                    onClick={() => setView(item.view)}
                    className="text-sm text-white/60 hover:text-gold-light transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold/80 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold/60" />
                <span>No 1 Doxa Road, Port Harcourt, Rivers State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4 flex-shrink-0 text-gold/60" />
                <a href="tel:+2348180474183" className="hover:text-gold-light transition-colors">+234 818 047 4183</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold/60" />
                <a href="mailto:info@akpaka.ng" className="hover:text-gold-light transition-colors">info@akpaka.ng</a>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold/80 mb-4">Order via WhatsApp</h4>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Prefer a personal touch? Chat directly with our team on WhatsApp for orders, inquiries, and bespoke consultations.
            </p>
            <a
              href="https://wa.me/2348180474183?text=Hello%20AkpakaNG!%20I%20am%20interested%20in%20your%20handcrafted%20shoes."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Akpaka Shoe Enterprise. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <button onClick={() => setView('policies')} className="hover:text-white/60 transition-colors">Returns & Policies</button>
            <button onClick={() => setView('policies')} className="hover:text-white/60 transition-colors">Sizing Guide</button>
            <button onClick={() => setView('policies')} className="hover:text-white/60 transition-colors">Shipping</button>
            <a href="/admin" className="hover:text-white/60 transition-colors">Admin Portal</a>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
