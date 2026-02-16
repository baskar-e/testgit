import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import "./globals.css";

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
    <html lang="en" className="dar k">
      <body
        className={`${inter.variable} font-sans bg-sidebar antialiased [--header-h:52px] xl:[--header-h:64px]`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="max-h-[calc(100vh-16px)] overflow-y-auto no-scrollbar">
            <header className="sticky flex h-(--header-h) w-full shrink-0 items-center gap-2 top-0 z-50 -mx-px rounded-t-xl shadow-xs bg-fade/20 backdrop-blur">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
