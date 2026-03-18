import { t } from "@/components/codeBlock"

const items = [
    { word: { "text": "" } },
    {
        word: [t("keyword", "const"), t("variable", "items"), t("keyword", "="), t("bracket", "[")]
    },
    {
        level: [
            {
                word: [t("bracket", "{"), t("text", "value:"), t("string", "'option1'"), t("text", ","), t("text", "label:"), t("string", "'Option 1'"), t("bracket", "},")]
            },
            {
                word: [t("bracket", "{"), t("text", "value:"), t("string", "'option2'"), t("text", ","), t("text", "label:"), t("string", "'Option 2'"), t("bracket", "},")]
            },
            {
                word: [t("bracket", "{"), t("text", "value:"), t("string", "'option3'"), t("text", ","), t("text", "label:"), t("string", "'Option 3'"), t("bracket", "}")]
            }
        ]
    },
    {
        word: { "bracket": "]", "text": ";", space: false }
    },
    { word: { "text": "" } }
];

export const radioGroupCode = [
    {
        word: { keyword: 'import', bracket: '{' },
        level: [
            {
                word: { text: 'RadioGroup,', },
            },
            {
                word: { text: 'RadioGroupItem' },
            }
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/radio-group"' }
    }
]

export const radioGroupUsage = [
    {
        word: { tag: '<RadioGroup>' },
        level: [
            {
                word: [t("tag", "<RadioGroupItem"), t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("string", '"item1"', false), t("bracket", "}", false), t("tag", ">")],
            },
            {
                level: [{ word: { "text": "Item 1" } }]
            },
            {
                word: { "tag": "</RadioGroupItem>" },
            },
            {
                word: [t("tag", "<RadioGroupItem"), t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("string", '"item2"', false), t("bracket", "}", false), t("tag", ">")],
            },
            {
                level: [{ word: { "text": "Item 2" } }]
            },
            {
                word: { "tag": "</RadioGroupItem>" },
            }
        ]
    },
    {
        word: { tag: '</RadioGroup>' }
    }
]

export const radioGroupBasic = [
    ...radioGroupCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "RadioGroupBasic", false), t("bracket", "() {")],
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
                        word: { "tag": "<RadioGroup>" }
                    },
                    {
                        level: [
                            {
                                word: [t("bracket", "{", false), t("variable", "items.", false), t("function", "map", false), t("bracket", "((", false), t("variable", "item", false), t("bracket", ")"), t("keyword", "=>"), t("bracket", "(")]
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<RadioGroupItem"),
                                            t("prop", "key", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}"),
                                            t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}", false),
                                            t("tag", ">")
                                        ]
                                    },
                                    {
                                        level: [{ word: [t("bracket", "{", false), t("text", "item.label", false), t("bracket", "}")] }]
                                    },
                                    {
                                        word: { "tag": "</RadioGroupItem>" }
                                    }
                                ]
                            },
                            {
                                word: [t("bracket", "))}")]
                            }
                        ]
                    },
                    {
                        word: { "tag": "</RadioGroup>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    {
        word: { bracket: '}' }
    }
];

export const radioGroupVertical = [
    ...radioGroupCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "RadioGroupVertical", false), t("bracket", "() {")],
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
                        word: [t("tag", "<RadioGroup"), t("prop", "orientation", false), t("keyword", "=", false), t("string", '"vertical"', false), t("tag", ">")]

                    },
                    {
                        level: [
                            {
                                word: [t("bracket", "{", false), t("variable", "items.", false), t("function", "map", false), t("bracket", "((", false), t("variable", "item", false), t("bracket", ")"), t("keyword", "=>"), t("bracket", "(")]
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<RadioGroupItem"),
                                            t("prop", "key", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}"),
                                            t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}", false),
                                            t("tag", ">")
                                        ]
                                    },
                                    {
                                        level: [{ word: [t("bracket", "{", false), t("text", "item.label", false), t("bracket", "}")] }]
                                    },
                                    {
                                        word: { "tag": "</RadioGroupItem>" }
                                    }
                                ]
                            },
                            {
                                word: [t("bracket", "))}")]
                            }
                        ]
                    },
                    {
                        word: { "tag": "</RadioGroup>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    {
        word: { bracket: '}' }
    }
];

export const radioGroupDefaultValue = [
    ...radioGroupCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "RadioGroupDefaultValue", false), t("bracket", "() {")],
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
                        word: [t("tag", "<RadioGroup"), t("prop", "defaultValue", false), t("keyword", "=", false), t("string", '"option1"', false), t("tag", ">")]

                    },
                    {
                        level: [
                            {
                                word: [t("bracket", "{", false), t("variable", "items.", false), t("function", "map", false), t("bracket", "((", false), t("variable", "item", false), t("bracket", ")"), t("keyword", "=>"), t("bracket", "(")]
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<RadioGroupItem"),
                                            t("prop", "key", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}"),
                                            t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}", false),
                                            t("tag", ">")
                                        ]
                                    },
                                    {
                                        level: [{ word: [t("bracket", "{", false), t("text", "item.label", false), t("bracket", "}")] }]
                                    },
                                    {
                                        word: { "tag": "</RadioGroupItem>" }
                                    }
                                ]
                            },
                            {
                                word: [t("bracket", "))}")]
                            }
                        ]
                    },
                    {
                        word: { "tag": "</RadioGroup>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    {
        word: { bracket: '}' }
    }
];

export const radioGroupControlled = [
    ...radioGroupCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "RadioGroupControlled", false), t("bracket", "() {")],
        level: [
            {
                word: [t("keyword", "const"), t("bracket", "[", false), t("variable", "value", false), t("text", ","), t("function", "setValue", false), t("bracket", "]"), t("keyword", "="), t("function", "useState", false), t("bracket", "(", false), t("string", '""', false), t("bracket", ")", false), t("text", ";")],
            },
            { word: { text: '' } },
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [
                    {
                        word: [
                            t("tag", "<RadioGroup"),
                            t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("variable", 'value', false), t("bracket", "}"),
                            t("prop", "onValueChange", false), t("keyword", "=", false), t("bracket", "{", false), t("function", 'setValue', false), t("bracket", "}", false),
                            t("tag", ">")
                        ]
                    },
                    {
                        level: [
                            {
                                word: [t("bracket", "{", false), t("variable", "items.", false), t("function", "map", false), t("bracket", "((", false), t("variable", "item", false), t("bracket", ")"), t("keyword", "=>"), t("bracket", "(")]
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<RadioGroupItem"),
                                            t("prop", "key", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}"),
                                            t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}", false),
                                            t("tag", ">")
                                        ]
                                    },
                                    {
                                        level: [{ word: [t("bracket", "{", false), t("text", "item.label", false), t("bracket", "}")] }]
                                    },
                                    {
                                        word: { "tag": "</RadioGroupItem>" }
                                    }
                                ]
                            },
                            {
                                word: [t("bracket", "))}")]
                            }
                        ]
                    },
                    {
                        word: { "tag": "</RadioGroup>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    {
        word: { bracket: '}' }
    }
];

export const radioGroupDisabled = [
    ...radioGroupCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "RadioGroupDisabled", false), t("bracket", "() {")],
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
                        word: [t("tag", "<RadioGroup"), t("prop", "disabled", false), t("tag", ">")]

                    },
                    {
                        level: [
                            {
                                word: [t("bracket", "{", false), t("variable", "items.", false), t("function", "map", false), t("bracket", "((", false), t("variable", "item", false), t("bracket", ")"), t("keyword", "=>"), t("bracket", "(")]
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<RadioGroupItem"),
                                            t("prop", "key", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}"),
                                            t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}", false),
                                            t("tag", ">")
                                        ]
                                    },
                                    {
                                        level: [{ word: [t("bracket", "{", false), t("text", "item.label", false), t("bracket", "}")] }]
                                    },
                                    {
                                        word: { "tag": "</RadioGroupItem>" }
                                    }
                                ]
                            },
                            {
                                word: [t("bracket", "))}")]
                            }
                        ]
                    },
                    {
                        word: { "tag": "</RadioGroup>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    {
        word: { bracket: '}' }
    }
];

export const radioGroupItemDisabled = [
    ...radioGroupCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "RadioGroupItemDisabled", false), t("bracket", "() {")],
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
                        word: { "tag": "<RadioGroup>" }
                    },
                    {
                        level: [
                            {
                                word: [t("bracket", "{", false), t("variable", "items.", false), t("function", "map", false), t("bracket", "((", false), t("variable", "item", false), t("bracket", ")"), t("keyword", "=>"), t("bracket", "(")]
                            },
                            {
                                level: [
                                    {
                                        word: { "tag": "<RadioGroupItem" },
                                    },
                                    {
                                        level: [
                                            {
                                                word: [t("prop", "key", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}")]
                                            },
                                            {
                                                word: [t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value", false), t("bracket", "}")]
                                            },
                                            {
                                                word: [t("prop", "disabled", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "item.value"), t("keyword", "==="), t("string", '"option2"', false), t("bracket", "}")]
                                            }
                                        ]
                                    },
                                    {
                                        word: { "tag": ">" }
                                    },
                                    {
                                        level: [{ word: [t("bracket", "{", false), t("text", "item.label", false), t("bracket", "}")] }]
                                    },
                                    {
                                        word: { "tag": "</RadioGroupItem>" }
                                    }
                                ]
                            },
                            {
                                word: [t("bracket", "))}")]
                            }
                        ]
                    },
                    {
                        word: { "tag": "</RadioGroup>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    {
        word: { bracket: '}' }
    }
];

export const radioGroupPropsData = [
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">name</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">-</span>,
        default: '-',
        description: "The name of the radio group, used to group items together for form submission."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">defaultValue</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '-',
        description: "The default selected value when the radio group is initially rendered."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '-',
        description: "The currently selected value of the radio group."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">onValueChange</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"(value: string) => void"}</span>,
        default: '-',
        description: "A callback function that is called whenever the selected value changes. It is used to update the value prop in a controlled component."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">orientation</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"horizontal"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"vertical"</span>
            </div>
        ),
        default: 'horizontal',
        description: "Sets the visual layout of the radio items."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">disabled</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">boolean</span>,
        default: 'false',
        description: "A boolean flag that, prevents user interaction with all radio items within the group."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">required</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">boolean</span>,
        default: 'false',
        description: "Indicates that the user must select an option before submitting the form."
    }
]

export const radioItemPropsData = [
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">id</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">-</span>,
        default: '-',
        description: "A unique identifier for the radio item, used to link the input with its label for accessibility."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value*</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">-</span>,
        default: '-',
        description: "The unique string value associated with this specific radio item, used by the parent group to manage selection."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">children</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">ReactNode</span>,
        default: '-',
        description: "Content or elements rendered inside the component."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">disabled</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">boolean</span>,
        default: 'false',
        description: "A boolean flag that, prevents user interaction with this specific radio item."
    }
]

export const radioGroupAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-orientation</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"horizontal" | "vertical"</span>,
        description: "Indicates the orientation of the radio group."
    }
]

export const radioItemAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"checked" | "unchecked"</span>,
        description: "Indicates whether the radio item is checked or unchecked."
    }
]