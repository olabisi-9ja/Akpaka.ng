'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  publishedAt: string;
}

const categoryLabels: Record<string, string> = {
  press: 'Press Coverage',
  blog: 'From the Workshop',
  craft: 'Craft & Technique',
  'behind-the-scenes': 'Behind the Scenes',
};

const categoryColors: Record<string, string> = {
  press: 'bg-red-100 text-red-800',
  blog: 'bg-blue-100 text-blue-800',
  craft: 'bg-amber-100 text-amber-800',
  'behind-the-scenes': 'bg-purple-100 text-purple-800',
};

export function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<JournalPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/api/journal').then(r => r.json()).then(setPosts);
  }, []);

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  if (selectedPost) {
    return (
      <div className="bg-cream pt-24 sm:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-sm text-gold hover:underline mb-6 inline-flex items-center gap-1"
          >
            &larr; Back to Journal
          </button>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[selectedPost.category] || 'bg-gray-100 text-gray-800'}`}>
              {categoryLabels[selectedPost.category] || selectedPost.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-3 mb-4">
              {selectedPost.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
              <Calendar className="w-4 h-4" />
              <span>{new Date(selectedPost.publishedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="prose prose-lg max-w-none">
              {selectedPost.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          </motion.article>
        </div>
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
          className="text-center mb-12"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Stories & Insights</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">The Journal</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Discover the stories behind the craft, press coverage, and insights from the world of bespoke shoemaking.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['all', 'press', 'craft', 'blog'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-charcoal text-gold'
                  : 'bg-white text-muted-foreground hover:bg-charcoal/5'
              }`}
            >
              {cat === 'all' ? 'All' : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 cursor-pointer"
            onClick={() => setSelectedPost(filteredPosts[0])}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="aspect-[16/10] lg:aspect-auto">
                <img
                  src={filteredPosts[0].coverImage}
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className={`text-xs px-2 py-1 rounded-full font-medium inline-block w-fit ${categoryColors[filteredPosts[0].category] || 'bg-gray-100 text-gray-800'}`}>
                  {categoryLabels[filteredPosts[0].category] || filteredPosts[0].category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-3 mb-3">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{filteredPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(filteredPosts[0].publishedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1 text-gold text-sm mt-4 font-semibold">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
                    {categoryLabels[post.category] || post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-gold transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
