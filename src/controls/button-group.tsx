'use client'

// import { cn } from '@/lib/utils';
// import React, { ReactNode } from 'react'

// interface ButtonGroup {
//     children: ReactNode[]
//     className?: string
// }

// export default function ButtonGroup({ children, className }: ButtonGroup) {
//     const childrenArray = React.Children.toArray(children).filter(React.isValidElement);
//     return (
//         <div className={cn("inline-flex rounded-lg shadow-sm", className)} role="group">
//             {childrenArray.map((child, index) => {
//                 if (child.type === React.Fragment) return child;
//                 const isFirst = index === 0;
//                 const isLast = index === childrenArray.length - 1;
//                 const childClass = cn(
//                     "px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
//                     isFirst && "rounded-l-lg",
//                     isLast && "rounded-r-lg",
//                     !isFirst && !isLast && "rounded-none -ml-px"
//                 );

//                 return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
//                     className: cn(childClass, (child.props as any).className),
//                 });
//             })}
//         </div>

//     )
// }


import { createContext, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const ButtonGroupContext = createContext<boolean>(false);

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className }: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={true}>
      <div 
        role="group" 
        className={cn(
          "inline-flex rounded-lg w-fit shadow-sm isolate", 
          "[&>button:not(:first-child)]:-ml-px",
          "[&>button:first-child]:rounded-l-lg [&>button:first-child]:rounded-r-none",
          "[&>button:last-child]:rounded-r-lg [&>button:last-child]:rounded-l-none",
          "[&>button:not(:first-child):not(:last-child)]:rounded-none",
          className
        )}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}

