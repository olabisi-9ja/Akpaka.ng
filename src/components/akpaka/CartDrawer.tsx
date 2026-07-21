'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Heart, ArrowRight, ShieldCheck, Wrench, FileText, BadgeCheck } from 'lucide-react';
import { useAppStore, CartItem } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { cart, savedForLater, toggleCart, removeFromCart, updateCartQuantity, getCartTotal, setView, saveForLater, moveToCart, removeFromSaved } = useAppStore();
  const [showSaved, setShowSaved] = useState(false);
  const total = getCartTotal();

  const hasBespoke = cart.some(i => i.type === 'bespoke');
  const hasReadyToWear = cart.some(i => i.type === 'ready-to-wear');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleCart} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-charcoal" />
            <h2 className="font-serif text-xl font-semibold text-charcoal">Your Bag</h2>
            <span className="text-xs text-muted-foreground">({cart.length})</span>
          </div>
          <button onClick={toggleCart} className="p-1.5 hover:bg-muted rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mb-5" />
              <p className="font-serif text-xl text-charcoal mb-2">Your bag is empty</p>
              <p className="text-sm text-muted-foreground/70 mb-8 max-w-xs">
                Explore our handcrafted collections to find your perfect pair
              </p>
              <Button onClick={() => { toggleCart(); setView('collections'); }} className="bg-charcoal hover:bg-charcoal/90 text-gold">
                Browse Collections
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group flex gap-4 p-4 bg-cream/40 rounded-lg border border-transparent hover:border-gold/20 transition-colors"
                  >
                    {/* Product thumbnail */}
                    <div className="w-20 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} width={80} height={96} className="w-full h-full object-cover" />
                      {item.type === 'bespoke' && (
                        <span className="absolute bottom-0 left-0 right-0 bg-charcoal/80 text-gold text-[8px] text-center py-0.5 tracking-wider uppercase">Bespoke</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-medium text-charcoal truncate">{item.name}</h4>
                      {/* Config preview */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.size && <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">EU {item.size}</span>}
                        {item.leather && <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{item.leather}</span>}
                        {item.patina && <span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded">{item.patina}</span>}
                      </div>
                      <p className="text-gold font-semibold text-sm mt-1.5">
                        ₦{item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 border border-border rounded flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 border border-border rounded flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-1 text-muted-foreground/50 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => saveForLater(item.productId)}
                        className="p-1 text-muted-foreground/50 hover:text-gold transition-colors"
                        title="Save for later"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Saved for Later */}
              {savedForLater.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <button
                    onClick={() => setShowSaved(!showSaved)}
                    className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-charcoal transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" /> Saved for Later ({savedForLater.length})
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showSaved ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {showSaved && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 mt-3">
                          {savedForLater.map((item) => (
                            <div key={item.productId} className="flex items-center gap-3 p-3 bg-cream/30 rounded-lg">
                              <div className="w-12 h-14 bg-muted rounded overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} width={48} height={56} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-charcoal truncate">{item.name}</p>
                                <p className="text-xs text-gold">₦{item.price.toLocaleString()}</p>
                              </div>
                              <button onClick={() => moveToCart(item)} className="text-xs text-gold hover:underline">Move to Bag</button>
                              <button onClick={() => removeFromSaved(item.productId)} className="p-1 text-muted-foreground/50 hover:text-destructive">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Trust Signals + Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4 bg-cream/30">
            {/* Micro-copy reassurance */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-gold" /> Authenticity Certificate</span>
              <span className="flex items-center gap-1"><Wrench className="w-3 h-3 text-gold" /> Lifetime Resoling</span>
              <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-gold" /> 14-Day Returns</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-xl font-serif font-semibold text-charcoal">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {hasReadyToWear && !hasBespoke && 'Free shipping within Nigeria. Ships in 3-5 business days.'}
              {hasBespoke && !hasReadyToWear && '30% deposit required to begin your bespoke commission. Balance upon completion.'}
              {hasBespoke && hasReadyToWear && 'Ready-to-wear items ship in 3-5 days. Bespoke commissions require a 30% deposit and take 3-4 weeks.'}
            </p>

            <Button
              onClick={() => { toggleCart(); setView('checkout'); }}
              className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold h-12 tracking-wide"
            >
              {hasBespoke ? 'Proceed to Commission' : 'Checkout'}
            </Button>

            <a
              href="https://wa.me/2348180474183?text=Hello%20AkpakaNG!%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 h-11">
                Order via WhatsApp
              </Button>
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
