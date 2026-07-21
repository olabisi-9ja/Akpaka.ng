import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { mockJournalPosts } from '@/lib/mockData';

export async function GET() {
  try {
    const posts = await db.journalPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching journal posts, falling back to mock data:', error);
    return NextResponse.json(mockJournalPosts);
  }
}
