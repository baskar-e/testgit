import { t } from "@/components/codeBlock"

export const switchCode = [
    {
        word: { keyword: 'import', bracket: '{' },
        level: [
            {
                word: { text: 'Switch,', },
            },
            {
                word: { text: 'SwitchThumb' },
            }
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/switch"' }
    }
]

export const switchUsage = [
    {
        word: { "tag": "<Switch />" },
    }
]

export const switchBasic = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Switch"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/switch"')],
    },
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "SwitchBasic", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: switchUsage
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const switchCard = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Switch"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/switch"')],
    },
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "SwitchCard", false), t("bracket", "() {")],
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
                            t("tag", "<label"),
                            t("prop", "className", false), t("keyword", "=", false), t("string", '"grid grid-cols-[1fr_min-content] items-center gap-x-4 gap-y-1 w-full bg-white rounded-2xl text-sm text-ash p-3 shadow-md"', false),
                            t("tag", ">")
                        ]
                    },
                    {
                        level: [
                            {
                                word: [
                                    t("tag", "<div"),
                                    t("prop", "className", false), t("keyword", "=", false), t("string", '"font-medium"', false),
                                    t("tag", ">")
                                ]
                            },
                            {
                                level: [{ word: { "text": "Enable Notifications" } }]
                            },
                            {
                                word: { "tag": "</div>" }
                            },
                            {
                                word: [t("tag", "<Switch"), t("prop", "className", false), t("keyword", "=", false), t("string", '"w-8.5 h-5"'), t("tag", "/>")]
                            },
                            {
                                word: { "tag": "<p>" }
                            },
                            {
                                level: [{ word: { "text": "Toggle the switch to enable or disable notifications based on your preferences." } }]
                            },
                            {
                                word: { "tag": "</p>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</label>" }
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

export const switchControlled = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Switch"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/switch"')],
    },
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "SwitchControlled", false), t("bracket", "() {")],
        level: [
            {
                word: [t("keyword", "const"), t("bracket", "[", false), t("variable", "check", false), t("text", ","), t("function", "setCheck", false), t("bracket", "]"), t("keyword", "="), t("function", "useState", false), t("bracket", "(", false), t("text", "false", false), t("bracket", ")", false), t("text", ";")],
            },
            { word: { text: '' } },
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: [
                        t("tag", "<Switch"),
                        t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("variable", "check", false), t("bracket", "}"), t("prop", "onValueChange", false), t("keyword", "=", false), t("bracket", "{", false), t("function", "setCheck", false), t("bracket", "}"),
                        t("tag", "/>")]
                }]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const switchCustom = [
    ...switchCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "SwitchCustom", false), t("bracket", "() {")],
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
                        word: { "tag": "<Switch>" }
                    },
                    {
                        level: [
                            {
                                word: { "tag": "<SwitchThumb>" }
                            },
                            {
                                level: [
                                    {
                                        word: { "tag": "<Sun />" }
                                    },
                                    {
                                        word: [
                                            t("tag", "<Moon"),
                                            t("prop", "color", false),
                                            t("keyword", "=", false),
                                            t("string", '"white"', false),
                                            t("tag", "/>")
                                        ]
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</SwitchThumb>" }
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Switch>" }
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


export const switchPropsData = [
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '-',
        description: "The current state of the switch, either on or off. It is used to control the switch's selected state in a controlled component."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">onValueChange</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"(value: string) => void"}</span>,
        default: '-',
        description: "A callback function that is triggered when the switch's state changes. It is used to update the value prop in a controlled component."
    }
]

export const switchAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"checked" | "unchecked"</span>,
        description: "A data attribute that indicates the current state of the switch."
    }
]