import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any).role === "admin";
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await req.json();
    
    const commission = await db.commission.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(commission);
  } catch (error) {
    console.error("Failed to update commission:", error);
    return NextResponse.json({ error: "Failed to update commission" }, { status: 500 });
  }
}
