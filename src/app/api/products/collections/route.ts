import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { mockCollections } from '@/lib/mockData';

export async function GET() {
  try {
    const collections = await db.collection.findMany({
      include: { products: { where: { published: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections, falling back to mock data:', error);
    return NextResponse.json(mockCollections);
  }
}
