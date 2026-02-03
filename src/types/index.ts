import { RefObject } from "react";
import { FloatingContext, OpenChangeReason, Placement, useFloating, useInteractions } from "@floating-ui/react";

export interface FloatingContextType {
    isOpen: boolean;
    refs: ReturnType<typeof useFloating>['refs'];
    listRef: RefObject<(HTMLElement | null)[]>;
    activeIndex: number | null;
    context: FloatingContext;
    placement: Placement;
    floatingStyles: ReturnType<typeof useFloating>['floatingStyles'];
    setIsOpen: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
    getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
    getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
    getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
}

export interface MenuItemProps {
    id: string;
    parentId?: string | null;
    title: string;
    url: string | null;
}