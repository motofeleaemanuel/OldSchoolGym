import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    // Example: Fetch data or handle logic here
    console.log(req, 'Gallery GET request received');
    const data = { message: 'Gallery GET endpoint' };

    return NextResponse.json(data, { status: 200 });
}