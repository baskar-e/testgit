import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type InputGroupAddonProps = {
    children: ReactNode;
    className?: string;
};

type InputGroupProps = {
    children: ReactNode;
    className?: string;
};

export function InputGroupAddon({ children, className, }: InputGroupAddonProps) {
    return (
        <span
            className={cn(
                "flex items-center px-3 text-ash",
                className
            )}
        >
            {children}
        </span>
    );
}

export function InputGroup({ children, className }: InputGroupProps) {
    return (
        <div
            className={cn(
                "flex items-stretch rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-violet-500",
                className
            )}
        >
            {children}
        </div>
    );
}





