import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { ButtonGroup } from "@/controls/button-group"
import { Button } from "@/controls/button"
import { Input } from "@/controls/input"
import { ButtonGroupAttribute, buttonGroupBasic, buttonGroupCode, buttonGroupInput, buttonGroupNested, buttonGroupPropsData, buttonGroupUsage, buttonGroupVertical } from "@/data/button-group-data"
import { PropsTable } from "@/components/propsTable"
import { AttributeTable } from "@/components/attributeTable"
import { Plus, Search } from "lucide-react"

export default function ButtonGroupPage() {
  return (
    <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto" >
      <div className="grid gap-3">
        <h3 className="text-2xl xl:text-3xl font-medium">Button Group</h3>
        <p className="max-xl:text-[15px]">A button group component is a container for grouping multiple buttons together.</p>
      </div>
      <div className="grid gap-5">
        <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
        <CodeBlock
          title="Imports"
          data={buttonGroupCode}
        />
        <CodeBlock
          title="Components"
          data={buttonGroupUsage}
        />
      </div>
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
        <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
        <p className="text-sm">A basic button group component.</p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77">
            <ButtonGroup>
              <Button variant="white">Button 1</Button>
              <Button variant="white">Button 2</Button>
              <Button variant="white">Button 3</Button>
            </ButtonGroup>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonGroupBasic}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Orientation</h5>
        <p className="text-sm">
          Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{"orientation='vertical'"}</code> prop to change the orientation of the buttons.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
            <ButtonGroup orientation="vertical">
              <Button variant="white">Button 1</Button>
              <Button variant="white">Button 2</Button>
              <Button variant="white">Button 3</Button>
            </ButtonGroup>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonGroupVertical}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Nested</h5>
        <p className="text-sm">
          Nest <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{"<ButtonGroup>"}</code> components to create nested button groups.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
            <ButtonGroup>
              <ButtonGroup>
                <Button variant="white" className="px-2">
                  <Plus size={16} />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="white">Button 1</Button>
                <Button variant="white">Button 2</Button>
              </ButtonGroup>
            </ButtonGroup>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonGroupNested}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Input</h5>
        <p className="text-sm">
          Wrap an <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{"Input"}</code> component with buttons.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
            <ButtonGroup>
              <Input placeholder="Search..." />
              <Button variant="white"><Search size={16} /></Button>
            </ButtonGroup>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={buttonGroupInput}
            />
          </TabPanel>
        </Tabs>
      </div>

      {/* Component API */}
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
        <h5 className="text-lg xl:text-xl font-medium">Button Group</h5>
        <p className="text-sm pb-1">
          A <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">ButtonGroup</span> component is a layout container designed to unify related buttons into a single, cohesive interface with seamless transitions and consistent styling.
        </p>
        <PropsTable data={buttonGroupPropsData} className="mb-5" />
        <AttributeTable data={ButtonGroupAttribute} />
      </div>
    </div>
  )
}

