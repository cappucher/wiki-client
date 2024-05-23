import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET;

export const POST = async (request: NextRequest) => {
    revalidatePath(request.url);
    try {
        const json = await request.json();
        const response = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wiki/${json.page}`, {
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Token': SECRET_TOKEN
            }
        })).json();


        return new NextResponse(
            JSON.stringify(response),
            { status: 200 }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to create page' }),
            { status: 500 }
        )
    }
};