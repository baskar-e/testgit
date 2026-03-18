import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { AttributeTable } from "@/components/attributeTable"
import { AtSign, Mail, Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/controls/input-group"
import { inputGroupAddonAttribute, inputGroupAddonPropsData, inputGroupBlockEnd, inputGroupBlockStart, inputGroupCode, inputGroupDisabled, inputGroupInlineEnd, inputGroupInlineStart, inputGroupInputPropsData, inputGroupPropsData, inputGroupUsage } from "@/data/input-group-data"

export default function InputGroupPage() {
    return (
        <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto dark:text-slate-200">
            <div className="grid gap-3">
                <h3 className="text-2xl xl:text-3xl font-medium">Input Group</h3>
                <p className="max-xl:text-[15px]">A flexible container that groups multiple form controls, buttons, or decorative addons into a single, cohesive visual unit.</p>
            </div>
            <div className="grid gap-5">
                <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
                <CodeBlock
                    title="Imports"
                    data={inputGroupCode}
                />
                <CodeBlock
                    title="Components"
                    data={inputGroupUsage}
                />
            </div>
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
                <h5 className="text-lg xl:text-xl font-medium pb-1">Align</h5>
                <p className="text-sm">Use <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">align="inline-start"</code> to position the addon at the beginning of the input. This is the default.</p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 min-h-77 bg-[#edf0f3]">
                        <InputGroup>
                            <InputGroupInput placeholder="Search" />
                            <InputGroupAddon>
                                <Search size={16} />
                            </InputGroupAddon>
                        </InputGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputGroupInlineStart}
                        />
                    </TabPanel>
                </Tabs>
                <p className="text-sm pt-5">
                    Use <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">align="inline-end"</code> to position the addon at the end of the input.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 min-h-77 bg-[#edf0f3]">
                        <InputGroup>
                            <InputGroupInput placeholder="Email" />
                            <InputGroupAddon align="inline-end">
                                <Mail size={16} />
                            </InputGroupAddon>
                        </InputGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputGroupInlineEnd}
                        />
                    </TabPanel>
                </Tabs>
                <p className="text-sm pt-5">
                    Use <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">align="block-start"</code> to position the addon above the input.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 min-h-77 bg-[#edf0f3]">
                        <InputGroup>
                            <InputGroupInput placeholder="Enter name" />
                            <InputGroupAddon align="block-start">
                                <p>Your Name</p>
                            </InputGroupAddon>
                        </InputGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputGroupBlockStart}
                        />
                    </TabPanel>
                </Tabs>
                <p className="text-sm pt-5">
                    Use <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">align="block-end"</code> to position the addon below the input.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 min-h-77 bg-[#edf0f3]">
                        <InputGroup>
                            <InputGroupInput placeholder="Enter amount" />
                            <InputGroupAddon align="block-end">
                                <p>USD</p>
                            </InputGroupAddon>
                        </InputGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputGroupBlockEnd}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Disabled</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">disabled</code> prop to prevent user interaction.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-42 min-h-77 bg-[#edf0f3]">
                        <InputGroup>
                            <InputGroupInput placeholder="Disabled Input" disabled />
                            <InputGroupAddon>
                                <AtSign size={16} />
                            </InputGroupAddon>
                        </InputGroup>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputGroupDisabled}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Component API */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
                <h5 className="text-lg xl:text-xl font-medium">InputGroup</h5>
                <p className="text-sm pb-1">
                    The root container used to wrap and align an input field with its associated addons or buttons.
                </p>
                <PropsTable data={inputGroupPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">InputGroupAddon</h5>
                <p className="text-sm pb-1">
                    A flexible wrapper for elements positioned at the start or end of the input, such as icons, text, or buttons.
                </p>
                <PropsTable data={inputGroupAddonPropsData} className="mb-5" />
                <AttributeTable data={inputGroupAddonAttribute} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">InputGroupInput</h5>
                <p className="text-sm pb-1">
                     The core input element within the group that handles user data entry and inherits group-specific styling.
                </p>
                <PropsTable data={inputGroupInputPropsData} />
            </div>
        </div>
    )
}

