const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function seed() {
  // Clean existing data
  await db.commissionMedia.deleteMany();
  await db.commissionStep.deleteMany();
  await db.commission.deleteMany();
  await db.payment.deleteMany();
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.review.deleteMany();
  await db.product.deleteMany();
  await db.collection.deleteMany();
  await db.journalPost.deleteMany();
  await db.masterclass.deleteMany();
  await db.user.deleteMany();

  // Collections
  const oxford = await db.collection.create({
    data: {
      name: 'Oxford Collection',
      slug: 'oxford-collection',
      description: 'Timeless elegance meets Nigerian craftsmanship. Our Oxford shoes are handcrafted from premium Italian calfskin, featuring hand-burnished patina finishes and Goodyear welt construction. Each pair takes over 40 hours to complete.',
      coverImage: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
      featured: true,
    },
  });

  const loafer = await db.collection.create({
    data: {
      name: 'Loafers & Moccasins',
      slug: 'loafers-moccasins',
      description: 'Effortless sophistication for the modern gentleman. Our loafers combine butter-soft leather with traditional hand-stitching techniques, delivering comfort and style that only bespoke craftsmanship can achieve.',
      coverImage: 'https://images.unsplash.com/photo-1614252234498-1ab7b3827eb6?w=800&q=80',
      featured: true,
    },
  });

  const boots = await db.collection.create({
    data: {
      name: 'Boots Collection',
      slug: 'boots-collection',
      description: 'Bold statements for the discerning man. From Chelsea boots to chukkas, each pair is built on bespoke lasts with hand-selected leather, ensuring both durability and distinction.',
      coverImage: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
      featured: true,
    },
  });

  const wedding = await db.collection.create({
    data: {
      name: 'Wedding Special',
      slug: 'wedding-special',
      description: 'Crafted for your most important day. Our wedding shoes feature luxurious patina finishes, premium leather soles, and bespoke detailing that makes every step down the aisle unforgettable.',
      coverImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
      featured: false,
    },
  });

  // Products
  const products = [
    {
      name: 'The Port Harcourt Oxford',
      slug: 'port-harcourt-oxford',
      description: 'A masterclass in traditional shoemaking. The Port Harcourt Oxford features a hand-burnished cognac patina over Italian calfskin, with a Goodyear welt and natural leather sole. The closed lacing system provides a clean, formal silhouette perfect for boardrooms and evening events. Each pair undergoes 45 hours of meticulous handcrafting, from leather selection to final polishing.',
      price: 85000,
      currency: 'NGN',
      baseLeather: 'Italian Calfskin',
      soleType: 'Goodyear Welt - Leather Sole',
      category: 'oxford',
      images: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80,https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
      craftingHours: '45 hours',
      leatherSource: 'Italian Tannery, Tuscany',
      artisanQuote: 'Every Oxford I make carries the spirit of Port Harcourt — bold, refined, and unapologetically excellent.',
      featured: true,
      collectionId: oxford.id,
    },
    {
      name: 'The Niger Delta Brogue',
      slug: 'niger-delta-brogue',
      description: 'Where heritage meets artistry. The Niger Delta Brogue showcases intricate hand-punched broguing across the toe cap and quarters, finished with a rich dark brown patina. Built on our signature Akpaka last, this shoe offers both character and comfort. The leather lining ensures breathability, while the rubber-tipped sole provides traction without sacrificing elegance.',
      price: 92000,
      currency: 'NGN',
      baseLeather: 'Full-Grain Calfskin',
      soleType: 'Goodyear Welt - Dainite Sole',
      category: 'oxford',
      images: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80,https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80',
      craftingHours: '50 hours',
      leatherSource: 'French Tannery, Lyon',
      artisanQuote: 'Broguing is poetry in leather — every hole tells a story of patience and precision.',
      featured: true,
      collectionId: oxford.id,
    },
    {
      name: 'The Rivers Tassel Loafer',
      slug: 'rivers-tassel-loafer',
      description: 'Effortless elegance personified. The Rivers Tassel Loafer is crafted from butter-soft hand-dyed crust leather, featuring hand-attached tassels and a blake-stitched sole for a sleek profile. The unlined construction offers immediate comfort, while the patina develops a unique character with each wear. Perfect for both business casual and evening occasions.',
      price: 78000,
      currency: 'NGN',
      baseLeather: 'Hand-Dyed Crust Leather',
      soleType: 'Blake Stitch - Leather Sole',
      category: 'loafer',
      images: 'https://images.unsplash.com/photo-1614252234498-1ab7b3827eb6?w=800&q=80,https://images.unsplash.com/photo-1614252234498-1ab7b3827eb6?w=600&q=80',
      craftingHours: '35 hours',
      leatherSource: 'Italian Tannery, Santa Croce',
      artisanQuote: 'A loafer should feel like it was made just for you — because it was.',
      featured: true,
      collectionId: loafer.id,
    },
    {
      name: 'The Monarch Penny Loafer',
      slug: 'monarch-penny-loafer',
      description: 'Classic American style, Nigerian soul. The Monarch Penny Loafer reimagines the iconic silhouette with Akpaka\'s signature craftsmanship. Hand-cut from a single piece of premium calfskin, the apron is hand-stitched with waxed linen thread. The cushioned insole and flexible sole make this our most comfortable loafer — a daily luxury that ages beautifully.',
      price: 72000,
      currency: 'NGN',
      baseLeather: 'Premium Calfskin',
      soleType: 'Blake Stitch - Rubber Sole',
      category: 'loafer',
      images: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80,https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
      craftingHours: '32 hours',
      leatherSource: 'Spanish Tannery, Barcelona',
      artisanQuote: 'The penny loafer is the most honest shoe — no laces, no hiding. Just pure craftsmanship.',
      featured: false,
      collectionId: loafer.id,
    },
    {
      name: 'The Bonny Chelsea Boot',
      slug: 'bonny-chelsea-boot',
      description: 'Commanding presence, effortless entry. The Bonny Chelsea Boot features elastic side panels for easy on-off, paired with a sleek silhouette that works from boardroom to bar. The hand-burnished mahogany patina deepens over time, while the Goodyear welt ensures decades of wear. Built on our refined Akpaka boot last for a perfect balance of elegance and ruggedness.',
      price: 98000,
      currency: 'NGN',
      baseLeather: 'Italian Full-Grain Leather',
      soleType: 'Goodyear Welt - Leather/Rubber Sole',
      category: 'boot',
      images: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80,https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80',
      craftingHours: '55 hours',
      leatherSource: 'Italian Tannery, Tuscany',
      artisanQuote: 'A Chelsea boot should stand tall and never back down — just like the city it is named after.',
      featured: true,
      collectionId: boots.id,
    },
    {
      name: 'The Opobo Chukka Boot',
      slug: 'opobo-chukka-boot',
      description: 'Refined versatility in every step. The Opobo Chukka Boot offers a clean two-eyelet design with a rounded toe, handcrafted from supple suede with a crepe rubber sole. Light enough for all-day wear yet substantial enough to make a statement. The unlined suede construction molds to your foot, creating a personalized fit that improves with every wear.',
      price: 82000,
      currency: 'NGN',
      baseLeather: 'Premium Suede',
      soleType: 'Crepe Rubber Sole',
      category: 'boot',
      images: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&q=80,https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=600&q=80',
      craftingHours: '38 hours',
      leatherSource: 'English Tannery, Northampton',
      artisanQuote: 'The chukka is where casual meets craftsmanship — no shortcuts, just pure skill.',
      featured: false,
      collectionId: boots.id,
    },
    {
      name: 'The Unity Wedding Oxford',
      slug: 'unity-wedding-oxford',
      description: 'Crafted for the most important walk of your life. The Unity Wedding Oxford features a mirror-finish black patina, hand-painted with seven layers of polish for an unmatched depth of shine. The sleek wholecut design symbolizes unity — one seamless piece of leather, one unbroken promise. A concealed cushioned insole ensures comfort from ceremony to last dance.',
      price: 100000,
      currency: 'NGN',
      baseLeather: 'Premium Box Calf',
      soleType: 'Hand-Polished Leather Sole',
      category: 'wedding',
      images: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80,https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
      craftingHours: '60 hours',
      leatherSource: 'French Tannery, Paris',
      artisanQuote: 'For your wedding day, there is no room for compromise. Only perfection.',
      featured: true,
      collectionId: wedding.id,
    },
    {
      name: 'The Heritage Wholecut',
      slug: 'heritage-wholecut',
      description: 'The pinnacle of shoemaking artistry. The Heritage Wholecut is cut from a single piece of leather — no seams, no compromises. This demanding technique requires flawless leather and masterful cutting skills. The result is a shoe of extraordinary beauty, with a rich hand-painted patina that evolves uniquely with each wearer. For those who appreciate the extraordinary.',
      price: 105000,
      currency: 'NGN',
      baseLeather: 'Italian Premium Calfskin',
      soleType: 'Goodyear Welt - Hand-Painted Sole',
      category: 'oxford',
      images: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80,https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80',
      craftingHours: '65 hours',
      leatherSource: 'Italian Tannery, Tuscany',
      artisanQuote: 'A wholecut is the ultimate test of a shoemaker. One piece. One chance. Pure mastery.',
      featured: true,
      collectionId: oxford.id,
    },
  ];

  for (const product of products) {
    await db.product.create({ data: product });
  }

  // Journal Posts
  const journalPosts = [
    {
      title: 'The Art of Patina: How We Transform Leather Into Art',
      slug: 'art-of-patina',
      excerpt: 'Patina finishing is the soul of bespoke shoemaking. Discover how Prince Achase transforms raw crust leather into living, breathing works of art using traditional hand-burning techniques.',
      content: 'Patina finishing is perhaps the most magical aspect of bespoke shoemaking. At AkpakaNG, we start with raw crust leather — unfinished, pale, and full of potential. Using a combination of aniline dyes, cremes, and hand-burning techniques, we build color in layers, creating depth and character that no machine can replicate.\n\nThe process begins with selecting the right crust leather. We source ours from Italian tanneries in Tuscany, where centuries of tanning tradition produce hides of extraordinary quality. Each piece is assessed for grain pattern, thickness, and natural character.\n\nNext comes the base coat — a light application of dye that establishes the foundation color. This is followed by multiple layers of increasingly concentrated dyes, applied with brushes, sponges, and even bare hands. The artisan must feel the leather respond, adjusting pressure and angle in real-time.\n\nThe final step is hand-burning, where a heated metal tool gently scorches the surface, creating rich, dark tones that blend seamlessly with the underlying colors. This requires extraordinary control — too much heat and the leather is ruined, too little and the effect is lost.\n\nThe result is a living patina that evolves with wear, becoming more beautiful over time. No two pairs are ever identical, making each Akpaka shoe truly one-of-a-kind.',
      coverImage: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
      category: 'craft',
      publishedAt: new Date('2025-12-15'),
    },
    {
      title: 'From Dropout to Master: Prince Achase\'s Journey',
      slug: 'prince-achase-journey',
      excerpt: 'How a university dropout from Okrika taught himself shoemaking and built one of Nigeria\'s most respected luxury footwear brands.',
      content: 'In 2014, Prince Sunday Achase made a decision that would change his life. Forced to drop out of his mechanical engineering program at university due to financial constraints, he could have given up. Instead, he found his calling.\n\nAfter experimenting with bagmaking, Achase discovered shoemaking in 2016. What started as a curiosity quickly became an obsession. He taught himself the craft through relentless practice, watching tutorials, and studying the work of master shoemakers from around the world.\n\nThose early days were humbling. "I started stitching shoes in front of my house," Achase recalls. "People would walk past and wonder what I was doing. But I knew what I was building."\n\nBuilding he did. Over the next eight years, Achase honed his skills, gradually moving from basic constructions to the intricate patina work and Goodyear welting that would become his signature. His big break came in March 2025, when he accepted a viral TikTok challenge from Lagos-based shoemaker Nelson.\n\nThe challenge was to replicate Nelson\'s complex sole design. Achase not only matched it — he surpassed expectations, winning the ₦100,000 prize and national recognition. The media coverage that followed introduced AkpakaNG to a nationwide audience.\n\nToday, Achase operates from his workshop in Port Harcourt, employing a team of artisans who share his commitment to excellence. His shoes, priced from ₦60,000 to ₦105,000, attract clients from across Nigeria and the diaspora.\n\n"I am the best shoemaker in the world," Achase declared in a viral Instagram post. It is the kind of bold claim that defines his brand — confident, unapologetic, and backed by undeniable skill.',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      category: 'press',
      publishedAt: new Date('2025-11-20'),
    },
    {
      title: 'Caring for Your Bespoke Leather Shoes',
      slug: 'caring-for-bespoke-shoes',
      excerpt: 'Essential tips for maintaining the beauty and longevity of your handcrafted Akpaka shoes. From daily care to seasonal maintenance.',
      content: 'Investing in a pair of bespoke Akpaka shoes is just the beginning of the journey. With proper care, your shoes will not only last for decades but will develop a richer, more beautiful patina over time.\n\n**Daily Care:** Always use a shoe horn when putting on your shoes — this prevents damage to the heel counter. After wearing, insert cedar shoe trees to absorb moisture and maintain shape. Never wear the same pair two days in a row; leather needs time to rest and recover.\n\n**Cleaning:** After each wear, brush off dust with a horsehair brush. For more thorough cleaning, use a damp cloth with a mild leather soap. Always clean in the direction of the grain and never submerge your shoes in water.\n\n**Conditioning:** Apply a high-quality leather conditioner every 2-4 weeks, depending on wear frequency. This nourishes the leather, preventing it from drying and cracking. Apply sparingly — too much conditioner can soften the leather excessively.\n\n**Polishing:** For patina shoes, use a cream polish that matches the base color. Avoid wax polishes on patina finishes, as they can build up and obscure the hand-painted colorwork. Buff gently with a soft cloth or brush.\n\n**Storage:** Store your shoes in their dust bags, away from direct sunlight and heat sources. Use cedar shoe trees at all times when not wearing. For long-term storage, wrap in acid-free tissue paper.\n\n**Sole Care:** Have your cobbler check the sole regularly. A thin rubber topy can be applied to the forefoot area to extend sole life without compromising the aesthetic. When resoling is needed, always use a cobbler experienced with Goodyear welt construction.\n\nWith these practices, your Akpaka shoes will become more beautiful with every wear — a living testament to the art of bespoke craftsmanship.',
      coverImage: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
      category: 'blog',
      publishedAt: new Date('2026-01-10'),
    },
    {
      title: 'AkpakaNG Wins National Shoemaking Challenge',
      slug: 'akpaka-wins-challenge',
      excerpt: 'Legit.ng coverage of how Prince Sunday Achase defeated Lagos shoemaker Nelson in a viral TikTok shoemaking duel, claiming the ₦100,000 prize.',
      content: 'In a moment that captured national attention, Port Harcourt-based shoemaker Prince Sunday Achase, founder of AkpakaNG, has emerged victorious in a high-profile shoemaking duel against Lagos-based rival Nelson.\n\nThe challenge began when Nelson, who had built a reputation for complex sole designs, publicly dared other Nigerian shoemakers to replicate his work. Achase accepted without hesitation, posting his progress on TikTok as he worked through the night.\n\nWithin days, Achase delivered a shoe that not only matched Nelson\'s design but showcased superior finishing techniques. The video went viral, shared by popular blogger Tunde Ednut and covered by major Nigerian media outlets.\n\n"Nelson has since sent me the money," Achase confirmed to Legit.ng, referring to the ₦100,000 prize. The victory was more than just about the money — it established AkpakaNG as a force in Nigerian luxury shoemaking.\n\nThe ConnectNigeria article contrasted the two shoemakers\' approaches: "Akpaka NG didn\'t just accept Nelson\'s challenge. He became Nelson\'s opposite. Where Nelson was mysterious, Akpaka was transparent. Where Nelson was flashy, Akpaka was serious... Akpaka sold his craft."\n\nAchase himself offered a more direct assessment: "Nelson\'s first video triggered me... I have been working non-stop for almost 10 years." That decade of dedication was evident in every stitch of his challenge entry.',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      category: 'press',
      publishedAt: new Date('2025-03-25'),
    },
  ];

  for (const post of journalPosts) {
    await db.journalPost.create({ data: post });
  }

  // Masterclass courses
  const courses = [
    {
      title: 'Introduction to Bespoke Shoemaking',
      slug: 'intro-bespoke-shoemaking',
      description: 'Learn the fundamentals of handcrafted shoemaking from Prince Achase himself. This comprehensive beginner course covers leather selection, pattern making, cutting, lasting, and finishing. You will complete the course with your very own pair of handcrafted shoes.',
      coverImage: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
      price: 150000,
      currency: 'NGN',
      duration: '8 weeks',
      level: 'beginner',
      lessons: 24,
      enrolled: 47,
    },
    {
      title: 'Advanced Patina Techniques',
      slug: 'advanced-patina',
      description: 'Master the art of patina finishing — the signature technique that sets Akpaka shoes apart. From hand-burning to multi-layer dyeing, this course reveals the secrets behind our most sought-after finishes.',
      coverImage: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
      price: 200000,
      currency: 'NGN',
      duration: '6 weeks',
      level: 'advanced',
      lessons: 18,
      enrolled: 23,
    },
    {
      title: 'Goodyear Welt Construction',
      slug: 'goodyear-welt',
      description: 'The gold standard of shoemaking construction. Learn how to execute a proper Goodyear welt, from preparing the insole to the final stitching. This intermediate course is essential for any serious shoemaker.',
      coverImage: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
      price: 180000,
      currency: 'NGN',
      duration: '6 weeks',
      level: 'intermediate',
      lessons: 20,
      enrolled: 31,
    },
  ];

  for (const course of courses) {
    await db.masterclass.create({ data: course });
  }

  // Sample reviews
  const allProducts = await db.product.findMany();
  const reviews = [
    { productId: allProducts[0].id, rating: 5, comment: 'Absolutely stunning craftsmanship. The patina is unlike anything I have seen. Worth every naira.', authorName: 'Chidi Okafor' },
    { productId: allProducts[0].id, rating: 5, comment: 'I have bought shoes from Italy and England. These rival the best of them. Prince is a true master.', authorName: 'Emeka Nwankwo' },
    { productId: allProducts[2].id, rating: 5, comment: 'The Rivers Tassel Loafer is perfection. Comfortable from day one and the leather just gets better with age.', authorName: 'Adaeze Eze' },
    { productId: allProducts[4].id, rating: 5, comment: 'The Bonny Chelsea Boot commands respect everywhere I go. The craftsmanship is world-class.', authorName: 'Obinna Udeh' },
    { productId: allProducts[6].id, rating: 5, comment: 'My wedding shoes were the highlight of my outfit. Guests could not stop talking about them. Thank you AkpakaNG!', authorName: 'Tunde Adebayo' },
    { productId: allProducts[7].id, rating: 5, comment: 'A wholecut of this quality at this price is extraordinary. The patina deepens beautifully with each wear.', authorName: 'Femi Adesina' },
  ];

  for (const review of reviews) {
    await db.review.create({ data: review });
  }

  // Sample commission with steps
  const sampleCommission = await db.commission.create({
    data: {
      customerName: 'Adebayo Johnson',
      customerEmail: 'adebayo@example.com',
      customerPhone: '+234 801 234 5678',
      productId: allProducts[0].id,
      customDetails: JSON.stringify({ leatherColor: 'Cognac', soleType: 'Leather', size: '44' }),
      status: 'stitching',
      depositPaid: true,
      depositAmount: 25500,
      totalAmount: 85000,
      progressPercent: 55,
      leatherPreference: 'Italian Calfskin - Cognac',
      solePreference: 'Natural Leather Sole',
      specialInstructions: 'Please add monogram "AJ" on the inner lining',
    },
  });

  const steps = [
    { stepName: 'Design Consultation', stepOrder: 1, completed: true, completedAt: new Date('2026-06-01') },
    { stepName: 'Leather Selection', stepOrder: 2, completed: true, completedAt: new Date('2026-06-03') },
    { stepName: 'Pattern Cutting', stepOrder: 3, completed: true, completedAt: new Date('2026-06-05') },
    { stepName: 'Upper Stitching', stepOrder: 4, completed: true, completedAt: new Date('2026-06-08') },
    { stepName: 'Hand Stitching In Progress', stepOrder: 5, completed: false },
    { stepName: 'Lasting & Welting', stepOrder: 6, completed: false },
    { stepName: 'Patina Finishing', stepOrder: 7, completed: false },
    { stepName: 'Quality Check & Polishing', stepOrder: 8, completed: false },
    { stepName: 'Packaging & Shipping', stepOrder: 9, completed: false },
  ];

  for (const step of steps) {
    await db.commissionStep.create({
      data: { ...step, commissionId: sampleCommission.id },
    });
  }

  console.log('Seed completed successfully!');
  console.log(`Created ${allProducts.length} products, ${journalPosts.length} journal posts, ${courses.length} courses, ${reviews.length} reviews`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
