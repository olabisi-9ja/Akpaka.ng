import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 });
    }

    const totalAmount = items.reduce((sum: number, item: { priceEach: number; quantity: number }) => sum + item.priceEach * item.quantity, 0);

    const order = await db.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        totalAmount,
        status: 'pending',
        items: {
          create: items.map((item: { productId: string; priceEach: number; quantity: number }) => ({
            productId: item.productId,
            priceEach: item.priceEach,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: { items: { include: { product: true } }, payment: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
