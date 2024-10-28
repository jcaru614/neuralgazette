import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 },
      );
    }

    const subscriber = await prisma.contacts.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      {
        message: 'Successfully subscribed!',
        subscriber,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'You are already subscribed!' },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
