import React, { useState, useId, ComponentProps, useEffect, useRef, RefObject, useLayoutEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { createSafeContext } from '@/lib/context';

interface TabsContextProps {
    tabsMap: RefObject<Map<string, HTMLButtonElement>>;
    baseId: string;
    activeTab: string;
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
    onValueChange?: (value: string) => void;
} & (ControlledTabsProps | UnControlledTabsProps) & ComponentProps<"div">

type TabButtonProps = {
    value: string;
} & Omit<ComponentProps<"button">, "value">

type TabPanelProps = {
    value: string;
} & Omit<ComponentProps<"div">, "value">

const [TabsProvider, useTabsContext] = createSafeContext<TabsContextProps>("Tabs");

export function Tabs({ children, className, defaultValue, value: controlledValue, onValueChange, ...props }: TabsProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const baseId = useId();
    const tabsMap = useRef(new Map<string, HTMLButtonElement>());

    const isControlled = controlledValue !== undefined;
    const activeTab = isControlled ? controlledValue : internalValue;

    const handleTabChange = (id: string) => {
        if (!isControlled) {
            setInternalValue(id);
        }
        onValueChange?.(id);
    };

    const getOrderedTabs = useCallback(() => Array.from(tabsMap.current.keys()), []);

    return (
        <TabsProvider value={{ tabsMap, baseId, activeTab, handleTabChange, getOrderedTabs }}>
            <div className={cn("@container w-full", className)} {...props}>
                {children}
            </div>
        </TabsProvider>
    );
}

export function TabList({ children, className, ...props }: ComponentProps<"div">) {
    const { tabsMap, activeTab, handleTabChange, getOrderedTabs } = useTabsContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const prevRectRef = useRef<{ x: number; width: number; height: number } | null>(null);

    const updateHighlight = () => {
        const indicator = indicatorRef.current;
        const container = containerRef.current;
        const activeEl = tabsMap.current.get(activeTab);

        if (!indicator || !container || !activeEl) return;

        const tabRect = activeEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const containerStyle = window.getComputedStyle(container);
        const paddingLeft = parseFloat(containerStyle.paddingLeft);

        const nextRect = {
            x: tabRect.left - containerRect.left - paddingLeft,
            width: tabRect.width,
            height: tabRect.height,
        };

        const prevRect = prevRectRef.current;

        indicator.style.transition = "none";
        indicator.style.left = `${nextRect.x}px`;
        indicator.style.width = `${nextRect.width}px`;
        indicator.style.height = `${nextRect.height}px`;
        indicator.style.transform = "none";

        if (prevRect) {
            const dx = prevRect.x - nextRect.x;
            const dw = prevRect.width / nextRect.width;
            const dh = prevRect.height / nextRect.height;

            indicator.style.transformOrigin = "left center";
            indicator.style.transform = `translateX(${dx}px) scaleX(${dw}) scaleY(${dh})`;

            indicator.getBoundingClientRect();

            requestAnimationFrame(() => {
                indicator.style.transition = "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)";
                indicator.style.transform = "none";
                indicator.style.willChange = "transform";
            });
        }

        prevRectRef.current = nextRect;
    }

    // Polling method.
    // useLayoutEffect(() => {
    //     let frameId: number;
    //     const startTime = performance.now();
    //     const DURATION = 300;

    //     const poll = (now: number) => {
    //         updateHighlight();
    //         if (now - startTime < DURATION + 50) { 
    //             frameId = requestAnimationFrame(poll);
    //         }
    //     };

    //     frameId = requestAnimationFrame(poll);
    //     return () => cancelAnimationFrame(frameId);
    // }, [activeTab, updateHighlight]);

    useLayoutEffect(() => {
        updateHighlight();
    }, [activeTab, tabsMap]);

    // useEffect(() => {
    //     if (!containerRef.current) return;
    //     const observer = new ResizeObserver(updateHighlight);
    //     observer.observe(containerRef.current);
    //     return () => observer.disconnect();
    // }, [updateHighlight]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        const orderedValues = getOrderedTabs();
        const currentIndex = orderedValues.indexOf(activeTab);

        let nextIndex: number | null = null;

        switch (e.key) {
            case "ArrowRight":
                nextIndex = (currentIndex + 1) % orderedValues.length;
                break;
            case "ArrowLeft":
                nextIndex = (currentIndex - 1 + orderedValues.length) % orderedValues.length;
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
            ref={containerRef}
            role="tablist"
            aria-orientation="horizontal"
            className={cn("relative flex border-b border-slate-200 p-2 overflow-auto no-scrollbar", className)}
            {...props}
            onKeyDown={handleKeyDown}
        >
            <div
                ref={indicatorRef}
                aria-hidden="true"
                className="absolute bg-[#f8f9fb] rounded-full shadow-white transition-all duration-300 ease-out pointer-events-none"
            // style={{
            //     transform: `translateX(${style.x}px)`,
            //     left: `${style.left}px`,
            //     width: `${style.width}px`,
            //     height: `${style.height}px`,
            //     willChange: 'transform, width'
            // }}
            />
            {children}
        </div>
    );
}

export function TabButton({ value, children, className, ...props }: TabButtonProps) {
    const { tabsMap, baseId, activeTab, handleTabChange } = useTabsContext();

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
                "px-4 py-2 text-sm text-slate-500 xl:text-base font-normal rounded-[22px] hover:text-slate-700 z-10 data-[state=active]:font-medium data-[state=active]:text-ash focus-visible:outline-slate-400",
                className
            )}
            {...props}
            onClick={() => handleTabChange(value)}
        >
            {children}
        </button>
    );
}

export function TabPanel({ value, children, className, ...props }: TabPanelProps) {
    const { baseId, activeTab } = useTabsContext();

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
            tabIndex={0}
            className={cn("p-4 animate-in fade-in duration-200", className)}
            {...props}
        >
            {children}
        </div>
    );
}
