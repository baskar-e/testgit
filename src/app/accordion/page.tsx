import { CodeBlock, t } from "@/lib/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../all-components/controls/tabs"
import { parseRawCode } from "@/lib/codeGenerate"

const code = [
  {
    word: { keyword: 'import', bracket: '{' },
    level: [
      {
        word: { text: 'Accordion' },
      },
      {
        word: { text: 'AccordionContent' },
      },
      {
        word: { text: 'AccordionItem' },
      },
      {
        word: { text: 'AccordionTrigger' },
      }
    ],
  },
  {
    word: { bracket: '}', keyword: 'from', string: '"@/components/ui/accordion"' }
  }
]

const usage = [
  {
    word: { tag: '<Accordion>' },
    level: [
      {
        word: [t('tag', '<AccordionTrigger>'), t('text', 'Open 1'), t('tag', '</AccordionTrigger>')],
        space: false
      },
      {
        word: { tag: '<AccordionContent>' },
        level: [
          {
            word: { text: 'Accordion 1' }
          }
        ],
      },
      {
        word: { tag: '</AccordionContent>' },
      }
    ],
  },
  {
    level: [
      {
        word: [t('tag', '<AccordionTrigger>'), t('text', 'Open 2'), t('tag', '</AccordionTrigger>')],
        space: false
      },
      {
        word: { tag: '<AccordionContent>' },
        level: [
          {
            word: { text: 'Accordion 2' }
          }
        ],
      },
      {
        word: { tag: '</AccordionContent>' },
      }
    ],
  },
  {
    level: [
      {
        word: [t('tag', '<AccordionTrigger>'), t('text', 'Open 3'), t('tag', '</AccordionTrigger>')],
        space: false
      },
      {
        word: { tag: '<AccordionContent>' },
        level: [
          {
            word: { text: 'Accordion 3' }
          }
        ],
      },
      {
        word: { tag: '</AccordionContent>' },
      }
    ],
  },
  {
    word: { tag: '</Accordion>' }
  }
]

const basic = [
  {
    word: { keyword: 'import', bracket: '{' },
    level: [
      {
        word: { text: 'Accordion' },
      },
      {
        word: { text: 'AccordionContent' },
      },
      {
        word: { text: 'AccordionItem' },
      },
      {
        word: { text: 'AccordionTrigger' },
      }
    ],
  },
  {
    word: { bracket: '}', keyword: 'from', string: '"@/components/ui/accordion"' }
  },
  { word: { text: '' } },
  { word: [t('keyword', 'const'), t('operator', 'items'), t('keyword', '='), t('bracket', '[')] }
  // {}
]

const a = [{
  word: {
    "keyword": "const",
    "text": "items",
    "operator": "=",
    "bracket": "[", space: false
  },
  level: [{
    word: { "bracket": "{" },
    level: [
      {
        word: [t("text", "value:"), t("string", '"item-1"', false), t("text", ",")],
      },
      {
        word: [t("text", "trigger:"), t("string", '"How do I reset my password?"'), t("text", ",")],
      },
      {
        word: [t("text", "content:"), t("string", "\"Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.\""), t("text", ",")],
      },
    ]
  },]
}]



export default function Accordion() {
  // const data = parseRawCode(a);
  // console.log(JSON.stringify(data, null, 2))
  return (
    <div className="grid gap-8 max-w-130 xl:max-w-160 py-4 xl:py-6 mx-auto">
      <div className="grid gap-3">
        <h3 className="text-2xl xl:text-3xl font-medium text-slate-800">Accordion</h3>
        <p className="max-xl:text-[15px]">A collapsible container for organizing content into expandable sections, commonly used to manage space in user interfaces.</p>
      </div>
      <div className="grid gap-5">
        <h4 className="text-xl xl:text-2xl text-slate-800 font-medium">Usage</h4>
        {/* <CodeBlock
          title="Imports"
          data={code}
        />
        <CodeBlock
          title="Components"
          data={usage}
        /> */}
      </div>
      <div className="grid gap-3">
        <h4 className="text-xl xl:text-2xl text-slate-800 font-medium pb-2">Examples</h4>
        <h5 className="text-lg xl:text-xl text-slate-800 font-medium pb-1">Basic</h5>
        <p className="text-sm text-slate-800">A basic accordion that shows one item at a time. </p>
        <Tabs defaultValue={'preview'} variant="line">
          <TabList>
            <TabButton value="preview">Preview</TabButton>
            <TabButton value="code">Code</TabButton>
          </TabList>
          <TabPanel value="preview" className="p-0">
            <CodeBlock data={a} />
          </TabPanel>
          <TabPanel value="code" className="p-0">
            {/* <CodeBlock
              data={code}
            /> */}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

