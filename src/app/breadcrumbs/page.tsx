import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { AttributeTable } from "@/components/attributeTable"
import { breadcrumbBasic, breadcrumbCode, breadcrumbCustomSeparator, breadcrumbEllipsis, breadcrumbEllipsisPropsData, breadcrumbItemPropsData, breadcrumbLinkPropsData, breadcrumbPageAttribute, breadcrumbPagePropsData, breadcrumbPropsData, breadcrumbSeparatorPropsData, breadcrumbUsage } from "@/data/breadcrumb-data"
import { Breadcrumbs, BreadcrumbsEllipsis, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsPage, BreadcrumbsSeparator } from "@/controls/breadcrumbs"
import { Dot } from "lucide-react"

export default function BreadcrumbPage() {
  return (
    <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto" >
      <div className="grid gap-3">
        <h3 className="text-2xl xl:text-3xl font-medium">Breadcrumbs</h3>
        <p className="max-xl:text-[15px]">A breadcrumb component is a secondary navigation element that provides a hierarchical trail of the user's current location.</p>
      </div>
      <div className="grid gap-5">
        <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
        <CodeBlock
          title="Imports"
          data={breadcrumbCode}
        />
        <CodeBlock
          title="Components"
          data={breadcrumbUsage}
        />
      </div>
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
        <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
        <p className="text-sm">A basic breadcrumb component displays the hierarchical structure of pages.</p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77">
            <Breadcrumbs>
              <BreadcrumbsItem>
                <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
              </BreadcrumbsItem>
              <BreadcrumbsItem>
                <BreadcrumbsLink href="#">Products</BreadcrumbsLink>
              </BreadcrumbsItem>
              <BreadcrumbsItem>
                <BreadcrumbsPage>Laptop</BreadcrumbsPage>
              </BreadcrumbsItem>
            </Breadcrumbs>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={breadcrumbBasic}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Custom separator</h5>
        <p className="text-sm">
          Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{"<BreadcrumbsSeparator />"}</code> for a custom separator, and pass <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{"separator={false}"}</code> in the Breadcrumbs component to remove the default separator.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
            <Breadcrumbs separator={false}>
              <BreadcrumbsItem>
                <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
                <BreadcrumbsSeparator ><Dot /></BreadcrumbsSeparator>
              </BreadcrumbsItem>
              <BreadcrumbsItem>
                <BreadcrumbsLink href="#">Products</BreadcrumbsLink>
                <BreadcrumbsSeparator ><Dot /></BreadcrumbsSeparator>
              </BreadcrumbsItem>
              <BreadcrumbsItem>
                <BreadcrumbsPage>Laptop</BreadcrumbsPage>
              </BreadcrumbsItem>
            </Breadcrumbs>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={breadcrumbCustomSeparator}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium pb-1">Ellipsis</h5>
        <p className="text-sm">
          Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{"<BreadcrumbsEllipsis />"}</code> component to indicate a collapsed state and maintain a clean layout when the navigation path becomes too long.
        </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
            <Breadcrumbs>
              <BreadcrumbsItem>
                <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
              </BreadcrumbsItem>
              <BreadcrumbsItem>
                <BreadcrumbsEllipsis />
              </BreadcrumbsItem>
              <BreadcrumbsItem>
                <BreadcrumbsLink href="#">Products</BreadcrumbsLink>
              </BreadcrumbsItem>
              <BreadcrumbsItem>
                <BreadcrumbsPage>Laptop</BreadcrumbsPage>
              </BreadcrumbsItem>
            </Breadcrumbs>
          </TabPanel>
          <TabPanel value="code" className="p-0">
            <CodeBlock
              data={breadcrumbEllipsis}
            />
          </TabPanel>
        </Tabs>
      </div>

      {/* Component API */}
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
        <h5 className="text-lg xl:text-xl font-medium">Breadcrumbs</h5>
        <p className="text-sm pb-1">
          The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">Breadcrumbs</span> component is the root element that wraps all breadcrumb components.
        </p>
        <PropsTable data={breadcrumbPropsData} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium">BreadcrumbsEllipsis</h5>
        <p className="text-sm pb-1">
          The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">BreadcrumbsEllipsis</span> component displays an ellipsis indicator for collapsed breadcrumb items.
        </p>
        <PropsTable data={breadcrumbEllipsisPropsData} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium">BreadcrumbsItem</h5>
        <p className="text-sm pb-1">
          The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">BreadcrumbsItem</span> component wraps individual breadcrumb items.
        </p>
        <PropsTable data={breadcrumbItemPropsData} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium">BreadcrumbsLink</h5>
        <p className="text-sm pb-1">
          The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">BreadcrumbsLink</span> component displays a clickable link in the breadcrumb.
        </p>
        <PropsTable data={breadcrumbLinkPropsData} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium">BreadcrumbsPage</h5>
        <p className="text-sm pb-1">
          The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">BreadcrumbsPage</span> component displays the current page in the breadcrumb
        </p>
        <PropsTable data={breadcrumbPagePropsData} className="mb-5" />
        <AttributeTable data={breadcrumbPageAttribute} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-lg xl:text-xl font-medium">BreadcrumbsSeparator</h5>
        <p className="text-sm pb-1">
          The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">BreadcrumbsSeparator</span> component displays a separator between breadcrumb items. You can pass custom children to override the default separator icon.
        </p>
        <PropsTable data={breadcrumbSeparatorPropsData} />
      </div>
    </div>
  )
}

