'use client'

import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { ButtonGroupContext } from './button-group';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white'

const buttonVariants: Record<ButtonVariant, string> = {
    primary: "bg-violet-500 text-white hover:bg-violet-600 focus:ring-2 focus:ring-violet-500",
    secondary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500",
    ghost: "bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500",
    white: "bg-white text-ash border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
};

interface ButtonProps extends React.ComponentProps<"button"> {
    variant?: ButtonVariant;
}

export function Button({ className, variant, type = 'button', ...props }: ButtonProps) {
    const isGrouped = useContext(ButtonGroupContext);

    return (
        <button
            type={type}
            className={cn(
                'px-4 py-2 text-ash text-sm font-medium rounded-lg focus:z-10 focus:outline-none transition-colors',
                !isGrouped && "rounded-lg",
                variant && buttonVariants[variant], className)}
            {...props}
        />
    );
}


