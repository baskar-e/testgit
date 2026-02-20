'use client';

import { ComponentProps } from 'react';
import { createSafeContext } from '@/lib/context';
import { cn } from '@/lib/utils';

type CardContextProps = Record<string, never>;

const [CardProvider, useCardContext] = createSafeContext<CardContextProps>("Card");

export function Card({ children, className, ...props }: ComponentProps<"div">) {
    return (
        <CardProvider value={{}}>
            <div
                className={cn(
                    "relative w-80 text-sm overflow-hidden rounded-xl space-y-3 bg-white shadow-white-md",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </CardProvider>
    );
};

export function CardHeader({ children, className, ...props }: ComponentProps<"div">) {
    useCardContext();

    return (
        <div
            className={cn(
                "border-b border-white/20 px-5 mt-4",
                className
            )}
            {...props}>
            {children}
        </div>
    );
};

export function CardFooter({ children, className, ...props }: ComponentProps<"div">) {
    useCardContext();

    return (
        <div
            className={cn(
                "flex items-center gap-2.5 border-t border-white/20 px-5 pt-1 mb-4",
                className
            )}
            {...props}>
            {children}
        </div>
    );
};

export function CardContent({ children, className, ...props }: ComponentProps<"div">) {
    useCardContext();

    return (
        <div className={cn("flex flex-col gap-4 px-5 my-4", className)} {...props}>{children}</div>
    )
}

export function CardImage({ src, alt = '', className, ...props }: ComponentProps<"img">) {
    useCardContext();

    return (
        <img src={src} alt={alt} className={cn("w-full object-cover", className)} {...props} />
    )
}

export function CardTitle({ children, className, ...props }: ComponentProps<"h3">) {
    useCardContext();

    return (
        <h3 className={cn("text-lg font-medium text-slate-800 drop-shadow-sm", className)} {...props}>{children}</h3>
    )
}

export function CardDescription({ children, className, ...props }: ComponentProps<"p">) {
    useCardContext();

    return (
        <p className={cn("text-sm leading-relaxed text-gray-600", className)} {...props}>{children}</p>
    )
}

export function CardAction({ children, className, ...props }: ComponentProps<"button">) {
    useCardContext();

    return (
        <button
            type='button'
            className={cn("w-full rounded-lg px-3 py-1.5 text-sm text-white font-medium bg-violet-700 hover:bg-violet-800", className)}
            {...props}
        >
            {children}
        </button>
    )
}