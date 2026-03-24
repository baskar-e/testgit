'use client';

import { ComponentProps, useId, useState } from 'react';
import { createSafeContext } from '@/lib/context';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionContextProps {
    checkIsOpen: (value: string) => boolean;
    toggleItem: (openItem: string) => void;
}

interface AccordionItemContextProps {
    isOpen: boolean;
    value: string;
    triggerId: string;
    contentId: string;
}

type ControlledAccordion = {
    value: string | null;
    defaultValue?: never;
};

type UncontrolledAccordion = {
    defaultValue?: string;
    value?: never;
};

type ControlledMultipleAccordion = {
    value: string[];
    defaultValue?: never;
};

type UncontrolledMultipleAccordion = {
    defaultValue?: string[];
    value?: never;
};

type SingleAccordionProps = {
    type: "single";
    onValueChange?: (value: string | null) => void;
} & (ControlledAccordion | UncontrolledAccordion);

type MultipleAccordionProps = {
    type: "multiple";
    onValueChange?: (value: string[]) => void;
} & (ControlledMultipleAccordion | UncontrolledMultipleAccordion);

type AccordionProps = ComponentProps<"div"> & (SingleAccordionProps | MultipleAccordionProps);

type AccordionItemProps = {
    value: string;
} & ComponentProps<"div">

const [AccordionProvider, useAccordionContext] = createSafeContext<AccordionContextProps>("Accordion");
const [AccordionItemProvider, useAccordionItemContext] = createSafeContext<AccordionItemContextProps>("Accordion Item");

export function Accordion({ children, className, type, defaultValue, value: controlledValue, onValueChange, ...props }: AccordionProps) {
    const [internalValue, setInternalValue] = useState<string | string[] | null>(() => {
        if (type === 'multiple') {
            return (defaultValue as string[]) ?? [];
        }
        return (defaultValue as string | null) ?? null;
    });

    const isControlled = controlledValue !== undefined;
    const openItem = isControlled ? controlledValue : internalValue;

    const toggleItem = (itemValue: string) => {
        let activeValue: string | string[] | null;

        if (type === "multiple") {
            const currentArray = Array.isArray(openItem) ? openItem : (openItem ? [openItem] : []);
            activeValue = currentArray.includes(itemValue)
                ? currentArray.filter((i) => i !== itemValue)
                : [...currentArray, itemValue];
            onValueChange?.(activeValue as string[]);
        } else {
            activeValue = openItem === itemValue ? null : itemValue;
            onValueChange?.(activeValue as string | null);
        }
        if (!isControlled) {
            setInternalValue(activeValue);
        }
    };

    const checkIsOpen = (itemValue: string) => {
        return Array.isArray(openItem) ? openItem.includes(itemValue) : openItem === itemValue;
    };

    return (
        <AccordionProvider value={{ checkIsOpen, toggleItem }}>
            <div className={cn("w-full rounded-lg bg-white shadow-white-md overflow-hidden dark:bg-zinc-800 dark:shadow-white-sm", className)} {...props}>
                {children}
            </div>
        </AccordionProvider>
    );
}

export function AccordionItem({ value, children, className, ...props }: AccordionItemProps) {
    const { checkIsOpen } = useAccordionContext();
    const isOpen = checkIsOpen(value);

    const id = useId();
    const triggerId = `shapes-t-${id}`;
    const contentId = `shapes-c-${id}`;


    return (
        <AccordionItemProvider value={{ isOpen, value, triggerId, contentId }}>
            <div data-state={isOpen ? 'open' : 'closed'} className={cn("mx-4 border-b border-border last:border-none dark:border-zinc-700", className)} {...props}>
                {children}
            </div>
        </AccordionItemProvider>
    )
}

export function AccordionTrigger({ children, className, ...props }: ComponentProps<"button">) {
    const { toggleItem } = useAccordionContext();
    const { isOpen, value, triggerId, contentId } = useAccordionItemContext();

    return (
        <h3 className='flex' data-state={isOpen ? 'open' : 'closed'}>
            <button
                id={triggerId}
                type='button'
                aria-expanded={isOpen}
                aria-controls={contentId}
                data-state={isOpen ? 'open' : 'closed'}
                className={cn("flex w-full items-center justify-between py-3 text-sm text-slate-800 text-left font-medium transition-all dark:text-white", className)}
                onClick={() => toggleItem(value)}
                {...props}
            >
                {children}
                <ChevronDown className={`size-4 text-slate-500 transition-transform duration-200 dark:text-slate-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
        </h3>
    )
}

export function AccordionContent({ children, className, ...props }: ComponentProps<"div">) {
    const { isOpen, triggerId, contentId } = useAccordionItemContext();

    return (
        <div
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            data-state={isOpen ? 'open' : 'closed'}
            className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? 'grid-rows-[1fr] opacity-100 pointer-events-auto' : 'grid-rows-[0fr] opacity-0 pointer-events-none',
            )}
        >
            <div className="overflow-hidden">
                <div className={cn("pt-0 pb-3 text-sm text-slate-700 leading-relaxed dark:text-slate-200", className)} {...props}>
                    {children}
                </div>
            </div>
        </div>
    );
}
