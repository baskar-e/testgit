"use client"

import { useMemo } from "react"

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
import { MenuItemProps } from "@/types"

// const data = {
//   navMain: [
//     {
//       title: "Input & Controls",
//       isActive: true,
//       items: [
//         {
//           title: "Button",
//           url: "/button",
//         },
//         {
//           title: "Button Group",
//           url: "/button-group",
//         },
//         {
//           title: "Checkbox",
//           url: "/checkbox",
//         },
//         {
//           title: "Combobox",
//           url: "/combobox",
//         },
//         {
//           title: "Dropdown Menu",
//           url: "/dropdown-menu",
//         },
//         {
//           title: "File Upload",
//           url: "/file-upload",
//         },
//         {
//           title: "Input",
//           url: "/input",
//         },
//         {
//           title: "Input Group",
//           url: "/input-group",
//         },
//         {
//           title: "Radio Group",
//           url: "/radio-group",
//         },
//         {
//           title: "Select",
//           url: "/select",
//         },
//         {
//           title: "Switch",
//           url: "/switch",
//         },
//       ],
//     },
//     {
//       title: "Container",
//       items: [
//         {
//           title: "Accordion",
//           url: "/accordion",
//         },
//         {
//           title: "Card",
//           url: "/card",
//         },
//         {
//           title: "Collapsible",
//           url: "/collapsible",
//         },
//         {
//           title: "Dialog",
//           url: "/dialog",
//         },
//         {
//           title: "Tabs",
//           url: "/tabs",
//         },
//       ],
//     },
//     {
//       title: "Navigation",
//       items: [
//         {
//           title: "Breadcrumb",
//           url: "/breadcrumb",
//         },
//       ],
//     },
//     {
//       title: "Status",
//       items: [
//         {
//           title: "Alert",
//           url: "/alert",
//         },
//         {
//           title: "Avatar",
//           url: "/avatar",
//         },
//         {
//           title: "Badge",
//           url: "/badge",
//         },
//         {
//           title: "Calendar",
//           url: "/calendar",
//         },
//         {
//           title: "Progress",
//           url: "/progress",
//         },
//       ],
//     },
//     {
//       title: "Data Visualization",
//       items: [
//         {
//           title: "Chart",
//           url: "/chart",
//         },
//       ],
//     },
//     {
//       title: "Interactive Component",
//       items: [
//         {
//           title: "Text Editor",
//           url: "/text-editor",
//         },
//         {
//           title: "Sortable List",
//           url: "/sortable-list",
//         },
//       ],
//     },
//   ],
// }

function buildMenuTree(items: MenuItemProps[]) {
  const roots: any[] = [];
  const map = new Map();
  items?.forEach(it => {
    map.set(it.id, { ...it, items: [] });
  });

  map.forEach(node => {
    if (node.parentId === null) roots.push(node);
    else {
      const parent = map.get(node.parentId);
      parent?.items.push(node);
    }
  });
  return roots;
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarLayout } = useSidebar();
  console.log(sidebarLayout)
  const data = buildMenuTree(sidebarLayout);
  console.log(data)
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
