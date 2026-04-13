import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "@/components/themeToggle";
import { ComponentLibrarySearch } from "@/components/componentLibrarySearch";
import { COMPONENTS } from "@/lib/registry";

export default function ComponentLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="max-h-[calc(100vh-16px)] overflow-y-auto no-scrollbar dark:bg-zinc-800">
                    <header className="sticky flex h-(--header-h) w-full shrink-0 items-center gap-2 top-0 z-50 -mx-px rounded-t-xl shadow-xs bg-fade/20 dark:bg-[#373636]/20 backdrop-blur">
                        <div className="flex items-center gap-2 px-4 w-full">
                            <SidebarTrigger className="-ml-1 dark:text-slate-300" />
                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                            <ComponentLibrarySearch components={COMPONENTS} />
                            <ThemeToggle />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    )
}
