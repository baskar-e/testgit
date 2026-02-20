import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

type CheckboxProps = {
    label?: string;
    description?: string;
} & React.ComponentProps<'input'>

export const Checkbox = ({ label, description, className, ...props }: CheckboxProps) => {
    const id = useId();

    return (
        <div className="group grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1">
            <div className={cn(
                "relative flex items-center justify-center size-4.5 rounded border border-gray-300 bg-white shrink-0 shadow-md transition-all duration-200",
                "has-checked:bg-violet-800 has-checked:border-violet-800",
                "has-focus-visible:ring-2 has-focus-visible:ring-violet-500 has-focus-visible:ring-offset-1",
                "has-disabled:opacity-50",
                className
            )}>
                <input
                    id={id}
                    type="checkbox"
                    className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    {...props}
                />
                <CheckIcon className="peer-not-checked:hidden stroke-white w-3.5 pointer-events-none" />
            </div>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-ash cursor-pointer group-has-disabled:cursor-not-allowed group-has-disabled:opacity-70"
                >
                    {label}
                </label>
            )}
            {description && (
                <p className="col-start-2 text-sm text-gray-500 group-has-disabled:opacity-70">{description}</p>
            )}
        </div>
    );
};
