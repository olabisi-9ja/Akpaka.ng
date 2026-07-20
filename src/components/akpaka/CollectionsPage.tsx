'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Grid3X3, LayoutList, ArrowRight, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string;
  category: string;
  featured: boolean;
  productType: string;
  stockStatus: string;
  stockQuantity: number;
  baseLeather: string | null;
  soleType: string | null;
  craftingHours: string | null;
  leatherSource: string | null;
  artisanQuote: string | null;
  collectionId: string | null;
  collection: { name: string; slug: string } | null;
  reviews: { rating: number; comment: string; authorName: string }[];
}

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  products: Product[];
}

const categories = ['All', 'Oxford', 'Loafer', 'Boot', 'Wedding'];

const stockBadges: Record<string, { label: string; cls: string }> = {
  'in-stock': { label: 'In Stock', cls: 'bg-green-100 text-green-800' },
  'low-stock': { label: 'Few Left', cls: 'bg-amber-100 text-amber-800' },
  'made-to-order': { label: 'Made to Order', cls: 'bg-blue-100 text-blue-800' },
  'bespoke-only': { label: 'Bespoke', cls: 'bg-purple-100 text-purple-800' },
  'waitlist': { label: 'Waitlist', cls: 'bg-red-100 text-red-800' },
};

export function CollectionsPage() {
  const { selectProduct, startCommission } = useAppStore();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    Promise.all([
      fetch('/api/products/collections').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
    ]).then(([cols, prods]) => {
      setCollections(cols);
      setProducts(prods);
    });
  }, []);

  const filteredProducts = products.filter((p) => {
    const catMatch = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const colMatch = !selectedCollection || p.collectionId === selectedCollection;
    return catMatch && colMatch;
  });

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Our Portfolio</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">Collections</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Explore our full range of handcrafted luxury shoes. Each piece is a work of art, 
            made with the finest leathers and traditional techniques.
          </p>
        </motion.div>

        {/* Collection Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <button
            onClick={() => setSelectedCollection(null)}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              !selectedCollection
                ? 'border-gold bg-gold/10'
                : 'border-border bg-white hover:border-gold/50'
            }`}
          >
            <span className="font-serif font-semibold text-charcoal">All Collections</span>
            <p className="text-xs text-muted-foreground mt-1">{products.length} shoes</p>
          </button>
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                selectedCollection === col.id
                  ? 'border-gold bg-gold/10'
                  : 'border-border bg-white hover:border-gold/50'
              }`}
            >
              <span className="font-serif font-semibold text-charcoal text-sm">{col.name}</span>
              <p className="text-xs text-muted-foreground mt-1">{col.products.length} styles</p>
            </button>
          ))}
        </div>

        {/* Category Filter & View Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-charcoal text-gold'
                    : 'bg-white text-muted-foreground hover:bg-charcoal/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-charcoal text-gold' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-charcoal text-gold' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-charcoal mb-2">No shoes found</p>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() => selectProduct(product.id)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={product.images.split(',')[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${(stockBadges[product.stockStatus] || stockBadges['made-to-order']).cls}`}>
                      {(stockBadges[product.stockStatus] || stockBadges['made-to-order']).label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-gold/90 text-charcoal text-[9px] font-semibold px-2 py-0.5 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold"
                      onClick={(e) => { e.stopPropagation(); selectProduct(product.id); }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold text-charcoal group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{product.baseLeather}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-gold font-semibold">₦{product.price.toLocaleString()}</span>
                    {product.reviews.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <span className="text-xs text-muted-foreground">
                          {(product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-6 bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => selectProduct(product.id)}
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={product.images.split(',')[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs text-gold tracking-wider uppercase">{product.category}</span>
                      <h3 className="font-serif text-xl font-semibold text-charcoal mt-1">{product.name}</h3>
                    </div>
                    <span className="text-gold font-semibold text-lg whitespace-nowrap">₦{product.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    {product.baseLeather && (
                      <span className="text-xs text-muted-foreground">{product.baseLeather}</span>
                    )}
                    {product.craftingHours && (
                      <span className="text-xs text-muted-foreground">{product.craftingHours}</span>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-auto border-gold text-gold hover:bg-gold/10"
                      onClick={(e) => { e.stopPropagation(); selectProduct(product.id); }}
                    >
                      View Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
