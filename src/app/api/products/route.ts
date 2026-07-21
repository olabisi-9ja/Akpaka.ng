import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const id = searchParams.get('id');

    if (id) {
      const product = await db.product.findUnique({
        where: { id },
        include: { reviews: { where: { verified: true } } },
      });
      if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      return NextResponse.json(product);
    }

    const products = await db.product.findMany({
      include: { collection: true, reviews: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products, falling back to mock data:', error);
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (id) {
      const p = mockProducts.find(x => x.id === id);
      return NextResponse.json(p || { error: 'Not found' });
    }
    return NextResponse.json(mockProducts);
  }
}
