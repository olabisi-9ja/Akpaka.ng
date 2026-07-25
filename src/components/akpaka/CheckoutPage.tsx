'use client';

import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, LockKeyhole, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

type CheckoutForm = { name: string; email: string; phone: string; address: string };

function CheckoutInput({ label, name, type = 'text', placeholder, form, setForm }: { label: string; name: keyof CheckoutForm; type?: string; placeholder: string; form: CheckoutForm; setForm: React.Dispatch<React.SetStateAction<CheckoutForm>> }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold">{label}</span><input type={type} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} placeholder={placeholder} className="h-12 w-full rounded-md border border-black/15 bg-white px-3.5 text-sm outline-none transition focus:border-black" /></label>;
}

export function CheckoutPage() {
  const { cart, getCartTotal, clearCart, setView } = useAppStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const total = getCartTotal();

  const placeOrder = async () => {
    if (!form.name || !form.email || !form.phone || submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customerName: form.name, customerEmail: form.email, customerPhone: form.phone, shippingAddress: form.address, items: cart.map((item) => ({ productId: item.productId, priceEach: item.price, quantity: item.quantity })) }) });
      if (!response.ok) throw new Error('Unable to place order');
      clearCart();
      setComplete(true);
    } catch {
      // The WhatsApp channel remains available when a client is offline or the
      // shop database needs attention. Do not discard the shopper's bag.
      window.open(`https://wa.me/2348180474183?text=${encodeURIComponent(`Hello Akpaka! I would like to place an order for ${cart.map((item) => `${item.quantity}x ${item.name}`).join(', ')}. My name is ${form.name}.`)}`, '_blank');
    } finally { setSubmitting(false); }
  };

  if (complete) return <main className="grid min-h-screen place-items-center bg-white px-5 pt-[100px] text-center"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-md"><CheckCircle2 className="mx-auto h-16 w-16" /><p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-black/45">Order received</p><h1 className="mt-2 text-4xl font-bold tracking-[-0.06em]">Thank you, {form.name.split(' ')[0]}.</h1><p className="mt-4 text-sm leading-relaxed text-black/60">Your order is with the Akpaka team. We will confirm the details and next steps on WhatsApp within 24 hours.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={() => setView('dashboard')} className="rounded-full bg-black px-5 py-3 text-xs font-bold text-white">Track order</button><button onClick={() => setView('collections')} className="rounded-full border border-black px-5 py-3 text-xs font-bold">Keep shopping</button></div></motion.div></main>;
  if (!cart.length) return <main className="grid min-h-screen place-items-center bg-white px-5 pt-[100px] text-center"><div><h1 className="text-3xl font-bold tracking-[-0.05em]">Your bag is waiting.</h1><p className="mt-2 text-sm text-black/55">Choose a pair before checking out.</p><button onClick={() => setView('collections')} className="mt-6 rounded-full bg-black px-6 py-3 text-xs font-bold text-white">Shop shoes</button></div></main>;

  return (
    <main className="min-h-screen bg-white pb-20 pt-[100px] text-[#111] lg:pt-[132px]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <nav className="mb-7 flex items-center gap-1.5 text-xs text-black/55"><button onClick={() => setView('home')} className="hover:text-black">Home</button><ChevronRight className="h-3 w-3" /><button onClick={() => setView('collections')} className="hover:text-black">Bag</button><ChevronRight className="h-3 w-3" /><span className="text-black">Checkout</span></nav>
        <div className="border-b border-black/10 pb-7"><p className="text-[11px] font-bold uppercase tracking-[0.19em] text-black/45">Secure checkout</p><h1 className="mt-2 text-4xl font-bold tracking-[-0.06em]">Complete your order.</h1></div>
        <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_370px]">
          <section><div className="border-b border-black/10 pb-8"><div className="flex items-baseline justify-between"><h2 className="text-xl font-bold tracking-[-0.04em]">Contact details</h2><p className="text-xs text-black/55">We will confirm via WhatsApp</p></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><CheckoutInput label="Full name *" name="name" placeholder="Your name" form={form} setForm={setForm} /><CheckoutInput label="Email address *" name="email" type="email" placeholder="you@example.com" form={form} setForm={setForm} /></div><div className="mt-4"><CheckoutInput label="Phone / WhatsApp *" name="phone" placeholder="+234 800 000 0000" form={form} setForm={setForm} /></div></div>
            <div className="border-b border-black/10 py-8"><h2 className="text-xl font-bold tracking-[-0.04em]">Delivery address</h2><p className="mt-1 text-sm text-black/55">Add a full address so we can arrange delivery.</p><label className="mt-5 block"><span className="mb-2 block text-xs font-bold">Address</span><textarea value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} placeholder="Street, area, city and state" className="min-h-28 w-full rounded-md border border-black/15 px-3.5 py-3 text-sm outline-none transition focus:border-black" /></label></div>
            <div className="mt-7 rounded-xl bg-[#f5f5f5] p-5"><div className="flex gap-3"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0" /><div><p className="text-sm font-bold">Your order is in good hands.</p><p className="mt-1 text-sm leading-relaxed text-black/60">Your details are used only to confirm this order and arrange delivery. Our team will never request your bank PIN or card details on WhatsApp.</p></div></div></div>
          </section>
          <aside className="lg:sticky lg:top-[124px] lg:h-fit"><div className="bg-[#f5f5f5] p-5 sm:p-6"><h2 className="text-xl font-bold tracking-[-0.04em]">Order summary</h2><div className="mt-5 space-y-4">{cart.map((item) => <div key={`${item.productId}-${item.size || ''}`} className="flex gap-3"><img src={item.image} alt={item.name} className="h-16 w-14 bg-white object-cover mix-blend-multiply" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.name}</p><p className="mt-1 text-xs text-black/55">{item.type === 'bespoke' ? 'Bespoke' : `EU ${item.size || '—'}`} · Qty {item.quantity}</p></div><p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</p></div>)}</div><div className="mt-6 space-y-3 border-t border-black/10 pt-4 text-sm"><div className="flex justify-between"><span className="text-black/60">Subtotal</span><span>₦{total.toLocaleString()}</span></div><div className="flex justify-between"><span className="flex items-center gap-1.5 text-black/60"><Truck className="h-3.5 w-3.5" /> Delivery</span><span>Calculated on confirmation</span></div><div className="flex justify-between border-t border-black/10 pt-4 text-base font-bold"><span>Total</span><span>₦{total.toLocaleString()}</span></div></div><button disabled={!form.name || !form.email || !form.phone || submitting} onClick={placeOrder} className="mt-6 w-full rounded-full bg-black py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-black/25">{submitting ? 'Placing order…' : `Place order · ₦${total.toLocaleString()}`}</button><p className="mt-3 text-center text-[10px] leading-relaxed text-black/50">By placing your order, you agree to our delivery and returns policy.</p></div></aside>
        </div>
      </div>
    </main>
  );
}
