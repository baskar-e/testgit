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
                    "relative w-80 overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-white supports-backdrop-filter:bg-white/10",
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
                "border-b border-white/20 px-5 py-3",
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
                "flex items-center gap-2.5 border-t border-white/20 px-5 py-3",
                className
            )}
            {...props}>
            {children}
        </div>
    );
};


export function CardBody({ children, className, ...props }: ComponentProps<"div">) {
    useCardContext();

    return (
        <div className={cn("flex flex-col gap-3 px-5 py-4", className)} {...props}>{children}</div>
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
        <h3 className={cn("text-xl font-bold text-slate-700 drop-shadow-sm", className)} {...props}>{children}</h3>
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
            className={cn("w-fit rounded-lg px-4 py-2 text-sm text-white font-medium bg-violet-700 backdrop-blur-sm hover:bg-violet-800", className)}
            {...props}
        >
            {children}
        </button>
    )
}