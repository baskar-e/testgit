'use client'

import React, { useState, useId, ComponentProps, useRef, RefObject, useLayoutEffect, useCallback, ReactNode, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { createSafeContext } from '@/lib/context';

interface TabsContextProps {
    tabsMap: RefObject<Map<string, HTMLButtonElement>>;
    indicatorRef: React.RefObject<HTMLDivElement | null>;
    baseId: string;
    activeTab: string;
    orientation?: "vertical" | "horizontal"
    variant?: "pill" | "line"
    handleTabChange: (id: string) => void;
    getOrderedTabs: () => string[];
}

type ControlledTabsProps = {
    value: string;
    defaultValue: never;
}

type UnControlledTabsProps = {
    defaultValue: string;
    value?: never;
}

type TabsProps = {
    orientation?: "vertical" | "horizontal";
    variant?: "pill" | "line";
    onValueChange?: (value: string) => void;
} & (ControlledTabsProps | UnControlledTabsProps) & ComponentProps<"div">

type TabButtonProps = {
    value: string;
} & Omit<ComponentProps<"button">, "value">

type TabPanelProps = {
    value: string;
} & Omit<ComponentProps<"div">, "value">

const [TabsProvider, useTabsContext] = createSafeContext<TabsContextProps>("Tabs");
const TabHighlightProvider = createContext<{ className?: string }>({ className: "" });

export function Tabs({ children, className, orientation = "horizontal", variant = 'pill', defaultValue, value: controlledValue, onValueChange, ...props }: TabsProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const tabsMap = useRef(new Map<string, HTMLButtonElement>());
    const indicatorRef = useRef<HTMLDivElement>(null);
    const prevRectRef = useRef<DOMRect | null>(null);
    const baseId = useId();

    const isControlled = controlledValue !== undefined;
    const activeTab = isControlled ? controlledValue : internalValue;

    const handleTabChange = (id: string) => {
        if (!isControlled) {
            setInternalValue(id);
        }
        onValueChange?.(id);
    };

    const getOrderedTabs = useCallback(() => Array.from(tabsMap.current.keys()), []);

    useLayoutEffect(() => {
        const indicator = indicatorRef.current;

        if (!indicator) return;

        const nextRect = indicator.getBoundingClientRect();
        const prevRect = prevRectRef.current;

        if (prevRect) {
            const dx = prevRect.left - nextRect.left;
            const dy = prevRect.top - nextRect.top;
            const sw = prevRect.width / nextRect.width;
            const sh = prevRect.height / nextRect.height;

            indicator.style.transition = "none";
            indicator.style.transformOrigin = "top left";
            indicator.style.transform = `translate(${dx}px, ${dy}px) scale(${sw}, ${sh})`;

            indicator.getBoundingClientRect();

            requestAnimationFrame(() => {
                indicator.style.transition = "transform 450ms cubic-bezier(0.65, 0, 0.35, 1)";
                indicator.style.transform = "none";
            });
        }

        prevRectRef.current = nextRect;
    }, [activeTab]);

    return (
        <TabsProvider value={{ tabsMap, baseId, activeTab, orientation, variant, indicatorRef, handleTabChange, getOrderedTabs }}>
            <div data-orientation={orientation} className={cn("@container flex gap-2.5 w-full data-[orientation=horizontal]:flex-col", className)} {...props}>
                {children}
            </div>
        </TabsProvider>
    );
}

export function TabList({ children, className, ...props }: ComponentProps<"div">) {
    const { tabsMap, activeTab, orientation, variant, handleTabChange, getOrderedTabs } = useTabsContext();

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        const orderedValues = getOrderedTabs();
        const currentIndex = orderedValues.indexOf(activeTab);

        let nextIndex: number | null = null;

        const isHorizontal = orientation === "horizontal";
        const isVertical = orientation === "vertical";

        switch (e.key) {
            case "ArrowRight":
                if (isHorizontal) nextIndex = (currentIndex + 1) % orderedValues.length;
                break;
            case "ArrowLeft":
                if (isHorizontal) nextIndex = (currentIndex - 1 + orderedValues.length) % orderedValues.length;
                break;
            case "ArrowDown":
                if (isVertical) nextIndex = (currentIndex + 1) % orderedValues.length;
                break;
            case "ArrowUp":
                if (isVertical) nextIndex = (currentIndex - 1 + orderedValues.length) % orderedValues.length;
                break;
            case "Home":
                nextIndex = 0;
                break;
            case "End":
                nextIndex = orderedValues.length - 1;
                break;
            default:
                return;
        }

        if (nextIndex !== null) {
            e.preventDefault();
            const nextValue = orderedValues[nextIndex];
            handleTabChange(nextValue);

            requestAnimationFrame(() => {
                tabsMap.current.get(nextValue)?.focus();
            });
        }
    }, [getOrderedTabs, activeTab, handleTabChange, tabsMap]);

    return (
        <div
            role="tablist"
            aria-orientation={orientation}
            data-orientation={orientation}
            className={cn(
                "relative flex data-[orientation=vertical]:flex-col overflow-auto no-scrollbar",
                variant === "pill" && "bg-white rounded-full p-1.5",
                variant === "line" && "border-b border-b-slate-300",
                className
            )}
            {...props}
            onKeyDown={handleKeyDown}
        >
            {children}
        </div>
    );
}

export function TabButton({ value, children, className, ...props }: TabButtonProps) {
    const { tabsMap, baseId, activeTab, indicatorRef, handleTabChange } = useTabsContext();
    const indicatorCtx = useContext(TabHighlightProvider);

    const isActive = activeTab === value;
    const tabId = `shapes-${baseId}-tab-${value}`;
    const panelId = `shapes-${baseId}-panel-${value}`;

    return (
        <button
            role="tab"
            type='button'
            ref={(el) => {
                if (el) tabsMap.current.set(value, el);
                else tabsMap.current.delete(value);
            }}
            id={tabId}
            aria-selected={isActive}
            aria-controls={panelId}
            data-state={isActive ? 'active' : 'inactive'}
            tabIndex={isActive ? 0 : -1}
            className={cn(
                "relative px-4 py-2 text-sm text-slate-500 font-normal rounded-[22px] hover:text-slate-700 data-[state=active]:font-medium data-[state=active]:text-ash focus-visible:outline-slate-400",
                className
            )}
            {...props}
            onClick={() => handleTabChange(value)}
        >
            <span className="relative z-10">{children}</span>
            {isActive && (
                <div
                    ref={indicatorRef}
                    aria-hidden="true"
                    className={cn(
                        "absolute inset-0 z-0 pointer-events-none",
                    )}
                >
                    <TabIndicator className={indicatorCtx?.className} />
                </div>
            )}
        </button>
    );
}

export function TabPanel({ value, children, className, ...props }: TabPanelProps) {
    const { baseId, activeTab, orientation } = useTabsContext();

    const isActive = activeTab === value;
    const tabId = `shapes-${baseId}-tab-${value}`;
    const panelId = `shapes-${baseId}-panel-${value}`;

    if (!isActive) return null;

    return (
        <div
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId}
            data-state={isActive ? 'active' : 'inactive'}
            data-orientation={orientation}
            tabIndex={0}
            className={cn("p-4 bg-[#edf0f3] text-ash rounded-lg animate-in fade-in duration-200", className)}
            {...props}
        >
            {children}
        </div>
    );
}


export function TabHighLight({ children, className }: { children: ReactNode, className?: string }) {
    useTabsContext();

    return (
        <TabHighlightProvider value={{ className }}>
            {children}
        </TabHighlightProvider>
    )
}

export function TabIndicator({ className }: { className?: string }) {
    const { variant } = useTabsContext();

    return (
        <div
            aria-hidden="true"
            className={cn("relative w-full rounded-[22px] shadow-white-md",
                variant === "pill" && "h-full bg-white",
                variant === "line" && "h-0.5 top-[calc(100%-2px)] bg-slate-600",
                className
            )}
        />
    )
}