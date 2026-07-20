import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { productId, email, name, phone } = await request.json();
    if (!productId || !email || !name) {
      return NextResponse.json({ error: 'productId, email, and name are required' }, { status: 400 });
    }
    const entry = await db.waitlistEntry.create({
      data: { productId, email, name, phone: phone || null },
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Error creating waitlist entry:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}
