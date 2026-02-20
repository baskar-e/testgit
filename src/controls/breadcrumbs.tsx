'use client';

import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { createSafeContext } from '@/lib/context';

interface BreadcrumbsContextProps {
    separator?: boolean;
}

type BreadcrumbsProps = {
    separator?: boolean;
} & ComponentProps<"ol">

const [BreadcrumbsProvider, useBreadcrumbsContext] = createSafeContext<BreadcrumbsContextProps>("Breadcrumbs");
const [BreadcrumbsItemProvider, useBreadcrumbsItemContext] = createSafeContext<{}>("BreadcrumbsItem");

export function Breadcrumbs({ children, className, separator = true, ...props }: BreadcrumbsProps) {
    return (
        <BreadcrumbsProvider value={{ separator }}>
            <nav aria-label="breadcrumbs">
                <ol className={cn("flex items-center gap-2", className)}  {...props}>
                    {children}
                </ol>
            </nav>
        </BreadcrumbsProvider>
    );
}

export function BreadcrumbsItem({ children, className, ...props }: ComponentProps<"li">) {
    const { separator } = useBreadcrumbsContext();

    return (
        <BreadcrumbsItemProvider value={{}}>
            <li
                className={cn("group/item flex items-center gap-2", className)}
                {...props}
            >
                {children}
                {separator && <BreadcrumbsSeparator className='group-has-data-[current=page]/item:hidden' />}
            </li>
        </BreadcrumbsItemProvider>
    );
}

export function BreadcrumbsLink({ children, className, ...props }: ComponentProps<"a">) {
    useBreadcrumbsItemContext();

    return (
        <a
            className={cn(
                "text-sm text-slate-600 hover:text-slate-900 transition-colors",
                className
            )}
            {...props}
        >
            {children}
        </a>
    );
}

export function BreadcrumbsPage({ children, className, ...props }: ComponentProps<'span'>) {
    useBreadcrumbsItemContext();

    return (
        <span
            aria-current="page"
            data-current="page"
            className={cn("text-sm text-slate-900 font-medium", className)}
            {...props}
        >
            {children}
        </span>
    );
}

export function BreadcrumbsEllipsis({ className, ...props }: ComponentProps<"span">) {
    useBreadcrumbsItemContext();

    return (
        <span
            role="presentation"
            aria-hidden="true"
            className={cn("text-slate-600", className)}
            {...props}
        >
            <Ellipsis className='w-4 h-4 text-slate-500' />
            <span className="sr-only">More</span>
        </span>
    );
}

export function BreadcrumbsSeparator({ children, className, ...props }: ComponentProps<'span'>) {
    useBreadcrumbsItemContext();

    return (
        <span
            aria-hidden="true"
            className={cn("text-slate-400", className)}
            {...props}
        >
            {children || <ChevronRight className='w-4 h-4' />}
        </span>
    );
}

