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
    const { name, email, phone, relationType, balance } = body;

    if (!name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const friend = await prisma.friend.create({
      data: {
        userId: dbUser.id,
        name,
        email,
        phone,
        relationType: relationType || "friend",
        balance: balance ? Number(balance) : 0,
      },
    });

    return NextResponse.json(friend);
  } catch (error) {
    console.error("Error creating friend:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
