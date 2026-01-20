import { ComponentProps, useId, useState } from 'react';
import { createSafeContext } from '@/lib/context';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionContextProps {
    checkIsOpen: (value: AccordionValue) => boolean;
    toggleItem: (openItem: AccordionValue) => void;
}

interface AccordionItemContextProps {
    isOpen: boolean;
    value: AccordionValue;
    triggerId: string;
    contentId: string;
}

type ControlledAccordion = {
    value: AccordionValue | null;
    defaultValue?: never;
};

type UncontrolledAccordion = {
    defaultValue?: AccordionValue;
    value?: never;
};

type ControlledMultipleAccordion = {
    value: AccordionValue[];
    defaultValue?: never;
};

type UncontrolledMultipleAccordion = {
    defaultValue?: AccordionValue[];
    value?: never;
};

type SingleAccordionProps = {
    type: "single";
    onValueChange?: (value: AccordionValue | null) => void;
} & (ControlledAccordion | UncontrolledAccordion);

type MultipleAccordionProps = {
    type: "multiple";
    onValueChange?: (value: AccordionValue[]) => void;
} & (ControlledMultipleAccordion | UncontrolledMultipleAccordion);

type AccordionProps = ComponentProps<"div"> & (SingleAccordionProps | MultipleAccordionProps);

type AccordionItemProps = {
    value: AccordionValue;
} & ComponentProps<"div">

export type AccordionValue = string | number;

const [AccordionProvider, useAccordionContext] = createSafeContext<AccordionContextProps>("Accordion");
const [AccordionItemProvider, useAccordionItemContext] = createSafeContext<AccordionItemContextProps>("Accordion Item");

export function Accordion({ children, className, type, defaultValue, value: controlledValue, onValueChange, ...props }: AccordionProps) {
    const [internalValue, setInternalValue] = useState<AccordionValue | AccordionValue[] | null>(() => {
        if (type === 'multiple') {
            return (defaultValue as AccordionValue[]) ?? [];
        }
        return (defaultValue as AccordionValue | null) ?? null;
    });

    const isControlled = controlledValue !== undefined;
    const openItem = isControlled ? controlledValue : internalValue;

    const toggleItem = (itemValue: AccordionValue) => {
        let activeValue: AccordionValue | AccordionValue[] | null;

        if (type === "multiple") {
            const currentArray = Array.isArray(openItem) ? openItem : (openItem ? [openItem] : []);
            activeValue = currentArray.includes(itemValue)
                ? currentArray.filter((i) => i !== itemValue)
                : [...currentArray, itemValue];
            onValueChange?.(activeValue as AccordionValue[]);
        } else {
            activeValue = openItem === itemValue ? null : itemValue;
            onValueChange?.(activeValue as AccordionValue | null);
        }
        if (!isControlled) {
            setInternalValue(activeValue);
        }
    };

    const checkIsOpen = (itemValue: AccordionValue) => {
        return Array.isArray(openItem) ? openItem.includes(itemValue) : openItem === itemValue;
    };

    return (
        <AccordionProvider value={{ checkIsOpen, toggleItem }}>
            <div className={cn("w-full rounded-lg shadow-white overflow-hidden", className)} {...props}>
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
            <div data-state={isOpen ? 'open' : 'closed'} className={cn("mx-4 border-b border-[#d3dbe0] last:border-none", className)} {...props}>
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
                className={cn("flex w-full items-center justify-between py-4 text-ash text-left font-medium transition-all", className)}
                onClick={() => toggleItem(value)}
                {...props}
            >
                {children}
                <ChevronDown className={`w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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
                <div className={cn("pt-0 pb-4 text-sm text-slate-600 leading-relaxed", className)} {...props}>
                    {children}
                </div>
            </div>
        </div>
    );
}
