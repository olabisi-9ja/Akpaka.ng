'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Instagram, Facebook } from 'lucide-react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-cream pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">Message Sent</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Thank you for reaching out. Our team will respond within 24 hours. For urgent inquiries, please contact us directly on WhatsApp.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">Contact Us</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Whether you have a question about our shoes, want to commission a bespoke pair, 
            or simply want to say hello — we would love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-charcoal mb-1">Visit Our Atelier</h3>
                  <p className="text-sm text-muted-foreground">
                    No 1 Doxa Road, Port Harcourt,<br />
                    Rivers State, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-charcoal mb-1">Call or WhatsApp</h3>
                  <a href="tel:+2348180474183" className="text-sm text-muted-foreground hover:text-gold transition-colors block">
                    +234 818 047 4183
                  </a>
                  <a
                    href="https://wa.me/2348180474183"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <MessageSquare className="w-3 h-3" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-charcoal mb-1">Email</h3>
                  <a href="mailto:info@akpaka.ng" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    info@akpaka.ng
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-charcoal mb-1">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday — Friday: 9:00 AM — 6:00 PM<br />
                    Saturday: 10:00 AM — 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 px-2">
              <a href="https://instagram.com/akpaka.ng" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-muted-foreground">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/akpakaboy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-muted-foreground">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@akpaka.ng" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-muted-foreground">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15a6.34 6.34 0 0 0 6.33 6.33 6.34 6.34 0 0 0 6.34-6.33V8.88a8.28 8.28 0 0 0 4.76 1.5V6.93a4.84 4.84 0 0 1-1-.24z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-6">Send a Message</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Full Name *</Label>
                    <Input id="contact-name" placeholder="Your name" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input id="contact-email" type="email" placeholder="you@example.com" className="mt-1" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone / WhatsApp</Label>
                  <Input id="contact-phone" placeholder="+234 800 000 0000" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input id="contact-subject" placeholder="e.g. Bespoke commission inquiry" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us how we can help..."
                    className="mt-1 min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="bg-gold hover:bg-gold-light text-charcoal font-semibold h-12 px-8">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-xl overflow-hidden bg-muted h-64 sm:h-80 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-gold/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No 1 Doxa Road, Port Harcourt, Nigeria</p>
            <a
              href="https://maps.google.com/?q=No+1+Doxa+Road+Port+Harcourt+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="mt-3 border-gold text-gold">
                Open in Google Maps
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
