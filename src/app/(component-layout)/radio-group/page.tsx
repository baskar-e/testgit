'use client'

import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { RadioGroup, RadioGroupItem } from "@/controls/radio-group"
import { useState } from "react"
import { AttributeTable } from "@/components/attributeTable"
import { radioGroupAttribute, radioGroupBasic, radioGroupCode, radioGroupControlled, radioGroupDefaultValue, radioGroupDisabled, radioGroupItemDisabled, radioGroupPropsData, radioGroupUsage, radioGroupVertical, radioItemAttribute, radioItemPropsData } from "@/data/radiogroup-data"

export default function RadioGroupPage() {
    const items = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];
    const [value, setValue] = useState('');

    return (
        <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto dark:text-slate-200">
            <div className="grid gap-3">
                <h3 className="text-2xl xl:text-3xl font-medium">Radio Group</h3>
                <p className="max-xl:text-[15px]">
                    Radio component are used to select a single option from a set of choices. They are typically used in forms and lists to allow users to make a selection from mutually exclusive options.
                </p>
            </div>
            <div className="grid gap-5">
                <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
                <CodeBlock
                    title="Imports"
                    data={radioGroupCode}
                />
                <CodeBlock
                    title="Components"
                    data={radioGroupUsage}
                />
            </div>
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
                <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
                <p className="text-sm">
                    A default radio group with multiple options. Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'<RadioGroup />'}</code> component to create a basic set of selectable radio items.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <RadioGroup>
                            {items.map((item) => (
                                <label key={item.value} className="flex items-center gap-2">
                                    <RadioGroupItem value={item.value} />
                                    {item.label}
                                </label>
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={radioGroupBasic}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Orientation</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">orientation</code> prop to arrange the radio items in either a horizontal or vertical layout.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <RadioGroup orientation="vertical">
                            {items.map((item) => (
                                <label key={item.value} className="flex items-center gap-2">
                                    <RadioGroupItem value={item.value} />
                                    {item.label}
                                </label>
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={radioGroupVertical}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Default Value</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">defaultValue</code> prop to set the initially selected radio item when the component is first rendered.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <RadioGroup defaultValue="option1">
                            {items.map((item) => (
                                <label key={item.value} className="flex items-center gap-2">
                                    <RadioGroupItem value={item.value} />
                                    {item.label}
                                </label>
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={radioGroupDefaultValue}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Controlled</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">value</code> and <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">onValueChange</code> props to programmatically manage the selection state of the radio group.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <RadioGroup value={value} onValueChange={setValue}>
                            {items.map((item) => (
                                <label key={item.value} className="flex items-center gap-2">
                                    <RadioGroupItem value={item.value} />
                                    {item.label}
                                </label>
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={radioGroupControlled}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Disabled</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">disabled</code> prop in <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{"<RadioGroup />"}</code> to prevent interaction with the entire radio group.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <RadioGroup disabled>
                            {items.map((item) => (
                                <label key={item.value} className="flex items-center gap-2">
                                    <RadioGroupItem value={item.value} />
                                    {item.label}
                                </label>
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={radioGroupDisabled}
                        />
                    </TabPanel>
                </Tabs>
                <p className="text-sm pt-5">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">disabled</code> prop in <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{"<RadioGroupItem />"}</code> to prevent interaction with the radio item.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <RadioGroup>
                            {items.map((item) => (
                                <label key={item.value} className="flex items-center gap-2">
                                    <RadioGroupItem value={item.value} disabled={item.value === 'option2'} />
                                    {item.label}
                                </label>
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={radioGroupItemDisabled}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Component API */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
                <h5 className="text-lg xl:text-xl font-medium">RadioGroup</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">RadioGroup</span> component is a control that allows users to select one option from a set of radio items.
                </p>
                <PropsTable data={radioGroupPropsData} className="mb-5" />
                <AttributeTable data={radioGroupAttribute} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">RadioGroupItem</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">RadioGroupItem</span> component represents an individual option within a <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">RadioGroup</span>.
                </p>
                <PropsTable data={radioItemPropsData} className="mb-5" />
                <AttributeTable data={radioItemAttribute} />
            </div>
        </div>
    )
}