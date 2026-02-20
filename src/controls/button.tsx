'use client'

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white' | 'outline';

type ButtonSize = 'xs' |'sm' | 'md' | 'lg';

const buttonVariants: Record<ButtonVariant, string> = {
    primary: "bg-violet-500 text-white hover:bg-violet-600 focus:ring-2 focus:ring-violet-500",
    secondary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500",
    ghost: "bg-gray-200 text-slate-800 border border-gray-300 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500",
    outline: "bg-transparent text-slate-800 border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:border-gray-400",
    white: "bg-white text-slate-800 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:border-gray-300",
};

const buttonSizes: Record<ButtonSize, string> = {
    xs: "rounded-md px-2 py-1 text-xs",
    sm: "rounded-md px-2.5 py-[0.3rem] text-[0.8rem]",
    md: "rounded-lg px-2.5 py-1.5 text-sm",
    lg: "rounded-lg px-3 py-2 text-sm",
};

interface ButtonProps extends React.ComponentProps<"button"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

export function Button({ className, variant, size = "md", type = 'button', ...props }: ButtonProps) {
    return (
        <button
            type={type}
            data-variant={variant}
            data-size={size}
            className={cn(
                'inline-flex items-center justify-center text-ash font-medium shrink-0 focus:z-10 focus:outline-none transition-colors',
                variant && buttonVariants[variant],
                size && buttonSizes[size],
                className
                )}
            {...props}
        />
    );
}


