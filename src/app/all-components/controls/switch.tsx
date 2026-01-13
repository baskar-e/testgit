import { useId, useState, ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SwitchProps = {
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
} & Omit<ComponentProps<"input">, "type" | "onChange" | "checked" | "defaultChecked">;

export function Switch({ 
    label, 
    checked: controlledChecked, 
    defaultChecked, 
    onCheckedChange, 
    className, 
    ...props 
}: SwitchProps) {
    const id = useId();
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        if (!isControlled) setInternalChecked(newValue);
        onCheckedChange?.(newValue);
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <label 
                htmlFor={id} 
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2"
                style={{ backgroundColor: isChecked ? '#7c3aed' : '#e2e8f0' }}
            >
                <input
                    {...props}
                    type="checkbox"
                    id={id}
                    role="switch"
                    aria-checked={isChecked}
                    checked={isChecked}
                    onChange={handleChange}
                    className="sr-only peer"
                />
                {/* Switch Thumb */}
                <span
                    aria-hidden="true"
                    className={cn(
                        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                        isChecked ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </label>
            {label && <label htmlFor={id} className="text-sm font-medium">{label}</label>}
        </div>
    );
}
