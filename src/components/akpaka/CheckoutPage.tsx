'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Wrench, FileText, Clock, ChevronRight } from 'lucide-react';

export function CheckoutPage() {
  const { cart, getCartTotal, clearCart, setView } = useAppStore();
  const [step, setStep] = useState<'details' | 'review' | 'confirmed'>('details');
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const total = getCartTotal();

  if (cart.length === 0 && step !== 'confirmed') {
    return (
      <div className="bg-cream pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-charcoal mb-3">Your bag is empty</p>
          <Button onClick={() => setView('collections')} className="bg-gold hover:bg-gold-light text-charcoal">Browse Collections</Button>
        </div>
      </div>
    );
  }

  if (step === 'confirmed') {
    return (
      <div className="bg-cream pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">Order Received</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Thank you, {form.name}. Your order has been received. You will receive a confirmation via WhatsApp within 24 hours with next steps and delivery details.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => setView('dashboard')} className="bg-gold hover:bg-gold-light text-charcoal font-semibold">Track Your Order</Button>
            <Button onClick={() => setView('collections')} variant="outline">Continue Browsing</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
          <button onClick={() => setView('home')} className="hover:text-gold transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => setView('collections')} className="hover:text-gold transition-colors">Bag</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-charcoal">Checkout</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-semibold text-charcoal">Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-charcoal mb-1 block">Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal mb-1 block">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal mb-1 block">Phone / WhatsApp *</label>
                <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="+234 800 000 0000" />
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal mb-1 block">Delivery Address</label>
                <textarea value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]" placeholder="Full delivery address" />
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-cream rounded-lg">
                <div className="text-center">
                  <ShieldCheck className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-[9px] text-muted-foreground leading-tight">Authenticity<br />Certificate</p>
                </div>
                <div className="text-center">
                  <Wrench className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-[9px] text-muted-foreground leading-tight">Lifetime<br />Resoling</p>
                </div>
                <div className="text-center">
                  <FileText className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-[9px] text-muted-foreground leading-tight">14-Day<br />Returns</p>
                </div>
              </div>

              <Button
                onClick={async () => {
                  if (!form.name || !form.email || !form.phone) return;
                  try {
                    await fetch('/api/orders', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        customerName: form.name,
                        customerEmail: form.email,
                        customerPhone: form.phone,
                        shippingAddress: form.address,
                        items: cart.map(item => ({ productId: item.productId, priceEach: item.price, quantity: item.quantity })),
                      }),
                    });
                    clearCart();
                    setStep('confirmed');
                  } catch { /* handle */ }
                }}
                disabled={!form.name || !form.email || !form.phone}
                className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold h-12 disabled:opacity-50"
              >
                Place Order — ₦{total.toLocaleString()}
              </Button>

              <a
                href="https://wa.me/2348180474183"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 h-11 text-sm">
                  Prefer to order via WhatsApp?
                </Button>
              </a>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-28">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-5">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-14 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} width={56} height={64} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">{item.name}</p>
                      {item.size && <p className="text-xs text-muted-foreground">EU {item.size}</p>}
                    </div>
                    <p className="text-sm text-charcoal font-medium whitespace-nowrap">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-gold">₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Crafting timeline */}
              <div className="mt-6 p-4 bg-cream rounded-lg">
                <p className="text-[10px] font-semibold text-charcoal tracking-wider uppercase mb-3">What Happens Next</p>
                <div className="space-y-2">
                  {[
                    { label: 'Order Confirmed', desc: 'Within 24 hours via WhatsApp' },
                    { label: 'Crafting', desc: '3-4 weeks for made-to-order' },
                    { label: 'Quality Check', desc: 'Inspected by Prince Achase' },
                    { label: 'Delivered', desc: 'Courier to your door' },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-gold/20 text-gold rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                      <div>
                        <p className="text-[10px] font-medium text-charcoal">{step.label}</p>
                        <p className="text-[9px] text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
