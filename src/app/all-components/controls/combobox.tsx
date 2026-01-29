'use client';

import { ChangeEvent, ComponentProps, Dispatch, ReactNode, Ref, RefObject, SetStateAction, useRef, useState } from 'react';
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

interface ComboboxContextProps extends FloatingContextType {
    labelsRef: any
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
}

type ComboboxProps = {
    children: ReactNode
    space?: number
    position?: Placement
    open?: boolean
    onOpen?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void
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

type ComboListProps = {
    value?: string;
    onSelect?: (value: string) => void;
} & Omit<ComponentProps<"div">, "onSelect">

const [ComboboxProvider, useComboboxContext] = createSafeContext<ComboboxContextProps>('Combobox');

export function Combobox({ children, open, onOpen, position, space = 5 }: ComboboxProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const listRef = useRef<Array<HTMLElement | null>>([]);
    const labelsRef = useRef<(string | null)[]>([]);

    const isOpen = open ?? internalOpen;
    const setIsOpen = onOpen ?? setInternalOpen;

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
    });

    const { getFloatingProps, getReferenceProps, getItemProps } = useInteractions([role, dismiss, listNav]);

    return (
        <ComboboxProvider value={{ isOpen, inputValue, activeIndex, listRef, labelsRef, refs, context, placement, floatingStyles, getFloatingProps, getReferenceProps, getItemProps, setIsOpen, setInputValue }}>
            {children}
        </ComboboxProvider>
    );
}

export function ComboboxInput<T extends HTMLInputElement>({ ref: externalRef,className, value: controlledValue, onChange, ...props }: ComboboxInputProps<T>) {
    const { refs, activeIndex, isOpen, inputValue, labelsRef, getReferenceProps, setIsOpen, setInputValue } = useComboboxContext();
    const value = controlledValue ?? inputValue;
    const mergedRef = useMergeRefs([refs.setReference, externalRef]);

    return (
        <div
            ref={mergedRef as Ref<HTMLInputElement>}
            className={cn("flex items-center w-full border border-gray-300 rounded-lg outline-none focus:ring-2 ring-violet-500", className)}
        >
            <Input
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
                            const selectedItem = labelsRef.current[activeIndex];
                            if (selectedItem) {
                                onChange?.(selectedItem);
                                setInputValue(selectedItem);
                                setIsOpen(false);
                            }
                        }
                    },
                })}
                aria-controls='combobox-list'
                aria-activedescendant={activeIndex != null ? `combobox-item-${activeIndex}` : undefined}
                data-state={isOpen ? 'open' : 'closed'}
            />
            <Button type='button' aria-controls='combobox-list' aria-expanded={isOpen} tabIndex={-1} onClick={(e) => { e.stopPropagation(), setIsOpen(!isOpen) }}><ChevronDown className='text-gray-500 w-4.5' /></Button>
        </div>
    );
}

export function ComboboxList({ children, className, ...props }: ComponentProps<"div">) {
    const { isOpen, refs, listRef, labelsRef, placement, floatingStyles, getFloatingProps, context } = useComboboxContext();

    if (!isOpen) return null;

    return (
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
                    <FloatingList elementsRef={listRef} labelsRef={labelsRef}>
                        {children}
                    </FloatingList>
                </div>
            </FloatingFocusManager>
        </FloatingPortal>
    );
}

export function ComboboxItem({ children, className, value, onSelect, ...props }: ComboListProps) {
    const { activeIndex, inputValue, getItemProps, setIsOpen, setInputValue } = useComboboxContext();
    const itemLabel = value ? String(value) : typeof children === 'string' ? children : "";
    const { ref, index } = useListItem();

    const search = inputValue.toLowerCase().trim();
    const isMatch = itemLabel.toLowerCase().includes(search);

    const isActive = activeIndex === index && isMatch;

    return (
        <div
            className={cn(
                "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm  transition-colors duration-200  dark:hover:bg-slate-800/60 focus:bg-white/60 outline-none",
                isActive && 'bg-white/40 text-slate-800 shadow-md ring-1 ring-white/70',
                !isMatch && 'hidden',
                className
            )}
            {...getItemProps({
                ...props,
                ref,
                role: 'option',
                'aria-selected': isActive,
                tabIndex: isActive ? 0 : -1,
                onClick() {
                    onSelect?.(value ?? "");
                    setInputValue(String(children));
                    setIsOpen(false);
                },
            })}
            id={`combobox-item-${index}`}
            aria-disabled={!isMatch}
            aria-hidden={!isMatch}
            data-selected={isActive ? 'selected' : ''}
            data-visible={isMatch}
        >
            {children}
        </div>
    );
}



export function ComboboxEmpty({ children = "No results found.", className }: ComponentProps<"div">) {
    const { listRef } = useComboboxContext();

    const isEmpty = listRef.current
        .filter((node): node is HTMLElement => node !== null)
        .every((node) => node.dataset.visible !== 'true');

    if (!isEmpty) return null;

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
