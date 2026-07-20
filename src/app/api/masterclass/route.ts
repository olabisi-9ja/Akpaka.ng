import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const courses = await db.masterclass.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching masterclasses:', error);
    return NextResponse.json({ error: 'Failed to fetch masterclasses' }, { status: 500 });
  }
}
