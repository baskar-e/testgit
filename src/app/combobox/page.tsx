'use client'

import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { Checkbox } from "@/controls/checkbox"
import { checkboxBasic, checkboxCode, checkboxDisabled, checkboxLabel, checkboxPropsData, checkboxUsage } from "@/data/checkbox-data"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/controls/combobox"
import { comboboxCode, comboboxUsage } from "@/data/combobox-data"

type Fruits = {
    id?: number;
    name: string;
    color?: string;
    invalid?: boolean;
}

export default function ComboboxPage() {
    const fruits = ['Apple', 'Banana', 'Carrot', 'Mango'];

    const fruitsLabel: Fruits[] = [
        { name: 'Apple', color: 'Red' },
        { name: 'Banana', color: 'Yellow' },
        { name: 'Carrot', color: 'Orange' },
        { name: 'Mango', color: 'Green' },
    ];

    const fruitsValue: Fruits[] = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Carrot' },
        { id: 4, name: 'Mango' },
    ];

    const fruitsDisabled: Fruits[] = [
        { name: 'Apple' },
        { name: 'Banana' },
        { name: 'Carrot', invalid: true },
        { name: 'Mango' },
    ];

    return (
        <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto" >
            <div className="grid gap-3">
                <h3 className="text-2xl xl:text-3xl font-medium">Combobox</h3>
                <p className="max-xl:text-[15px]">
                    A Combobox is a powerful input component that merges a text field with a dropdown menu, enabling users to efficiently filter and select options from a list.
                </p>
            </div>
            <div className="grid gap-5">
                <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
                <CodeBlock
                    title="Imports"
                    data={comboboxCode}
                />
                <CodeBlock
                    title="Components"
                    data={comboboxUsage}
                />
            </div>
            {/* Basic */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
                <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
                <p className="text-sm">
                    A simple <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{'Combobox'}</code> with a list of items.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-32 min-h-77">
                        <Combobox items={fruits}>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxContent>
                                <ComboboxEmpty />
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxBasic}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Label */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Label</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">labelKey</code> prop to specify the name of the property in your object that contains the text to be displayed in the UI. By default, this is set to <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">"label"</code>.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Combobox items={fruitsLabel} labelKey={'name'}>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxContent>
                                <ComboboxEmpty />
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.name} value={item}>{item.name}</ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={comboboxCode}
                        />
                    </TabPanel>
                </Tabs>
                <p className="text-sm pt-5">
                    Provide a callback function to the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">labelKey</code> prop to dynamically determine the display label for each item.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Combobox items={fruitsLabel} labelKey={(item) => `${item.name} - ${item.color}`}>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxContent>
                                <ComboboxEmpty />
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.name} value={item}>{item.name} - {item.color}</ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxLabel}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Value */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Value</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">valueKey</code> prop to specify the object property that contains the unique identifier for each item. By default, this is set to <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">"value"</code>.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Combobox items={fruitsValue} labelKey={'name'} valueKey={'id'}>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxContent>
                                <ComboboxEmpty />
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.name} value={item}>{item.name}</ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxLabel}
                        />
                    </TabPanel>
                </Tabs>
                <p className="text-sm pt-5">
                    You can also pass a callback function to the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">valueKey</code> prop to to dynamically generate a unique identifier from the item's properties.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Combobox items={fruitsValue} labelKey={'name'} valueKey={(item) => String(item.id)}>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxContent>
                                <ComboboxEmpty />
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.name} value={item}>{item.name}</ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxLabel}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Disabled */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Disabled</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">disabledKey</code> prop to specify the property name in your object that marks an item as uninteractive. By default, this is set to <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">"disabled"</code>.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Combobox items={fruitsDisabled} labelKey={'name'} disabledKey={'invalid'}>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxContent>
                                <ComboboxEmpty />
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.name} value={item}>{item.name}</ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxDisabled}
                        />
                    </TabPanel>
                </Tabs>
                <p className="text-sm pt-5">
                    The <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">disabledKey</code> prop accepts a callback function, allowing you to disable items based on custom logic or multiple property checks within the object.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Combobox items={fruitsDisabled} labelKey={'name'} disabledKey={'invalid'}>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxContent>
                                <ComboboxEmpty />
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.name} value={item}>{item.name}</ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxDisabled}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            {/* Auto Highlight */}
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Auto Highlight</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">autoHighlight</code> prop automatically highlight the first item on filter.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Combobox items={fruits} autoHighlight>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxContent>
                                <ComboboxEmpty />
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxDisabled}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Component API */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
                <h5 className="text-lg xl:text-xl font-medium">Checkbox</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">Checkbox</span> component is a control that allows users to toggle between checked and unchecked states.
                </p>
                <PropsTable data={checkboxPropsData} />
            </div>
        </div>
    )
}