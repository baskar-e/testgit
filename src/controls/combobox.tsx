'use client';

import { ChangeEvent, ComponentProps, Dispatch, ReactNode, Ref, RefObject, SetStateAction, useMemo, useRef, useState } from 'react';
import {
    useFloating, autoUpdate, offset, flip, size,
    useListNavigation, useListItem, useDismiss, useInteractions, useRole,
    FloatingPortal, FloatingFocusManager, FloatingList,
    OpenChangeReason,
    Placement,
    useMergeRefs,
} from '@floating-ui/react';

import { FloatingContextType } from '@/types';
import { createSafeContext } from '@/lib/context';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from './button';

interface ComboboxContextProps<T extends ItemProps> extends FloatingContextType {
    filteredItems: T[]
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
    getItemLabel: (item: T) => string;
    getItemValue: (item: T) => string;
    isItemDisabled: (item: T) => boolean;
}

type ComboboxProps<T extends ItemProps> = {
    children: ReactNode
    items: T[]
    space?: number
    position?: Placement
    autoHighlight?: boolean
    open?: boolean
    onOpen?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void
    labelKey?: keyof T | ((item: T) => string);
    valueKey?: keyof T | ((item: T) => string);
    disabledKey?: keyof T | ((item: T) => boolean) | null;
}

type ComboboxInputProps<T> = ({
    ref?: RefObject<T>;
    value?: never;
    onChange?: (value: string) => void;
} | {
    ref?: RefObject<T>;
    value: string;
    onChange: (value: string) => void;
}) & Omit<ComponentProps<"input">, "value" | "onChange">

type ComboboxListProps = {
    children?: ReactNode | ((item: any, index: number) => ReactNode);
} & Omit<ComponentProps<"div">, "children">

type ComboboxItemProps = {
    value: ItemProps;
    onSelect?: (value: string, item: ItemProps) => void;
} & Omit<ComponentProps<"div">, "onSelect">

type ItemProps = string | Record<string, any>;

const [ComboboxProvider, useComboboxContext] = createSafeContext<ComboboxContextProps<any>>('Combobox');
const [ComboboxContentProvider, useComboboxContentContext] = createSafeContext<{}>('ComboboxContent');

export function Combobox<T extends ItemProps>({ children, open, onOpen, items, autoHighlight = false, position, space = 5, labelKey = 'label' as keyof T, valueKey = 'value' as keyof T, disabledKey = 'disabled' as keyof T }: ComboboxProps<T>) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const listRef = useRef<Array<HTMLElement | null>>([]);

    const isOpen = open ?? internalOpen;
    const setIsOpen = onOpen ?? setInternalOpen;

    const getItemLabel = (item: T): string => {
        if (typeof item === 'string') return item;

        if (typeof labelKey === 'function') {
            return String(labelKey(item));
        }

        return String(item[labelKey] ?? item);
    };

    const getItemValue = (item: T): string => {
        if (typeof item === 'string') return item;

        if (typeof valueKey === 'function') {
            return String(valueKey(item));
        }

        return String(item[valueKey] ?? item[labelKey as keyof T] ?? item);
    };

    const isItemDisabled = (item: T): boolean => {
        if (typeof item === 'string') return false;
        
        if (disabledKey === null) return false;

        if (typeof disabledKey === 'function') {
            return Boolean(disabledKey(item));
        }


        return Boolean(item[disabledKey]);
    };

    const filteredItems = useMemo(() => {
        const search = inputValue.toLowerCase().trim();
        if (!search) return items;
        return items.filter((item) => {
            const label = getItemLabel(item);
            return label.toLowerCase().includes(search);
        });
    }, [items, inputValue]);

    const { refs, context, placement, floatingStyles } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: position,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(space),
            flip(),
            size({
                apply({ rects, elements }) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                    });
                },
            }),
        ],
    });

    const role = useRole(context, { role: 'combobox' });
    const dismiss = useDismiss(context);
    const listNav = useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        virtual: true,
        loop: true,
        focusItemOnOpen: autoHighlight,
    });

    const { getFloatingProps, getReferenceProps, getItemProps } = useInteractions([role, dismiss, listNav]);

    return (
        <ComboboxProvider value={{ isOpen, inputValue, activeIndex, listRef, refs, filteredItems, context, placement, floatingStyles, getItemLabel, getItemValue, isItemDisabled, getFloatingProps, getReferenceProps, getItemProps, setIsOpen, setInputValue }}>
            {children}
        </ComboboxProvider>
    );
}

export function ComboboxInput<T extends HTMLInputElement>({ ref: externalRef, className, value: controlledValue, onChange, ...props }: ComboboxInputProps<T>) {
    const { refs, activeIndex, isOpen, inputValue, filteredItems, getItemLabel, getItemValue, isItemDisabled, getReferenceProps, setIsOpen, setInputValue } = useComboboxContext();

    const value = controlledValue ?? inputValue;
    const mergedRef = useMergeRefs([refs.setReference, externalRef]);

    return (
        <div
            ref={mergedRef as Ref<HTMLInputElement>}
            className={cn("flex items-center w-full bg-white border border-slate-100 h-9 rounded-lg outline-none shadow-white-md focus:ring-2 ring-violet-500", className)}
        >
            <Input className='bg-transparent '
                {...getReferenceProps({
                    placeholder: 'Search...',
                    ...props,
                    value,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        const newValue = e.target.value;
                        onChange?.(newValue);
                        setInputValue(newValue);
                        setIsOpen(true);
                    },
                    onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' && activeIndex != null) {
                            const selectedItem = filteredItems[activeIndex];
                            if (selectedItem && !isItemDisabled(selectedItem)) {
                                const selectedValue = getItemValue(selectedItem);
                                const selectedLabel = getItemLabel(selectedItem);
                                onChange?.(selectedValue);
                                setInputValue(selectedLabel);
                                setIsOpen(false);
                            }
                        }
                    },
                })}
                aria-controls='combobox-list'
                aria-activedescendant={activeIndex != null ? `combobox-item-${activeIndex}` : undefined}
                data-state={isOpen ? 'open' : 'closed'}
            />
            <div className='flex p-1'>
                <Button
                    type='button'
                    aria-controls='combobox-list'
                    aria-expanded={isOpen}
                    className='px-2 hover:bg-slate-100'
                    tabIndex={-1}
                    onClick={(e) => { e.stopPropagation(), setIsOpen(!isOpen) }}
                >
                    <ChevronDown className='text-gray-500 size-4' />
                </Button>
            </div>
        </div>
    );
}

export function ComboboxContent({ children, className, ...props }: ComponentProps<"div">) {
    const { isOpen, refs, placement, floatingStyles, getFloatingProps, context } = useComboboxContext();

    if (!isOpen) return null;

    return (
        <ComboboxContentProvider value={{}}>
            <FloatingPortal>
                <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
                    <div
                        style={floatingStyles}
                        {...getFloatingProps({ ...props, id: 'combobox-list' })}
                        ref={refs.setFloating}
                        data-state={isOpen ? 'open' : 'closed'}
                        data-placement={placement}
                        className={cn("z-50 border rounded-lg shadow-md overflow-y-auto max-h-60 p-1.5 bg-white/20 backdrop-blur-md border-white/30 space-y-1 dark:bg-slate-950/70 dark:backdrop-blur-lg dark:border-slate-800/50", className)}
                    >
                        {children}
                    </div>
                </FloatingFocusManager>
            </FloatingPortal>
        </ComboboxContentProvider>
    );
}

export function ComboboxList({ children }: ComboboxListProps) {
    useComboboxContentContext();
    const { listRef, filteredItems } = useComboboxContext();

    const isRenderFunction = typeof children === 'function';

    const content = isRenderFunction
        ? filteredItems.map((item, index) => children(item, index))
        : children;

    return (
        <FloatingList elementsRef={listRef}>
            {content}
        </FloatingList>
    );
}

export function ComboboxItem({ children, className, value, onSelect, ...props }: ComboboxItemProps) {
    const { activeIndex, filteredItems, getItemLabel, getItemValue, isItemDisabled, getItemProps, setIsOpen, setInputValue } = useComboboxContext();
    const { ref, index } = useListItem();

    if (!value) return null;

    const itemLabel = getItemLabel(value);
    const itemValue = getItemValue(value);
    const disabled = isItemDisabled(value);

    const isMatch = filteredItems.indexOf(value);

    if (isMatch === -1) return null;

    const isActive = activeIndex === index;

    return (
        <div
            className={cn(
                "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm  transition-colors duration-200  dark:hover:bg-slate-800/60 focus:bg-white/60 outline-none",
                isActive && 'bg-white/40 text-slate-800 shadow-md ring-1 ring-white/70',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            {...getItemProps({
                ...props,
                ref,
                role: 'option',
                'aria-selected': isActive,
                'aria-disabled': disabled,
                tabIndex: isActive ? 0 : -1,
                onClick() {
                    if (disabled) return;
                    onSelect?.(itemValue, value!);
                    setInputValue(itemLabel);
                    setIsOpen(false);
                },
            })}
            id={`combobox-item-${index}`}
            data-selected={isActive ? 'selected' : ''}
        >
            {children}
        </div>
    );
}

export function ComboboxEmpty({ children = "No results found.", className }: ComponentProps<"div">) {
    const { filteredItems } = useComboboxContext();

    if (filteredItems.length > 0) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            className={cn("px-4 py-8 text-center text-sm text-gray-500", className)}
        >
            {children}
        </div>
    );
}
