import { connection } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
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
