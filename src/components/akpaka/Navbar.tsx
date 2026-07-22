'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, View } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

const navItems: { label: string; view: View }[] = [
  { label: 'Collections', view: 'collections' },
  { label: 'Atelier', view: 'craftsmanship' },
  { label: 'Bespoke', view: 'commission' },
];

export function Navbar() {
  const { currentView, setView, toggleCart, getCartCount, mobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentView === 'home';
  const isSolid = scrolled || !isHome;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isSolid
            ? 'bg-[#FAF9F6] border-b border-charcoal/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => setView('home')}
              className="flex items-center group relative overflow-hidden rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/logo.png" 
                alt="AkpakaNG Logo" 
                className={`h-12 sm:h-14 w-auto object-contain transition-all duration-300`}
              />
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => setView(item.view)}
                  className={`py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                    currentView === item.view
                      ? isSolid
                        ? 'text-charcoal font-semibold border-b border-charcoal'
                        : 'text-white font-semibold border-b border-white'
                      : isSolid
                      ? 'text-charcoal/70 hover:text-charcoal'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={toggleCart}
                className={`relative p-2 transition-colors duration-300 ${
                  isSolid ? 'text-charcoal hover:text-black' : 'text-white/90 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center ${
                      isSolid ? 'bg-charcoal text-white' : 'bg-white text-charcoal'
                    }`}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                size="icon"
                className={`lg:hidden transition-colors duration-300 hover:bg-transparent ${
                  isSolid ? 'text-charcoal hover:text-black' : 'text-white/90 hover:text-white'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-charcoal/98 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.view}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setView(item.view)}
                  className={`text-2xl font-serif tracking-wider transition-colors duration-300 ${
                    currentView === item.view ? 'text-gold' : 'text-white/70 hover:text-gold-light'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
