import { t } from "@/components/codeBlock";
import { classNameProps } from "./className-data"

export const tabsCode = [
    {
        word: { keyword: 'import', bracket: '{' },
        level: [
            {
                word: { text: 'Tabs,' },
            },
            {
                word: { text: 'TabButton,', },
            },
            {
                word: { text: 'TabHighlight,' },
            },
            {
                word: { text: 'TabList,' },
            },
            {
                word: { text: 'TabPanel' },
            }
        ]
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/tabs"' }
    }
]

export const tabsUsage = [
    {
        word: [
            t("tag", "<Tabs"),
            t("prop", "defaultValue", false),
            t("keyword", "=", false),
            t("string", '"home"', false),
            t("tag", ">")
        ],
        level: [
            {
                word: { "tag": "<TabList>" }
            },
            {
                level: [
                    {
                        word: [
                            t("tag", "<TabButton"),
                            t("prop", "value", false),
                            t("keyword", "=", false),
                            t("string", '"home"', false),
                            t("tag", ">", false),
                            t("text", "Home", false),
                            t("tag", "</TabButton>")
                        ]
                    },
                    {
                        word: [
                            t("tag", "<TabButton"),
                            t("prop", "value", false),
                            t("keyword", "=", false),
                            t("string", '"profile"', false),
                            t("tag", ">", false),
                            t("text", "Profile", false),
                            t("tag", "</TabButton>")
                        ]
                    }
                ],
            },
            {
                word: { tag: '</TabList>' },
            },
            {
                word: [
                    t("tag", "<TabPanel"),
                    t("prop", "value", false),
                    t("keyword", "=", false),
                    t("string", '"home"', false),
                    t("tag", ">")
                ]
            },
            {
                level: [
                    { word: { "text": "Home" } },
                ]
            },
            {
                word: { "tag": "</TabPanel>" }
            },
            {
                word: [
                    t("tag", "<TabPanel"),
                    t("prop", "value", false),
                    t("keyword", "=", false),
                    t("string", '"profile"', false),
                    t("tag", ">")
                ]
            },
            {
                level: [
                    { word: { "text": "Profile" } },
                ]
            },
            {
                word: { "tag": "</TabPanel>" }
            }
        ]
    },
    {
        word: { tag: '</Tabs>' }
    }
]

export const tabsBasic = [
    ...tabsCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "TabsBasic", false), t("bracket", "() {")],
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
                            t("tag", "<Tabs"),
                            t("prop", "defaultValue", false),
                            t("keyword", "=", false),
                            t("string", '"home"', false),
                            t("tag", ">")
                        ]
                    },
                    {
                        level: [
                            {
                                word: { "tag": "<TabList>" }
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"home"', false),
                                            t("tag", ">", false),
                                            t("text", "Home", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    },
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"profile"', false),
                                            t("tag", ">", false),
                                            t("text", "Profile", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    },
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"settings"', false),
                                            t("tag", ">", false),
                                            t("text", "Settings", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</TabList>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"home"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "Access your personalized dashboard, recent activity, and a high-level overview of your current projects." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"profile"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "View and edit your personal information, manage your public bio, and update your account display settings." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"settings"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "Configure your application preferences, security options, and notification behaviors to suit your workflow." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Tabs>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
];

export const tabsLine = [
    ...tabsCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "TabsLine", false), t("bracket", "() {")],
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
                            t("tag", "<Tabs"),
                            t("prop", "defaultValue", false),
                            t("keyword", "=", false),
                            t("string", '"home"'),
                            t("prop", "variant", false),
                            t("keyword", "=", false),
                            t("string", '"line"', false),
                            t("tag", ">")
                        ]
                    },
                    {
                        level: [
                            {
                                word: { "tag": "<TabList>" }
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"home"', false),
                                            t("tag", ">", false),
                                            t("text", "Home", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    },
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"profile"', false),
                                            t("tag", ">", false),
                                            t("text", "Profile", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    },
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"settings"', false),
                                            t("tag", ">", false),
                                            t("text", "Settings", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</TabList>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"home"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "Access your personalized dashboard, recent activity, and a high-level overview of your current projects." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"profile"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "View and edit your personal information, manage your public bio, and update your account display settings." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"settings"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "Configure your application preferences, security options, and notification behaviors to suit your workflow." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Tabs>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
];

export const tabsVertical = [
    ...tabsCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "TabsVertical", false), t("bracket", "() {")],
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
                            t("tag", "<Tabs"),
                            t("prop", "defaultValue", false),
                            t("keyword", "=", false),
                            t("string", '"home"'),
                            t("prop", "orientation", false),
                            t("keyword", "=", false),
                            t("string", '"vertical"', false),
                            t("tag", ">")
                        ]
                    },
                    {
                        level: [
                            {
                                word: { "tag": "<TabList>" }
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"home"', false),
                                            t("tag", ">", false),
                                            t("text", "Home", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    },
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"profile"', false),
                                            t("tag", ">", false),
                                            t("text", "Profile", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    },
                                    {
                                        word: [
                                            t("tag", "<TabButton"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("string", '"settings"', false),
                                            t("tag", ">", false),
                                            t("text", "Settings", false),
                                            t("tag", "</TabButton>")
                                        ]
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</TabList>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"home"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "Access your personalized dashboard, recent activity, and a high-level overview of your current projects." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"profile"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "View and edit your personal information, manage your public bio, and update your account display settings." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"settings"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "Configure your application preferences, security options, and notification behaviors to suit your workflow." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Tabs>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
];

export const tabsHighlight = [
    ...tabsCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "TabsHighlight", false), t("bracket", "() {")],
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
                            t("tag", "<Tabs"),
                            t("prop", "defaultValue", false),
                            t("keyword", "=", false),
                            t("string", '"home"', false),
                            t("tag", ">")
                        ]
                    },
                    {
                        level: [
                            {
                                word: { "tag": "<TabList>" }
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<TabHighlight"),
                                            t("prop", "className", false),
                                            t("keyword", "=", false),
                                            t("string", '"rounded-xl bg-gray-200 shadow-md"', false),
                                            t("tag", ">")
                                        ]
                                    },
                                    {
                                        level: [
                                            {
                                                word: [
                                                    t("tag", "<TabButton"),
                                                    t("prop", "value", false),
                                                    t("keyword", "=", false),
                                                    t("string", '"home"', false),
                                                    t("tag", ">", false),
                                                    t("text", "Home", false),
                                                    t("tag", "</TabButton>")
                                                ]
                                            },
                                            {
                                                word: [
                                                    t("tag", "<TabButton"),
                                                    t("prop", "value", false),
                                                    t("keyword", "=", false),
                                                    t("string", '"profile"', false),
                                                    t("tag", ">", false),
                                                    t("text", "Profile", false),
                                                    t("tag", "</TabButton>")
                                                ]
                                            },
                                            {
                                                word: [
                                                    t("tag", "<TabButton"),
                                                    t("prop", "value", false),
                                                    t("keyword", "=", false),
                                                    t("string", '"settings"', false),
                                                    t("tag", ">", false),
                                                    t("text", "Settings", false),
                                                    t("tag", "</TabButton>")
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        word: { "tag": "</TabHighlight>" }
                                    },
                                ]
                            },
                            {
                                word: { "tag": "</TabList>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"home"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "Access your personalized dashboard, recent activity, and a high-level overview of your current projects." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"profile"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "View and edit your personal information, manage your public bio, and update your account display settings." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            },
                            {
                                word: [
                                    t("tag", "<TabPanel"),
                                    t("prop", "value", false),
                                    t("keyword", "=", false),
                                    t("string", '"settings"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [
                                    { word: { "tag": "<p>" } },
                                    { level: [{ word: { "text": "Configure your application preferences, security options, and notification behaviors to suit your workflow." } }] },
                                    { word: { "tag": "</p>" } }
                                ]
                            },
                            {
                                word: { "tag": "</TabPanel>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Tabs>" }
                    }
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
];

export const tabsPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">orientation</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"horizontal"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"vertical"</span>
            </div>
        ),
        default: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"horizontal"</span>,
        description: "Specifies the layout direction of the tab component."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">variant</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"pill"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"line"</span>
            </div>
        ),
        default: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"pill"</span>,
        description: "Defines the visual style of the tab triggers."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">defaultValue*</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '-',
        description: "Sets the initially active tab when the component is rendered, determining which tab is visible by default."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '-',
        description: " The current active tab value, used when you need to manage the tab state programmatically."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">onValueChange</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"(value: string) => void"}</span>,
        default: '-',
        description: "A callback function that gets triggered whenever the active tab changes."
    }
]

export const tabsAttribute = [
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-orientation</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"horizontal" | "vertical"</span>,
        description: "Indicates the orientation of the tabs."
    }
]

export const tabButtonPropsData = [
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value*</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '-',
        description: "The value prop on the TabButton specifies the identifier for each tab, used to track and control the active tab."
    }
]

export const tabButtonAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"active" | "inactive"</span>,
        description: "Indicates whether the tab button is currently active or not."
    }
]

export const tabHighlightPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the tab indicator."
    }
]

export const tabListAttribute = [
    ...tabsAttribute,
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-variant</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"pill" | "line"</span>,
        description: "A data attribute that reflects the current visual style variant of the tab list."
    }
]

export const tabPanelPropsData = [
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value*</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '-',
        description: "The value prop on TabPanel links the panel to its corresponding tab, controlling which panel is displayed."
    }
]

export const tabPanelAttribute = [
    ...tabsAttribute,
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"active" | "inactive"</span>,
        description: "Indicates whether the tab panel is currently active or not."
    }
]