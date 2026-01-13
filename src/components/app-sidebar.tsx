"use client"

import * as React from "react"
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
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Input & Controls",
      isActive: true,
      items: [
        {
          title: "Button",
          url: "/button",
        },
        {
          title: "Button Group",
          url: "/button-group",
        },
        {
          title: "Checkbox",
          url: "/checkbox",
        },
        {
          title: "Combobox",
          url: "/combobox",
        },
        {
          title: "Dropdown Menu",
          url: "/dropdown-menu",
        },
        {
          title: "File Upload",
          url: "/file-upload",
        },
        {
          title: "Input",
          url: "/input",
        },
        {
          title: "Input Group",
          url: "/input-group",
        },
        {
          title: "Radio Group",
          url: "/radio-group",
        },
        {
          title: "Select",
          url: "/select",
        },
        {
          title: "Switch",
          url: "/switch",
        },
      ],
    },
    {
      title: "Container",
      items: [
        {
          title: "Accordion",
          url: "/accordion",
        },
        {
          title: "Card",
          url: "/card",
        },
        {
          title: "Collapsible",
          url: "/collapsible",
        },
        {
          title: "Dialog",
          url: "/dialog",
        },
        {
          title: "Tabs",
          url: "/tabs",
        },
        {
          title: "Text Editor",
          url: "/text-editor",
        },
        {
          title: "Chart",
          url: "/chart",
        },
      ],
    },
    {
      title: "Navigation",
      items: [
        {
          title: "Breadcrumb",
          url: "/breadcrumb",
        },
      ],
    },
    {
      title: "Status",
      items: [
        {
          title: "Alert",
          url: "/alert",
        },
        {
          title: "Avatar",
          url: "/avatar",
        },
        {
          title: "Badge",
          url: "/badge",
        },
        {
          title: "Calendar",
          url: "/calendar",
        },
        {
          title: "Progress",
          url: "/progress",
        },
      ],
    },
    {
      title: "Data Visualization",
      items: [
        {
          title: "Chart",
          url: "/chart",
        },
      ],
    },
    {
      title: "Interactive Component",
      items: [
        {
          title: "Text Editor",
          url: "/text-editor",
        },
        {
          title: "Sortable List",
          url: "/sortable-list",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
