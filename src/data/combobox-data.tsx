import { t } from "@/components/codeBlock"

const items = [
    { word: { text: '' } },
    {
        word: [
            t("keyword", "const"),
            t("variable", "fruits"),
            t("keyword", "="),
            t("bracket", "[", false),
            t("text", "Apple,"),
            t("text", "Banana,"),
            t("text", "Carrot,"),
            t("text", "Mango", false),
            t("bracket", "]", false),
            t("text", ";", false),
        ]
    },
    { word: { text: '' } }
]

const itemsLabel = [
    { word: { text: '' } },
    {
        word: [
            t("keyword", "const"),
            t("variable", "fruitsLabel"),
            t("keyword", "="),
            t("bracket", "[", false),
        ],
        level: [
            {
                word: [
                    t("bracket", "{"), t("text", "name:"), t("string", "\"Apple\"", false), t("text", ","), t("text", "color:"), t("string", "\"Red\""), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "name:"), t("string", "\"Banana\"", false), t("text", ","), t("text", "color:"), t("string", "\"Yellow\""), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "name:"), t("string", "\"Carrot\"", false), t("text", ","), t("text", "color:"), t("string", "\"Orange\""), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "name:"), t("string", "\"Mango\"", false), t("text", ","), t("text", "color:"), t("string", "\"Green\""), t("bracket", "}", false)
                ]
            }
        ]
    },
    {
        word: { "bracket": "]", "text": ";", "space": false }
    },
    { word: { text: '' } }
]

const itemsValue = [
    { word: { text: '' } },
    {
        word: [
            t("keyword", "const"),
            t("variable", "fruitsValue"),
            t("keyword", "="),
            t("bracket", "[", false),
        ],
        level: [
            {
                word: [
                    t("bracket", "{"), t("text", "id:"), t("string", "1", false), t("text", ","), t("text", "name:"), t("string", "\"Apple\""), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "id:"), t("string", "2", false), t("text", ","), t("text", "name:"), t("string", "\"Banana\""), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "id:"), t("string", "3", false), t("text", ","), t("text", "name:"), t("string", "\"Carrot\""), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "id:"), t("string", "4", false), t("text", ","), t("text", "name:"), t("string", "\"Mango\""), t("bracket", "}", false)
                ]
            }
        ]
    },
    {
        word: { "bracket": "]", "text": ";", "space": false }
    },
    { word: { text: '' } }
]

const itemsDisabled = [
    { word: { text: '' } },
    {
        word: [
            t("keyword", "const"),
            t("variable", "fruitsDisabled"),
            t("keyword", "="),
            t("bracket", "[", false),
        ],
        level: [
            {
                word: [
                    t("bracket", "{"), t("text", "id:"), t("string", "1", false), t("text", ","), t("text", "name:"), t("string", "\"Apple\"", false), t("text", ","), t("text", "invalid:"), t("string", "true", false), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "id:"), t("string", "2", false), t("text", ","), t("text", "name:"), t("string", "\"Banana\""), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "id:"), t("string", "3", false), t("text", ","), t("text", "name:"), t("string", "\"Carrot\"", false), t("text", ","), t("text", "invalid:"), t("string", "true", false), t("bracket", "}", false), t("text", ",")
                ]
            },
            {
                word: [
                    t("bracket", "{"), t("text", "id:"), t("string", "4", false), t("text", ","), t("text", "name:"), t("string", "\"Mango\""), t("bracket", "}", false)
                ]
            }
        ]
    },
    {
        word: { "bracket": "]", "text": ";", "space": false }
    },
    { word: { text: '' } }
]

const comboboxContent = [
    {
        word: [
            t("tag", "<ComboboxInput"),
            t("prop", "placeholder", false),
            t("keyword", "=", false),
            t("string", '"Select an option..."'),
            t("tag", "/>")
        ]
    },
    {
        word: { "tag": "<ComboboxContent>" },
        level: [
            {
                word: { "tag": "<ComboboxEmpty />" },
            },
            {
                word: { "tag": "<ComboboxList>" },
                level: [
                    {
                        word: [
                            t("bracket", "{", false),
                            t("bracket", "(", false),
                            t("variable", "item", false),
                            t("bracket", ")"),
                            t("keyword", "=>"),
                            t("bracket", "(")
                        ]
                    },
                    {
                        level: [
                            {
                                word: [
                                    t("tag", "<ComboboxItem"),
                                    t("prop", "key", false),
                                    t("keyword", "=", false),
                                    t("bracket", "{", false),
                                    t("text", "item.name", false),
                                    t("bracket", "}"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("bracket", "{", false),
                                    t("text", "item", false),
                                    t("bracket", "}", false),
                                    t("tag", ">")
                                ],
                                level: [
                                    {
                                        word: [
                                            t("bracket", "{", false),
                                            t("text", "item.name", false),
                                            t("bracket", "}")
                                        ]
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</ComboboxItem>" }
                            }
                        ]
                    },
                    {
                        word: { "bracket": ")}" }
                    }
                ]
            },
            {
                word: { "tag": "</ComboboxList>" }
            }
        ]
    },
    {
        word: { "tag": "</ComboboxContent>" }
    }
];

export const comboboxCode = [
    {
        word: { keyword: 'import', bracket: '{' },
        level: [
            {
                word: { text: 'Combobox,', },
            },
            {
                word: { text: 'ComboboxContent,' },
            },
            {
                word: { text: 'ComboboxEmpty,' },
            },
            {
                word: { text: 'ComboboxInput,' },
            },
            {
                word: { text: 'ComboboxItem,' },
            },
            {
                word: { text: 'ComboboxList' },
            }
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/combobox"' }
    }
]

export const comboboxUsage = [
    {
        word: { "tag": "<Combobox>" },
        level: [
            {
                word: { "tag": "<ComboboxInput />" }
            },
            {
                word: { "tag": "<ComboboxContent>" },
                level: [
                    {
                        word: { "tag": "<ComboboxEmpty />" }
                    },
                    {
                        word: { "tag": "<ComboboxList>" },

                        level: [
                            {
                                word: { "tag": "<ComboboxItem>" },
                                level: [
                                    {
                                        word: { text: "Item" }
                                    }
                                ]
                            },
                            {
                                word: [t("tag", "</ComboboxItem>")]
                            }
                        ]
                    },
                    {
                        word: [t("tag", "</ComboboxList>")]
                    }
                ]
            },
            {
                word: [t("tag", "</ComboboxContent>")]
            }
        ]
    },
    {
        word: [t("tag", "</Combobox>")]
    }
];

export const comboboxBasic = [
    ...comboboxCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "ComboboxBasic", false), t("bracket", "() {")],
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
                        word: [
                            t("tag", "<Combobox"),
                            t("prop", "items", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("text", "fruits", false),
                            t("bracket", "}", false),
                            t("tag", ">")
                        ],
                        level: [
                            {
                                word: [
                                    t("tag", "<ComboboxInput"),
                                    t("prop", "placeholder", false),
                                    t("keyword", "=", false),
                                    t("string", '"Select an option..."'),
                                    t("tag", "/>")
                                ]
                            },
                            {
                                word: { "tag": "<ComboboxContent>" },
                                level: [
                                    {
                                        word: { "tag": "<ComboboxEmpty />" }
                                    },
                                    {
                                        word: { "tag": "<ComboboxList>" },
                                        level: [
                                            {
                                                word: [
                                                    t("bracket", "{", false),
                                                    t("bracket", "(", false),
                                                    t("variable", "item", false),
                                                    t("bracket", ")"),
                                                    t("keyword", "=>"),
                                                    t("bracket", "(")
                                                ]
                                            },
                                            {
                                                level: [
                                                    {
                                                        word: [
                                                            t("tag", "<ComboboxItem"),
                                                            t("prop", "key", false),
                                                            t("keyword", "=", false),
                                                            t("bracket", "{", false),
                                                            t("text", "item", false),
                                                            t("bracket", "}"),
                                                            t("prop", "value", false),
                                                            t("keyword", "=", false),
                                                            t("bracket", "{", false),
                                                            t("text", "item", false),
                                                            t("bracket", "}", false),
                                                            t("tag", ">")
                                                        ],
                                                        level: [
                                                            {
                                                                word: [
                                                                    t("bracket", "{", false),
                                                                    t("text", "item", false),
                                                                    t("bracket", "}")
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        word: { "tag": "</ComboboxItem>" }
                                                    }
                                                ]
                                            },
                                            {
                                                word: { "bracket": ")}" }
                                            }
                                        ]
                                    },
                                    {
                                        word: { "tag": "</ComboboxList>" }
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</ComboboxContent>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Combobox>" }
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
]

export const comboboxLabel = [
    ...comboboxCode,
    ...itemsLabel,
    {
        word: [t("keyword", "export function"), t("function", "ComboboxLabel", false), t("bracket", "() {")],
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
                        word: [
                            t("tag", "<Combobox"),
                            t("prop", "items", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("text", "fruitsLabel", false),
                            t("bracket", "}"),
                            t("prop", "labelKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("string", "'name'", false),
                            t("bracket", "}", false),
                            t("tag", ">")
                        ],
                        level: comboboxContent
                    },
                    {
                        word: { "tag": "</Combobox>" }
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

export const comboboxLabelFn = [
    ...comboboxCode,
    ...itemsLabel,
    {
        word: [t("keyword", "export function"), t("function", "ComboboxLabelFn", false), t("bracket", "() {")],
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
                        word: [
                            t("tag", "<Combobox"),
                            t("prop", "items", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("text", "fruitsLabel", false),
                            t("bracket", "}"),
                            t("prop", "labelKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{(", false),
                            t("variable", "item", false),
                            t("bracket", ")"),
                            t("keyword", "=>"),
                            t("string", "`", false),
                            t("bracket", "${", false),
                            t("text", "item.name", false),
                            t("bracket", "}"),
                            t("keyword", "-"),
                            t("bracket", "{", false),
                            t("text", "item.color", false),
                            t("bracket", "}", false),
                            t("string", "`", false),
                            t("bracket", "}", false),
                            t("tag", ">")
                        ],
                        level: [
                            {
                                word: [
                                    t("tag", "<ComboboxInput"),
                                    t("prop", "placeholder", false),
                                    t("keyword", "=", false),
                                    t("string", '"Select an option..."'),
                                    t("tag", "/>")
                                ]
                            },
                            {
                                word: { "tag": "<ComboboxContent>" },
                                level: [
                                    {
                                        word: { "tag": "<ComboboxEmpty />" },
                                    },
                                    {
                                        word: { "tag": "<ComboboxList>" },
                                        level: [
                                            {
                                                word: [
                                                    t("bracket", "{", false),
                                                    t("bracket", "(", false),
                                                    t("variable", "item", false),
                                                    t("bracket", ")"),
                                                    t("keyword", "=>"),
                                                    t("bracket", "(")
                                                ]
                                            },
                                            {
                                                level: [
                                                    {
                                                        word: [
                                                            t("tag", "<ComboboxItem"),
                                                            t("prop", "key", false),
                                                            t("keyword", "=", false),
                                                            t("bracket", "{", false),
                                                            t("text", "item.name", false),
                                                            t("bracket", "}"),
                                                            t("prop", "value", false),
                                                            t("keyword", "=", false),
                                                            t("bracket", "{", false),
                                                            t("text", "item", false),
                                                            t("bracket", "}", false),
                                                            t("tag", ">")
                                                        ],
                                                        level: [
                                                            {
                                                                word: [
                                                                    t("bracket", "{", false),
                                                                    t("text", "item.name", false),
                                                                    t("bracket", "}"),
                                                                    t("keyword", "-"),
                                                                    t("bracket", "{", false),
                                                                    t("text", "item.color", false),
                                                                    t("bracket", "}", false),
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        word: { "tag": "</ComboboxItem>" }
                                                    }
                                                ]
                                            },
                                            {
                                                word: { "bracket": ")}" }
                                            }
                                        ]
                                    },
                                    {
                                        word: { "tag": "</ComboboxList>" }
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</ComboboxContent>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Combobox>" }
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

export const comboboxValue = [
    ...comboboxCode,
    ...itemsValue,
    {
        word: [t("keyword", "export function"), t("function", "ComboboxValue", false), t("bracket", "() {")],
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
                        word: [
                            t("tag", "<Combobox"),
                            t("prop", "items", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("text", "fruitsValue", false),
                            t("bracket", "}"),
                            t("prop", "labelKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("string", "'name'", false),
                            t("bracket", "}"),
                            t("prop", "valueKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("string", "'id'", false),
                            t("bracket", "}", false),
                            t("tag", ">")
                        ],
                        level: comboboxContent
                    },
                    {
                        word: { "tag": "</Combobox>" }
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

export const comboboxValueFn = [
    ...comboboxCode,
    ...itemsValue,
    {
        word: [t("keyword", "export function"), t("function", "ComboboxValueFn", false), t("bracket", "() {")],
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
                        word: [
                            t("tag", "<Combobox"),
                            t("prop", "items", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("text", "fruitsValue", false),
                            t("bracket", "}"),
                            t("prop", "labelKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("string", "'name'", false),
                            t("bracket", "}"),
                            t("prop", "valueKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{(", false),
                            t("variable", "item", false),
                            t("bracket", ")"),
                            t("keyword", "=>"),
                            t("function", "String", false),
                            t("bracket", "(", false),
                            t("text", "item.id", false),
                            t("bracket", ")}", false),
                            t("tag", ">")
                        ],
                        level: comboboxContent
                    },
                    {
                        word: { "tag": "</Combobox>" }
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

export const comboboxDisabled = [
    ...comboboxCode,
    ...itemsDisabled,
    {
        word: [t("keyword", "export function"), t("function", "ComboboxDisabled", false), t("bracket", "() {")],
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
                        word: [
                            t("tag", "<Combobox"),
                            t("prop", "items", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("text", "fruitsDisabled", false),
                            t("bracket", "}"),
                            t("prop", "labelKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("string", "'name'", false),
                            t("bracket", "}"),
                            t("prop", "disabledKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("string", "'invalid'", false),
                            t("bracket", "}", false),
                            t("tag", ">")
                        ],
                        level: comboboxContent
                    },
                    {
                        word: { "tag": "</Combobox>" }
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

export const comboboxDisabledFn = [
    ...comboboxCode,
    ...itemsDisabled,
    {
        word: [t("keyword", "export function"), t("function", "ComboboxDisabledFn", false), t("bracket", "() {")],
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
                        word: [
                            t("tag", "<Combobox"),
                            t("prop", "items", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("text", "fruitsDisabled", false),
                            t("bracket", "}"),
                            t("prop", "labelKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("string", "'name'", false),
                            t("bracket", "}"),
                            t("prop", "disabledKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{(", false),
                            t("variable", "item", false),
                            t("bracket", ")"),
                            t("keyword", "=>"),
                            t("keyword", "!!", false),
                            t("bracket", "(", false),
                            t("text", "item.id ", false),
                            t("keyword", "==="),
                            t("text", "1 ", false),
                            t("keyword", "&&"),
                            t("text", "item.invalid", false),
                            t("bracket", ")}", false),
                            t("tag", ">")
                        ],
                        level: comboboxContent
                    },
                    {
                        word: { "tag": "</Combobox>" }
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

export const comboboxAutoHighlight = [
    ...comboboxCode,
    ...itemsLabel,
    {
        word: [t("keyword", "export function"), t("function", "ComboboxAutoHighlight", false), t("bracket", "() {")],
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
                        word: [
                            t("tag", "<Combobox"),
                            t("prop", "items", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("text", "fruits", false),
                            t("bracket", "}"),
                            t("prop", "labelKey", false),
                            t("keyword", "=", false),
                            t("bracket", "{", false),
                            t("string", "'name'", false),
                            t("bracket", "}"),
                            t("prop", "autoHighlight", false),
                            t("tag", ">")
                        ],
                        level: comboboxContent
                    },
                    {
                        word: { "tag": "</Combobox>" }
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

export const comboboxPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">open</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">boolean</span>,
        default: 'false',
        description: "Controls whether the combobox dropdown is open."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">onOpen</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"(open: boolean) => void"}</span>,
        default: '-',
        description: "Callback function fired when the combobox open state is changed."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">items*</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">array</span>,
        default: '-',
        description: "Array of items to be displayed in the dropdown list."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">autoHighlight</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">boolean</span>,
        default: 'false',
        description: "Automatically highlights the first item when the dropdown is opened."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">align</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"start"</span>
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"center"</span>
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"end"</span>
            </div>
        ),
        default: 'center',
        description: "The preferred alignment against the trigger which the component will be positioned."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">side</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"top"</span>
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"bottom"</span>
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"left"</span>
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"right"</span>
            </div>
        ),
        default: 'bottom',
        description: "The preferred edge of the trigger against which the component will be positioned."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">space</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">number</span>,
        default: '5',
        description: "The space between the combobox input and the dropdown."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">labelKey</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">'label'</span>,
        default: "'label'",
        description: "Specifies the object property or provides a callback function to determine the display text for each item."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">valueKey</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">'value'</span>,
        default: "'value'",
        description: "Specifies the object property or provides a callback function to determine the unique identifier for each item."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">disabledKey</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">'disabled'</span>,
        default: "'disabled'",
        description: "Specifies the object property or provides a callback function to determine if an item is non-interactive."
    }
];

export const comboboxEmptyPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">children</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">ReactNode</span>,
        default: 'No results found.',
        description: "Content or elements rendered inside the component."
    },
]

export const comboboxInputPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '""',
        description: "The controlled input value of the combobox input."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">onChange</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"(value: string) => void"}</span>,
        default: '-',
        description: "Event handler called when the input value changes."
    },
]

export const comboboxItemPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value*</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">object</span>
            </div>
        ),
        default: '-',
        description: "The value associated with the item. Typically used to identify the selected item."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">onSelect</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"(value: string, item: string | object) => void"}</span>,
        default: '-',
        description: "A callback function executed when the item is clicked or selected via keyboard, returning both the item's value and its original data object."
    },
]

export const comboboxContentAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"open" | "closed"</span>,
        description: "Indicates whether the combobox content is opened or closed."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-align</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"start" | "center" | "end"</span>,
        description: "Indicates the alignment of the combobox content relative to its trigger."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-side</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"top" | "bottom" | "left" | "right"</span>,
        description: "The attribute specifies the side on which the combobox content is positioned relative to the trigger."
    }
]

export const comboboxInputAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"open" | "closed"</span>,
        description: "Indicates whether the combobox content is opened or closed."
    }
]

export const comboboxItemAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-selected</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"selected"</span>,
        description: "Indicates whether the item is currently selected."
    }
]