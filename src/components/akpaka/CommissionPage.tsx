'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, ArrowRight, ArrowLeft, Clock, CreditCard, MessageSquare } from 'lucide-react';

type Step = 'details' | 'preferences' | 'measurements' | 'review' | 'submitted';

const leatherOptions = [
  { value: 'italian-calfskin', label: 'Italian Calfskin', desc: 'Premium, smooth finish from Tuscany' },
  { value: 'french-calfskin', label: 'French Calfskin', desc: 'Luxurious grain from Lyon' },
  { value: 'spanish-calfskin', label: 'Spanish Calfskin', desc: 'Supple and durable from Barcelona' },
  { value: 'premium-suede', label: 'Premium Suede', desc: 'Soft napped finish from Northampton' },
  { value: 'exotic', label: 'Exotic Skins', desc: 'Crocodile, ostrich, and more (premium pricing)' },
];

const soleOptions = [
  { value: 'goodyear-leather', label: 'Goodyear Welt — Leather Sole', desc: 'Classic, resoleable, elegant' },
  { value: 'goodyear-dainite', label: 'Goodyear Welt — Dainite Rubber', desc: 'Classic construction, practical grip' },
  { value: 'blake-leather', label: 'Blake Stitch — Leather Sole', desc: 'Sleek profile, flexible' },
  { value: 'crepe-rubber', label: 'Crepe Rubber Sole', desc: 'Casual comfort, natural material' },
];

const patinaOptions = [
  { value: 'cognac', label: 'Cognac', desc: 'Rich, warm brown with golden highlights' },
  { value: 'mahogany', label: 'Mahogany', desc: 'Deep reddish-brown with depth' },
  { value: 'espresso', label: 'Espresso', desc: 'Dark, sophisticated, near-black' },
  { value: 'natural', label: 'Natural', desc: 'Light tan, develops beautiful patina over time' },
  { value: 'mirror-black', label: 'Mirror Black', desc: 'High-gloss black, 7-layer mirror finish' },
  { value: 'custom', label: 'Custom Patina', desc: 'Your unique color vision, hand-mixed' },
];

export function CommissionPage() {
  const { setView } = useAppStore();
  const [step, setStep] = useState<Step>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shoeStyle: '',
    leatherType: '',
    soleType: '',
    patina: '',
    leftFootLength: '',
    leftFootWidth: '',
    rightFootLength: '',
    rightFootWidth: '',
    size: '',
    specialInstructions: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await fetch('/api/commissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          leatherPreference: formData.leatherType,
          solePreference: formData.soleType,
          specialInstructions: formData.specialInstructions,
          customDetails: {
            shoeStyle: formData.shoeStyle,
            patina: formData.patina,
            measurements: {
              leftFoot: { length: formData.leftFootLength, width: formData.leftFootWidth },
              rightFoot: { length: formData.rightFootLength, width: formData.rightFootWidth },
              size: formData.size,
            },
          },
        }),
      });
      setStep('submitted');
    } catch {
      // Handle error silently for demo
    }
  };

  const stepIndicator = (currentStep: Step) => {
    const steps: { key: Step; label: string; icon: React.ElementType }[] = [
      { key: 'details', label: 'Your Details', icon: MessageSquare },
      { key: 'preferences', label: 'Preferences', icon: CreditCard },
      { key: 'measurements', label: 'Measurements', icon: Clock },
      { key: 'review', label: 'Review', icon: CheckCircle2 },
    ];
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    return steps.map((s, i) => (
      <div key={s.key} className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
          i <= currentIndex ? 'bg-gold text-charcoal' : 'bg-muted text-muted-foreground'
        }`}>
          {i < currentIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
        </div>
        <span className={`text-xs sm:text-sm hidden sm:inline ${i <= currentIndex ? 'text-charcoal font-medium' : 'text-muted-foreground'}`}>
          {s.label}
        </span>
        {i < steps.length - 1 && <div className={`hidden sm:block w-8 h-px ${i < currentIndex ? 'bg-gold' : 'bg-border'}`} />}
      </div>
    ));
  };

  if (step === 'submitted') {
    return (
      <div className="bg-cream pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">Commission Received</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Thank you for your commission request, {formData.name}. Our team will review your 
            specifications and reach out within 24 hours to discuss the next steps, including 
            a personal consultation with Prince Achase.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            A deposit of 30% will be required to begin production. We will send payment details via email.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setView('dashboard')} className="bg-gold hover:bg-gold-light text-charcoal font-semibold">
              Track Your Commission
            </Button>
            <Button onClick={() => setView('collections')} variant="outline">
              Continue Browsing
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Bespoke Service</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">Commission Yours</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Not just a purchase — an experience. Tell us your vision and we will bring it to life.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          {stepIndicator(step)}
        </div>

        {/* Form Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 sm:p-8 shadow-sm"
        >
          {step === 'details' && (
            <div className="space-y-5">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Your full name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@example.com" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="+234 800 000 0000" className="mt-1" />
              </div>
              <div>
                <Label>Shoe Style</Label>
                <Select value={formData.shoeStyle} onValueChange={(v) => updateField('shoeStyle', v)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select a style" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oxford">Oxford</SelectItem>
                    <SelectItem value="brogue">Brogue</SelectItem>
                    <SelectItem value="wholecut">Wholecut</SelectItem>
                    <SelectItem value="loafer">Loafer</SelectItem>
                    <SelectItem value="chelsea-boot">Chelsea Boot</SelectItem>
                    <SelectItem value="chukka-boot">Chukka Boot</SelectItem>
                    <SelectItem value="wedding">Wedding Shoe</SelectItem>
                    <SelectItem value="custom">Fully Custom Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 'preferences' && (
            <div className="space-y-5">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">Your Preferences</h3>
              <div>
                <Label>Leather Type</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {leatherOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateField('leatherType', opt.value)}
                      className={`p-3 text-left rounded-lg border-2 transition-all ${
                        formData.leatherType === opt.value
                          ? 'border-gold bg-gold/5'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <p className="font-medium text-sm text-charcoal">{opt.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Sole Construction</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {soleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateField('soleType', opt.value)}
                      className={`p-3 text-left rounded-lg border-2 transition-all ${
                        formData.soleType === opt.value
                          ? 'border-gold bg-gold/5'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <p className="font-medium text-sm text-charcoal">{opt.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Patina Finish</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {patinaOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateField('patina', opt.value)}
                      className={`p-3 text-left rounded-lg border-2 transition-all ${
                        formData.patina === opt.value
                          ? 'border-gold bg-gold/5'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <p className="font-medium text-sm text-charcoal">{opt.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'measurements' && (
            <div className="space-y-5">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">Measurements</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Provide your foot measurements for a bespoke fit. If you don&apos;t have exact measurements, 
                you can provide your standard EU shoe size and we will schedule a fitting consultation.
              </p>
              <div>
                <Label htmlFor="size">EU Shoe Size</Label>
                <Select value={formData.size} onValueChange={(v) => updateField('size', v)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select your size" /></SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => i + 38).map((s) => (
                      <SelectItem key={s} value={String(s)}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leftLength">Left Foot Length (cm)</Label>
                  <Input id="leftLength" value={formData.leftFootLength} onChange={(e) => updateField('leftFootLength', e.target.value)} placeholder="27.5" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="leftWidth">Left Foot Width (cm)</Label>
                  <Input id="leftWidth" value={formData.leftFootWidth} onChange={(e) => updateField('leftFootWidth', e.target.value)} placeholder="10.2" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rightLength">Right Foot Length (cm)</Label>
                  <Input id="rightLength" value={formData.rightFootLength} onChange={(e) => updateField('rightFootLength', e.target.value)} placeholder="27.5" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="rightWidth">Right Foot Width (cm)</Label>
                  <Input id="rightWidth" value={formData.rightFootWidth} onChange={(e) => updateField('rightFootWidth', e.target.value)} placeholder="10.2" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  value={formData.specialInstructions}
                  onChange={(e) => updateField('specialInstructions', e.target.value)}
                  placeholder="Any special requests, monogramming, custom details..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-5">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">Review Your Commission</h3>
              <div className="space-y-4">
                <div className="p-4 bg-cream rounded-lg">
                  <h4 className="text-sm font-semibold text-charcoal mb-2">Contact Details</h4>
                  <p className="text-sm text-muted-foreground">{formData.name} &middot; {formData.email} &middot; {formData.phone}</p>
                </div>
                <div className="p-4 bg-cream rounded-lg">
                  <h4 className="text-sm font-semibold text-charcoal mb-2">Shoe Specifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Style:</span>
                    <span className="text-charcoal font-medium">{formData.shoeStyle || 'Not specified'}</span>
                    <span className="text-muted-foreground">Leather:</span>
                    <span className="text-charcoal font-medium">{leatherOptions.find(l => l.value === formData.leatherType)?.label || 'Not specified'}</span>
                    <span className="text-muted-foreground">Sole:</span>
                    <span className="text-charcoal font-medium">{soleOptions.find(s => s.value === formData.soleType)?.label || 'Not specified'}</span>
                    <span className="text-muted-foreground">Patina:</span>
                    <span className="text-charcoal font-medium">{patinaOptions.find(p => p.value === formData.patina)?.label || 'Not specified'}</span>
                  </div>
                </div>
                <div className="p-4 bg-cream rounded-lg">
                  <h4 className="text-sm font-semibold text-charcoal mb-2">Size & Measurements</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">EU Size:</span>
                    <span className="text-charcoal font-medium">{formData.size || 'Not specified'}</span>
                    {formData.leftFootLength && (
                      <>
                        <span className="text-muted-foreground">Left Foot:</span>
                        <span className="text-charcoal font-medium">{formData.leftFootLength}cm x {formData.leftFootWidth}cm</span>
                      </>
                    )}
                    {formData.rightFootLength && (
                      <>
                        <span className="text-muted-foreground">Right Foot:</span>
                        <span className="text-charcoal font-medium">{formData.rightFootLength}cm x {formData.rightFootWidth}cm</span>
                      </>
                    )}
                  </div>
                </div>
                {formData.specialInstructions && (
                  <div className="p-4 bg-cream rounded-lg">
                    <h4 className="text-sm font-semibold text-charcoal mb-2">Special Instructions</h4>
                    <p className="text-sm text-muted-foreground">{formData.specialInstructions}</p>
                  </div>
                )}
                <div className="p-4 bg-gold/5 border border-gold/20 rounded-lg">
                  <h4 className="text-sm font-semibold text-charcoal mb-2">Next Steps</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>1. Our team will review your specifications within 24 hours</li>
                    <li>2. You will receive a personal consultation with Prince Achase</li>
                    <li>3. A 30% deposit is required to begin production</li>
                    <li>4. Production typically takes 3-4 weeks</li>
                    <li>5. You can track progress in your client dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step !== 'details' ? (
              <Button variant="outline" onClick={() => {
                const prevSteps: Step[] = ['details', 'preferences', 'measurements', 'review'];
                const idx = prevSteps.indexOf(step);
                if (idx > 0) setStep(prevSteps[idx - 1]);
              }}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            ) : (
              <div />
            )}
            {step === 'review' ? (
              <Button onClick={handleSubmit} className="bg-gold hover:bg-gold-light text-charcoal font-semibold">
                Submit Commission <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => {
                const nextSteps: Step[] = ['details', 'preferences', 'measurements', 'review'];
                const idx = nextSteps.indexOf(step);
                if (idx < nextSteps.length - 1) setStep(nextSteps[idx + 1]);
              }} className="bg-charcoal hover:bg-charcoal/90 text-gold font-semibold">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </motion.div>

        {/* WhatsApp Alternative */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-3">Prefer to discuss your commission in person?</p>
          <a
            href="https://wa.me/2348180474183?text=Hello%20AkpakaNG!%20I%20would%20like%20to%20discuss%20a%20bespoke%20shoe%20commission."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <MessageSquare className="w-4 h-4 mr-2" /> Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
