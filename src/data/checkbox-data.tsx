import { t } from "@/components/codeBlock"
import { classNameProps } from "./className-data"

export const checkboxCode = [
    {
        word: [t("keyword", "import"), t("bracket", "{"), t("text", "Checkbox"), t("bracket", "}"), t("keyword", "from"), t("string", '"@/components/ui/checkbox"')],
    }
]

export const checkboxUsage = [
    {
        word: { tag: '<Checkbox />' },
    }
]

export const checkboxBasic = [
    ...checkboxCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "CheckboxBasic", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: checkboxUsage
            },
            {
                word: { "tag": ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const checkboxLabel = [
    ...checkboxCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "CheckboxLabel", false), t("bracket", "() {")],
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
                        word: { "tag": "<Checkbox" }
                    },
                    {
                        level: [
                            {
                                word: { "prop": "label", "keyword": "=", "string": '"Accept terms and conditions"', "space": false }
                            },
                            {
                                word: { "prop": "description", "keyword": "=", "string": '"By clicking this checkbox, you agree to the terms and conditions."', "space": false }
                            }
                        ]
                    },
                    {
                        word: { bracket: "/>" }
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

export const checkboxDisabled = [
    ...checkboxCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "CheckboxDisabled", false), t("bracket", "() {")],
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
                        word: { "tag": "<Checkbox" }
                    },
                    {
                        level: [
                            {
                                word: { "prop": "label", "keyword": "=", "string": '"Accept terms and conditions"', "space": false }
                            },
                            {
                                word: { "prop": "disabled" }
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

export const checkboxPropsData = [
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md">label</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">string</span>,
        default: '-',
        description: "The label text for the checkbox."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md">description</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">string</span>,
        default: '-',
        description: "The description text for the checkbox."
    },
    {
        name: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md">disabled</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">boolean</span>,
        default: 'false',
        description: "Whether the checkbox is disabled."
    },
]



