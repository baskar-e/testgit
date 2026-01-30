import { createContext, useContext, ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { createSafeContext } from '@/lib/context';

interface BreadcrumbsContextProps {
  separator?: ReactNode;
}

interface BreadcrumbsProps extends ComponentProps<'nav'> {
  separator?: ReactNode;
}

const [BreadcrumbsProvider, useBreadcrumbsContext] = createSafeContext<BreadcrumbsContextProps>("Breadcrumbs");

export function Breadcrumbs({ 
  children, 
  className, 
  separator = <ChevronRight className="w-4 h-4" />,
  ...props 
}: BreadcrumbsProps) {
  return (
    <BreadcrumbsProvider value={{ separator }}>
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center", className)}
        {...props}
      >
        <ol className="flex items-center gap-2">
          {children}
        </ol>
      </nav>
    </BreadcrumbsProvider>
  );
}

export function BreadcrumbsList({ children, className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol 
      className={cn("flex items-center gap-2", className)} 
      {...props}
    >
      {children}
    </ol>
  );
}

interface BreadcrumbsItemProps extends ComponentProps<'li'> {
  isCurrentPage?: boolean;
}

export function BreadcrumbsItem({ 
  children, 
  className, 
  isCurrentPage = false,
  ...props 
}: BreadcrumbsItemProps) {
  const { separator } = useBreadcrumbsContext();

  return (
    <li 
      className={cn("flex items-center gap-2", className)} 
      {...props}
    >
      {children}
      {!isCurrentPage && (
        <span className="text-slate-400" aria-hidden="true">
          {separator}
        </span>
      )}
    </li>
  );
}

interface BreadcrumbsLinkProps extends ComponentProps<'a'> {
  isCurrentPage?: boolean;
}

export function BreadcrumbsLink({ 
  children, 
  className, 
  isCurrentPage = false,
  ...props 
}: BreadcrumbsLinkProps) {
  return (
    <a
      className={cn(
        "text-sm transition-colors",
        isCurrentPage 
          ? "text-slate-900 font-medium cursor-default" 
          : "text-slate-600 hover:text-slate-900",
        className
      )}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

export function BreadcrumbsSeparator({ 
  children, 
  className, 
  ...props 
}: ComponentProps<'span'>) {
  return (
    <span 
      className={cn("text-slate-400", className)} 
      aria-hidden="true"
      {...props}
    >
      {children}
    </span>
  );
}

interface BreadcrumbsEllipsisProps extends ComponentProps<'span'> {
  onClick?: () => void;
}

export function BreadcrumbsEllipsis({ 
  className, 
  onClick,
  ...props 
}: BreadcrumbsEllipsisProps) {
  return (
    <span
      className={cn(
        "flex items-center justify-center w-6 h-6 text-slate-600",
        onClick && "cursor-pointer hover:text-slate-900",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label="Show more breadcrumbs"
      {...props}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="7.5" r="1" fill="currentColor" />
        <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
        <circle cx="12" cy="7.5" r="1" fill="currentColor" />
      </svg>
    </span>
  );
}

export function BreadcrumbsPage({ 
  children, 
  className, 
  ...props 
}: ComponentProps<'span'>) {
  return (
    <span
      className={cn("text-sm text-slate-900 font-medium", className)}
      aria-current="page"
      {...props}
    >
      {children}
    </span>
  );
}