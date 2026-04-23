import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
export default function AdminLayout({ children, }) {
    return (<SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/50 backdrop-blur-sm sticky top-0 z-30 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-2 h-4"/>
            <BreadcrumbNav />
          </div>
        </header>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>);
}
