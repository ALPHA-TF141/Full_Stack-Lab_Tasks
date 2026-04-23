"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity, Sparkles, RefreshCw, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/lib/store";
export default function DashboardPage() {
    const router = useRouter();
    const { products, transactions } = useStore();
    const [isMounted, setIsMounted] = useState(false);
    const totalProducts = products.length;
    const lowStockProducts = products.filter(
      p => p.quantity <= (p.safetyStock || 10)
    );
    const recentTransactions = transactions.slice(0, 10);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (<div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Overview</h1>
        <p className="text-muted-foreground">Monitor your stock levels in real-time.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-all cursor-pointer hover:border-primary/50 group" onClick={() => router.push('/products')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-primary group-hover:scale-110 transition-transform"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Active catalog items</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all cursor-pointer hover:border-destructive/50 group" onClick={() => router.push('/products')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive group-hover:scale-110 transition-transform"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Low stock items: {lowStockProducts.length}
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              {lowStockProducts.slice(0, 3).map(p => p.name).join(", ")}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer hover:border-accent/50 group" onClick={() => router.push('/transactions')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-accent group-hover:scale-110 transition-transform"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">Recent movements</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer bg-primary text-primary-foreground group" onClick={() => router.push('/dashboard')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <Sparkles className="h-4 w-4 group-hover:scale-110 transition-transform"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-primary-foreground/70">Based on projections</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest inventory movements.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-6">
                {recentTransactions.length > 0 ? (recentTransactions.map((tx) => (<div key={tx.id} className="flex items-center gap-4 hover:bg-accent/5 p-2 rounded-md transition-colors cursor-pointer group" onClick={() => router.push('/transactions')}>
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${tx.type === 'purchase' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {tx.type === 'purchase' ? <ArrowUpRight className="h-5 w-5"/> : <ArrowDownRight className="h-5 w-5"/>}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{tx.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.type === 'purchase' ? 'Restocked' : 'Sold'} {tx.quantity} units
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isMounted && tx.date ? new Date(tx.date).toLocaleDateString() : ""}
                      </div>
                    </div>))) : (<p className="text-sm text-center text-muted-foreground py-10">No recent transactions recorded.</p>)}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>);
}
