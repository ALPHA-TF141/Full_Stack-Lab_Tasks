"use client";

import { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ ADD / EDIT
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const productData = {
      product_name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity"))
    };

    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      });
    }

    setIsDialogOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // ✅ STATUS UPDATE
  const handleStatusChange = async (id, status) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    fetchProducts();
  };

  // ✅ SEARCH FILTER
  const filteredProducts = products.filter(p =>
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Catalog</h1>
          <p className="text-muted-foreground">Manage your inventory</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>

          <DialogContent>
            <form onSubmit={handleSave}>
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add Product"}
                </DialogTitle>
                <DialogDescription>
                  Enter product details below
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">

                <div>
                  <Label>Product Name</Label>
                  <Input
                    name="name"
                    defaultValue={editingProduct?.product_name}
                    required
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Input
                    name="category"
                    defaultValue={editingProduct?.category}
                    required
                  />
                </div>

                <div>
                  <Label>Price</Label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct?.price}
                    required
                  />
                </div>

                <div>
                  <Label>Quantity</Label>
                  <Input
                    name="quantity"
                    type="number"
                    defaultValue={editingProduct?.quantity}
                    required
                  />
                </div>

              </div>

              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredProducts.map(product => (
              <TableRow key={product.id}>

                <TableCell>{product.id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${Number(product.price).toFixed(2)}</TableCell>

                {/* ✅ STATUS COLUMN */}
                <TableCell>
                  <div className="flex items-center gap-2">

                    <Badge
                      variant={
                        (product.status === "Low Stock" ||
                         (!product.status && product.quantity <= 10))
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {product.status ||
                        (product.quantity <= 10 ? "Low Stock" : "In Stock")}
                    </Badge>

                    <select
                      value={
                        product.status ||
                        (product.quantity <= 10 ? "Low Stock" : "In Stock")
                      }
                      onChange={(e) =>
                        handleStatusChange(product.id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                    </select>

                  </div>
                </TableCell>

                {/* ACTIONS */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuItem onClick={() => {
                        setEditingProduct(product);
                        setIsDialogOpen(true);
                      }}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}