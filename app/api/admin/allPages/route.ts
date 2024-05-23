import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET;

export const GET = async (request: NextRequest) => {
    revalidatePath(request.url)
    try {
        const json = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allPages`, {
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Token': SECRET_TOKEN
            }
        })).json();

        return new NextResponse(
            JSON.stringify(json),
            { status: 200, headers: { 'Cache-Control': 'no-store' } }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to create page' }),
            { status: 500 }
        )
    }
};
