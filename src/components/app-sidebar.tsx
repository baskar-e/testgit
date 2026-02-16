"use client"

import {
  Shapes,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { buildMenuTree } from "@/lib/buildMenuTree"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarLayout } = useSidebar();
  const data = buildMenuTree(sidebarLayout);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="bg-violet-900 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Shapes className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm xl:text-base leading-tight">
                  <span className="truncate font-medium">ShapeS</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
    </Sidebar>
  )
}
