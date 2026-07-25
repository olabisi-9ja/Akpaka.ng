'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Heart, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string;
  category: string;
  productType: string;
  stockStatus: string;
  baseLeather?: string | null;
  craftingHours?: string | null;
  collectionId?: string | null;
  reviews?: { rating: number }[];
}

const categories = ['All', 'Oxford', 'Loafer', 'Boot', 'Wedding'];
const styles = [
  { label: 'Oxfords', image: '/images/editorial/media__1784681124466.jpg', category: 'Oxford' },
  { label: 'Loafers', image: '/images/editorial/media__1784681124508.jpg', category: 'Loafer' },
  { label: 'Boots', image: '/images/akpaka-hero-campaign.jpg', category: 'Boot' },
];

export function CollectionsPage() {
  const { selectProduct, searchQuery, setSearchQuery } = useAppStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured');
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((catalogue) => setProducts(Array.isArray(catalogue) ? catalogue : []))
      .catch(() => setProducts([]));
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = products.filter((product) => {
      const categoryMatch = activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase();
      const searchMatch = !query || `${product.name} ${product.category} ${product.baseLeather || ''}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });

    if (sort === 'low') return [...result].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, products, searchQuery, sort]);

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen bg-white pb-20 pt-[118px] text-[#111] lg:pt-[132px]">
      <section className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.19em] text-black/45">Akpaka footwear</p>
            <h1 className="mt-2 text-4xl font-bold tracking-[-0.06em] sm:text-5xl">Shoes for every arrival.</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/60">Handcrafted leather footwear, designed in Port Harcourt and finished for the places you are headed next.</p>
          </div>
          <p className="text-sm text-black/55">{products.length} styles</p>
        </div>

        <div className="grid grid-cols-3 gap-3 py-7 sm:gap-4 lg:max-w-4xl">
          {styles.map((style) => (
            <button key={style.label} onClick={() => selectCategory(style.category)} className="group text-left">
              <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f5]"><img src={style.image} alt={style.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
              <p className="mt-3 text-sm font-bold">Shop {style.label}</p>
            </button>
          ))}
        </div>

        <div className="sticky top-[68px] z-20 -mx-4 border-y border-black/10 bg-white px-4 py-3 sm:mx-0 sm:px-0 lg:top-[100px]">
          <div className="flex items-center justify-between gap-3">
            <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto pr-4">
              {categories.map((category) => (
                <button key={category} onClick={() => selectCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeCategory === category ? 'bg-black text-white' : 'bg-[#f5f5f5] hover:bg-black/10'}`}>{category === 'All' ? 'All shoes' : category}</button>
              ))}
            </div>
            <button onClick={() => setFiltersOpen(!filtersOpen)} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${filtersOpen ? 'border-black bg-black text-white' : 'border-black/20'}`}><SlidersHorizontal className="h-4 w-4" /> Filters</button>
          </div>
        </div>

        {filtersOpen && (
          <section className="border-b border-black/10 py-5">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div><p className="text-sm font-bold">Refine your selection</p><p className="mt-1 text-xs text-black/55">Choose a price order or search by material and style.</p></div>
              <div className="flex flex-wrap gap-2"><button onClick={() => setSort('featured')} className={`rounded-full px-4 py-2 text-sm ${sort === 'featured' ? 'bg-black text-white' : 'bg-[#f5f5f5]'}`}>Featured</button><button onClick={() => setSort('low')} className={`rounded-full px-4 py-2 text-sm ${sort === 'low' ? 'bg-black text-white' : 'bg-[#f5f5f5]'}`}>Price: low to high</button><button onClick={() => setSort('high')} className={`rounded-full px-4 py-2 text-sm ${sort === 'high' ? 'bg-black text-white' : 'bg-[#f5f5f5]'}`}>Price: high to low</button></div>
            </div>
          </section>
        )}

        <div className="flex items-center justify-between py-6">
          <p className="text-sm font-medium">{filteredProducts.length} results {searchQuery && <span className="font-normal text-black/55">for “{searchQuery}”</span>}</p>
          <div className="hidden items-center gap-1 sm:flex"><button aria-label="Grid view" onClick={() => setViewMode('grid')} className={`grid h-9 w-9 place-items-center rounded-full ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-[#f5f5f5]'}`}><LayoutGrid className="h-4 w-4" /></button><button aria-label="List view" onClick={() => setViewMode('list')} className={`grid h-9 w-9 place-items-center rounded-full ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-[#f5f5f5]'}`}><List className="h-4 w-4" /></button></div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="grid min-h-[360px] place-items-center border-y border-black/10 text-center"><div><p className="text-2xl font-bold tracking-[-0.04em]">Nothing in this cut yet.</p><p className="mt-2 text-sm text-black/55">Try another style or clear your search.</p><button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-5 rounded-full bg-black px-5 py-3 text-xs font-bold text-white">Show all shoes</button></div></div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)} onSave={() => setSaved((items) => items.includes(product.id) ? items.filter((id) => id !== product.id) : [...items, product.id])} onSelect={() => selectProduct(product.id)} />)}
          </div>
        ) : (
          <div className="border-t border-black/10">
            {filteredProducts.map((product) => (
              <button key={product.id} onClick={() => selectProduct(product.id)} className="flex w-full gap-5 border-b border-black/10 py-4 text-left transition-colors hover:bg-[#f8f8f8] sm:gap-8 sm:p-5">
                <img src={product.images.split(',')[0]} alt={product.name} className="h-28 w-28 bg-[#f5f5f5] object-cover mix-blend-multiply sm:h-36 sm:w-40" />
                <span className="flex min-w-0 flex-1 flex-col justify-center"><span className="text-[10px] font-bold uppercase tracking-wider text-black/45">{product.category} · {product.stockStatus === 'in-stock' ? 'Ready to wear' : 'Made to order'}</span><span className="mt-2 text-lg font-bold tracking-[-0.035em] sm:text-xl">{product.name}</span><span className="mt-1 line-clamp-2 max-w-xl text-sm text-black/55">{product.description}</span><span className="mt-3 text-sm font-medium">₦{product.price.toLocaleString()}</span></span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product, saved, onSave, onSelect }: { product: Product; saved: boolean; onSave: () => void; onSelect: () => void }) {
  const label = product.stockStatus === 'in-stock' ? 'Ready to wear' : product.stockStatus === 'bespoke-only' ? 'Bespoke' : product.stockStatus === 'waitlist' ? 'Coming back soon' : 'Made to order';
  return (
    <article onClick={onSelect} className="group cursor-pointer text-left">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
        <img src={product.images.split(',')[0]} alt={product.name} className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-[1.04]" />
        <span className="absolute bottom-3 left-3 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide">{label}</span>
        <button onClick={(event) => { event.stopPropagation(); onSave(); }} aria-label={`Save ${product.name}`} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95"><Heart className={`h-[18px] w-[18px] ${saved ? 'fill-[#8d3d27] text-[#8d3d27]' : ''}`} /></button>
      </div>
      <div className="mt-3 flex gap-2"><div className="min-w-0 flex-1"><h2 className="truncate text-sm font-semibold sm:text-base">{product.name}</h2><p className="mt-1 truncate text-xs text-black/55">{product.baseLeather || 'Hand-finished leather'}</p></div><p className="whitespace-nowrap text-sm">₦{product.price.toLocaleString()}</p></div>
    </article>
  );
}
