import { NextRequest, NextResponse } from 'next/server';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET;

export const GET = async () => {
    try {
        const response = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/random`, {
            "method": "POST",
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Token': SECRET_TOKEN
            },
            body: JSON.stringify({
                randomSeed: Math.random()
            })
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