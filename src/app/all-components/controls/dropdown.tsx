'use client'

import { ComponentProps, KeyboardEvent, MouseEvent, ReactNode, Ref, RefObject, useRef, useState } from 'react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    Placement,
    OffsetOptions,
    OpenChangeReason,
    useDismiss,
    useClick,
    useRole,
    useInteractions,
    useListNavigation,
    useListItem,
    FloatingFocusManager,
    FloatingList,
    FloatingPortal,
    useTransitionStyles,
    useMergeRefs,
} from '@floating-ui/react';
import { cn } from '@/lib/utils';
import { FloatingContextType } from '@/types';
import { createSafeContext } from '@/lib/context';

type DropdownProps = {
    children: ReactNode
    position?: Placement
    space?: OffsetOptions
    open?: boolean
    onOpen?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void
}

type DropdownContentProps = {
    portal?: HTMLElement | RefObject<HTMLElement | null> | null
} & ComponentProps<"div">

type DropdownItemProps = {
    onClick?: (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
} & ComponentProps<"div">

const [DropdownProvider, useDropdownContext] = createSafeContext<FloatingContextType>('Dropdown');

export function Dropdown({ open, onOpen, children, position, space = 8 }: DropdownProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = open ?? internalOpen;
    const setIsOpen = onOpen ?? setInternalOpen;

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const listRef = useRef<Array<HTMLElement | null>>([]);

    const { refs, context, placement, floatingStyles } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: position,
        whileElementsMounted: autoUpdate,
        middleware: [offset(space), flip(), shift({ padding: 5 })],
    });

    const listNav = useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'menu' });

    const { getFloatingProps, getReferenceProps, getItemProps } = useInteractions([click, dismiss, role, listNav]);

    return (
        <DropdownProvider value={{ isOpen, listRef, activeIndex, refs, context, placement, floatingStyles, setIsOpen, getFloatingProps, getReferenceProps, getItemProps }}>
            {children}
        </DropdownProvider>
    );
}

export function DropdownButton<T extends HTMLButtonElement>({ ref: externalRef, children, className, ...props }: ComponentProps<"button"> & { ref?: Ref<T> }) {
    const { isOpen, refs, getReferenceProps } = useDropdownContext();
    const mergedRef = useMergeRefs([refs.setReference, externalRef]);

    return (
        <button
            ref={mergedRef as Ref<HTMLButtonElement>}
            aria-haspopup='menu'
            data-state={isOpen ? 'open' : 'closed'}
            data-slot='dropdown-button'
            className={cn("px-4 py-2 text-ash text-sm rounded-md border w-fit", className)}
            {...getReferenceProps(props)}
        >
            {children}
        </button>
    );
}

export function DropdownContent({ children, className, portal, ...props }: DropdownContentProps) {
    const { refs, listRef, placement, floatingStyles, getFloatingProps, context } = useDropdownContext();
    const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
        duration: 200,
        initial: {
            opacity: 0,
            transform: 'scale(0.8)',
        },
        open: () => ({
            opacity: 1,
            transform: 'scale(1)',
        }),
        common: ({ side }) => ({
            transformOrigin: {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left',
            }[side],
        }),
    });

    if (!isMounted) return null;

    return (
        <FloatingPortal root={portal}>
            <FloatingFocusManager context={context} modal={false}>
                <div
                    ref={refs.setFloating}
                    style={{ ...floatingStyles, zIndex: 50 }}
                    {...getFloatingProps()}
                >
                    <div
                        {...props}
                        data-state={isMounted ? 'open' : 'closed'}
                        data-slot='dropdown-content'
                        data-placement={placement}
                        className={cn("min-w-48 overflow-hidden rounded-lg border p-1.5 shadow-md bg-white/20 backdrop-blur-md border-white/30 space-y-1 dark:bg-slate-950/70 dark:backdrop-blur-lg dark:border-slate-800/50 z-50", className)}
                        style={transitionStyles}
                    >
                        <FloatingList elementsRef={listRef}>
                            {children}
                        </FloatingList>
                    </div>
                </div>
            </FloatingFocusManager>
        </FloatingPortal>
    );
}

export function DropdownItem({ children, className, onClick, ...props }: DropdownItemProps) {
    const { activeIndex, setIsOpen, getItemProps } = useDropdownContext();
    const { ref, index } = useListItem();
    const isActive = activeIndex === index;

    return (
        <div
            className={cn("relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm text-slate-800 transition-colors duration-200 hover:bg-white/40 dark:hover:bg-slate-800/60 focus:bg-white/60 outline-none hover:shadow-md hover:ring-1 hover:ring-white/70", className)}
            {...getItemProps({
                ...props,
                ref,
                role: "menuitem",
                'aria-selected': isActive,
                tabIndex: isActive ? 0 : -1,
                onClick(e: MouseEvent<HTMLDivElement>) {
                    onClick?.(e);
                    setIsOpen(false);
                },
                onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.(e);
                        setIsOpen(false);
                    }
                },
            })}
            data-selected={isActive ? 'selected' : ''}
            data-slot='dropdown-item'
        >
            {children}
        </div>
    );
}
