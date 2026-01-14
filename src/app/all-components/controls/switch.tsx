import { useId, ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";
import { createSafeContext } from "@/lib/context";

interface SwitchContextProps {
    checked: boolean
}

type SwitchProps = {
    value?: boolean;
    onValueChange?: (value: boolean) => void;
} & Omit<ComponentProps<"input">, "type" | "role" | "value">;

const [SwitchProvider, useSwitchContext] = createSafeContext<SwitchContextProps>("Switch");

export function Switch({ id: providedId, children, className, value: controlledCheck, onValueChange, ...props }: SwitchProps) {
    const [internalCheck, setInternalCheck] = useState(false);
    const generatedId = useId();
    const id = providedId ?? generatedId;
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
                    id={id}
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
                        "flex items-center h-6 w-11 rounded-full border-2 border-transparent transition-colors duration-200",
                        "bg-slate-200 group-has-checked:bg-violet-800 group-has-disabled:opacity-50 group-has-disabled:cursor-not-allowed",
                        "group-has-focus-visible:ring-2 group-has-focus-visible:ring-violet-500 group-has-focus-visible:ring-offset-2",
                        className
                    )}
                >
                    {children ?? <SwitchIcon className="bg-white" />}
                </span>
            </div>
        </SwitchProvider>
    );
}

export function SwitchIcon({ children, className }: ComponentProps<"span">) {
    const { checked } = useSwitchContext();

    return (
        <span
            data-state={checked ? 'checked' : 'unchecked'}
            className={cn("flex items-center justify-center h-full w-1/2 rounded-full shadow-lg overflow-hidden transition-transform duration-200 translate-x-0 group-has-checked:translate-x-full", className)}
        >
            {children}
        </span>
    )
}
