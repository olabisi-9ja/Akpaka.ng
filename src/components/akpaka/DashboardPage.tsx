'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle2, Circle, ArrowRight, ExternalLink, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CommissionStep {
  id: string;
  stepName: string;
  stepOrder: number;
  completed: boolean;
  completedAt: string | null;
}

interface Commission {
  id: string;
  customerName: string;
  status: string;
  progressPercent: number;
  totalAmount: number | null;
  depositPaid: boolean;
  createdAt: string;
  product: { name: string; images: string } | null;
  steps: CommissionStep[];
}

export function DashboardPage() {
  const { setView } = useAppStore();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);
  const [activeTab, setActiveTab] = useState<'commissions' | 'orders'>('commissions');

  useEffect(() => {
    fetch('/api/commissions').then(r => r.json()).then(data => setCommissions(Array.isArray(data) ? data : []));
  }, []);

  const statusColors: Record<string, string> = {
    inquiry: 'bg-blue-100 text-blue-800',
    deposit_paid: 'bg-amber-100 text-amber-800',
    leather_selected: 'bg-purple-100 text-purple-800',
    cutting: 'bg-orange-100 text-orange-800',
    stitching: 'bg-yellow-100 text-yellow-800',
    finishing: 'bg-emerald-100 text-emerald-800',
    quality_check: 'bg-teal-100 text-teal-800',
    dispatched: 'bg-green-100 text-green-800',
    delivered: 'bg-green-200 text-green-900',
  };

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Client Portal</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">Your Dashboard</h1>
          <p className="text-muted-foreground mt-3">Track your commissions, orders, and bespoke progress in real time.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {(['commissions', 'orders'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'text-charcoal border-b-2 border-gold'
                  : 'text-muted-foreground hover:text-charcoal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'commissions' && (
          <div className="space-y-6">
            {commissions.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="font-serif text-xl text-charcoal mb-2">No commissions yet</p>
                <p className="text-muted-foreground mb-6">Start your bespoke journey with AkpakaNG</p>
                <Button onClick={() => setView('commission')} className="bg-gold hover:bg-gold-light text-charcoal font-semibold">
                  Commission a Pair <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              <>
                {/* Commission Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {commissions.map((commission) => (
                    <motion.div
                      key={commission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedCommission(selectedCommission?.id === commission.id ? null : commission)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-serif text-lg font-semibold text-charcoal">
                              {commission.product?.name || 'Custom Commission'}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[commission.status] || 'bg-gray-100 text-gray-800'}`}>
                              {commission.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Commission #{commission.id.slice(-6)} &middot; {new Date(commission.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        <div className="text-right">
                          {commission.totalAmount && (
                            <p className="font-serif text-lg font-semibold text-gold">
                              ₦{commission.totalAmount.toLocaleString()}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {commission.depositPaid ? 'Deposit Paid' : 'Deposit Pending'}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-semibold text-charcoal">{commission.progressPercent}%</span>
                        </div>
                        <Progress value={commission.progressPercent} className="h-2" />
                      </div>

                      {/* Steps (expandable) */}
                      {selectedCommission?.id === commission.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-6 pt-4 border-t border-border"
                        >
                          <h4 className="text-sm font-semibold text-charcoal mb-4">Production Timeline</h4>
                          <div className="space-y-3">
                            {commission.steps.map((step) => (
                              <div key={step.id} className="flex items-start gap-3">
                                <div className="mt-0.5">
                                  {step.completed ? (
                                    <CheckCircle2 className="w-5 h-5 text-gold" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-muted-foreground/30" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className={`text-sm font-medium ${step.completed ? 'text-charcoal' : 'text-muted-foreground'}`}>
                                      {step.stepName}
                                    </p>
                                    {step.completedAt && (
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(step.completedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 flex gap-3">
                            <a
                              href="https://wa.me/2348180474183"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="outline" size="sm" className="border-green-600 text-green-600">
                                Chat on WhatsApp
                              </Button>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="font-serif text-xl text-charcoal mb-2">No orders yet</p>
            <p className="text-muted-foreground mb-6">Browse our collections to place an order</p>
            <Button onClick={() => setView('collections')} className="bg-gold hover:bg-gold-light text-charcoal font-semibold">
              Browse Collections <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
