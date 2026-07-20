'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, View } from '@/store/useAppStore';
import { Navbar } from '@/components/akpaka/Navbar';
import { Footer } from '@/components/akpaka/Footer';
import { HomePage } from '@/components/akpaka/HomePage';
import { CollectionsPage } from '@/components/akpaka/CollectionsPage';
import { ProductDetailPage } from '@/components/akpaka/ProductDetailPage';
import { AboutPage } from '@/components/akpaka/AboutPage';
import { CraftsmanshipPage } from '@/components/akpaka/CraftsmanshipPage';
import { CommissionPage } from '@/components/akpaka/CommissionPage';
import { DashboardPage } from '@/components/akpaka/DashboardPage';
import { JournalPage } from '@/components/akpaka/JournalPage';
import { MasterclassPage } from '@/components/akpaka/MasterclassPage';
import { ContactPage } from '@/components/akpaka/ContactPage';
import { CartDrawer } from '@/components/akpaka/CartDrawer';

const viewComponents: Record<View, React.ComponentType> = {
  home: HomePage,
  collections: CollectionsPage,
  product: ProductDetailPage,
  about: AboutPage,
  craftsmanship: CraftsmanshipPage,
  commission: CommissionPage,
  dashboard: DashboardPage,
  journal: JournalPage,
  masterclass: MasterclassPage,
  contact: ContactPage,
  cart: CollectionsPage,
  checkout: CollectionsPage,
};

export default function AkpakaStore() {
  const { currentView, cartOpen } = useAppStore();
  const CurrentView = viewComponents[currentView] || HomePage;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <CurrentView />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AnimatePresence>
        {cartOpen && <CartDrawer />}
      </AnimatePresence>
    </div>
  );
}
