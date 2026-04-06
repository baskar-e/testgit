'use client'

import { ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";
import { createSafeContext } from "@/lib/context";

interface SwitchContextProps {
    checked: boolean
}

type UnControlledProps = {
    defaultValue?: boolean;
    value?: never;
    onValueChange?: (value: boolean) => void;
}

type ControlledProps = {
    defaultValue?: never;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

type SwitchProps = {
} & (UnControlledProps | ControlledProps) & Omit<ComponentProps<"input">, "type" | "role" | "value" | "defaultValue">;

const [SwitchProvider, useSwitchContext] = createSafeContext<SwitchContextProps>("Switch");

export function Switch({ children, className, defaultValue, value: controlledCheck, onValueChange, ...props }: SwitchProps) {
    const [internalCheck, setInternalCheck] = useState(defaultValue ?? false);
    const checked = controlledCheck ?? internalCheck;

    const handleCheck = (check: boolean) => {
        if (controlledCheck === undefined) {
            setInternalCheck(check)
        }
        onValueChange?.(check);
    }

    return (
        <SwitchProvider value={{ checked }}>
            <div className="group relative inline-flex items-center w-fit shrink-0">
                <input
                    {...props}
                    type="checkbox"
                    role="switch"
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    checked={checked}
                    onChange={(e) => handleCheck(e.target.checked)}
                />
                <span
                    aria-hidden="true"
                    data-state={checked ? 'checked' : 'unchecked'}
                    className={cn(
                        "flex items-center h-6 w-11 rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200",
                        "group-has-checked:bg-violet-800 group-has-disabled:opacity-50 group-has-disabled:cursor-not-allowed",
                        "group-has-focus-visible:ring-2 group-has-focus-visible:ring-violet-500 group-has-focus-visible:ring-offset-2",
                        "dark:bg-zinc-700 dark:group-has-checked:bg-violet-800 dark:group-has-focus-visible:ring-violet-600 dark:group-has-focus-visible:ring-offset-zinc-900",
                        className
                    )}
                >
                    {children ?? <SwitchThumb className="bg-white shadow-lg dark:bg-zinc-900" />}
                </span>
            </div>
        </SwitchProvider>
    );
}

export function SwitchThumb({ children, className }: ComponentProps<"span">) {
    const { checked } = useSwitchContext();

    return (
        <span
            data-state={checked ? 'checked' : 'unchecked'}
            className={cn(
                "flex items-center justify-center h-full w-1/2 p-0.5 rounded-full overflow-hidden transition-transform duration-200 translate-x-0 group-has-checked:translate-x-full",
                "*:size-full *:first:group-has-checked:hidden *:last:group-not-has-checked:hidden",
                className
            )}
        >
            {children}
        </span>
    )
}
