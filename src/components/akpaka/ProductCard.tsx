'use client';

import React from 'react';
import { Heart, Plus } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export interface ProductCardProduct {
  id: string;
  name: string;
  price: number;
  images: string;
  category: string;
  productType: string;
  stockStatus: string;
  baseLeather?: string | null;
  featured?: boolean;
}

/**
 * FARFETCH-style product card.
 * - 3:4 imagery on a light fill, no card chrome
 * - Badge stack above the brand line (New Season / Special Offer / Made to order)
 * - Brand in uppercase, product name in lowercase sentence case
 * - Hover: image swap/zoom, quick-add (+) and save (♥) appear
 */
export function ProductCard({
  product,
  badge,
  originalPrice,
  discount,
  onAdd,
}: {
  product: ProductCardProduct;
  badge?: string;
  originalPrice?: number;
  discount?: string;
  onAdd?: (product: ProductCardProduct) => void;
}) {
  const { selectProduct, toggleWishlist, isWishlisted, addToCart } = useAppStore();
  const images = product.images.split(',').filter(Boolean);
  const [hover, setHover] = React.useState(false);
  const wished = isWishlisted(product.id);
  const quickAddable = product.productType === 'ready-to-wear' && product.stockStatus === 'in-stock';

  const quickAdd = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onAdd) {
      onAdd(product);
      return;
    }
    if (quickAddable) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: images[0],
        type: 'ready-to-wear',
        leather: product.baseLeather || undefined,
      });
    }
  };

  return (
    <article
      onClick={() => selectProduct(product.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer text-left"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
        <img
          src={hover && images[1] ? images[1] : images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        {badge && (
          <span className="absolute left-0 top-3 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-black">
            {badge}
          </span>
        )}
        <button
          aria-label={`Save ${product.name}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          <Heart className={`h-[17px] w-[17px] ${wished ? 'fill-black text-black' : ''}`} />
        </button>
        {quickAddable && (
          <button
            aria-label={`Quick add ${product.name}`}
            onClick={quickAdd}
            className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white text-black opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-black hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black">Akpaka</p>
          <h3 className="mt-0.5 truncate text-[13px] leading-snug text-black/85">{product.name.toLowerCase()}</h3>
        </div>
        <div className="shrink-0 text-right">
          {originalPrice && discount ? (
            <>
              <p className="text-[11px] text-black/45 line-through">₦{originalPrice.toLocaleString()}</p>
              <p className="text-[13px] font-medium">₦{product.price.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-black/55">{discount}</p>
            </>
          ) : (
            <p className="pt-3 text-[13px] font-medium">₦{product.price.toLocaleString()}</p>
          )}
        </div>
      </div>
    </article>
  );
}
