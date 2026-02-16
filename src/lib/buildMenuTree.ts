import { MenuItemProps } from "@/types";

export function buildMenuTree(items: MenuItemProps[]) {
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