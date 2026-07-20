import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await db.journalPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching journal posts:', error);
    return NextResponse.json({ error: 'Failed to fetch journal posts' }, { status: 500 });
  }
}
