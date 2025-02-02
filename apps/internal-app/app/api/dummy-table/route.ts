import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const data = Array.from({ length: parseInt(limit) }, (_, i) => ({
        id: offset + i + 1,
        name: `John Doe ${offset + i + 1}`,
        email: `john.doe${offset + i + 1}@example.com`,
        phone: `1234567890${offset + i + 1}`,
    }));
    return NextResponse.json({
        data,
    });
}