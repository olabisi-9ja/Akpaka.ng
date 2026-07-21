'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { ArrowLeft, ShieldCheck, Wrench, FileText, RotateCcw, Ruler, CreditCard, Truck } from 'lucide-react';

export function PoliciesPage() {
  const { setView } = useAppStore();

  const sections = [
    {
      icon: RotateCcw,
      title: 'Returns & Exchanges',
      content: `Ready-to-wear shoes may be returned within 14 days of delivery in unworn condition with all original packaging, dust bags, and shoe trees intact. To initiate a return, contact us via WhatsApp or email with your order number. Refunds are processed within 5-7 business days to the original payment method.

Bespoke and made-to-order commissions are non-refundable once production has begun, as each pair is crafted specifically for you. However, we offer complimentary adjustments to ensure a perfect fit — if your bespoke shoes require any modification, we will make it right at no additional cost.

Exchanges for a different size on ready-to-wear pairs are offered free of charge within 14 days, subject to availability. The customer is responsible for return shipping; we cover the outbound shipment of the replacement pair.`,
    },
    {
      icon: Wrench,
      title: 'Repairs & Resoling',
      content: `Every Akpaka shoe is built with Goodyear welt construction, meaning it can be resoled indefinitely while preserving the original upper. Our lifetime resoling service ensures your investment endures for decades.

Resoling costs ₦15,000–₦25,000 depending on the sole type and is available at our Port Harcourt atelier or by post. Turnaround time is typically 7-10 business days. We also offer minor repairs including heel replacement, stitching repair, and patina restoration.

For international clients, we coordinate resoling via courier. Contact our aftercare team on WhatsApp for a quote and shipping instructions.`,
    },
    {
      icon: Ruler,
      title: 'Sizing Guide',
      content: `Finding the right size is essential for comfort and longevity. We offer three ways to determine your Akpaka size:

1. **Video Consultation**: Book a free 10-minute WhatsApp video call where our team guides you through measuring your feet at home. This is the most accurate method for bespoke orders.

2. **Printable Sizing Guide**: Download our PDF sizing guide and follow the instructions to trace your foot on paper. Compare your measurements to our size chart for the best ready-to-wear fit.

3. **In-Atelier Fitting**: Visit our Port Harcourt showroom for a professional fitting on our bespoke lasts.

If your ready-to-wear shoes do not fit perfectly, we offer one free size exchange within 14 days of delivery. Bespoke commissions include a fitting consultation as part of the process.`,
    },
    {
      icon: ShieldCheck,
      title: 'Authenticity Guarantee',
      content: `Every pair of Akpaka shoes comes with a certificate of authenticity signed by Prince Sunday Achase. This certificate includes the date of completion, the leather batch number, and the artisan who crafted your pair.

Our authentication system ensures that every shoe bearing the Akpaka name meets our exacting standards. If you ever have concerns about the authenticity of an Akpaka product, contact us with your certificate number and we will verify it immediately.`,
    },
    {
      icon: CreditCard,
      title: 'Payment & Pricing',
      content: `We accept payment via bank transfer, Paystack (for Nigerian cards and USSD), and Stripe (for international cards). All prices are listed in Nigerian Naira (₦).

For bespoke commissions, a 30% deposit is required to begin production. The remaining 70% is due upon completion, before shipping. We also offer flexible payment plans — "Pay Small Small" — allowing you to split the total into manageable instalments over 2-3 months.

Ready-to-wear pairs require full payment at the time of order. All prices include VAT where applicable.`,
    },
    {
      icon: Truck,
      title: 'Shipping & Delivery',
      content: `Ready-to-wear orders ship within 3-5 business days within Nigeria. Made-to-order and bespoke commissions take 3-4 weeks from the date of deposit payment.

Nigeria delivery is free on all orders. International shipping is available to the UK, USA, UAE, and other countries via DHL or FedEx at a flat rate of ₦15,000. International delivery takes 7-14 business days after dispatch.

All shoes are shipped in our signature Akpaka box with dust bags, cedar shoe trees, and a care guide. Tracking information is provided via WhatsApp for every shipment.`,
    },
  ];

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setView('home')} className="text-sm text-gold hover:underline inline-flex items-center gap-1 mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mb-4">Policies & Care</h1>
          <p className="text-muted-foreground mb-12 leading-relaxed">
            We stand behind every pair we make. Below you will find our complete policies on returns, repairs, sizing, and more.
          </p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal">{section.title}</h2>
                </div>
                <div className="text-sm text-muted-foreground leading-[1.8] whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
