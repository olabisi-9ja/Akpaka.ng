import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { mockCollections } from '@/lib/mockData';

export async function GET() {
  try {
    const collections = await db.collection.findMany({
      include: { products: { where: { published: true } } },
      orderBy: { createdAt: 'desc' },
    });

    // Local installs begin with an empty Prisma database. Render the included
    // catalogue until an admin adds the first live collection.
    return NextResponse.json(collections.length > 0 ? collections : mockCollections);
  } catch (error) {
    console.error('Error fetching collections, using catalogue fallback:', error);
    return NextResponse.json(mockCollections);
  }
}
