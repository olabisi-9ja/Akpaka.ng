'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';

export interface MegaMenuPanel {
  department: string;
  headline: string;
  columns: { title: string; links: { label: string; category?: string; action?: string }[] }[];
  image: string;
  imageLabel: string;
  imageAction?: string;
}

/**
 * FARFETCH-style department mega menu: full-width panel with a feature image,
 * category columns and an editorial link.
 */
export function MegaMenu({ panels, open, onClose }: { panels: MegaMenuPanel[]; open: string | null; onClose: () => void }) {
  const { setView, setSelectedDepartment, selectCollection } = useAppStore();
  const panel = panels.find((item) => item.department === open);

  if (!panel) return null;

  const go = (link: { label: string; category?: string; action?: string }) => {
    if (link.action === 'bespoke') {
      setView('commission');
    } else if (link.action === 'new-in') {
      setSelectedDepartment(panel.department);
      setView('collections');
    } else if (link.category) {
      setSelectedDepartment(panel.department);
      selectCollection(link.category);
      setView('collections');
    } else {
      setView('collections');
    }
    onClose();
  };

  return (
    <div
      className="absolute inset-x-0 top-full z-40 border-b border-black/10 bg-white"
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_2fr] lg:px-10">
        <button onClick={() => go({ label: panel.imageLabel, action: panel.imageAction })} className="group relative block text-left">
          <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
            <img src={panel.image} alt={panel.headline} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] underline underline-offset-4">{panel.imageLabel}</p>
        </button>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {panel.columns.map((column) => (
            <div key={column.title}>
              <p className="ff-eyebrow">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => go(link)} className="text-[13px] text-black/75 transition-colors hover:text-black hover:underline underline-offset-4">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
