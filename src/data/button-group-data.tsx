import { t } from "@/components/codeBlock"
import { classNameProps } from "./className-data"

const buttonVaraints = [
    {
        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"', false), t("tag", ">", false), t("text", "Button 1", false), t("tag", "</Button>")],
    },
    {
        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"', false), t("tag", ">", false), t("text", "Button 2", false), t("tag", "</Button>")],
    },
    {
        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"', false), t("tag", ">", false), t("text", "Button 3", false), t("tag", "</Button>")],
    },
]

export const buttonGroupCode = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "ButtonGroup"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/button-group"')],
    }
]

export const buttonGroupUsage = [
    {
        word: { tag: '<ButtonGroup>' },
        level: [
            {
                word: [t("tag", "<Button>", false), t("text", "Button 1", false), t("tag", "</Button>")],
            },
            {
                word: [t("tag", "<Button>", false), t("text", "Button 2", false), t("tag", "</Button>")],
            },
            {
                word: [t("tag", "<Button>", false), t("text", "Button 3", false), t("tag", "</Button>")],
            },
        ],
    },
    {
        word: { tag: '</ButtonGroup>' }
    }
]

export const buttonGroupBasic = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Button"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/button"')],
    },
    ...buttonGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonGroupBasic", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [
                    { word: { tag: '<ButtonGroup>' } },
                    { level: buttonVaraints },
                    { word: { tag: '</ButtonGroup>' } },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonGroupVertical = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Button"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/button"')],
    },
    ...buttonGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonGroupVertical", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [
                    { word: [t("tag", "<ButtonGroup"), t("prop", "orientation", false), t("keyword", "=", false), t("string", '"vertical"', false), t("tag", ">")] },
                    { level: buttonVaraints },
                    { word: { tag: '</ButtonGroup>' } },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonGroupNested = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Button"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/button"')],
    },
    ...buttonGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonGroupNested", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [
                    { word: { tag: '<ButtonGroup>' } },
                    {
                        level: [
                            {
                                word: { tag: '<ButtonGroup>' },
                                level: [
                                    {
                                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"'), t("prop", "className", false), t("keyword", "=", false), t("string", '"px-2"', false), t("tag", ">", false)],
                                    },
                                    {
                                        level: [
                                            {
                                                word: [t("tag", "<Plus"), t("prop", "size", false), t("keyword", "=", false), t("bracket", '{', false), t("number", '16', false), t("bracket", '}'), t("tag", "/>")],
                                            }
                                        ]
                                    },
                                    {
                                        word: { tag: '</Button>' }
                                    }
                                ],
                            },
                            {
                                word: { tag: '</ButtonGroup>' }
                            },
                            {
                                word: { tag: '<ButtonGroup>' },
                                level: [
                                    {
                                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"', false), t("tag", ">", false), t("text", "Button 1", false), t("tag", "</Button>")],
                                    },
                                    {
                                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"', false), t("tag", ">", false), t("text", "Button 2", false), t("tag", "</Button>")],
                                    }
                                ],
                            },
                            {
                                word: { tag: '</ButtonGroup>' }
                            }
                        ]
                    },
                    { word: { tag: '</ButtonGroup>' } },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonGroupInput = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Button"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/button"')],
    },
    ...buttonGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonGroupInput", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [
                    { word: { tag: '<ButtonGroup>' } },
                    {
                        level: [
                            {
                                word: [t("tag", "<Input"), t("prop", "placeholder", false), t("keyword", "=", false), t("string", '"Search..."'), t("tag", "/>")],
                            },
                            {
                                word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"', false), t("tag", ">", false)],
                            },
                            {
                                level: [
                                    {
                                        word: [t("tag", "<Search"), t("prop", "size", false), t("keyword", "=", false), t("bracket", '{', false), t("number", '16', false), t("bracket", '}'), t("tag", "/>")],
                                    }
                                ]
                            },
                            {
                                word: { tag: '</Button>' }
                            }
                        ]
                    },
                    { word: { tag: '</ButtonGroup>' } },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonGroupPropsData = [
    // {
    //     name: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">size</span>,
    //     type: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">"sm" | "md" | "lg"</span>,
    //     default: <span className="inline-block w-min bg-gray-100 px-2 py-1 rounded-md">"md"</span>,
    //     description: "The size of the button group."
    // },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">orientation</span>,
        type: <div className="flex flex-wrap gap-1"><span className="bg-gray-100 px-2 py-1 rounded-md">"horizontal"</span><span className="bg-gray-100 px-2 py-1 rounded-md">"vertical"</span></div>,
        default: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">"horizontal"</span>,
        description: "Change the orientation of the button group."
    },
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the button group component."
    }
]

export const ButtonGroupAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">data-orientation</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">"horizontal" | "vertical"</span>,
        description: "Indicates the orientation of the button group."
    }
]