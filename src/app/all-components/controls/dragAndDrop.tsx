import { useState, useCallback, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, CircleCheckBig, Move, X } from 'lucide-react';

import {
    DndContext,
    DragOverlay,
    closestCorners,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    UniqueIdentifier,
    useDroppable,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { useSidebar } from '@/components/ui/sidebar';
import { MenuItemProps } from '@/types';
import sidebarData from '@/data/sidebar-data.json';

// Types
interface LeftbarState {
    available: MenuItemProps[];
    leftmenu: MenuItemProps[];
}

type ContainerId = 'available' | 'leftmenu';

interface LeftMenuProps {
    className?: string;
    containerClass?: string;
    headerClass?: string;
}

type SortableListProps = {
    id: string;
    list: MenuItemProps[]
    onRemove?: (prev: MenuItemProps, next: MenuItemProps) => void;
}

type SortableItemProps = {
    id: UniqueIdentifier;
    data: MenuItemProps;
    overlay?: boolean;
    onRemove?: () => void;
}

const SortableItem = memo<SortableItemProps>(({ id, data, onRemove, overlay = true }) => {
    const { setNodeRef, transform, transition, isDragging, attributes, listeners } = useSortable({ id });
    const style = { transition, transform: CSS.Transform.toString(transform) };

    return (
        <li ref={setNodeRef} style={style} className={`group/list flex items-center gap-x-1.5 xl:gap-x-2.5 border border-[#BFCBD3] text-xs xl:text-sm rounded-lg px-2 xl:pl-3.5 xl:pr-2.5 min-h-9 xl:min-h-10 
        ${isDragging ? 'opacity-50' : ''} ${(data.parentId && overlay) ? 'ml-[12%]' : ''}`}>
            <Move {...attributes} {...listeners} width={12} height={12} className='shrink-0' />
            <span className="text-nowrap text-ellipsis overflow-hidden mr-auto">{data.title}</span>
            <button className='group-[.hook]/left:group-hover/list:block hidden shrink-0' onClick={onRemove}>
                <X width={14} height={14} />
            </button>
        </li>
    )
})

export const SortableList = memo<SortableListProps>(({ id, list, onRemove }) => {
    const { setNodeRef } = useDroppable({ id });

    const listItem = useMemo(() => (list.map((left, i) => {
        const prev = list[i - 1];
        return <SortableItem key={left.id} id={left.id} data={left} onRemove={() => onRemove?.(prev, left)} />
    })), [list])

    return (
        <SortableContext id={id} items={list} strategy={verticalListSortingStrategy}>
            <ul ref={setNodeRef} className='h-auto has-[li]:border border-dashed border-[#BFCBD3] rounded-lg p-2.5 xl:p-3.5 mr-2 my-0.5 space-y-2 xl:space-y-2.5'>
                {listItem}
            </ul>
        </SortableContext>
    )
})

export default function Sortable({
    className,
    containerClass,
    headerClass
}: LeftMenuProps) {
    const [leftbar, setLeftbar] = useState<LeftbarState>({
        available: [],
        leftmenu: sidebarData,
    });

    const {sidebarLayout, setSidebarLayout} = useSidebar();

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );

    const findContainer = useCallback((id: UniqueIdentifier): ContainerId | null => {
        if (id in leftbar) {
            return id as ContainerId;
        }

        return Object.keys(leftbar).find(
            (key) => leftbar[key as ContainerId].some((item) => item.id === id)
        ) as ContainerId | null;
    }, [leftbar]);

    const handleDragOver = useCallback((event: DragOverEvent) => {
        const { active, over } = event;
        const overId = over?.id;

        if (overId == null || active.id in leftbar) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setLeftbar((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            const activeIndex = activeItems.findIndex((i) => i.id === active.id);
            const overIndex = overItems.findIndex((i) => i.id === overId);

            let newIndex: number;

            if (overId in leftbar) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.bottom > over.rect.bottom;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex =
                    overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: prev[activeContainer].filter(
                    (item) => item.id !== active.id
                ),
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    {
                        ...prev[activeContainer][activeIndex],
                        parentId: null
                    },
                    ...prev[overContainer].slice(newIndex),
                ],
            };
        });
    }, [leftbar, findContainer]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            setActiveId(null);
            return;
        }

        const activeIndex = leftbar[activeContainer].findIndex(
            (i) => i.id === active.id
        );
        const overIndex = leftbar[overContainer].findIndex(
            (i) => i.id === over.id
        );

        if (activeIndex !== overIndex) {
            setLeftbar((items) => {
                let prev: MenuItemProps | null;
                const moved = arrayMove(
                    items[overContainer],
                    activeIndex,
                    overIndex
                );

                const updatedId = moved.map((item) => {
                    if (item.parentId === null) {
                        prev = item;
                        return item;
                    } else {
                        return {
                            ...item,
                            parentId: prev?.id ?? null
                        };
                    }
                });

                return {
                    ...items,
                    [overContainer]: updatedId,
                };
            });
        }

        setActiveId(null);
    }, [leftbar, findContainer]);

    // const handleNested = useCallback((prev: MenuItemProps, curr: MenuItemProps) => {
    //     let check = false;
    //     const newParentId =
    //         curr.parentId !== null
    //             ? null
    //             : prev?.parentId ?? prev?.id;

    //     setLeftbar((prevLeftbar) => ({
    //         ...prevLeftbar,
    //         leftmenu: prevLeftbar.leftmenu.map((item) => {
    //             if (item.id === curr.id) {
    //                 check = true;
    //                 return { ...item, parentId: newParentId };
    //             } else {
    //                 if (check && item.parentId) {
    //                     return {
    //                         ...item,
    //                         parentId: newParentId ?? curr.id
    //                     };
    //                 } else {
    //                     check = false;
    //                     return item;
    //                 }
    //             }
    //         }),
    //     }));
    // }, []);

    const onRemove = useCallback((prev: MenuItemProps, remove: MenuItemProps) => {
        const { filtered, removedItem } = leftbar.leftmenu.reduce<{
            filtered: MenuItemProps[];
            removedItem: MenuItemProps | null;
        }>(
            (acc, cur) => {
                if (cur.id !== remove.id) {
                    if (
                        remove.parentId === null &&
                        remove.id === cur.parentId
                    ) {
                        acc.filtered.push({
                            ...cur,
                            parentId: prev?.parentId ?? prev?.id,
                        });
                    } else {
                        acc.filtered.push(cur);
                    }
                } else {
                    acc.removedItem = { ...cur, parentId: null };
                }
                return acc;
            },
            { filtered: [], removedItem: null }
        );

        if (removedItem) {
            setLeftbar({
                available: [...leftbar.available, removedItem],
                leftmenu: filtered,
            });
        }
    }, [leftbar.available, leftbar.leftmenu]);

    const leftAvailable = useMemo(
        () => leftbar.available,
        [leftbar.available]
    );

    const leftMenu = useMemo(
        () => leftbar.leftmenu,
        [leftbar.leftmenu]
    );

    return (
        <div
            className={cn(
                'flex flex-col gap-y-2.5 [--left-h:36px] xl:[--left-h:45px]',
                className
            )}
        >
            <div
                className={cn(
                    'flex items-center gap-x-5 text-[#3E4B61]',
                    headerClass
                )}
            >
                <h3 className="font-medium text-base xl:text-lg me-auto">
                    Left Menu
                </h3>
                <button
                    className="flex items-center justify-center text-white text-sm bg-violet-800 rounded-lg gap-x-1.5 w-20 xl:w-22.5 h-(--left-h) mt-auto"
                    onClick={() => setSidebarLayout(leftbar.leftmenu)}
                >
                    <CircleCheckBig
                        width={16}
                        height={16}
                    />
                    Save
                </button>
            </div>
            <div
                className={cn(
                    'grid grid-cols-3 gap-x-2 lg:gap-x-4 xl:gap-x-6 2xl:gap-x-10 bg-[#EDF0F3] text-[#3E4B61] rounded-4xl',
                    '[--left-head-h:36px] xl:[--left-head-h:44px]',
                    '[--left-pad:14px] xl:[--left-pad:24px]',
                    '[--left-item-top:14px] xl:[--left-item-top:30px]',
                    containerClass
                )}
            >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={(e: DragStartEvent) => setActiveId(e.active.id)}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="group/ava bg-[#E2E9EE] rounded-lg p-(--left-item-top) pb-4.5 pl-4.5 pr-2 [--ava-sub-h:19.5px] xl:[--ava-sub-h:22.5px] has-[li]:[--ava-sub-h:0px]">
                        <h5 className="text-sm xl:text-base font-semibold text-center group-has-[li]/ava:pb-3 group-has-[li]/ava:xl:pb-4">
                            Available Menu Items
                        </h5>
                        <p className="text-xs xl:text-sm text-center pt-0.5 group-has-[li]/ava:hidden">
                            No more items available
                        </p>
                        <div className="h-full max-h-[calc(100vh-var(--body-padding)*2-var(--body-gap-y)-var(--nav-height)-var(--profile-pad)*2-var(--left-h)-var(--tab-gap)-var(--left-pad)*2-var(--left-head-h)-var(--left-item-top)-18px)] group-has-[li]/ava:overflow-y-auto custom-scrollbar scrll-ava">
                            <SortableList id="available" list={leftAvailable} />
                        </div>
                    </div>
                    <div className="group/left flex flex-col bg-[#E2E9EE] rounded-lg p-(--left-item-top) pb-4.5 pl-4.5 pr-2 hook [--add-btn-h:36px] xl:[--add-btn-h:40px]">
                        <h5 className="text-sm xl:text-base font-semibold text-center pb-3 xl:pb-4">
                            Side Menu
                        </h5>
                        <div className="h-auto max-h-[calc(100vh-var(--body-padding)*2-var(--body-gap-y)-var(--nav-height)-var(--profile-pad)*2-var(--left-h)-var(--tab-gap)-var(--left-pad)*2-var(--left-head-h)-var(--left-item-top)-var(--add-btn-h)-26px)] overflow-y-auto custom-scrollbar scrll-left">
                            <SortableList
                                id="leftmenu"
                                list={leftMenu}
                                onRemove={onRemove}
                            />
                        </div>
                    </div>
                    <DragOverlay>
                        {activeId != null ? (
                            <ul>
                                <SortableItem
                                    id={activeId}
                                    data={
                                        [...leftbar.leftmenu, ...leftbar.available].find(
                                            (key) => key.id === activeId
                                        )!
                                    }
                                    overlay={false}
                                />
                            </ul>
                        ) : null}
                    </DragOverlay>
                </DndContext>
                <div className="bg-[#E2E9EE] rounded-lg p-(--left-item-top) pb-4.5 pr-2 xl:pr-4.5 [--preview-head-h:79px] min-[720px]:[--preview-head-h:60px] xl:[--preview-head-h:72px] [--prev-head-h:24px] xl:[--prev-head-h:28px]">
                    <h5 className="text-sm xl:text-base font-semibold text-center">Preview</h5>
                    <p className="text-xs xl:text-sm text-center pt-0.5 h-(--left-head-h)">
                        Hit save button to see preview
                    </p>
                    <ul className="px-1 space-y-1 xl:space-y-2.5 max-h-[calc(100vh-var(--body-padding)*2-var(--body-gap-y)-var(--nav-height)-var(--profile-pad)*2-var(--left-h)-var(--tab-gap)-var(--left-pad)*2-var(--preview-head-h)-var(--left-item-top)-18px)] overflow-y-auto custom-scrollbar scrll-prev">
                        {sidebarLayout?.map((side, i) => {
                            return (
                                side.parentId == null &&
                                <li
                                    key={side.id}
                                    className="flex items-center gap-x-4 text-xs xl:text-sm p-2 rounded-lg hover:bg-[#DBE2E7]"
                                >
                                    <span className="text-nowrap text-ellipsis overflow-hidden">
                                        {side.title}
                                    </span>
                                    {sidebarLayout[i + 1]?.parentId === side.id && (
                                        <span className="ml-auto shrink-0">
                                            <ChevronDown
                                                width={14}
                                                height={14}
                                            />
                                        </span>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}