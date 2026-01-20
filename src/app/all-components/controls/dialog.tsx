import { ComponentProps, ReactNode, Ref, RefObject, useId, useRef, useState } from 'react';
import { createSafeContext } from '@/lib/context';
import {
    useFloating, useInteractions, useClick, useDismiss, useRole,
    FloatingPortal, FloatingOverlay, FloatingFocusManager,
    OffsetOptions,
    autoUpdate,
    offset,
    flip,
    shift,
    OpenChangeReason,
    useMergeRefs,
    FloatingContext
} from '@floating-ui/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DialogContextType {
    isOpen: boolean;
    labelId: string;
    descriptionId: string;
    refs: ReturnType<typeof useFloating>['refs'];
    context: FloatingContext;
    floatingStyles: ReturnType<typeof useFloating>['floatingStyles'];
    setIsOpen: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
    getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
    getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
}

type DialogProps = {
    children: ReactNode
    space?: OffsetOptions
    open?: boolean
    onOpen?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void
}

type DialogContentProps = {
    portal?: HTMLElement | RefObject<HTMLElement | null> | null
} & ComponentProps<"div">

const [DialogProvider, useDialogContext] = createSafeContext<DialogContextType>('Dropdown');

export function Dialog({ open, onOpen, children, space = 8 }: DialogProps) {
    const labelId = useId();
    const descriptionId = useId();

    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = open ?? internalOpen;
    const setIsOpen = onOpen ?? setInternalOpen;

    const { refs, context, floatingStyles } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        middleware: [offset(space), flip(), shift({ padding: 5 })],
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'dialog' });


    const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss, role]);

    return (
        <DialogProvider value={{ isOpen, refs, labelId, descriptionId, context, floatingStyles, setIsOpen, getFloatingProps, getReferenceProps }}>
            {children}
        </DialogProvider>
    );
}

export function DialogContent({ children, className, portal, ...props }: DialogContentProps) {
    const { refs, isOpen, labelId, descriptionId, context, getFloatingProps } = useDialogContext();

    if (!isOpen) return null;

    return (
        <FloatingPortal root={portal}>
            <FloatingOverlay className="bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" lockScroll>
                <FloatingFocusManager context={context}>
                    <div
                        ref={refs.setFloating}
                        aria-labelledby={labelId}
                        aria-describedby={descriptionId}
                        {...getFloatingProps(props)}
                        className={cn("bg-white text-ash p-6 rounded-xl shadow-2xl max-w-md w-full relative outline-none",
                            "animate-in zoom-in-95 duration-200", className)}
                    >
                        {children}
                    </div>
                </FloatingFocusManager>
            </FloatingOverlay>
        </FloatingPortal>
    );
}

export function DialogButton<T extends HTMLButtonElement>({ ref: externalRef, children, className, ...props }: ComponentProps<"button"> & { ref?: Ref<T> }) {
    const { isOpen, refs, getReferenceProps } = useDialogContext();
    const mergedRef = useMergeRefs([refs.setReference, externalRef]);

    return (
        <button
            ref={mergedRef as Ref<HTMLButtonElement>}
            {...getReferenceProps(props)}
            data-state={isOpen ? 'open' : 'closed'}
            className={cn("px-4 py-2 text-ash text-sm rounded-md border w-fit", className)}
        >
            {children}
        </button>
    );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            className={cn("flex flex-col gap-y-1.5 text-ash text-center sm:text-left pb-2 mb-4 border-b border-border", className)}
            {...props}
        />
    )
}

export function DialogTitle({ className, ...props }: ComponentProps<"h2">) {
    const { labelId } = useDialogContext();

    return (
        <h2
            {...props}
            id={labelId}
            className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        />
    );
}

export function DialogDescription({ className, ...props }: ComponentProps<"p">) {
    const { descriptionId } = useDialogContext();

    return (
        <p
            {...props}
            id={descriptionId}
            className={cn("text-sm text-slate-500", className)}
        />
    );
}

export function DialogClose({ className, children, ...props }: ComponentProps<"button">) {
    const { setIsOpen } = useDialogContext();

    return (
        <button
            type="button"
            aria-label='close'
            onClick={() => setIsOpen(false)}
            className={cn("absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 outline-none", className)}
            {...props}
        >
            {children || <X className='w-5' />}
            <span className="sr-only">Close</span>
        </button>
    );
}
