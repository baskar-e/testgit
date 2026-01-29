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

    const getOrderedTabs = () => Array.from(tabsMap.current.keys());

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
    const [style, setStyle] = useState({ left: 0, width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const updateHighlight = useCallback(() => {
        const activeEl = tabsMap.current.get(activeTab);
        const container = containerRef.current;
        // requestAnimationFrame(() => {
            if (activeEl && container) {
                const tabRect = activeEl.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const containerStyle = window.getComputedStyle(container);
                const paddingLeft = parseFloat(containerStyle.paddingLeft);
console.log(tabRect)
                setStyle({
                    left: tabRect.left - containerRect.left - paddingLeft,
                    width: tabRect.width,
                    height: tabRect.height
                });
            }
        // })
    }, [activeTab, tabsMap])

    useLayoutEffect(() => {
        const activeEl = tabsMap.current.get(activeTab);
        if (activeEl) {
            activeEl.addEventListener('transitionend', updateHighlight);
            updateHighlight();
            return () => activeEl.removeEventListener('transitionend', updateHighlight);
        }
    }, [activeTab, updateHighlight]);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(updateHighlight);
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [updateHighlight]);

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
            className={cn("relative flex border-b border-slate-200 p-2 overflow-auto no-scrollbar ml-6", className)}
            {...props}
            onKeyDown={handleKeyDown}
        >
            <div
                aria-hidden="true"
                className="absolute bg-[#f8f9fb] rounded-full transition-all duration-300 ease-out shadow-white pointer-events-none"
                style={{
                    transform: `translateX(${style.left}px)`,
                    width: `${style.width}px`,
                    height: `${style.height}px`,
                    willChange: 'transform, width'
                }}
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
                "px-4 py-2 text-sm text-slate-500 xl:text-base font-normal rounded-[22px] hover:text-slate-700 transition-all z-10 data-[state=active]:font-medium data-[state=active]:text-ash data-[state=active]:px-12 duration-200",
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
