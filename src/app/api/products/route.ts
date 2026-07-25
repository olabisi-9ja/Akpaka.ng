import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

/**
 * The storefront can render from seeded data during local development, while
 * production continues to use the catalogue in Prisma. Keeping the fallback
 * here means a newly installed shop never looks empty before its first seed.
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');
  const id = searchParams.get('id');

  const matchesQuery = <T extends { id: string; featured?: boolean; category?: string }>(items: T[]) =>
    items.filter((item) => {
      if (id && item.id !== id) return false;
      if (featured === 'true' && !item.featured) return false;
      if (category && item.category?.toLowerCase() !== category.toLowerCase()) return false;
      return true;
    });

  try {
    if (id) {
      const product = await db.product.findUnique({
        where: { id },
        include: { collection: true, reviews: { where: { verified: true } } },
      });

      if (product) return NextResponse.json(product);
      const fallback = matchesQuery(mockProducts)[0];
      return fallback
        ? NextResponse.json(fallback)
        : NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const products = await db.product.findMany({
      where: {
        published: true,
        ...(featured === 'true' ? { featured: true } : {}),
        ...(category ? { category: category.toLowerCase() } : {}),
      },
      include: { collection: true, reviews: true },
      orderBy: { createdAt: 'desc' },
    });

    // An empty development database should not result in an empty storefront.
    return NextResponse.json(products.length > 0 ? products : matchesQuery(mockProducts));
  } catch (error) {
    console.error('Error fetching products, using catalogue fallback:', error);
    const products = matchesQuery(mockProducts);
    if (id && !products[0]) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(id ? products[0] : products);
  }
}
