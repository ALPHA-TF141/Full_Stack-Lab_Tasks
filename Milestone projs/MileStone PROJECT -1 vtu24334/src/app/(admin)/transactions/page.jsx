"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Search, History, PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
export default function TransactionsPage() {
    const { products, transactions, addTransaction } = useStore();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [txType, setTxType] = useState('sale');
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const filteredTransactions = transactions.filter(tx => tx.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleProcess = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const productId = formData.get("productId");
        const quantity = parseInt(formData.get("quantity"));
        const notes = formData.get("notes");
        const product = products.find(p => p.id === productId);
        if (!product)
            return;
        if (txType === 'sale' && product.quantity < quantity) {
            toast({
                variant: "destructive",
                title: "Transaction Failed",
                description: "Insufficient stock available.",
            });
            return;
        }
        addTransaction({
            productId,
            productName: product.name,
            type: txType,
            quantity,
            date: new Date().toISOString(),
            notes
        });
        setIsDialogOpen(false);
        toast({
            title: "Transaction Success",
            description: `Successfully recorded ${txType} for ${product.name}.`,
        });
    };
    return (<div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Movement</h1>
          <p className="text-muted-foreground">Local stock arrivals and customer sales.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setTxType('purchase')} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <PlusCircle className="mr-2 h-4 w-4"/> Purchase (In)
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button onClick={() => setTxType('sale')} className="bg-primary hover:bg-primary/90">
                <MinusCircle className="mr-2 h-4 w-4"/> Sale (Out)
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleProcess}>
                <DialogHeader>
                  <DialogTitle>Process {txType === 'purchase' ? 'Purchase' : 'Sale'}</DialogTitle>
                  <DialogDescription>
                    Record a {txType === 'purchase' ? 'new stock arrival' : 'customer order'}.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="productId">Select Product</Label>
                    <Select name="productId" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product"/>
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(p => (<SelectItem key={p.id} value={p.id}>
                            {p.name} (Stock: {p.quantity})
                          </SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" name="quantity" type="number" min="1" required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input id="notes" name="notes" placeholder="Invoice #, Customer ID, etc."/>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">{txType === 'purchase' ? 'Add to Stock' : 'Record Sale'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
          <Input placeholder="Search by product name..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/5">
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Reference/Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (filteredTransactions.map((tx) => (<TableRow key={tx.id}>
                  <TableCell>
                    {tx.type === 'purchase' ? (<Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                        <ArrowUpRight className="mr-1 h-3 w-3"/> Purchase
                      </Badge>) : (<Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">
                        <ArrowDownRight className="mr-1 h-3 w-3"/> Sale
                      </Badge>)}
                  </TableCell>
                  <TableCell className="font-medium">{tx.productName}</TableCell>
                  <TableCell className="text-right font-mono">
                    {tx.type === 'purchase' ? '+' : '-'}{tx.quantity}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {isMounted ? new Date(tx.date).toLocaleString() : ""}
                  </TableCell>
                  <TableCell className="text-sm italic text-muted-foreground">
                    {tx.notes || "—"}
                  </TableCell>
                </TableRow>))) : (<TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <History className="h-8 w-8 opacity-20"/>
                    <p>No transactions recorded yet.</p>
                  </div>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>);
}
