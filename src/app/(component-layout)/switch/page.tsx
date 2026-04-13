'use client'

import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { useState } from "react"
import { AttributeTable } from "@/components/attributeTable"
import { Switch, SwitchThumb } from "@/controls/switch"
import { Moon, Sun } from "lucide-react"
import { switchAttribute, switchBasic, switchCard, switchCode, switchControlled, switchCustom, switchPropsData, switchUsage } from "@/data/switch-data"

export default function SwitchPage() {
    const [check, setCheck] = useState(false);

    return (
        <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto dark:text-slate-200">
            <div className="grid gap-3">
                <h3 className="text-2xl xl:text-3xl font-medium">Switch</h3>
                <p className="max-xl:text-[15px]">
                    The Switch component is a UI element that allows users to toggle between two distinct states. It provides a clear and interactive way for users to change settings or make binary choices within forms, or preference controls.
                </p>
            </div>
            <div className="grid gap-5">
                <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
                <CodeBlock
                    title="Imports"
                    data={switchCode}
                />
                <CodeBlock
                    title="Components"
                    data={switchUsage}
                />
            </div>
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
                <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
                <p className="text-sm">
                    A default switch with two states. Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'<Switch />'}</code> component to create a simple toggle that enables or disables a setting.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Switch />
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={switchBasic}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Card</h5>
                <p className="text-sm">
                    A switch styled inside a card component. Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'<Switch />'}</code> component to allow users to toggle between two states.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center xs:px-10 sm:px-32 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <label className="grid grid-cols-[1fr_min-content] items-center gap-x-4 gap-y-1 w-full bg-white rounded-2xl text-sm text-ash p-3 shadow-md dark:bg-zinc-800 dark:text-slate-200">
                            <div className="font-medium">Enable Notifications</div>
                            <Switch className="w-8.5 h-5"/>
                            <p className="max-sm:text-xs">Toggle the switch to enable or disable notifications based on your preferences.</p>
                        </label>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={switchCard}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Controlled</h5>
                <p className="text-sm">
                    Manage the toggle state programmatically using the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">value</code> and <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">onValueChange</code> props.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Switch value={check} onValueChange={setCheck} />
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={switchControlled}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Custom</h5>
                <p className="text-sm">
                    Customize the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'<Switch />'}</code> component with custom icons by passing children to the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'<SwitchThumb />'}</code> component. Personalize its appearance and behavior to suit your needs.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3] dark:bg-zinc-900">
                        <Switch>
                            <SwitchThumb>
                                <Sun />
                                <Moon color="white" />
                            </SwitchThumb>
                        </Switch>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={switchCustom}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Component API */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
                <h5 className="text-lg xl:text-xl font-medium">Switch</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">Switch</span> component allows users to toggle between two states, like on/off or enabled/disabled.
                </p>
                <PropsTable data={switchPropsData} className="mb-5" />
                <AttributeTable data={switchAttribute} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">SwitchThumb</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">SwitchThumb</span> component lets you customize the switch’s appearance by passing icons for the "on" and "off" states.
                </p>
                <AttributeTable data={switchAttribute} />
            </div>
        </div>
    )
}