'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { cart, toggleCart, removeFromCart, updateCartQuantity, getCartTotal, setView } = useAppStore();

  const total = getCartTotal();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={toggleCart} />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-charcoal" />
            <h2 className="font-serif text-xl font-semibold">Your Collection</h2>
            <span className="text-sm text-muted-foreground">({cart.length} items)</span>
          </div>
          <button onClick={toggleCart} className="p-1 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-lg font-serif text-muted-foreground mb-2">Your collection is empty</p>
              <p className="text-sm text-muted-foreground/70 mb-6">Explore our handcrafted collections to find your perfect pair</p>
              <Button onClick={() => { toggleCart(); setView('collections'); }} className="bg-charcoal hover:bg-charcoal/90 text-gold">
                Browse Collections
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="flex gap-4 p-4 bg-cream/50 rounded-lg"
                >
                  <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium truncate">{item.name}</h4>
                    <p className="text-gold font-semibold text-sm mt-1">
                      ₦{item.price.toLocaleString()}
                    </p>
                    {item.size && (
                      <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                    )}
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
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-serif font-semibold text-charcoal">
                ₦{total.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping calculated at checkout. Deposit payment also available for bespoke orders.
            </p>
            <Button
              onClick={() => { toggleCart(); setView('commission'); }}
              className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold h-12"
            >
              Proceed to Checkout
            </Button>
            <a
              href="https://wa.me/2348180474183?text=Hello%20AkpakaNG!%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 h-12">
                Order via WhatsApp Instead
              </Button>
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
