import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { mockCourses } from '@/lib/mockData';

export async function GET() {
  try {
    const masterclasses = await db.masterclass.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(masterclasses);
  } catch (error) {
    console.error('Error fetching masterclasses, falling back to mock data:', error);
    return NextResponse.json(mockCourses);
  }
}
