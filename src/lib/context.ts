// lib/context.ts
import { useContext, createContext } from 'react';

export function createSafeContext<T>(componentName: string) {
  const ReactContext = createContext<T | null>(null);

  function useSafeContext() {
    const context = useContext(ReactContext);
    if (!context) {
      throw new Error(
        `${componentName} components must be wrapped in <${componentName} />`
      );
    }
    return context;
  }

  return [ReactContext, useSafeContext] as const;
}
