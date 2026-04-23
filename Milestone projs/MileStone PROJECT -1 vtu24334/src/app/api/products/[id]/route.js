import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// ===============================
// GET PRODUCT BY ID
// ===============================
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
        }
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        // Return the first row as a Product
        const product = rows[0];
        return NextResponse.json(product);
    }
    catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}
// ===============================
// UPDATE PRODUCT
// ===============================
export async function PUT(req, { params }) {
    try {
          const { id } = await params;
        const body = await req.json();

        // ✅ CASE 1: STATUS UPDATE ONLY
        if (body.status) {
            await db.query(
                "UPDATE products SET status=? WHERE id=?",
                [body.status, id]
            );

            return NextResponse.json({ message: "Status updated successfully" });
        }

        // ✅ CASE 2: FULL PRODUCT UPDATE
        const { product_name, category, price, quantity } = body;

        if (!product_name || !category || price === undefined || quantity === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await db.query(
            "UPDATE products SET product_name=?, category=?, price=?, quantity=? WHERE id=?",
            [product_name, category, Number(price), Number(quantity), id]
        );

        return NextResponse.json({ message: "Product updated successfully" });

    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
// ===============================
// DELETE PRODUCT
// ===============================
export async function DELETE(req, { params }) {
    try {
        // Remove 'await' here
          const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
        }
        await db.query("DELETE FROM products WHERE id = ?", [id]);
        return NextResponse.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
