import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ===============================
// GET ALL PRODUCTS
// ===============================
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        product_name,
        category,
        price,
        quantity,
        created_at,
        CASE 
          WHEN quantity <= 10 THEN 'Low Stock'
          ELSE 'In Stock'
        END AS status
      FROM products
      ORDER BY id DESC
    `);

    return NextResponse.json(rows);

  } catch (error) {
    console.error("GET Products Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


// ===============================
// ADD NEW PRODUCT
// ===============================
export async function POST(req) {
  try {
    const body = await req.json();
    const { product_name, category, price, quantity } = body;

    // 🔹 Basic Validation
    if (!product_name || !price || !quantity) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // 🔹 Convert to correct types
    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);

    if (isNaN(numericPrice) || isNaN(numericQuantity)) {
      return NextResponse.json(
        { error: "Price and Quantity must be numbers" },
        { status: 400 }
      );
    }

    await db.query(
      "INSERT INTO products (product_name, category, price, quantity) VALUES (?, ?, ?, ?)",
      [product_name, category || null, numericPrice, numericQuantity]
    );

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST Product Error:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}