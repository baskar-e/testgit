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
import { usePathname } from "next/navigation"

export function NavMain({ items }: {
  items: {
    title: string
    url: string
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathName = usePathname();
  console.log(pathName)

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
                  <CollapsibleTrigger asChild className={`group text-slate-800 text-sm pl-2 py-1.5 rounded-md cursor-default select-none hover:font-medium data-[state=open]:font-medium dark:text-slate-300 ${item.items.some((subItem) => subItem.url === pathName) ? "font-medium bg-linear-to-br from-blue-100 via-violet-200/75 to-pink-100 dark:from-violet-600 dark:via-fuchsia-900 dark:to-pink-400" : ""}`}>
                    <div>
                      {item.title}
                      <SidebarMenuAction className="group-data-[state=open]:rotate-90">
                        <ChevronRight className="text-slate-600 dark:text-slate-300" />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="dark:border-l-slate-800">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className={`
                            ${subItem.url === pathName ?
                              "font-medium bg-linear-to-r from-violet-900 to-pink-300 bg-clip-text text-transparent dark:from-violet-700 dark:to-rose-400" : "text-slate-800 hover:text-sidebar-accent-foreground dark:text-slate-300"
                            }
                          `}>
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
