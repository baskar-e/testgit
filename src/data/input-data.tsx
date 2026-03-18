import { t } from "@/components/codeBlock"
import { classNameProps } from "./className-data"

export const inputCode = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Input"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/input"')],
    }
]

export const inputUsage = [
    {
        word: { "tag": "<Input />" },
    }
]

export const inputBasic = [
    ...inputCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputBasic", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: [
                        t("tag", "<Input"),
                        t("prop", "placeholder", false), t("keyword", "=", false), t("string", '"Enter"'),
                        t("tag", "/>")
                    ],
                }]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const inputControlled = [
    ...inputCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputControlled", false), t("bracket", "() {")],
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
                        word: { "tag": "<Input" }
                    },
                    {
                        level: [
                            {
                                word: { "prop": "placeholder", "keyword": "=", "string": '"Enter"', space: false },
                            },
                            {
                                word: [t("prop", "value", false), t("keyword", "=", false), t("bracket", "{", false), t("variable", "value", false), t("bracket", "}")],
                            },
                            {
                                word: [t("prop", "onChange", false), t("keyword", "=", false), t("bracket", "{", false), t("variable", "e"), t("keyword", "=>"), t("function", "setValue", false), t("bracket", "(", false), t("variable", "e.target.value", false), t("bracket", ")", false), t("bracket", "}")]
                            }
                        ]
                    },
                    {
                        word: { "tag": "/>" }
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

export const inputDisabled = [
    ...inputCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputDisabled", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: [
                        t("tag", "<Input"),
                        t("prop", "placeholder", false), t("keyword", "=", false), t("string", '"Enter"'),
                        t("prop", "disabled"),
                        t("tag", "/>")
                    ],
                }]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const inputFile = [
    ...inputCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputFile", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: [
                        t("tag", "<Input"),
                        t("prop", "type", false), t("keyword", "=", false), t("string", '"file"'),
                        t("tag", "/>")
                    ],
                }]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const inputPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">value</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">string</span>,
        default: '""',
        description: "The controlled input value of the input."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">onChange</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"(value: string) => void"}</span>,
        default: '-',
        description: "Event handler called when the input value changes."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">disabled</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">boolean</span>,
        default: 'false',
        description: "Whether the input is disabled."
    },
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the input component."
    }
]
