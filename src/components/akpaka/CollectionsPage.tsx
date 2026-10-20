'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { ProductCard, ProductCardProduct } from '@/components/akpaka/ProductCard';

interface Product extends ProductCardProduct {
  description: string;
  collectionId?: string | null;
  collection?: { name: string } | null;
}

const categories = ['Oxford', 'Loafer', 'Boot', 'Wedding'];

const departmentMeta: Record<string, { title: string; note: string; departments: string[] }> = {
  women: { title: 'Womenswear', note: 'Handcrafted for every arrival.', departments: ['women'] },
  men: { title: 'Menswear', note: 'Classic silhouettes, built to last.', departments: ['men'] },
  bespoke: { title: 'Bespoke', note: 'Made to measure, entirely yours.', departments: ['bespoke'] },
  'new-in': { title: 'New In', note: 'Fresh from the bench, handpicked daily.', departments: [] },
  sale: { title: 'Sale', note: 'Atelier samples, now 15% off.', departments: [] },
};

const departmentCategories: Record<string, string[]> = {
  women: ['wedding', 'loafer'],
  men: ['oxford', 'boot'],
};

type SortKey = 'featured' | 'newest' | 'low' | 'high';

export function CollectionsPage() {
  const { selectProduct, searchQuery, setSearchQuery, selectedDepartment, setSelectedDepartment, selectCollection, selectedCollection } = useAppStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((catalogue) => setProducts(Array.isArray(catalogue) ? catalogue : []))
      .catch(() => setProducts([]));
  }, []);

  const saleMode = selectedDepartment === 'sale';
  const meta = selectedDepartment ? departmentMeta[selectedDepartment] : null;

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let result = products.filter((product) => {
      if (selectedDepartment && selectedDepartment !== 'new-in' && selectedDepartment !== 'sale') {
        const allowed = departmentCategories[selectedDepartment] ?? [];
        if (!allowed.includes(product.category.toLowerCase())) return false;
      }
      if (selectedDepartment === 'new-in' && !product.featured) return false;
      if (selectedDepartment === 'bespoke' && product.productType !== 'bespoke-only' && product.productType !== 'made-to-order') return false;
      if (selectedCollection && product.collection?.name !== selectedCollection && product.collectionId !== selectedCollection) return false;
      if (activeCategory && product.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
      if (activeTypes.length && !activeTypes.includes(product.productType)) return false;
      if (minPrice !== null && product.price < minPrice) return false;
      if (maxPrice !== null && product.price > maxPrice) return false;
      if (query && !`${product.name} ${product.category} ${product.baseLeather || ''}`.toLowerCase().includes(query)) return false;
      return true;
    });

    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === 'newest') result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return result;
  }, [products, selectedDepartment, selectedCollection, activeCategory, activeTypes, minPrice, maxPrice, searchQuery, sort]);

  const selectCategory = (category: string | null) => {
    setActiveCategory(category);
    setSearchQuery('');
  };

  const toggleType = (type: string) => {
    setActiveTypes((current) => (current.includes(type) ? current.filter((item) => item !== type) : [...current, type]));
  };

  const effectivePrice = (product: Product) => (saleMode ? Math.round((product.price / 0.85) / 100) * 100 : product.price);

  return (
    <main className="min-h-screen bg-white pb-20 pt-[92px] text-black lg:pt-[92px]">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 py-5 text-xs text-black/55">
          <button onClick={() => { setSelectedDepartment(null); selectCollection(null); }} className="hover:text-black">Home</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => { setSelectedDepartment(null); selectCollection(null); }} className="hover:text-black">Shoes</button>
          {meta && <><ChevronRight className="h-3 w-3" /><span className="text-black">{meta.title}</span></>}
          {activeCategory && <><ChevronRight className="h-3 w-3" /><span className="text-black">{activeCategory}s</span></>}
        </nav>

        {/* Heading */}
        <div className="flex flex-col gap-4 border-b border-black/10 pb-8">
          <h1 className="text-4xl font-bold tracking-[-0.05em] sm:text-5xl">{meta ? meta.title : 'All shoes'}</h1>
          <p className="max-w-xl text-sm leading-relaxed text-black/60">{meta ? meta.note : 'Handcrafted leather footwear, designed in Port Harcourt and finished for the places you are headed next.'}</p>
        </div>

        {/* Toolbar */}
        <div className="sticky top-[92px] z-20 -mx-4 flex items-center justify-between gap-3 border-b border-black/10 bg-white px-4 py-3 sm:mx-0 sm:px-0 lg:top-[92px]">
          <div className="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto pr-4">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                onClick={() => selectCategory(category === 'All' ? null : category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  (category === 'All' && !activeCategory) || activeCategory === category
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 hover:border-black'
                }`}
              >
                {category === 'All' ? 'All shoes' : `${category}s`}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold ${filtersOpen ? 'border-black bg-black text-white' : 'border-black/20'}`}>
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="appearance-none rounded-full border border-black/20 bg-white py-2 pl-4 pr-9 text-[13px] font-medium outline-none"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <section className="border-b border-black/10 py-6">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="ff-eyebrow">Type</p>
                <div className="mt-3 space-y-2">
                  {[
                    ['ready-to-wear', 'Ready to wear'],
                    ['made-to-order', 'Made to order'],
                    ['bespoke-only', 'Bespoke'],
                  ].map(([value, label]) => (
                    <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-black/75">
                      <input type="checkbox" checked={activeTypes.includes(value)} onChange={() => toggleType(value)} className="h-4 w-4 accent-black" />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="ff-eyebrow">Price</p>
                <div className="mt-3 space-y-2">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-black/75">
                    <input type="radio" name="price" checked={minPrice === null && maxPrice === null} onChange={() => { setMinPrice(null); setMaxPrice(null); }} className="accent-black" />
                    All prices
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-black/75">
                    <input type="radio" name="price" checked={minPrice === null && maxPrice === 80000} onChange={() => { setMinPrice(null); setMaxPrice(80000); }} className="accent-black" />
                    Under ₦80,000
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-black/75">
                    <input type="radio" name="price" checked={minPrice === 80000 && maxPrice === 100000} onChange={() => { setMinPrice(80000); setMaxPrice(100000); }} className="accent-black" />
                    ₦80,000 – ₦100,000
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-black/75">
                    <input type="radio" name="price" checked={minPrice === 100000 && maxPrice === null} onChange={() => { setMinPrice(100000); setMaxPrice(null); }} className="accent-black" />
                    Over ₦100,000
                  </label>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { setActiveTypes([]); setMinPrice(null); setMaxPrice(null); setActiveCategory(null); }}
                  className="text-[13px] font-bold underline underline-offset-4 hover:text-black/60"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Result count */}
        <div className="flex items-center justify-between py-6">
          <p className="text-sm font-medium">
            {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'}
            {searchQuery && <span className="font-normal text-black/55"> for “{searchQuery}”</span>}
          </p>
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="grid min-h-[360px] place-items-center border-y border-black/10 text-center">
            <div>
              <p className="text-2xl font-bold tracking-[-0.04em]">Nothing in this cut yet.</p>
              <p className="mt-2 text-sm text-black/55">Try another style or clear your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory(null); setActiveTypes([]); setMinPrice(null); setMaxPrice(null); setSelectedDepartment(null); selectCollection(null); }}
                className="mt-5 rounded-full bg-black px-5 py-3 text-xs font-bold text-white"
              >
                Show all shoes
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge={saleMode ? 'Special Offer' : product.featured ? 'New Season' : undefined}
                originalPrice={saleMode ? effectivePrice(product) : undefined}
                discount={saleMode ? '-15%' : undefined}
              />
            ))}
          </div>
        )}

        {/* Load more (progressive reveal) */}
        {filteredProducts.length > 8 && (
          <div className="mt-12 text-center">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-black px-6 py-3 text-xs font-bold transition-colors hover:bg-black hover:text-white">
              Back to top
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button aria-label="Close filters" onClick={() => setFiltersOpen(false)} className="absolute inset-0 w-full bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-lg font-bold">Filters</p>
              <button aria-label="Close filters" onClick={() => setFiltersOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="ff-eyebrow">Type</p>
            <div className="mt-3 space-y-2">
              {[['ready-to-wear', 'Ready to wear'], ['made-to-order', 'Made to order'], ['bespoke-only', 'Bespoke']].map(([value, label]) => (
                <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" checked={activeTypes.includes(value)} onChange={() => toggleType(value)} className="h-4 w-4 accent-black" />
                  {label}
                </label>
              ))}
            </div>
            <p className="ff-eyebrow mt-6">Price</p>
            <div className="mt-3 space-y-2">
              {([
                ['all', 'All prices', null, null],
                ['under', 'Under ₦80,000', null, 80000],
                ['mid', '₦80,000 – ₦100,000', 80000, 100000],
                ['over', 'Over ₦100,000', 100000, null],
              ] as [string, string, number | null, number | null][]).map(([key, label, min, max]) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="price-mobile"
                    checked={minPrice === min && maxPrice === max}
                    onChange={() => { setMinPrice(min); setMaxPrice(max); }}
                    className="accent-black"
                  />
                  {label}
                </label>
              ))}
            </div>
            <button onClick={() => setFiltersOpen(false)} className="mt-8 w-full rounded-full bg-black py-3.5 text-xs font-bold text-white">Show {filteredProducts.length} results</button>
          </div>
        </div>
      )}
    </main>
  );
}
