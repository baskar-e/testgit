import React, { ComponentProps, ReactNode, useMemo } from 'react';

import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs, BreadcrumbsEllipsis, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsPage, BreadcrumbsSeparator } from './breadcrumbs';

type BreadcrumbConfig = {
    [path: string]: {
        label?: string;
        href?: string;
        icon?: ReactNode;
        hide?: boolean;
    };
};

interface DynamicBreadcrumbsProps extends Omit<ComponentProps<'nav'>, 'children'> {
    separator?: ReactNode;
    homeIcon?: boolean;
    config?: BreadcrumbConfig;
    maxItems?: number;
    homePath?: string;
    homeLabel?: string;
    capitalize?: boolean;
    replaceDelimiters?: boolean;
    formatSegment?: (segment: string) => string;
}

export function DynamicBreadcrumbs({
    homeIcon = false,
    config = {},
    maxItems,
    homePath = '/',
    homeLabel = 'Home',
    capitalize = true,
    replaceDelimiters = true,
    formatSegment,
}: DynamicBreadcrumbsProps) {
    const pathname = usePathname();

    // Generate breadcrumb items from pathname
    const breadcrumbs = useMemo(() => {
        const segments = pathname.split('/').filter(Boolean);

        const items = segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/');
            const customConfig = config[href] || config[segment];

            if (customConfig?.hide) return null;

            let label = customConfig?.label || segment;

            if (formatSegment && !customConfig?.label) {
                label = formatSegment(segment);
            } else if (!customConfig?.label) {
                if (replaceDelimiters) {
                    label = label.replace(/[-_]/g, ' ');
                }
                if (capitalize) {
                    label = label
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                }
            }

            return {
                label,
                href: customConfig?.href || href,
                icon: customConfig?.icon,
                isLast: index === segments.length - 1,
            };
        }).filter(Boolean);

        return items;
    }, [pathname, config, formatSegment, capitalize, replaceDelimiters]);

    // Handle collapsed breadcrumbs if maxItems is set
    const displayedBreadcrumbs = useMemo(() => {
        if (!maxItems || breadcrumbs.length <= maxItems) {
            return breadcrumbs;
        }

        const first = breadcrumbs[0];
        const last = breadcrumbs[breadcrumbs.length - 1];

        return [
            first,
            { label: '...', href: '', icon: null, isLast: null, isEllipsis: true },
            last,
        ];
    }, [breadcrumbs, maxItems]);

    return (
        <Breadcrumbs>
            <BreadcrumbsItem className="flex items-center gap-2">
                <BreadcrumbsLink href={homePath}>
                    {homeIcon ? (
                        <Home className="w-4 h-4" />
                    ) : (
                        homeLabel
                    )}
                </BreadcrumbsLink>
            </BreadcrumbsItem>

            {displayedBreadcrumbs.map((crumb, index) => {
                if (!crumb) return null;

                const isLast = crumb?.isLast;
                const isEllipsis = 'isEllipsis' in crumb && crumb.isEllipsis;

                return (
                    <BreadcrumbsItem key={crumb.href || index}>
                        {isEllipsis ? (
                            <BreadcrumbsEllipsis />
                        ) : isLast ? (
                            <BreadcrumbsPage>
                                {crumb?.icon && crumb?.icon}
                                {crumb.label}
                            </BreadcrumbsPage>
                        ) : (
                            <BreadcrumbsLink href={crumb.href}>
                                {crumb?.icon && crumb?.icon}
                                {crumb.label}
                            </BreadcrumbsLink>
                        )}
                    </BreadcrumbsItem>
                );
            })}
        </Breadcrumbs>
    );
}

// Expandable version with "show all" functionality
interface ExpandableDynamicBreadcrumbsProps extends DynamicBreadcrumbsProps {
    initialMaxItems?: number;
    expandLabel?: string;
}

export function ExpandableDynamicBreadcrumbs({
    initialMaxItems = 3,
    expandLabel = 'show all',
    ...props
}: ExpandableDynamicBreadcrumbsProps) {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <div className="flex items-center gap-2">
            <DynamicBreadcrumbs
                {...props}
                maxItems={expanded ? undefined : initialMaxItems}
            />

            {/* Show expand button if there are more items */}
            {!expanded && props.maxItems && (
                <button
                    onClick={() => setExpanded(true)}
                    className="text-xs text-slate-600 hover:text-slate-900 underline"
                    aria-label={expandLabel}
                >
                    {expandLabel}
                </button>
            )}
        </div>
    );
}