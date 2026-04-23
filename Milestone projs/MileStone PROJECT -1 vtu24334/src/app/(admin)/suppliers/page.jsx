"use client";
import { useState } from "react";
import { Plus, Search, Mail, Phone, User, Trash2, Pencil, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
export default function SuppliersPage() {
    const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const filteredSuppliers = suppliers.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contactName.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const supplierData = {
            name: formData.get("name"),
            contactName: formData.get("contactName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
        };
        if (editingSupplier) {
            updateSupplier(editingSupplier.id, supplierData);
        }
        else {
            addSupplier(supplierData);
        }
        setIsDialogOpen(false);
        setEditingSupplier(null);
    };
    const handleDelete = (id) => {
        deleteSupplier(id);
    };
    return (<div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supplier Directory</h1>
          <p className="text-muted-foreground">Manage your local vendor relationships.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open)
                setEditingSupplier(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4"/> Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSave}>
              <DialogHeader>
                <DialogTitle>{editingSupplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
                <DialogDescription>Enter the supplier details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" name="name" defaultValue={editingSupplier === null || editingSupplier === void 0 ? void 0 : editingSupplier.name} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input id="contactName" name="contactName" defaultValue={editingSupplier === null || editingSupplier === void 0 ? void 0 : editingSupplier.contactName} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" defaultValue={editingSupplier === null || editingSupplier === void 0 ? void 0 : editingSupplier.email} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" defaultValue={editingSupplier === null || editingSupplier === void 0 ? void 0 : editingSupplier.phone} required/>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Supplier</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
        <Input placeholder="Search suppliers..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSuppliers.length > 0 ? (filteredSuppliers.map((supplier) => (<Card key={supplier.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 className="h-5 w-5"/>
                  </div>
                  <CardTitle className="text-lg leading-none">{supplier.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => {
                setEditingSupplier(supplier);
                setIsDialogOpen(true);
            }}>
                    <Pencil className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(supplier.id)}>
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4"/>
                  <span>{supplier.contactName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4"/>
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4"/>
                  <span>{supplier.phone}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="px-0 text-xs h-auto text-primary">View Associated Products</Button>
              </CardFooter>
            </Card>))) : (<div className="col-span-full py-10 text-center text-muted-foreground border border-dashed rounded-lg">
            No suppliers found.
          </div>)}
      </div>
    </div>);
}
