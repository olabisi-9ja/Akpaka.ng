'use client';

import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProductCard, ProductCardProduct } from '@/components/akpaka/ProductCard';

export interface CarouselProduct extends ProductCardProduct {
  badge?: string;
  originalPrice?: number;
  discount?: string;
}

/**
 * FARFETCH-style product carousel: snap-scrolling row with edge arrows
 * and a "Shop Now" footer link.
 */
export function ProductCarousel({
  products,
  shopNowLabel,
  onShopNow,
}: {
  products: CarouselProduct[];
  shopNowLabel?: string;
  onShopNow?: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = (track.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 260) + 16;
    track.scrollBy({ left: direction * cardWidth * 2, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <div className="group/carousel relative">
      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
      >
        {products.map((product) => (
          <div key={product.id} data-card className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[22.5%] xl:w-[18.2%]">
            <ProductCard
              product={product}
              badge={product.badge}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
          </div>
        ))}
      </div>
      <button
        aria-label="Scroll back"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-black/15 bg-white shadow-sm transition hover:bg-black hover:text-white md:grid"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        aria-label="Scroll forward"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-black/15 bg-white shadow-sm transition hover:bg-black hover:text-white md:grid"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
      {shopNowLabel && (
        <button
          onClick={onShopNow}
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold underline underline-offset-4 hover:opacity-60"
        >
          {shopNowLabel} <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
