import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import "./globals.css";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/controls/input-group";
import { ThemeProvider } from "next-themes"
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/themeToggle";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "ShapeS Library",
  description: "ShapeS component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-sidebar overflow-hidden antialiased [--header-h:52px] xl:[--header-h:64px]`}
      >
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
                  <InputGroup className="w-70 ml-auto">
                    <InputGroupInput className="py-1.5 placeholder:text-slate-700" placeholder="Search documentation..." />
                    <InputGroupAddon align="inline-end">
                      <Search size={18} className="text-slate-600" />
                    </InputGroupAddon>
                  </InputGroup>
                  <ThemeToggle />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
