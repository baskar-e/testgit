import { t } from "@/components/codeBlock"
import { classNameProps } from "./className-data"

export const buttonCode = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Button"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/button"')],
    }
]

export const buttonUsage = [
    {
        word: [t("tag", "<Button>", false), t("text", "Button 1", false), t("tag", "</Button>")],
    }
]

export const buttonBasic = [
    ...buttonCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonDefault", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: buttonUsage
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonPrimary = [
    ...buttonCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonPrimary", false), t("bracket", "() {")],
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
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"primary"', false), t("tag", ">", false), t("text", "Button 1", false), t("tag", "</Button>")],
                    },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonSecondary = [
    ...buttonCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonSecondary", false), t("bracket", "() {")],
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
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"secondary"', false), t("tag", ">", false), t("text", "Button 1", false), t("tag", "</Button>")],
                    },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonGhost = [
    ...buttonCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonGhost", false), t("bracket", "() {")],
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
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"ghost"', false), t("tag", ">", false), t("text", "Button 1", false), t("tag", "</Button>")],
                    },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonOutline = [
    ...buttonCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonOutline", false), t("bracket", "() {")],
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
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"outline"', false), t("tag", ">", false), t("text", "Button 1", false), t("tag", "</Button>")],
                    },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonWhite = [
    ...buttonCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonWhite", false), t("bracket", "() {")],
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
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"', false), t("tag", ">", false), t("text", "Button 1", false), t("tag", "</Button>")],
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

export const buttonSize = [
    ...buttonCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "ButtonSize", false), t("bracket", "() {")],
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
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"'), t("prop", "size", false), t("keyword", "=", false), t("string", '"sm"', false), t("tag", ">", false), t("text", "Extra Small", false), t("tag", "</Button>")],
                    },
                    {
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"'), t("prop", "size", false), t("keyword", "=", false), t("string", '"md"', false), t("tag", ">", false), t("text", "Small", false), t("tag", "</Button>")],
                    },
                    {
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"'), t("prop", "size", false), t("keyword", "=", false), t("string", '"lg"', false), t("tag", ">", false), t("text", "Default", false), t("tag", "</Button>")],
                    },
                    {
                        word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"white"'), t("prop", "size", false), t("keyword", "=", false), t("string", '"lg"', false), t("tag", ">", false), t("text", "Large", false), t("tag", "</Button>")],
                    },
                ]
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const buttonPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">variant</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="bg-gray-100 px-2 py-1 rounded-md">"primary"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md">"secondary"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md">"ghost"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md">"outline"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md">"white"</span>
            </div>
        ),
        default: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">"primary"</span>,
        description: "Change the variant of the button."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">size</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="bg-gray-100 px-2 py-1 rounded-md">"xs"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md">"sm"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md">"md"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md">"lg"</span>
            </div>
        ),
        default: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">"md"</span>,
        description: "Change the size of the button."
    },
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the button group component."
    }
]

export const ButtonAttribute = [
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md">data-variant</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">"primary" | "secondary" | "ghost" | "outline" | "white"</span>,
        description: "Indicates the variant of the button."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">data-size</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">"xs" | "sm" | "md" | "lg"</span>,
        description: "Indicates the size of the button."
    }
]