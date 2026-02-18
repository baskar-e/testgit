import React, { useState, useRef, ComponentProps, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { createSafeContext } from '@/lib/context';
import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingPortal,
    offset,
    OffsetOptions,
    Placement,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole
} from '@floating-ui/react';
import { FloatingContextType } from '@/types';

interface DatePickerContextValue {
    selectedDate: Date | null;
    currentMonth: number;
    currentYear: number;
    onDateSelect: (date: Date) => void;
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
    minDate?: Date;
    maxDate?: Date;
    // Keyboard navigation
    focusedDate: Date | null;
    setFocusedDate: (date: Date | null) => void;
}

type ControlledDatePickerProps = {
    value: Date | null;
    defaultValue?: never;
}

type UnControlledDatePickerProps = {
    defaultValue?: Date | null;
    value?: never;
}

type DatePickerProps = {
    open?: boolean;
    onOpen?: (open: boolean) => void
    onValueChange?: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    children: React.ReactNode;
    position?: Placement;
    space?: OffsetOptions;
} & (ControlledDatePickerProps | UnControlledDatePickerProps)

type DatePickerTriggerProps = {
    placeholder?: string;
    format?: (date: Date) => string;
} & ComponentProps<'button'>

type DatePickerPresetProps = {
    date: Date;
} & ComponentProps<'button'>

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

const [DatePickerProvider, useDatePickerContext] = createSafeContext<DatePickerContextValue & Omit<FloatingContextType, "activeIndex" | "listRef" | "getItemProps">>("DatePicker");

export function DatePicker({
    open,
    onOpen,
    value,
    defaultValue,
    onValueChange,
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
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);

    const isOpen = open ?? internalOpen;
    const setIsOpen = onOpen ?? setInternalOpen;

    const isControlled = value !== undefined;
    const date = isControlled ? value : selectedDate;

    useEffect(() => {
        if (isOpen && !focusedDate) {
            const initialFocus = date || new Date();
            setFocusedDate(initialFocus);
            setCurrentMonth(initialFocus.getMonth());
            setCurrentYear(initialFocus.getFullYear());
        }
    }, [isOpen, date, focusedDate]);

    const handleDateSelect = (newDate: Date) => {
        if (!isControlled) {
            setSelectedDate(newDate);
        }
        onValueChange?.(newDate);
    };

    const { refs, context, placement, floatingStyles } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: position,
        whileElementsMounted: autoUpdate,
        middleware: [offset(space), flip(), shift({ padding: 5 })],
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'dialog' });

    const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss, role]);

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
                focusedDate,
                setFocusedDate,
                isOpen,
                setIsOpen,
                refs,
                context,
                placement,
                floatingStyles,
                getFloatingProps,
                getReferenceProps,
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
    const {
        isOpen,
        refs,
        floatingStyles,
        getFloatingProps,
        context,
        setIsOpen,
        focusedDate,
        setFocusedDate,
        currentMonth,
        currentYear,
        onMonthChange,
        onYearChange,
        onDateSelect,
        minDate,
        maxDate
    } = useDatePickerContext();

    const contentRef = useRef<HTMLDivElement>(null);

    // Keyboard navigation handler
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!focusedDate) return;

        const isDateDisabled = (date: Date): boolean => {
            if (minDate && date < minDate) return true;
            if (maxDate && date > maxDate) return true;
            return false;
        };

        let newDate = new Date(focusedDate);
        let handled = false;

        switch (e.key) {
            case 'ArrowLeft':
                newDate.setDate(newDate.getDate() - 1);
                handled = true;
                break;

            case 'ArrowRight':
                newDate.setDate(newDate.getDate() + 1);
                handled = true;
                break;

            case 'ArrowUp':
                newDate.setDate(newDate.getDate() - 7);
                handled = true;
                break;

            case 'ArrowDown':
                newDate.setDate(newDate.getDate() + 7);
                handled = true;
                break;

            case 'Home':
                const day = newDate.getDay();
                newDate.setDate(newDate.getDate() - day);
                handled = true;
                break;

            case 'End':
                const currentDay = newDate.getDay();
                newDate.setDate(newDate.getDate() + (6 - currentDay));
                handled = true;
                break;

            case 'PageUp':
                if (e.shiftKey) {
                    newDate.setFullYear(newDate.getFullYear() - 1);
                } else {
                    newDate.setMonth(newDate.getMonth() - 1);
                }
                handled = true;
                break;

            case 'PageDown':
                if (e.shiftKey) {
                    newDate.setFullYear(newDate.getFullYear() + 1);
                } else {
                    newDate.setMonth(newDate.getMonth() + 1);
                }
                handled = true;
                break;

            case 'Enter':
            case ' ':
                if (!isDateDisabled(focusedDate)) {
                    onDateSelect(focusedDate);
                    setIsOpen(false);
                }
                e.preventDefault();
                return;

            case 'Escape':
                setIsOpen(false);
                e.preventDefault();
                return;
        }

        if (handled) {
            e.preventDefault();

            // Skip disabled dates
            if (!isDateDisabled(newDate)) {
                setFocusedDate(newDate);

                // Update month/year if necessary
                if (newDate.getMonth() !== currentMonth) {
                    onMonthChange(newDate.getMonth());
                }
                if (newDate.getFullYear() !== currentYear) {
                    onYearChange(newDate.getFullYear());
                }
            }
        }
    };

    if (!isOpen) return null;

    return (
        <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
                <div
                    ref={refs.setFloating}
                    style={{ ...floatingStyles, zIndex: 50 }}
                    {...getFloatingProps()}
                    onKeyDown={handleKeyDown}
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
                aria-label="Previous month"
                tabIndex={-1}
                className="p-1 rounded hover:bg-slate-100 transition-colors"
                onClick={handlePrevMonth}
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="font-semibold text-sm" aria-live="polite">
                {MONTHS[currentMonth]} {currentYear}
            </div>
            <button
                type="button"
                aria-label="Next month"
                tabIndex={-1}
                className="p-1 rounded hover:bg-slate-100 transition-colors"
                onClick={handleNextMonth}
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}

export function DatePickerGrid({ className, ...props }: ComponentProps<'div'>) {
    const {
        currentMonth,
        currentYear,
        selectedDate,
        onDateSelect,
        minDate,
        maxDate,
        focusedDate,
        setFocusedDate,
        setIsOpen,
        onMonthChange,
        onYearChange
    } = useDatePickerContext();

    const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const days: Array<{
        date: Date;
        isCurrentMonth: boolean;
    }> = [];

    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        days.push({
            date: new Date(currentYear, currentMonth - 1, day),
            isCurrentMonth: false
        });
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push({
            date: new Date(currentYear, currentMonth, day),
            isCurrentMonth: true
        });
    }

    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
        days.push({
            date: new Date(currentYear, currentMonth + 1, day),
            isCurrentMonth: false
        });
    }

    const isDateDisabled = (date: Date): boolean => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
    };

    const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
        if (isDateDisabled(date)) return;

        if (!isCurrentMonth) {
            onMonthChange(date.getMonth());
            onYearChange(date.getFullYear());
        }

        onDateSelect(date);
        setIsOpen(false);
    };

    return (
        <div className={cn(className)} {...props}>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium text-slate-600 py-2"
                        aria-label={`${day}day`}
                    >
                        {day}
                    </div>
                ))}
            </div>
            <div
                className="grid grid-cols-7 gap-1"
                role="grid"
                aria-label="Calendar days"
            >
                {days.map(({ date, isCurrentMonth }, index) => {
                    const isSelected = isSameDay(date, selectedDate);
                    const isCurrentDay = isToday(date);
                    const isFocused = isSameDay(date, focusedDate);
                    const isDisabled = isDateDisabled(date);

                    return (
                        <button
                            key={index}
                            type="button"
                            role="gridcell"
                            aria-label={date.toLocaleDateString()}
                            aria-selected={isSelected}
                            aria-disabled={isDisabled}
                            tabIndex={isFocused ? 0 : -1}
                            onClick={() => handleDateClick(date, isCurrentMonth)}
                            onFocus={() => setFocusedDate(date)}
                            disabled={isDisabled}
                            className={cn(
                                "h-7.5 w-7.5 text-xs rounded-md transition-colors",
                                "hover:bg-slate-100",
                                "focus:outline-none focus:ring-2 focus:ring-violet-500",
                                isSelected && "bg-violet-500 text-white hover:bg-violet-600",
                                isFocused && !isSelected && "ring-2 ring-violet-300",
                                isCurrentDay && !isSelected && "border border-violet-500 text-violet-500",
                                isDisabled && "text-slate-300 cursor-not-allowed hover:bg-transparent opacity-50",
                                !isCurrentMonth && !isSelected && !isDisabled && "text-slate-400",
                                isCurrentMonth && !isSelected && !isDisabled && "text-slate-900"
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
    useDatePickerContext();
    
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
    const { onDateSelect, setIsOpen } = useDatePickerContext();

    return (
        <button
            type="button"
            tabIndex={-1}
            onClick={() => {
                onDateSelect(date);
                setIsOpen(false);
            }}
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
    const { onDateSelect, setIsOpen } = useDatePickerContext();

    return (
        <button
            type="button"
            tabIndex={-1}
            onClick={() => {
                onDateSelect(null as any);
                setIsOpen(false);
            }}
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