'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Palette, Hammer, Eye, ShieldCheck, Package } from 'lucide-react';

const steps = [
  {
    icon: Scissors,
    title: 'Leather Selection',
    description: 'Every great shoe begins with great leather. We source our hides from the finest tanneries in Italy, France, and Spain — selecting each piece for grain quality, suppleness, and character. Our leather is vegetable-tanned for a minimum of six weeks, producing a hide of extraordinary depth.',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
  },
  {
    icon: Palette,
    title: 'Pattern Cutting',
    description: 'The last is the soul of the shoe. Our bespoke lasts are carved to your exact foot measurements, ensuring a fit that is uniquely yours. Pattern cutting transforms the design into precise leather components — a process that demands years of experience and steady hands.',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
  },
  {
    icon: Hammer,
    title: 'Hand Stitching & Lasting',
    description: 'The upper is hand-stitched with waxed linen thread, then pulled over the last and secured — a process called lasting. For our Goodyear welted shoes, a strip of leather is stitched to the upper and insole, creating a durable and resoleable construction that can last decades.',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
  },
  {
    icon: Eye,
    title: 'Patina Finishing',
    description: 'This is where Akpaka shoes become truly extraordinary. Our signature patina is built in layers — aniline dyes, cremes, and hand-burning techniques that transform raw crust leather into a living, breathing work of art. No two patinas are ever identical.',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Inspection',
    description: 'Before any shoe leaves our workshop, it undergoes a rigorous quality inspection. Every stitch is checked, every edge is examined, and the finish is scrutinized under multiple lighting conditions. Only shoes that meet our exacting standards earn the Akpaka name.',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
  },
  {
    icon: Package,
    title: 'Packaging & Delivery',
    description: 'Your shoes are presented in a handcrafted Akpaka box, accompanied by a dust bag, cedar shoe trees, and a care guide. Whether delivered locally in Port Harcourt or shipped internationally, every pair arrives as a luxury experience.',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
  },
];

export function CraftsmanshipPage() {
  const { startCommission } = useAppStore();

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden mb-20">
        <img
          src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1600&q=80"
          alt="AkpakaNG Workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-gold-light/80 text-sm tracking-[0.3em] uppercase mb-3">The Atelier</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white">
              Craftsmanship
            </h1>
            <p className="text-white/70 max-w-xl mx-auto mt-4 leading-relaxed">
              From raw leather to finished masterpiece — explore the meticulous process 
              behind every pair of Akpaka shoes.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-gold text-sm tracking-widest uppercase">Step {i + 1}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workshop Stats */}
      <section className="py-20 bg-charcoal text-white mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '40+', label: 'Hours Per Pair' },
              { value: '7', label: 'Production Steps' },
              { value: '100%', label: 'Handcrafted' },
              { value: '3+', label: 'International Tanneries' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-gold">{stat.value}</p>
                <p className="text-xs text-white/50 mt-2 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Ready to Own the Process?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Commission a bespoke pair and follow every step of your shoe&apos;s creation, 
            from leather selection to final polish.
          </p>
          <Button onClick={() => startCommission(null)} className="bg-gold hover:bg-gold-light text-charcoal font-semibold px-8 py-6 text-base">
            Start Your Commission <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
