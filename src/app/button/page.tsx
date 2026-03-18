import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { Button } from "@/controls/button"
import { PropsTable } from "@/components/propsTable"
import { AttributeTable } from "@/components/attributeTable"
import { ButtonAttribute, buttonBasic, buttonCode, buttonGhost, buttonOutline, buttonPrimary, buttonPropsData, buttonSecondary, buttonSize, buttonUsage, buttonWhite } from "@/data/button-data"

export default function ButtonPage() {
  return (
    <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto dark:text-slate-200">
      <div className="grid gap-3">
        <h3 className="text-2xl xl:text-3xl font-medium">Button</h3>
        <p className="max-xl:text-[15px]">A button component is an interactive element used to trigger immediate actions, handle form submissions.</p>
      </div>
      <div className="grid gap-5">
        <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
        <CodeBlock
          title="Imports"
          data={buttonCode}
        />
        <CodeBlock
          title="Components"
          data={buttonUsage}
        />
      </div>
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
        <h5 className="text-lg xl:text-xl font-medium pb-1">Default</h5>
        <p className="text-sm">
          Dislpays a basic button component with default styles.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3]">
              <Button>Button 1</Button>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonBasic}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Primary</h5>
        <p className="text-sm">
          Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'variant="primary"'}</code> prop to change the variant of the button.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3]">
              <Button variant="primary">Button 1</Button>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonPrimary}
            />
          </TabPanel>
        </Tabs>
      </div>
     <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Secondary</h5>
        <p className="text-sm">
          Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'variant="secondary"'}</code> prop to change the variant of the button.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3]">
              <Button variant="secondary">Button 1</Button>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonSecondary}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Ghost</h5>
        <p className="text-sm">
          Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'variant="ghost"'}</code> prop to change the variant of the button.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3]">
              <Button variant="ghost">Button 1</Button>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonGhost}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Outline</h5>
        <p className="text-sm">
          Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'variant="outline"'}</code> prop to change the variant of the button.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3]">
              <Button variant="outline">Button 1</Button>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonOutline}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">White</h5>
        <p className="text-sm">
          Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{'variant="white"'}</code> prop to change the variant of the button.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77 bg-[#edf0f3]">
              <Button variant="white">Button 1</Button>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonWhite}
            />
          </TabPanel>
        </Tabs>
      </div>
       <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Size</h5>
        <p className="text-sm">
          Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">{"size"}</code> prop to change the size of the button. Default size is <code className="rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">"md"</code>.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex max-sm:flex-col items-center justify-center gap-8 px-12 min-h-77 bg-[#edf0f3]">
              <Button variant="white" size="xs">Extra Small</Button>
              <Button variant="white" size="sm">Small</Button>
              <Button variant="white" size="md">Default</Button>
              <Button variant="white" size="lg">Large</Button>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonSize}
            />
          </TabPanel>
        </Tabs>
      </div>

      {/* Component API */}
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
        <h5 className="text-lg xl:text-xl font-medium">Button</h5>
        <p className="text-sm pb-1">
            The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700/80">Button</span> component is a wrapper around the button element that adds a variety of styles and functionality.
        </p>
        <PropsTable data={buttonPropsData} className="mb-5" />
        <AttributeTable data={ButtonAttribute} />
      </div>
    </div>
  )
}

