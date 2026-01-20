import { createSafeContext } from "@/lib/context";
import { cn } from "@/lib/utils";
import { useState, ComponentProps, useId } from "react";

interface RadioContextProps extends ComponentProps<"div"> {
    uniqName?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    handleValueChange?: (value: string) => void
}

type RadioGroupBaseProps = {
    name?: string;
    disabled?: boolean;
    required?: boolean;
    onValueChange?: (value: string) => void;
} & Omit<ComponentProps<"div">, "value" | "defaultValue">;

type ControlledRadioGroup = {
    value: string;
    defaultValue?: never;
};

type UncontrolledRadioGroup = {
    defaultValue?: string;
    value?: never;
};

type RadioGroupProps = RadioGroupBaseProps & (ControlledRadioGroup | UncontrolledRadioGroup);

type RadioItemProps = {
    id?: string;
    value: string;
    disabled?: boolean
} & ComponentProps<"label">

const [RadioGroupProvider, useRadioGroupContext] = createSafeContext<RadioContextProps>('Combobox');

export function RadioGroup({ name, value: controlledValue, defaultValue = "", onValueChange, children, className, disabled, required = false, ...props }: RadioGroupProps) {
    const uniqName = name ?? useId();
    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };

    return (
        <RadioGroupProvider value={{ uniqName, value, disabled, required, handleValueChange }}>
            <div role="radiogroup" aria-required={required} aria-disabled={disabled} className={cn('flex gap-2 text-violet-900', className)} {...props}>
                {children}
            </div>
        </RadioGroupProvider>
    );
}

export function RadioItem({ id, value: itemValue, children, className, disabled: itemDisabled, ...props }: RadioItemProps) {
    const { uniqName, value, disabled: groupDisabled, required, handleValueChange } = useRadioGroupContext();

    const uid = id ?? useId();

    const isChecked = value === itemValue;
    const isDisabled = groupDisabled || itemDisabled;

    return (
        <label
            {...props}
            htmlFor={!isDisabled ? uid : undefined}
            className={cn(
                "group relative flex items-center gap-2 cursor-pointer transition-all",
                isDisabled && "opacity-50 cursor-not-allowed grayscale-[0.5]",
                className
            )}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="rounded-full transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-has-focus-visible:ring-2 group-has-focus-visible:ring-[currentColor]/30 group-has-focus-visible:ring-offset-1 group-has-focus-visible:ring-offset-transparent"
            >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" fill="currentColor" className={isChecked ? 'block' : 'hidden'} />
            </svg>
            <input
                type="radio"
                id={uid}
                name={uniqName}
                value={itemValue}
                checked={isChecked}
                disabled={isDisabled}
                required={required}
                data-state={isChecked ? 'checked' : 'unchecked'}
                onChange={() => !isDisabled && handleValueChange?.(itemValue)}
                className="sr-only peer"
            />
            {children}
        </label>
    );
}
