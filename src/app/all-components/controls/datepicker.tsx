import React, { useState, useRef, ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { createSafeContext } from '@/lib/context';
import { autoUpdate, flip, FloatingFocusManager, FloatingPortal, offset, OffsetOptions, Placement, shift, useClick, useDismiss, useFloating, useInteractions, useListNavigation, useRole } from '@floating-ui/react';
import { FloatingContextType } from '@/types';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) return false;
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}

function isToday(date: Date): boolean {
    return isSameDay(date, new Date());
}

interface DatePickerContextValue {
    selectedDate: Date | null;
    currentMonth: number;
    currentYear: number;
    onDateSelect: (date: Date) => void;
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
    minDate?: Date;
    maxDate?: Date;
}

interface DatePickerProps {
    open?: boolean;
    onOpen?: (open: boolean) => void
    value?: Date | null;
    defaultValue?: Date | null;
    onChange?: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    children: React.ReactNode;
    position?: Placement;
    space?: OffsetOptions;
}

interface DatePickerTriggerProps extends ComponentProps<'button'> {
    placeholder?: string;
    format?: (date: Date) => string;
}

interface DatePickerPresetProps extends ComponentProps<'button'> {
    date: Date;
}

const [DatePickerProvider, useDatePickerContext] = createSafeContext<DatePickerContextValue & FloatingContextType>("DatePicker");

export function DatePicker({
    open,
    onOpen,
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    children,
    position,
    space = 8
}: DatePickerProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue || null);
    const [currentMonth, setCurrentMonth] = useState((value || defaultValue || new Date()).getMonth());
    const [currentYear, setCurrentYear] = useState((value || defaultValue || new Date()).getFullYear());

    const isOpen = open ?? internalOpen;
    const setIsOpen = onOpen ?? setInternalOpen;

    const isControlled = value !== undefined;
    const date = isControlled ? value : selectedDate;

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const listRef = useRef<Array<HTMLElement | null>>([]);

    const handleDateSelect = (newDate: Date) => {
        if (!isControlled) {
            setSelectedDate(newDate);
        }
        onChange?.(newDate);
    };

    const { refs, context, placement, floatingStyles } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: position,
        whileElementsMounted: autoUpdate,
        middleware: [offset(space), flip(), shift({ padding: 5 })],
    });

    const listNav = useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'menu' });

    const { getFloatingProps, getReferenceProps, getItemProps } = useInteractions([click, dismiss, role, listNav]);

    return (
        <DatePickerProvider
            value={{
                selectedDate: date,
                currentMonth,
                currentYear,
                onDateSelect: handleDateSelect,
                onMonthChange: setCurrentMonth,
                onYearChange: setCurrentYear,
                minDate,
                maxDate,
                isOpen, listRef, activeIndex, refs, context, placement, floatingStyles, setIsOpen, getFloatingProps, getReferenceProps, getItemProps
            }}
        >
            {children}
        </DatePickerProvider>
    );
}

export function DatePickerTrigger({
    placeholder = 'Select date',
    format = (date) => date.toLocaleDateString(),
    className,
    ...props
}: DatePickerTriggerProps) {
    const { selectedDate, isOpen, refs, getReferenceProps } = useDatePickerContext();

    return (
        <button
            ref={refs.setReference}
            type="button"
            data-state={isOpen ? 'open' : 'closed'}
            className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-sm border border-slate-300 rounded-lg",
                "hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
                !selectedDate && "text-slate-500",
                className
            )}
            {...getReferenceProps(props)}
        >
            <span>{selectedDate ? format(selectedDate) : placeholder}</span>
            <CalendarIcon className="w-4 h-4 ml-2 text-slate-400" />
        </button>
    );
}

export function DatePickerContent({ className, ...props }: ComponentProps<'div'>) {
    const { isOpen, refs, listRef, placement, floatingStyles, getFloatingProps, context } = useDatePickerContext();
    const contentRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    return (
        <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
                <div
                    ref={refs.setFloating}
                    style={{ ...floatingStyles, zIndex: 50 }}
                    {...getFloatingProps()}
                >
                    <div
                        ref={contentRef}
                        className={cn(
                            "p-3 bg-white border border-slate-200 rounded-lg shadow-lg",
                            className
                        )}
                        {...props}
                    />
                </div>
            </FloatingFocusManager>
        </FloatingPortal>
    );
}

export function DatePickerHeader({ className, ...props }: ComponentProps<'div'>) {
    const { currentMonth, currentYear, onMonthChange, onYearChange } = useDatePickerContext();

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            onMonthChange(11);
            onYearChange(currentYear - 1);
        } else {
            onMonthChange(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            onMonthChange(0);
            onYearChange(currentYear + 1);
        } else {
            onMonthChange(currentMonth + 1);
        }
    };

    return (
        <div className={cn("flex items-center justify-between mb-3", className)} {...props}>
            <button
                type="button"
                aria-label="previous month"
                className="p-1 rounded hover:bg-slate-100 transition-colors"
                onClick={handlePrevMonth}
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="font-semibold text-sm">
                {MONTHS[currentMonth]} {currentYear}
            </div>
            <button
                type="button"
                aria-label="next month"
                className="p-1 rounded hover:bg-slate-100 transition-colors"
                onClick={handleNextMonth}
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}

export function DatePickerGrid({ className, ...props }: ComponentProps<'div'>) {
    const { currentMonth, currentYear, selectedDate, onDateSelect, minDate, maxDate } = useDatePickerContext();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(currentYear, currentMonth, day));
    }

    const isDateDisabled = (date: Date | null): boolean => {
        if (!date) return true;
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
    };

    return (
        <div className={cn("", className)} {...props}>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium text-slate-600 py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                    if (!date) {
                        return <div key={`empty-${index}`} />;
                    }

                    const isSelected = isSameDay(date, selectedDate);
                    const isCurrentDay = isToday(date);
                    const isDisabled = isDateDisabled(date);

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => !isDisabled && onDateSelect(date)}
                            disabled={isDisabled}
                            className={cn(
                                "h-7.5 w-7.5 text-xs rounded-md transition-colors",
                                "hover:bg-slate-100",
                                "focus:outline-none focus:ring-2 focus:ring-violet-500",
                                isSelected && "bg-violet-500 text-white hover:bg-violet-600",
                                isCurrentDay && !isSelected && "border border-violet-500 text-violet-500",
                                isDisabled && "text-slate-300 cursor-not-allowed hover:bg-transparent",
                                !isSelected && !isDisabled && "text-slate-900"
                            )}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export function DatePickerFooter({ className, children, ...props }: ComponentProps<'div'>) {
    return (
        <div
            className={cn("flex items-center justify-between mt-3 pt-3 border-t", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function DatePickerPreset({ date, children, className, ...props }: DatePickerPresetProps) {
    const { onDateSelect } = useDatePickerContext();

    return (
        <button
            type="button"
            onClick={() => onDateSelect(date)}
            className={cn(
                "px-3 py-1.5 text-xs rounded-md border border-slate-200",
                "hover:bg-slate-100 transition-colors",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export function DatePickerClear({ children = 'Clear', className, ...props }: ComponentProps<'button'>) {
    const { onDateSelect } = useDatePickerContext();

    return (
        <button
            type="button"
            onClick={() => onDateSelect(null as any)}
            className={cn(
                "px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}