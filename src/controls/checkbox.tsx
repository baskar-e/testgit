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
        <div className="group flex items-start gap-3">
            <div className={cn(
                "group relative flex items-center justify-center h-5 w-5 rounded border border-gray-300 bg-white transition-all duration-200",
                "has-checked:bg-violet-800 has-checked:border-violet-800",
                "has-focus-visible:ring-2 has-focus-visible:ring-violet-500 has-focus-visible:ring-offset-1",
                "has-disabled:opacity-50",
                className
            )}>
                <input
                    id={id}
                    type="checkbox"
                    className="peer absolute size-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    {...props}
                />
                <CheckIcon className="group-not-has-checked:hidden stroke-white w-4" />
            </div>
            {
                (label || description) && (
                    <div className="grid gap-1.5 leading-none">
                        {label && (
                            <label
                                htmlFor={id}
                                className="text-sm font-medium text-ash cursor-pointer group-has-disabled:cursor-not-allowed group-has-disabled:opacity-70"
                            >
                                {label}
                            </label>
                        )}
                        {description && (
                            <p className="text-sm text-gray-500">{description}</p>
                        )}
                    </div>
                )
            }
        </div >
    );
};
