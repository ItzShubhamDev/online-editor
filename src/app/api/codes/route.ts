import { connection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const POST = async (req: NextRequest) => {
    const db = await connection;
    const body = await req.json();
    if (typeof body !== "object" || typeof body.code !== "string") {
        return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }
    const { code, mime, readOnly } = body;
    if (code.length === 0) {
        return NextResponse.json(
            { error: "Code cannot be empty" },
            { status: 400 }
        );
    }
    if (code.length > 65535) {
        return NextResponse.json({ error: "Code too long" }, { status: 400 });
    }
    const id = randomUUID();
    await db.query(
        "INSERT INTO codes (id, code, mime, readOnly) VALUES (?, ?, ?, ?)",
        [id, code, mime, readOnly]
    );
    return NextResponse.json({ id });
};
