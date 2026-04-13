'use client'

import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../../controls/tabs"
import { Input } from "@/controls/input"
import { PropsTable } from "@/components/propsTable"
import { useState } from "react"
import { inputBasic, inputCode, inputControlled, inputDisabled, inputFile, inputPropsData, inputUsage } from "@/data/input-data"

export default function InputPage() {
    const [value, setValue] = useState('');

    return (
        <div className="grid gap-8 w-full max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto dark:text-slate-200">
            <div className="grid gap-3">
                <h3 className="text-2xl xl:text-3xl font-medium">Input</h3>
                <p className="max-xl:text-[15px]">A fundamental form element that allows users to enter, edit, and interact with single-line text data.</p>
            </div>
            <div className="grid gap-5">
                <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
                <CodeBlock
                    title="Imports"
                    data={inputCode}
                />
                <CodeBlock
                    title="Components"
                    data={inputUsage}
                />
            </div>
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
                <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
                <p className="text-sm">A basic <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">Input</code> field with a placeholder.</p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-16 sm:px-42 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Input placeholder="Enter" />
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputBasic}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Controlled Input</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">value</code> and <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">onChange</code> props to manage the input state externally.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-16 sm:px-42 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Input placeholder="Enter" value={value} onChange={e => setValue(e.target.value)} />
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputControlled}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Disabled</h5>
                <p className="text-sm">
                    Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">disabled</code> attribute to prevent user interaction and indicate an inactive state.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-16 sm:px-42 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Input placeholder="Enter" disabled />
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputDisabled}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">File</h5>
                <p className="text-sm">
                    Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">type="file"</code> prop to allow users to select file.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-16 sm:px-42 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Input type="file" />
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={inputFile}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Component API */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
                <h5 className="text-lg xl:text-xl font-medium">Input</h5>
                <p className="text-sm pb-1">
                    A standard text field that allows users to enter and edit data.
                </p>
                <PropsTable data={inputPropsData} />
            </div>
        </div>
    )
}

