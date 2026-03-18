'use client'

import { useState } from "react"
import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { AttributeTable } from "@/components/attributeTable"
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from "@/controls/dropdown"
import { dropdownBasic, dropdownButtonAttribute, dropdownCode, dropdownContentAttribute, dropdownContentPropsData, dropdownControlled, dropdownItemAttribute, dropdownItemPropsData, dropdownItems, dropdownModal, dropdownPosition, dropdownPropsData, dropdownUsage } from "@/data/dropdown-data"

export default function DropdownPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="grid gap-8 w-full max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto dark:text-slate-200">
            <div className="grid gap-3">
                <h3 className="text-2xl xl:text-3xl font-medium">Dropdown</h3>
                <p className="max-xl:text-[15px]">
                    A Dropdown is a UI component that allows users to select from a list of options, typically triggered by a button, and can be customized in terms of positioning and state management.
                </p>
            </div>
            <div className="grid gap-5">
                <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
                <CodeBlock
                    title="Imports"
                    data={dropdownCode}
                />
                <CodeBlock
                    title="Components"
                    data={dropdownUsage}
                />
            </div>
            {/* Basic */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
                <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
                <p className="text-sm">
                    A simple <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'Dropdown'}</code> that toggles a list of interactive menu items upon clicking a trigger.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77 bg-[#edf0f3]">
                        <Dropdown>
                            <DropdownButton>
                                click
                            </DropdownButton>
                            <DropdownContent>
                                {dropdownItems.map((item) => (
                                    <DropdownItem key={item.id}>
                                        {item.value}
                                    </DropdownItem>
                                ))}
                            </DropdownContent>
                        </Dropdown>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={dropdownBasic}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Controlled Dropdown */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Controlled Dropdown</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">open</code> and <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">onOpen</code> props to programmatically manage the visibility state of the menu.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77 bg-[#edf0f3]">
                        <Dropdown open={open} onOpen={setOpen}>
                            <DropdownButton>
                                click
                            </DropdownButton>
                            <DropdownContent>
                                {dropdownItems.map((item) => (
                                    <DropdownItem key={item.id}>
                                        {item.value}
                                    </DropdownItem>
                                ))}
                            </DropdownContent>
                        </Dropdown>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={dropdownControlled}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Dropdown Position */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Position</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">align</code> and <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">side</code> props to anchor the dropdown relative to the trigger. By default, the dropdown content will be aligned to the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">bottom-center</code> of the trigger.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77 bg-[#edf0f3]">
                        <Dropdown align="start" side="right">
                            <DropdownButton>
                                click
                            </DropdownButton>
                            <DropdownContent>
                                {dropdownItems.map((item) => (
                                    <DropdownItem key={item.id}>
                                        {item.value}
                                    </DropdownItem>
                                ))}
                            </DropdownContent>
                        </Dropdown>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={dropdownPosition}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Modal */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Modal</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">modal</code> prop to prevent interaction with the rest of the page while the dropdown is active.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77 bg-[#edf0f3]">
                        <Dropdown>
                            <DropdownButton>
                                click
                            </DropdownButton>
                            <DropdownContent modal>
                                {dropdownItems.map((item) => (
                                    <DropdownItem key={item.id}>
                                        {item.value}
                                    </DropdownItem>
                                ))}
                            </DropdownContent>
                        </Dropdown>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={dropdownModal}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Component API */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
                <h5 className="text-lg xl:text-xl font-medium">Dropdown</h5>
                <p className="text-sm pb-1">
                    The root component that manages the state and accessibility context for the menu.
                </p>
                <PropsTable data={dropdownPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">DropdownButton</h5>
                <p className="text-sm pb-1">
                    The interactive trigger element used to toggle the visibility of the dropdown menu.
                </p>
                <AttributeTable data={dropdownButtonAttribute} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">DropdownContent</h5>
                <p className="text-sm pb-1">
                    Defines the content of the dropdown menu, including the items displayed to the user.
                </p>
                <PropsTable data={dropdownContentPropsData} className="mb-5" />
                <AttributeTable data={dropdownContentAttribute} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">DropdownItem</h5>
                <p className="text-sm pb-1">
                    A single selectable option within the menu that handles click and keyboard interactions.
                </p>
                <PropsTable data={dropdownItemPropsData} className="mb-5" />
                <AttributeTable data={dropdownItemAttribute} />
            </div>
        </div>
    )
}