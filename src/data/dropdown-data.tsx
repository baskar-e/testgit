import { t } from "@/components/codeBlock";

const items = [
    { word: { "text": "" } },
    {
        word: [t("keyword", "const"), t("variable", "dropdownItems"), t("keyword", "="), t("bracket", "[")]
    },
    {
        level: [
            {
                word: [t("bracket", "{"), t("text", "id:"), t("string", "1"), t("text", ","), t("text", "value:"), t("string", '"Add"'), t("bracket", "},")]
            },
            {
                word: [t("bracket", "{"), t("text", "id:"), t("string", "2"), t("text", ","), t("text", "value:"), t("string", '"Edit"'), t("bracket", "},")]
            },
            {
                word: [t("bracket", "{"), t("text", "id:"), t("string", "3"), t("text", ","), t("text", "value:"), t("string", '"Change"'), t("bracket", "},")]
            },
            {
                word: [t("bracket", "{"), t("text", "id:"), t("string", "4"), t("text", ","), t("text", "value:"), t("string", '"Option"'), t("bracket", "},")]
            },
            {
                word: [t("bracket", "{"), t("text", "id:"), t("string", "5"), t("text", ","), t("text", "value:"), t("string", '"Delete"'), t("bracket", "}")]
            }
        ]
    },
    {
        word: { "bracket": "]", "text": ";", "space": false }
    },
    { word: { "text": "" } }
];

export const dropdownItems = [
    {
        id: 1,
        value: "Add",
    },
    {
        id: 2,
        value: "Edit",
    },
    {
        id: 3,
        value: "Change",
    },
    {
        id: 4,
        value: "Option",
    },
    {
        id: 5,
        value: "Delete",
    },
]

export const dropdownCode = [
    {
        word: { keyword: 'import', bracket: '{' },
        level: [
            {
                word: { text: 'Dropdown,', },
            },
            {
                word: { text: 'DropdownButton,' },
            },
            {
                word: { text: 'DropdownContent,' },
            },
            {
                word: { text: 'DropdownItem' },
            }
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/dropdown"' }
    }
]

export const dropdownUsage = [
    {
        word: { "tag": "<Dropdown>" },
        level: [
            {
                word: [t("tag", "<DropdownButton>", false), t("text", "Click", false), t("tag", "</DropdownButton>")],
            },
            {
                word: { "tag": "<DropdownContent>" },
                level: [
                    {
                        word: [t("tag", "<DropdownItem>", false), t("text","Item", false), t("tag","</DropdownItem>")],
                    }                    
                ]
            },
            {
                word: [t("tag", "</DropdownContent>")]
            }
        ]
    },
    {
        word: [t("tag", "</Dropdown>")]
    }
];

export const dropdownBasic = [
    ...dropdownCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "DropdownBasic", false), t("bracket", "() {")],
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
                        word: { "tag": "<Dropdown>" },
                        level: [
                            {
                                word: [
                                    t("tag", "<DropdownButton>", false),
                                    t("text", "Click", false),
                                    t("tag", "</DropdownButton>")
                                ]
                            },
                            {
                                word: { "tag": "<DropdownContent>" },
                                level: [
                                    {
                                        word: [
                                            t("bracket", "{", false),
                                            t("variable", "dropdownItems.", false),
                                            t("function", "map", false),
                                            t("bracket", "((", false),
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
                                                    t("tag", "<DropdownItem"),
                                                    t("prop", "key", false),
                                                    t("keyword", "=", false),
                                                    t("bracket", "{", false),
                                                    t("text", "item.id", false),
                                                    t("bracket", "}", false),
                                                    t("tag", ">")
                                                ],
                                                level: [
                                                    {
                                                        word: [
                                                            t("bracket", "{", false),
                                                            t("text", "item.value", false),
                                                            t("bracket", "}")
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                word: { "tag": "</DropdownItem>" }
                                            }
                                        ]
                                    },
                                    {
                                        word: { "bracket": "))}" }
                                    },
                                ]
                            },
                            {
                                word: { "tag": "</DropdownContent>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Dropdown>" }
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

export const dropdownControlled = [
    ...dropdownCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "DropdownControlled", false), t("bracket", "() {")],
        level: [
            {
                word: [t("keyword", "const"), t("bracket", "[", false), t("variable", "open", false), t("text", ","), t("function", "setOpen", false), t("bracket", "]"), t("keyword", "="), t("function", "useState", false), t("bracket", "(", false), t("text", "false", false), t("bracket", ")", false), t("text", ";")],
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
                            t("tag", "<Dropdown"),
                            t("prop", "open", false), t("keyword", "=", false), t("bracket", "{", false), t("variable", "open", false), t("bracket", "}"),
                            t("prop", "onOpen", false), t("keyword", "=", false), t("bracket", "{", false), t("function", "setOpen", false), t("bracket", "}", false),
                            t("tag", ">")
                        ],
                        level: [
                            {
                                word: [
                                    t("tag", "<DropdownButton>", false),
                                    t("text", "Click", false),
                                    t("tag", "</DropdownButton>")
                                ]
                            },
                            {
                                word: { "tag": "<DropdownContent>" },
                                level: [
                                    {
                                        word: [
                                            t("bracket", "{", false),
                                            t("variable", "dropdownItems.", false),
                                            t("function", "map", false),
                                            t("bracket", "((", false),
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
                                                    t("tag", "<DropdownItem"),
                                                    t("prop", "key", false),
                                                    t("keyword", "=", false),
                                                    t("bracket", "{", false),
                                                    t("text", "item.id", false),
                                                    t("bracket", "}", false),
                                                    t("tag", ">")
                                                ],
                                                level: [
                                                    {
                                                        word: [
                                                            t("bracket", "{", false),
                                                            t("text", "item.value", false),
                                                            t("bracket", "}")
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                word: { "tag": "</DropdownItem>" }
                                            }
                                        ]
                                    },
                                    {
                                        word: { "bracket": "))}" }
                                    },
                                ]
                            },
                            {
                                word: { "tag": "</DropdownContent>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Dropdown>" }
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

export const dropdownPosition = [
    ...dropdownCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "DropdownPosition", false), t("bracket", "() {")],
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
                            t("tag", "<Dropdown"),
                            t("prop", "align", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "start", false), t("bracket", "}"),
                            t("prop", "side", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "right", false), t("bracket", "}", false),
                            t("tag", ">")
                        ],
                        level: [
                            {
                                word: [
                                    t("tag", "<DropdownButton>", false),
                                    t("text", "Click", false),
                                    t("tag", "</DropdownButton>")
                                ]
                            },
                            {
                                word: { "tag": "<DropdownContent>" },
                                level: [
                                    {
                                        word: [
                                            t("bracket", "{", false),
                                            t("variable", "dropdownItems.", false),
                                            t("function", "map", false),
                                            t("bracket", "((", false),
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
                                                    t("tag", "<DropdownItem"),
                                                    t("prop", "key", false),
                                                    t("keyword", "=", false),
                                                    t("bracket", "{", false),
                                                    t("text", "item.id", false),
                                                    t("bracket", "}", false),
                                                    t("tag", ">")
                                                ],
                                                level: [
                                                    {
                                                        word: [
                                                            t("bracket", "{", false),
                                                            t("text", "item.value", false),
                                                            t("bracket", "}")
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                word: { "tag": "</DropdownItem>" }
                                            }
                                        ]
                                    },
                                    {
                                        word: { "bracket": "))}" }
                                    },
                                ]
                            },
                            {
                                word: { "tag": "</DropdownContent>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Dropdown>" }
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

export const dropdownModal = [
    ...dropdownCode,
    ...items,
    {
        word: [t("keyword", "export function"), t("function", "DropdownModal", false), t("bracket", "() {")],
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
                        word: { "tag": "<Dropdown>" },
                        level: [
                            {
                                word: [
                                    t("tag", "<DropdownButton>", false),
                                    t("text", "Click", false),
                                    t("tag", "</DropdownButton>")
                                ]
                            },
                            {
                                word: [t("tag", "<DropdownContent"), t("prop", "modal", false), t("tag", ">")],
                                level: [
                                    {
                                        word: [
                                            t("bracket", "{", false),
                                            t("variable", "dropdownItems.", false),
                                            t("function", "map", false),
                                            t("bracket", "((", false),
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
                                                    t("tag", "<DropdownItem"),
                                                    t("prop", "key", false),
                                                    t("keyword", "=", false),
                                                    t("bracket", "{", false),
                                                    t("text", "item.id", false),
                                                    t("bracket", "}", false),
                                                    t("tag", ">")
                                                ],
                                                level: [
                                                    {
                                                        word: [
                                                            t("bracket", "{", false),
                                                            t("text", "item.value", false),
                                                            t("bracket", "}")
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                word: { "tag": "</DropdownItem>" }
                                            }
                                        ]
                                    },
                                    {
                                        word: { "bracket": "))}" }
                                    },
                                ]
                            },
                            {
                                word: { "tag": "</DropdownContent>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Dropdown>" }
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

export const dropdownPropsData = [
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
    }
];

export const dropdownButtonAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"open" | "closed"</span>,
        description: "Indicates whether the dropdown menu is opened or closed."
    }
]

export const dropdownContentPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">portal</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"RefObject<HTMLElement | null>"}</span>,
        default: 'document.body',
        description: "Specify a container element to render the content into via a portal."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">modal</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">boolean</span>,
        default: 'false',
        description: "The property that determines whether the component should prevent interaction with the background while open."
    }
]

export const dropdownContentAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"open" | "closed"</span>,
        description: "Indicates whether the dropdown menu is opened or closed."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-align</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"start" | "center" | "end"</span>,
        description: "Indicates the alignment of the dropdown content relative to its trigger."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-side</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"top" | "bottom" | "left" | "right"</span>,
        description: "The attribute specifies the side on which the dropdown content is positioned relative to the trigger."
    }
]

export const dropdownItemPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">onSelect</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"(e: Event) => void"}</span>,
        default: '-',
        description: "Event handler triggered when an item is selected. Calling event.preventDefault prevents the dropdown from closing."
    }
]

export const dropdownItemAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-selected</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"selected"</span>,
        description: "Indicates whether the item is currently selected."
    }
]