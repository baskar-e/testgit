"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Components</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild>
            <SidebarMenuItem>
              {!item.items?.length ? (
                item.url ?
                  <SidebarMenuButton key={item.title} asChild>
                    <a href={item?.url ?? "#"} >{item.title}</a>
                  </SidebarMenuButton>
                  : null
              ) :
                <>
                  <CollapsibleTrigger asChild className="group text-slate-800 text-sm pl-2 py-1.5 cursor-default select-none dark:text-slate-300">
                    <div>{item.title}
                      <SidebarMenuAction className="group-data-[state=open]:rotate-90">
                        <ChevronRight className="text-slate-600 dark:text-slate-300" />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="dark:border-l-slate-700">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className="text-slate-800 dark:text-slate-300">
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              }
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup >
  )
}
