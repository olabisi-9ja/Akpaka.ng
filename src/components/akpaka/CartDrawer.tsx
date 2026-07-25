'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function CartDrawer() {
  const { cart, savedForLater, toggleCart, removeFromCart, updateCartQuantity, getCartTotal, setView, saveForLater, moveToCart, removeFromSaved } = useAppStore();
  const total = getCartTotal();

  const checkout = () => { toggleCart(); setView('checkout'); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70]">
      <button aria-label="Close bag" onClick={toggleCart} className="absolute inset-0 w-full bg-black/45 backdrop-blur-[1px]" />
      <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.28 }} className="absolute bottom-0 right-0 top-0 flex w-full max-w-[480px] flex-col bg-white text-[#111] shadow-2xl">
        <header className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-7"><div className="flex items-center gap-3"><ShoppingBag className="h-5 w-5" /><h2 className="text-xl font-bold tracking-[-0.04em]">Bag {cart.length ? `(${cart.reduce((sum, item) => sum + item.quantity, 0)})` : ''}</h2></div><button onClick={toggleCart} className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#f5f5f5]"><X className="h-5 w-5" /></button></header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><ShoppingBag className="h-12 w-12 text-black/20" /><h3 className="mt-6 text-2xl font-bold tracking-[-0.04em]">Your bag is waiting.</h3><p className="mt-2 max-w-xs text-sm leading-relaxed text-black/55">Find a pair that makes the entrance with you.</p><button onClick={() => { toggleCart(); setView('collections'); }} className="mt-7 rounded-full bg-black px-6 py-3 text-xs font-bold text-white">Shop shoes</button></div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <AnimatePresence initial={false}>{cart.map((item) => <motion.article key={`${item.productId}-${item.size || ''}`} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-4 border-b border-black/10 py-4 first:pt-0"><img src={item.image} alt={item.name} className="h-28 w-24 bg-[#f5f5f5] object-cover mix-blend-multiply" /><div className="min-w-0 flex-1"><div className="flex gap-2"><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-bold">{item.name}</h3><p className="mt-1 text-xs text-black/55">{item.type === 'bespoke' ? 'Bespoke commission' : `EU ${item.size || '—'}`}</p>{item.leather && <p className="mt-1 truncate text-xs text-black/45">{item.leather}</p>}</div><button aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.productId)} className="h-7 text-black/45 hover:text-black"><X className="h-4 w-4" /></button></div><p className="mt-3 text-sm font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p><div className="mt-3 flex items-center justify-between"><div className="flex items-center border border-black/15"><button aria-label="Decrease quantity" onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))} className="grid h-8 w-8 place-items-center hover:bg-[#f5f5f5]"><Minus className="h-3 w-3" /></button><span className="grid h-8 w-8 place-items-center text-xs font-bold">{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="grid h-8 w-8 place-items-center hover:bg-[#f5f5f5]"><Plus className="h-3 w-3" /></button></div><button onClick={() => saveForLater(item.productId)} className="text-xs font-semibold underline underline-offset-4">Save for later</button></div></div></motion.article>)}</AnimatePresence>
              {savedForLater.length > 0 && <section className="pt-7"><div className="flex items-center gap-2"><Heart className="h-4 w-4" /><h3 className="text-sm font-bold">Saved for later ({savedForLater.length})</h3></div><div className="mt-3 space-y-2">{savedForLater.map((item) => <div key={`${item.productId}-saved`} className="flex items-center gap-3 rounded-lg bg-[#f5f5f5] p-2"><img src={item.image} alt="" className="h-12 w-12 object-cover mix-blend-multiply" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{item.name}</p><p className="text-xs text-black/55">₦{item.price.toLocaleString()}</p></div><button onClick={() => moveToCart(item)} className="text-xs font-bold underline underline-offset-4">Move</button><button aria-label="Remove saved item" onClick={() => removeFromSaved(item.productId)}><Trash2 className="h-3.5 w-3.5" /></button></div>)}</div></section>}
            </div>
            <footer className="border-t border-black/10 bg-white px-5 py-5 sm:px-7"><div className="flex items-end justify-between"><span className="text-sm font-medium">Subtotal</span><span className="text-xl font-bold tracking-[-0.04em]">₦{total.toLocaleString()}</span></div><p className="mt-2 text-xs leading-relaxed text-black/55">Delivery is calculated at checkout. Bespoke commissions begin with a 30% deposit.</p><button onClick={checkout} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-sm font-bold text-white">Checkout <ArrowRight className="h-4 w-4" /></button><div className="mt-4 flex justify-center gap-4 text-[10px] font-semibold uppercase tracking-wide text-black/50"><span>Secure checkout</span><span>·</span><span>Fitting support</span><span>·</span><span>Made with care</span></div></footer>
          </>
        )}
      </motion.aside>
    </motion.div>
  );
}
