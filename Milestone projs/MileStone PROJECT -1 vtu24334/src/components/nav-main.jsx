"use client";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function NavMain({ items, }) {
    const pathname = usePathname();
    return (<SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/60">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
            var _a, _b;
            const isActive = pathname === item.url || ((_a = item.items) === null || _a === void 0 ? void 0 : _a.some(sub => sub.url === pathname));
            return (<SidebarMenuItem key={item.title}>
              {item.items && item.items.length > 0 ? (<Collapsible asChild defaultOpen={isActive} className="group/collapsible">
                  <div>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {(_b = item.items) === null || _b === void 0 ? void 0 : _b.map((subItem) => (<SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </div>
                </Collapsible>) : (<SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>)}
            </SidebarMenuItem>);
        })}
      </SidebarMenu>
    </SidebarGroup>);
}
