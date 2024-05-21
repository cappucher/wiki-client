import { NextRequest, NextResponse } from 'next/server';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET;

export const POST = async (request: NextRequest) => {
    try {
        const json = await request.json();
        const res = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, {
            method: "POST",
            //@ts-ignore
            headers: {
                "Content-type": "application/json",
                'X-Admin-Token': SECRET_TOKEN
            },
            body: JSON.stringify({
                title: json.title
            })
        })).json();

        return new NextResponse(
            JSON.stringify(res),
            { status: 200 }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to create page' }),
            { status: 500 }
        )
    }
};


