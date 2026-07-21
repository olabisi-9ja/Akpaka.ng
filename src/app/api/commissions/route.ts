import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const commissions = await db.commission.findMany({
      include: { product: true, steps: { orderBy: { stepOrder: 'asc' } }, media: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(commissions);
  } catch (error) {
    console.error('Error fetching commissions:', error);
    return NextResponse.json({ error: 'Failed to fetch commissions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName, customerEmail, customerPhone, productId,
      customDetails, leatherPreference, solePreference, specialInstructions,
      totalAmount,
    } = body;

    const defaultSteps = [
      'Design Consultation',
      'Leather Selection',
      'Pattern Cutting',
      'Upper Stitching',
      'Lasting & Welting',
      'Patina Finishing',
      'Quality Check & Polishing',
      'Packaging & Shipping',
    ];

    const commission = await db.commission.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        productId: productId || null,
        customDetails: customDetails ? JSON.stringify(customDetails) : null,
        leatherPreference,
        solePreference,
        specialInstructions,
        totalAmount: totalAmount || null,
        status: 'inquiry',
        progressPercent: 0,
        steps: {
          create: defaultSteps.map((stepName, index) => ({
            stepName,
            stepOrder: index + 1,
            completed: false,
          })),
        },
      },
      include: { steps: true },
    });

    return NextResponse.json(commission, { status: 201 });
  } catch (error) {
    console.error('Error creating commission:', error);
    return NextResponse.json({ error: 'Failed to create commission' }, { status: 500 });
  }
}
