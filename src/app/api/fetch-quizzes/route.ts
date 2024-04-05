import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Disable
export const dynamic = 'force-dynamic';

// Fetch all quizzes
export async function GET(request: Request) {
    const response = await sql`SELECT * FROM quizzes`;
    const rows = response.rows
    return NextResponse.json({ rows }, { status: 200 });
}