import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [rows] = await db.query(`
    SELECT sm.*, p.product_name
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    ORDER BY sm.created_at DESC
  `);

  return NextResponse.json(rows);
}

export async function POST(req) {
  const body = await req.json();
  const { product_id, type, quantity, reference_note } = body;

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query(
      "INSERT INTO stock_movements (product_id, type, quantity, reference_note) VALUES (?, ?, ?, ?)",
      [product_id, type, quantity, reference_note]
    );

    if (type === "Purchase") {
      await conn.query(
        "UPDATE products SET quantity = quantity + ? WHERE id = ?",
        [quantity, product_id]
      );
    } else {
      await conn.query(
        "UPDATE products SET quantity = quantity - ? WHERE id = ?",
        [quantity, product_id]
      );
    }

    await conn.commit();
    conn.release();

    return NextResponse.json({ message: "Transaction successful" });
  } catch (error) {
    await conn.rollback();
    conn.release();
    return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
  }
}