import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import { NextRequest, NextResponse } from 'next/server';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET;

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        const response = await (await fetch('http://localhost:3030/new', {
            method: "POST",
            // @ts-ignore
            headers: { 
                'Content-Type': 'application/json',
                'X-Admin-Token': SECRET_TOKEN 
            },
            body: JSON.stringify(data)
        })).json();

        return new NextResponse(
            JSON.stringify(response),
            { status: 200 }
        )
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to create page' }),
            { status: 500 }
        )
    }
};
