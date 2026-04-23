"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
                setIsLoading(false);
                return;
            }
            router.push("/dashboard");
        }
        catch (err) {
            setError("Server error. Try again.");
            setIsLoading(false);
        }
    };
    return (<div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8 flex items-center gap-2 text-primary">
        <ShieldCheck className="size-6"/>
        <span className="text-xl font-bold">InventioTrack</span>
      </div>
      
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-xl animate-in fade-in zoom-in duration-500">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Secure Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the management portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (<Alert variant="destructive" className="animate-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>)}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                <Input id="username" placeholder="admin" className="pl-10" value={username} onChange={(e) => setUsername(e.target.value)} required/>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Login to Portal"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 InventioTrack. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>);
}
