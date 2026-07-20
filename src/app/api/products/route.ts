import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const slug = searchParams.get('slug');

    const id = searchParams.get('id');

    if (id) {
      const product = await db.product.findUnique({
        where: { id },
        include: { collection: true, reviews: true },
      });
      if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      return NextResponse.json(product);
    }

    if (slug) {
      const product = await db.product.findUnique({
        where: { slug },
        include: { collection: true, reviews: true },
      });
      if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      return NextResponse.json(product);
    }

    const where: Record<string, unknown> = { published: true };
    if (collection) where.collectionId = collection;
    if (category) where.category = category;
    if (featured === 'true') where.featured = true;

    const products = await db.product.findMany({
      where,
      include: { collection: true, reviews: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
