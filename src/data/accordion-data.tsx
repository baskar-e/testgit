import { t } from "@/components/codeBlock"

const items = [
  { word: { text: '' } },
  { word: [t('keyword', 'const'), t('operator', 'items'), t('keyword', '='), t('bracket', '[')] },
  {
    level: [{
      word: { "bracket": "{" },
      level: [
        {
          word: [t("text", "value:"), t("string", '"item-1"', false), t("text", ",")],
        },
        {
          word: [t("text", "trigger:"), t("string", '"How do I reset my password?"', false), t("text", ",")],
        },
        {
          word: [t("text", "content:"), t("string", "\"Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.\"", false), t("text", ",")],
        },
      ]
    },
    { word: { "bracket": "}", text: ",", space: false } },
    {
      word: { "bracket": "{" },
      level: [
        {
          word: [t("text", "value:"), t("string", '"item-2"', false), t("text", ",")],
        },
        {
          word: [t("text", "trigger:"), t("string", '"Where can I view my purchase history?"', false), t("text", ",")],
        },
        {
          word: [t("text", "content:"), t("string", "\"You can view your purchase history by logging into your account and navigating to the 'Orders' section. There, you'll find a list of all your past purchases along with their details.\"", false), t("text", ",")],
        },
      ]
    },
    { word: { "bracket": "}", text: ",", space: false } },
    {
      word: { "bracket": "{" },
      level: [
        {
          word: [t("text", "value:"), t("string", '"item-3"', false)],
        },
        {
          word: [t("text", "trigger:"), t("string", '"How do I contact customer support?"', false), t("text", ",")],
        },
        {
          word: [t("text", "content:"), t("string", "\"You can contact our customer support team by clicking on the 'Support' link at the bottom of our website. From there, you can choose to chat with a representative, send us an email, or call our support hotline. We're available 24/7 to assist you with any questions or concerns you may have.\"", false)],
        },
      ]
    },
    {
      word: { "bracket": "}" }
    }
    ]
  },
  { word: { "bracket": "]" } },
  { word: { text: "" } },
]

export const accordionCode = [
  {
    word: { keyword: 'import', bracket: '{' },
    level: [
      {
        word: { text: 'Accordion,', },
      },
      {
        word: { text: 'AccordionContent,' },
      },
      {
        word: { text: 'AccordionItem,' },
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

export const accordionUsage = [
  {
    word: { tag: '<Accordion>' },
    level: [
      {
        word: [t('tag', '<AccordionTrigger>', false), t('text', 'Open 1', false), t('tag', '</AccordionTrigger>')],
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
        word: [t('tag', '<AccordionTrigger>', false), t('text', 'Open 2', false), t('tag', '</AccordionTrigger>')],
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
        word: [t('tag', '<AccordionTrigger>', false), t('text', 'Open 3', false), t('tag', '</AccordionTrigger>')],
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

export const accordionBasic = [
  ...accordionCode,
  ...items,
  {
    word: [t("keyword", "export function"), t("function", "AccordionBasic", false), t("bracket", "() {")],
    level: [
      {
        word: {
          "keyword": "return",
          "bracket": "("
        },
      },
      {
        level: [
          {
            word: [t('tag', '<Accordion'), t('prop', 'type', false), t('keyword', '=', false), t('string', '"single"'), t('prop', 'defaultValue', false), t('keyword', '=', false), t('string', '"item-1"', false), t('tag', '>')],
          },
          {
            "level": [
              {
                "word": [t("bracket", "{", false), t("text", "items.", false), t("function", "map", false), t("bracket", "((", false), t("operator", "item", false), t("bracket", ")"), t("keyword", "=>"), t("bracket", "(")],
                "level": [
                  {
                    "word": [t("tag", "<AccordionItem"), t("prop", "key", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}"), t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}", false), t("tag", ">")]
                  },
                  {
                    "level": [
                      {
                        "word": [t("tag", "<AccordionTrigger>", false), t("bracket", "{", false), t("text", "item.trigger", false), t("bracket", "}", false), t("tag", "</AccordionTrigger>")]
                      },
                      {
                        "word": [t("tag", "<AccordionContent>", false), t("bracket", "{", false), t("text", "item.content", false), t("bracket", "}", false), t("tag", "</AccordionContent>")]
                      }
                    ]
                  },
                  {
                    "word": [t("tag", "</AccordionItem>")]
                  }
                ]
              },
              {
                "word": [t("bracket", "))}")]
              }
            ]
          },
          {
            "word": [t("tag", "</Accordion>")]
          }
        ]
      },
      {
        word: { bracket: ')' }
      }
    ]
  },
  { word: { bracket: '}' } }
]

export const accordionMultiple = [
  ...accordionCode,
  ...items,
  {
    word: [t("keyword", "export function"), t("function", "AccordionMultiple", false), t("bracket", "() {")],
    level: [
      {
        word: {
          "keyword": "return",
          "bracket": "("
        },
      },
      {
        level: [
          {
            word: [t('tag', '<Accordion'), t('prop', 'type', false), t('keyword', '=', false), t('string', '"multiple"'), t('prop', 'defaultValue', false), t('keyword', '=', false), t("bracket", "[", false), t('string', '"item-1",'), t('string', '"item-3"', false), t('bracket', ']', false), t('tag', '>')],
          },
          {
            "level": [
              {
                "word": [t("bracket", "{", false), t("text", "items.", false), t("function", "map", false), t("bracket", "((", false), t("operator", "item", false), t("bracket", ")"), t("keyword", "=>"), t("bracket", "(")],
                "level": [
                  {
                    "word": [t("tag", "<AccordionItem"), t("prop", "key", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}"), t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}", false), t("tag", ">")]
                  },
                  {
                    "level": [
                      {
                        "word": [t("tag", "<AccordionTrigger>", false), t("bracket", "{", false), t("text", "item.trigger", false), t("bracket", "}", false), t("tag", "</AccordionTrigger>")]
                      },
                      {
                        "word": [t("tag", "<AccordionContent>", false), t("bracket", "{", false), t("text", "item.content", false), t("bracket", "}", false), t("tag", "</AccordionContent>")]
                      }
                    ]
                  },
                  {
                    "word": [t("tag", "</AccordionItem>")]
                  }
                ]
              },
              {
                "word": [t("bracket", "))}")]
              }
            ]
          },
          {
            "word": [t("tag", "</Accordion>")]
          }
        ]
      },
      {
        word: { bracket: ')' }
      }
    ]
  },
  { word: { bracket: '}' } }
]

export const accordionItems = [
  {
    value: "item-1",
    trigger: "How do I reset my password?",
    content:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
  },
  {
    value: "item-2",
    trigger: "Can I change my subscription plan?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
  },
  {
    value: "item-3",
    trigger: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
]

export const accordionPropsData = [
  {
    name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">type*</span>,
    type: <div className="flex flex-wrap gap-1"><span className="bg-gray-100 px-2 py-1 rounded-md">"single"</span><span className="bg-gray-100 px-2 py-1 rounded-md">"multiple"</span></div>,
    default: '-',
    description: "Defines whether the accordion allows single or multiple panels to be expanded."
  },
  {
    name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">value</span>,
    type: <div className="flex flex-wrap gap-1"><span className="bg-gray-100 px-2 py-1 rounded-md">string</span><span className="bg-gray-100 px-2 py-1 rounded-md">number</span></div>,
    default: '-',
    description: "Controls which panel is expanded. Can be a string or number representing the selected panel."
  },
  {
    name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">defaultValue</span>,
    type: <div className="flex flex-wrap gap-1"><span className="bg-gray-100 px-2 py-1 rounded-md">string</span><span className="bg-gray-100 px-2 py-1 rounded-md">number</span></div>,
    default: '-',
    description: "Sets the initially active panel. Only used in uncontrolled components."
  },
  {
    name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">onValueChange</span>,
    type: <span className="inline-block w-auto bg-gray-100 px-2 py-1 rounded-md">{"(value: string | number) => void"}</span>,
    default: '-',
    description: "Callback function fired when the active value changes. Only available in controlled components."
  },
  {
    name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">value <span className="whitespace-nowrap">(for multiple)</span></span>,
    type: <div className="flex flex-wrap gap-1"><span className="bg-gray-100 px-2 py-1 rounded-md">string[]</span><span className="bg-gray-100 px-2 py-1 rounded-md">number[]</span></div>,
    default: '[]',
    description: "Controls multiple panels to be expanded (for 'multiple' type)."
  },
  {
    name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">defaultValue <span className="whitespace-nowrap">(for multiple)</span></span>,
    type: <div className="flex flex-wrap gap-1"><span className="bg-gray-100 px-2 py-1 rounded-md">string[]</span><span className="bg-gray-100 px-2 py-1 rounded-md">number[]</span></div>,
    default: '[]',
    description: "Sets the initially active panels (for 'multiple' type)."
  },
  {
    name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">onValueChange <span className="whitespace-nowrap">(for multiple)</span></span>,
    type: <span className="inline-block w-auto bg-gray-100 px-2 py-1 rounded-md">{"(value: string[] | number[]) => void"}</span>,
    default: '-',
    description: "Callback function fired when the active value changes. Only available in controlled components."
  },
];

export const accordionItemPropsData = [
  {
    name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">value*</span>,
    type: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">string</span>,
    default: '-',
    description: "The unique identifier for each AccordionItem."
  }
]

export const accordionItemAttribute = [
  {
    name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">data-state</span>,
    type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">"open" | "closed"</span>,
    description: "Indicates whether the item is expanded or collapsed."
  }
]