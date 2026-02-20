import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { Checkbox } from "@/controls/checkbox"
import { checkboxBasic, checkboxCode, checkboxDisabled, checkboxLabel, checkboxPropsData, checkboxUsage } from "@/data/checkbox-data"
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/controls/combobox"

export default function ComboboxPage() {
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
                    data={checkboxCode}
                />
                <CodeBlock
                    title="Components"
                    data={checkboxUsage}
                />
            </div>
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
                        <Combobox>
                            <ComboboxInput placeholder="Select an option..." />
                            <ComboboxList>
                                <ComboboxEmpty />
                                <ComboboxItem value="option1">Option 1</ComboboxItem>
                                <ComboboxItem value="option2">Option 2</ComboboxItem>
                                <ComboboxItem value="option3">Option 3</ComboboxItem>
                            </ComboboxList>
                        </Combobox>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxBasic}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Label</h5>
                <p className="text-sm">
                    Add a label and description to the checkbox using the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">label</code> and <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">description</code> props.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Checkbox label="Accept terms and conditions" description="By clicking this checkbox, you agree to the terms and conditions." />
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={checkboxLabel}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Disabled</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">disabled</code> prop to prevent interaction with the checkbox. The label and description are also disabled.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 py-9 min-h-77">
                        <Checkbox label="Accept terms and conditions" disabled />
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