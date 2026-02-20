import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../controls/accordion"
import { PropsTable } from "@/components/propsTable"
import { AttributeTable } from "@/components/attributeTable"
import { accordionBasic, accordionCode, accordionItemAttribute, accordionItemPropsData, accordionItems, accordionMultiple, accordionPropsData, accordionUsage } from "@/data/accordion-data"

export default function AccordionPage() {
  return (
    <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto" >
      <div className="grid gap-3">
        <h3 className="text-2xl xl:text-3xl font-medium">Accordion</h3>
        <p className="max-xl:text-[15px]">A collapsible container for organizing content into expandable sections, commonly used to manage space in user interfaces.</p>
      </div>
      <div className="grid gap-5">
        <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
        <CodeBlock
          title="Imports"
          data={accordionCode}
        />
        <CodeBlock
          title="Components"
          data={accordionUsage}
        />
      </div>
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
        <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
        <p className="text-sm">A basic accordion that shows one item at a time. </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center px-12 min-h-77">
            <Accordion type='single' defaultValue="item-1">
              {accordionItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.trigger}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={accordionBasic}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Multiple</h5>
        <p className="text-sm">
          An accordion that allows multiple items to be open simultaneously. use <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">type="multiple"</code>.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center px-12 py-9 min-h-77">
            <Accordion type='multiple' defaultValue={["item-1", "item-3"]}>
              {accordionItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.trigger}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={accordionMultiple}
            />
          </TabPanel>
        </Tabs>
      </div>

      {/* Component API */}
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
        <h5 className="text-lg xl:text-xl font-medium">Accordion</h5>
        <PropsTable data={accordionPropsData} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium">AccordionItem</h5>
        <PropsTable data={accordionItemPropsData} className="mb-5" />
        <AttributeTable data={accordionItemAttribute} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium">AccordionTrigger</h5>
        <AttributeTable data={accordionItemAttribute} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium">AccordionContent</h5>
        <AttributeTable data={accordionItemAttribute} />
      </div>
    </div>
  )
}

