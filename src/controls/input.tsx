import { cn } from '@/lib/utils';
import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex w-full bg-white px-3 py-2 text-sm rounded-lg outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";