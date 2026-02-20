'use client'

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroup({ children, className, orientation = "horizontal" }: ButtonGroupProps) {
  return (
      <div
        role="group"
        data-orientation={orientation}
        data-slot="button-group"
        className={cn(
          "inline-flex items-stretch rounded-lg w-fit has-data-[slot=button-group]:gap-2 not-has-data-[slot=button-group]:shadow-white-md isolate",
          "[&>:not([data-slot=button-group]):not(:first-child):not(:last-child)]:rounded-none",
          orientation === "horizontal" ?
            [
              "[&>:not([data-slot=button-group]):not(:last-child)]:border-r",
              "[&>:not([data-slot=button-group]):first-child]:rounded-l-lg [&>:not([data-slot=button-group]):first-child:not(:only-child)]:rounded-r-none",
              "[&>:not([data-slot=button-group]):last-child]:rounded-r-lg [&>:not([data-slot=button-group]):last-child:not(:only-child)]:rounded-l-none",
            ] : [
              "[&>:not([data-slot=button-group]):not(:last-child)]:border-b",
              "[&>:not([data-slot=button-group]):first-child]:rounded-t-lg [&>:not([data-slot=button-group]):first-child:not(:only-child)]:rounded-b-none",
              "[&>:not([data-slot=button-group]):last-child]:rounded-b-lg [&>:not([data-slot=button-group]):last-child:not(:only-child)]:rounded-t-none",
              "flex-col"
            ],
          className
        )}
      >
        {children}
      </div>
  );
}

