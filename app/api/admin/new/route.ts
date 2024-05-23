import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET;

export const POST = async (request: NextRequest) => {
    revalidatePath(request.url);
    try {
        const data = await request.json();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/new`, {
            method: "POST",
            // @ts-ignore
            headers: { 
                'Content-Type': 'application/json',
                'X-Admin-Token': SECRET_TOKEN 
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        return new NextResponse(
            JSON.stringify(responseData),
            { status: response.status }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to create page' }),
            { status: 500 }
        )
    }
};
