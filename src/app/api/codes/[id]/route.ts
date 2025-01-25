import { connection } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export const GET = async (
    req: NextRequest,
    {
        params,
    }: {
        params: Params;
    }
) => {
    const db = await connection;
    const { id } = await params;
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM codes WHERE id = ?",
        [id]
    );
    if (rows.length === 0) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
};

export const PATCH = async (
    req: NextRequest,
    {
        params,
    }: {
        params: Params;
    }
) => {
    const db = await connection;
    const { id } = await params;
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM codes WHERE id = ?",
        [id]
    );
    if (rows.length === 0) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    if (rows[0].readOnly) {
        return NextResponse.json({ error: "Read Only" }, { status: 403 });
    }
    const body = await req.json();
    if (typeof body !== "object") {
        return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }
    const { code, mime } = body;
    if (code.length === 0) {
        return NextResponse.json(
            { error: "Code cannot be empty" },
            { status: 400 }
        );
    }
    if (code.length > 65535) {
        return NextResponse.json({ error: "Code too long" }, { status: 400 });
    }
    await db.query("UPDATE codes SET code = ?, mime = ? WHERE id = ?", [
        code,
        mime,
        id,
    ]);
    return NextResponse.json({});
};
