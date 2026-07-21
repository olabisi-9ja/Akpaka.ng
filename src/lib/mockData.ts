export const mockCollections = [
  {
    id: 'oxford-id',
    name: 'Oxford Collection',
    slug: 'oxford-collection',
    description: 'Timeless elegance meets Nigerian craftsmanship.',
    coverImage: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    featured: true,
    products: [
      {
        id: 'p1',
        name: 'The Port Harcourt Oxford',
        slug: 'port-harcourt-oxford',
        description: 'A masterclass in traditional shoemaking.',
        price: 85000,
        currency: 'NGN',
        baseLeather: 'Italian Calfskin',
        soleType: 'Goodyear Welt - Leather Sole',
        category: 'oxford',
        productType: 'made-to-order',
        stockStatus: 'made-to-order',
        images: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80,https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
        craftingHours: '45 hours',
        leatherSource: 'Italian Tannery, Tuscany',
        artisanQuote: 'Every Oxford I make carries the spirit of Port Harcourt.',
        featured: true,
        collectionId: 'oxford-id',
        published: true,
        reviews: [{ rating: 5 }],
      },
      {
        id: 'p2',
        name: 'The Niger Delta Brogue',
        slug: 'niger-delta-brogue',
        description: 'Where heritage meets artistry.',
        price: 92000,
        currency: 'NGN',
        baseLeather: 'Full-Grain Calfskin',
        soleType: 'Goodyear Welt - Dainite Sole',
        category: 'oxford',
        productType: 'made-to-order',
        stockStatus: 'made-to-order',
        images: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80,https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80',
        craftingHours: '50 hours',
        leatherSource: 'French Tannery, Lyon',
        artisanQuote: 'Broguing is poetry in leather.',
        featured: true,
        collectionId: 'oxford-id',
        published: true,
        reviews: [],
      }
    ]
  },
  {
    id: 'loafer-id',
    name: 'Loafers & Moccasins',
    slug: 'loafers-moccasins',
    description: 'Effortless sophistication for the modern gentleman.',
    coverImage: 'https://images.unsplash.com/photo-1614252234498-1ab7b3827eb6?w=800&q=80',
    featured: true,
    products: [
      {
        id: 'p3',
        name: 'The Rivers Tassel Loafer',
        slug: 'rivers-tassel-loafer',
        description: 'Effortless elegance personified.',
        price: 78000,
        currency: 'NGN',
        baseLeather: 'Hand-Dyed Crust Leather',
        soleType: 'Blake Stitch - Leather Sole',
        category: 'loafer',
        productType: 'ready-to-wear',
        stockStatus: 'in-stock',
        images: 'https://images.unsplash.com/photo-1614252234498-1ab7b3827eb6?w=800&q=80,https://images.unsplash.com/photo-1614252234498-1ab7b3827eb6?w=600&q=80',
        craftingHours: '35 hours',
        leatherSource: 'Italian Tannery, Santa Croce',
        artisanQuote: 'A loafer should feel like it was made just for you.',
        featured: true,
        collectionId: 'loafer-id',
        published: true,
        reviews: [{ rating: 5 }],
      }
    ]
  },
  {
    id: 'boot-id',
    name: 'Boots Collection',
    slug: 'boots-collection',
    description: 'Bold statements for the discerning man.',
    coverImage: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
    featured: true,
    products: [
      {
        id: 'p4',
        name: 'The Bonny Chelsea Boot',
        slug: 'bonny-chelsea-boot',
        description: 'Commanding presence, effortless entry.',
        price: 98000,
        currency: 'NGN',
        baseLeather: 'Italian Full-Grain Leather',
        soleType: 'Goodyear Welt - Leather/Rubber Sole',
        category: 'boot',
        productType: 'made-to-order',
        stockStatus: 'made-to-order',
        images: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80,https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80',
        craftingHours: '55 hours',
        leatherSource: 'Italian Tannery, Tuscany',
        artisanQuote: 'A Chelsea boot should stand tall and never back down.',
        featured: true,
        collectionId: 'boot-id',
        published: true,
        reviews: [{ rating: 5 }],
      }
    ]
  },
  {
    id: 'wedding-id',
    name: 'Wedding Special',
    slug: 'wedding-special',
    description: 'Crafted for your most important day.',
    coverImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    featured: false,
    products: [
      {
        id: 'p5',
        name: 'The Unity Wedding Oxford',
        slug: 'unity-wedding-oxford',
        description: 'Crafted for the most important walk of your life.',
        price: 100000,
        currency: 'NGN',
        baseLeather: 'Premium Box Calf',
        soleType: 'Hand-Polished Leather Sole',
        category: 'wedding',
        productType: 'bespoke-only',
        stockStatus: 'bespoke-only',
        images: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80,https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
        craftingHours: '60 hours',
        leatherSource: 'French Tannery, Paris',
        artisanQuote: 'For your wedding day, there is no room for compromise. Only perfection.',
        featured: true,
        collectionId: 'wedding-id',
        published: true,
        reviews: [{ rating: 5 }],
      }
    ]
  }
];

export const mockProducts = mockCollections.flatMap(c => c.products);

export const mockJournalPosts = [
  {
    id: 'j1',
    title: 'The Art of Patina: How We Transform Leather Into Art',
    slug: 'art-of-patina',
    excerpt: 'Patina finishing is the soul of bespoke shoemaking. Discover how Prince Achase transforms raw crust leather into living, breathing works of art.',
    content: 'Patina finishing is perhaps the most magical aspect of bespoke shoemaking. At AkpakaNG, we start with raw crust leather — unfinished, pale, and full of potential. Using a combination of aniline dyes, cremes, and hand-burning techniques, we build color in layers, creating depth and character that no machine can replicate.\n\nThe process begins with selecting the right crust leather. We source ours from Italian tanneries in Tuscany, where centuries of tanning tradition produce hides of extraordinary quality. Each piece is assessed for grain pattern, thickness, and natural character.\n\nNext comes the base coat — a light application of dye that establishes the foundation color. This is followed by multiple layers of increasingly concentrated dyes, applied with brushes, sponges, and even bare hands. The artisan must feel the leather respond, adjusting pressure and angle in real-time.\n\nThe final step is hand-burning, where a heated metal tool gently scorches the surface, creating rich, dark tones that blend seamlessly with the underlying colors. This requires extraordinary control — too much heat and the leather is ruined, too little and the effect is lost.\n\nThe result is a living patina that evolves with wear, becoming more beautiful over time. No two pairs are ever identical, making each Akpaka shoe truly one-of-a-kind.',
    coverImage: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
    category: 'craft',
    publishedAt: '2025-12-15T00:00:00.000Z',
  },
  {
    id: 'j2',
    title: 'AkpakaNG Wins National Shoemaking Challenge',
    slug: 'akpaka-wins-challenge',
    excerpt: 'Legit.ng coverage of how Prince Sunday Achase defeated Lagos shoemaker Nelson in a viral TikTok shoemaking duel.',
    content: 'In a moment that captured national attention, Port Harcourt-based shoemaker Prince Sunday Achase, founder of AkpakaNG, has emerged victorious in a high-profile shoemaking duel against Lagos-based rival Nelson.\n\nThe challenge began when Nelson, who had built a reputation for complex sole designs, publicly dared other Nigerian shoemakers to replicate his work. Achase accepted without hesitation, posting his progress on TikTok as he worked through the night.\n\nWithin days, Achase delivered a shoe that not only matched Nelson\'s design but showcased superior finishing techniques. The video went viral, shared by popular blogger Tunde Ednut and covered by major Nigerian media outlets.\n\n"Nelson has since sent me the money," Achase confirmed to Legit.ng, referring to the ₦100,000 prize. The victory was more than just about the money — it established AkpakaNG as a force in Nigerian luxury shoemaking.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    category: 'press',
    publishedAt: '2025-03-25T00:00:00.000Z',
  }
];

export const mockCourses = [
  {
    id: 'm1',
    title: 'Introduction to Bespoke Shoemaking',
    slug: 'intro-bespoke-shoemaking',
    description: 'Learn the fundamentals of handcrafted shoemaking from Prince Achase himself.',
    coverImage: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
    price: 150000,
    currency: 'NGN',
    duration: '8 weeks',
    level: 'beginner',
    lessons: 24,
    enrolled: 47,
  }
];
