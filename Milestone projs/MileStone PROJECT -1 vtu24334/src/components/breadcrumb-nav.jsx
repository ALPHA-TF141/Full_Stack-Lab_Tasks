"use client";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
export function BreadcrumbNav() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0)
        return <span className="text-sm font-medium">Dashboard</span>;
    return (<div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Admin</span>
      {segments.map((segment, index) => (<div key={segment} className="flex items-center gap-2 capitalize">
          <ChevronRight className="size-3 text-muted-foreground"/>
          <span className={index === segments.length - 1 ? "font-semibold text-primary" : "text-muted-foreground"}>
            {segment.replace(/-/g, ' ')}
          </span>
        </div>))}
    </div>);
}
