import { connection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const POST = async (req: NextRequest) => {
    const db = await connection;
    const body = await req.text();
    if (!body || body.length === 0 || body.length > 65535) {
        return NextResponse.json(
            { error: "Invalid code or code length" },
            { status: 400 }
        );
    }
    const id = randomUUID();
    await db.query("INSERT INTO codes (id, code) VALUES (?, ?)", [id, body]);
    return NextResponse.json({ id });
};
