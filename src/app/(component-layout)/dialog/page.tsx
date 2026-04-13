'use client'

import { useState } from "react"
import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { AttributeTable } from "@/components/attributeTable"
import { Button } from "@/controls/button"
import { Dialog, DialogButton, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from "@/controls/dialog"
import { dialogBasic, dialogButtonAttribute, dialogCode, dialogContentPropsData, dialogControlled, dialogNoCloseBtn, dialogOverlay, dialogOverlayPropsData, dialogPropsData, dialogUsage } from "@/data/dialog-data"

export default function DialogPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto dark:text-slate-200">
            <div className="grid gap-3">
                <h3 className="text-2xl xl:text-3xl font-medium">Dialog</h3>
                <p className="max-xl:text-[15px]">
                    Dialog components create a modal overlay that appears above the main page content. This is used for focused interactions, such as forms, alerts, or confirmation dialogs.
                </p>
            </div>
            <div className="grid gap-5">
                <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
                <CodeBlock
                    title="Imports"
                    data={dialogCode}
                />
                <CodeBlock
                    title="Components"
                    data={dialogUsage}
                />
            </div>
            {/* Basic */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
                <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
                <p className="text-sm">
                    A basic <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'Dialog'}</code> component that groups a header, main content, and footer into a focused modal window for user interaction.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Dialog>
                            <DialogButton>
                                Open
                            </DialogButton>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Title</DialogTitle>
                                    <DialogDescription>Description</DialogDescription>
                                </DialogHeader>
                                <p>Here is the central content of the dialog where you can include any details or instructions.</p>
                                <DialogFooter>
                                    <DialogClose className="border">
                                        Close
                                    </DialogClose>
                                    <Button variant="primary">
                                        Save
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={dialogBasic}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Controlled Dialog */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Controlled Dialog</h5>
                <p className="text-sm">
                    A controlled dialog is a modal whose visibility and behavior are managed by external state, allowing you to programmatically open or close it from anywhere in your application.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Dialog open={open} onOpen={setOpen}>
                            <DialogButton>
                                Open
                            </DialogButton>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Title</DialogTitle>
                                    <DialogDescription>Description</DialogDescription>
                                </DialogHeader>
                                <p>
                                    This is a controlled dialog component, managed using external state. The visibility and behavior of the dialog are determined by the parent component or application state.
                                </p>
                                <DialogFooter>
                                    <DialogClose className="border">
                                        Close
                                    </DialogClose>
                                    <Button variant="primary">
                                        Save
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={dialogControlled}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* No Close Button */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">No Close Button</h5>
                <p className="text-sm">
                    Use <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{"showCloseButton={false}"}</code> to hide the close button.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Dialog>
                            <DialogButton>
                                Open
                            </DialogButton>
                            <DialogContent showCloseButton={false}>
                                <DialogHeader>
                                    <DialogTitle>Title</DialogTitle>
                                    <DialogDescription>Description</DialogDescription>
                                </DialogHeader>
                                <p>Here is the central content of the dialog where you can include any details or instructions.</p>
                                <DialogFooter>
                                    <DialogClose className="border">
                                        Close
                                    </DialogClose>
                                    <Button variant="primary">
                                        Save
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={dialogNoCloseBtn}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Dialog Overlay */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Dialog Overlay</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">DialogOverlay</code> component to customize or modify the overlay of the dialog component.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Dialog>
                            <DialogButton>
                                Open
                            </DialogButton>
                            <DialogOverlay className="bg-violet-900/20">
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Title</DialogTitle>
                                        <DialogDescription>Description</DialogDescription>
                                    </DialogHeader>
                                    <p>Here is the central content of the dialog where you can include any details or instructions.</p>
                                    <DialogFooter>
                                        <DialogClose className="border">
                                            Close
                                        </DialogClose>
                                        <Button variant="primary">
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </DialogOverlay>
                        </Dialog>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={dialogOverlay}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Component API */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
                <h5 className="text-lg xl:text-xl font-medium">Dialog</h5>
                <p className="text-sm pb-1">
                    The root container that manages the open/closed state and accessibility context.
                </p>
                <PropsTable data={dialogPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">DialogButon</h5>
                <p className="text-sm pb-1">
                    A standard button component used to open the modal.
                </p>
                <AttributeTable data={dialogButtonAttribute} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">DialogContent</h5>
                <p className="text-sm pb-1">
                    The main content area inside the dialog that holds all the visible elements and handles focus trapping.
                </p>
                <PropsTable data={dialogContentPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">DialogOverlay</h5>
                <p className="text-sm pb-1">
                    The overlay layer that covers the background to focus attention on the modal.
                </p>
                <PropsTable data={dialogOverlayPropsData} />
            </div>
        </div>
    )
}