'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp, Heart, Sparkles, Users, Calendar } from 'lucide-react';

const timeline = [
  { year: '2014', title: 'The Decision', description: 'Prince Sunday Achase leaves university due to financial constraints, beginning a journey of self-discovery and resilience that would define his legacy.' },
  { year: '2016', title: 'First Stitch', description: 'After experimenting with bagmaking, Achase discovers his true calling in shoemaking. He begins stitching shoes in front of his house in Port Harcourt.' },
  { year: '2017–2024', title: 'The Grind', description: 'Eight years of relentless practice and skill development. Achase hones his craft through self-education, building a reputation as Port Harcourt\'s top bespoke shoemaker.' },
  { year: 'March 2025', title: 'The Challenge', description: 'Lagos shoemaker Nelson issues a viral TikTok challenge. Achase accepts and produces a replica that surpasses expectations, winning ₦100,000 and national recognition.' },
  { year: '2025', title: 'Brand Consolidation', description: 'AkpakaNG expands with flexible payment plans, a physical showroom on Doxa Road, and growing international demand from the Nigerian diaspora.' },
  { year: '2026', title: 'The Future', description: 'With 22K+ Instagram followers and press coverage from Legit.ng and ConnectNigeria, AkpakaNG positions itself as Nigeria\'s premier luxury shoe brand.' },
];

const values = [
  { icon: Sparkles, title: 'Uncompromising Quality', description: 'Every pair undergoes 40-65 hours of meticulous handcrafting. We never cut corners because our reputation rests on every stitch.' },
  { icon: Heart, title: 'Passion-Driven', description: 'From university dropout to master artisan, Prince Achase\'s journey proves that passion and persistence can transform any beginning into excellence.' },
  { icon: TrendingUp, title: 'Transparency First', description: 'Where others hide behind mystery, we show our process. Every step, every material, every decision — because trust is built in the open.' },
  { icon: Users, title: 'Community Impact', description: 'We create jobs, train artisans, and prove that world-class luxury can emerge from Nigeria. Our success is Port Harcourt\'s success.' },
];

export function AboutPage() {
  const { setView } = useAppStore();

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      {/* Hero */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden mb-20">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80"
          alt="Prince Sunday Achase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16">
          <div className="max-w-7xl mx-auto">
            <p className="text-gold-light/80 text-sm tracking-[0.3em] uppercase mb-3">Our Story</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white">
              The Artisan Behind
              <br />
              <span className="text-gold">The Brand</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Founder</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
              Prince Sunday Achase
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                In 2014, Prince Sunday Achase made a decision that would change his life. Forced to 
                drop out of his mechanical engineering program at university due to financial constraints, 
                he could have given up. Instead, he found his calling.
              </p>
              <p>
                After experimenting with bagmaking, Achase discovered shoemaking in 2016. What started 
                as a curiosity quickly became an obsession. He taught himself the craft through relentless 
                practice, watching tutorials, and studying the work of master shoemakers from around the world.
              </p>
              <p>
                Those early days were humbling. &ldquo;I started stitching shoes in front of my house,&rdquo; 
                Achase recalls. &ldquo;People would walk past and wonder what I was doing. But I knew what 
                I was building.&rdquo;
              </p>
              <p>
                Today, Achase operates from his workshop in Port Harcourt, employing a team of artisans 
                who share his commitment to excellence. His shoes, priced from ₦60,000 to ₦105,000, 
                attract clients from across Nigeria and the diaspora. And he remains as bold as ever: 
                &ldquo;I am the best shoemaker in the world.&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Prince Achase in his workshop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold text-charcoal p-4 rounded-lg shadow-xl">
              <p className="font-serif text-3xl font-bold">10+</p>
              <p className="text-sm font-medium">Years of Mastery</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Our Journey</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">The Akpaka Timeline</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-12 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} hidden sm:block`}>
                  <div className={`${i % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-md`}>
                    <h3 className="font-serif text-xl font-semibold text-gold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="relative z-10 w-16 h-16 bg-charcoal border-2 border-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-serif text-xs font-bold">{item.year}</span>
                </div>

                <div className="flex-1 hidden sm:block" />

                {/* Mobile layout */}
                <div className="sm:hidden flex-1 pl-4">
                  <h3 className="font-serif text-lg font-semibold text-gold mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Our Philosophy</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">What Drives Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gold/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Experience the Difference
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            See for yourself why clients across Nigeria and the diaspora trust AkpakaNG 
            for their most important footwear.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => setView('collections')} className="bg-charcoal hover:bg-charcoal/90 text-gold font-semibold px-8">
              Explore Collections
            </Button>
            <Button onClick={() => setView('commission')} variant="outline" className="border-gold text-gold hover:bg-gold/10 px-8">
              Commission Bespoke
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
