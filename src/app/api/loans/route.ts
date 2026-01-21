import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, principal, balance, apr, monthlyPayment } = body;

    if (!name || principal === undefined || balance === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    const loan = await prisma.loan.create({
      data: {
        userId: dbUser.id,
        name,
        principal: Number(principal),
        balance: Number(balance),
        apr: Number(apr || 0),
        monthlyPayment: Number(monthlyPayment || 0),
      },
    });

    return NextResponse.json(loan);
  } catch (error) {
    console.error("Error creating loan:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
