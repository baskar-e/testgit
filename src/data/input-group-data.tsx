import { t } from "@/components/codeBlock"
import { classNameProps } from "./className-data"

export const inputGroupCode = [
    {
        word: { keyword: 'import', bracket: '{' },
        level: [
            {
                word: { text: 'InputGroup,', },
            },
            {
                word: { text: 'InputGroupAddon,' },
            },
            {
                word: { text: 'InputGroupInput' },
            }
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/input-group"' }
    }
]

export const inputGroupUsage = [
    {
        word: { tag: '<InputGroup>' },
        level: [
            {
                word: { "tag": "<InputGroupInput />" },
            },
            {
                word: { "tag": "<InputGroupAddon>" },
            },
            {
                level: [{ word: { "tag": "<SearchIcon />" } }]
            },
            {
                word: { "tag": "</InputGroupAddon>" },
            }
        ]
    },
    {
        word: { tag: '</InputGroup>' }
    }
]

export const inputGroupInlineStart = [
    ...inputGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputGroupInlineStart", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: { tag: '<InputGroup>' },
                    level: [
                        {
                            word: [
                                t("tag", "<InputGroupInput"),
                                t("prop", "placeholder", false), t("keyword", "=", false), t("string", '"Search"'),
                                t("tag", "/>")
                            ],
                        },
                        {
                            word: { "tag": "<InputGroupAddon>" },
                        },
                        {
                            level: [{
                                word: [
                                    t("tag", "<SearchIcon"),
                                    t("prop", "size", false), t("keyword", "=", false), t("bracket", '{', false), t("text", '16', false), t("bracket", '}'),
                                    t("tag", "/>")
                                ]
                            }]
                        },
                        {
                            word: { "tag": "</InputGroupAddon>" },
                        }
                    ]
                },
                {
                    word: { tag: '</InputGroup>' }
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

export const inputGroupInlineEnd = [
    ...inputGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputGroupInlineEnd", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: { tag: '<InputGroup>' },
                    level: [
                        {
                            word: [
                                t("tag", "<InputGroupInput"),
                                t("prop", "placeholder", false), t("keyword", "=", false), t("string", '"Email"'),
                                t("tag", "/>")
                            ],
                        },
                        {
                            word: [
                                t("tag", "<InputGroupAddon"),
                                t("prop", "align", false), t("keyword", "=", false), t("string", '"inline-end"', false),
                                t("tag", ">")
                            ]
                        },
                        {
                            level: [{
                                word: [
                                    t("tag", "<Mail"),
                                    t("prop", "size", false), t("keyword", "=", false), t("bracket", '{', false), t("text", '16', false), t("bracket", '}'),
                                    t("tag", "/>")
                                ]
                            }]
                        },
                        {
                            word: { "tag": "</InputGroupAddon>" },
                        }
                    ]
                },
                {
                    word: { tag: '</InputGroup>' }
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

export const inputGroupBlockStart = [
    ...inputGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputGroupBlockStart", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: { tag: '<InputGroup>' },
                    level: [
                        {
                            word: [
                                t("tag", "<InputGroupInput"),
                                t("prop", "placeholder", false), t("keyword", "=", false), t("string", '"Enter name"'),
                                t("tag", "/>")
                            ],
                        },
                        {
                            word: [
                                t("tag", "<InputGroupAddon"),
                                t("prop", "align", false), t("keyword", "=", false), t("string", '"block-start"', false),
                                t("tag", ">")
                            ]
                        },
                        {
                            level: [{
                                word: [
                                    t("tag", "<p>", false),
                                    t("text", "Your Name", false),
                                    t("tag", "</p>")
                                ]
                            }]
                        },
                        {
                            word: { "tag": "</InputGroupAddon>" },
                        }
                    ]
                },
                {
                    word: { tag: '</InputGroup>' }
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

export const inputGroupBlockEnd = [
    ...inputGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputGroupBlockEnd", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: { tag: '<InputGroup>' },
                    level: [
                        {
                            word: [
                                t("tag", "<InputGroupInput"),
                                t("prop", "placeholder", false), t("keyword", "=", false), t("string", '"Enter amount"'),
                                t("tag", "/>")
                            ],
                        },
                        {
                            word: [
                                t("tag", "<InputGroupAddon"),
                                t("prop", "align", false), t("keyword", "=", false), t("string", '"block-end"', false),
                                t("tag", ">")
                            ]
                        },
                        {
                            level: [{
                                word: [
                                    t("tag", "<p>", false),
                                    t("text", "USD", false),
                                    t("tag", "</p>")
                                ]
                            }]
                        },
                        {
                            word: { "tag": "</InputGroupAddon>" },
                        }
                    ]
                },
                {
                    word: { tag: '</InputGroup>' }
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

export const inputGroupDisabled = [
    ...inputGroupCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "InputGroupDisabled", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: [{
                    word: { tag: '<InputGroup>' },
                    level: [
                        {
                            word: [
                                t("tag", "<InputGroupInput"),
                                t("prop", "placeholder", false), t("keyword", "=", false), t("string", '"Disabled Input"'),
                                t("prop", "disabled"),
                                t("tag", "/>")
                            ],
                        },
                        {
                            word: { "tag": "<InputGroupAddon>" },
                        },
                        {
                            level: [{
                                word: [
                                    t("tag", "<AtSign"),
                                    t("prop", "size", false), t("keyword", "=", false), t("bracket", '{', false), t("text", '16', false), t("bracket", '}'),
                                    t("tag", "/>")
                                ]
                            }]
                        },
                        {
                            word: { "tag": "</InputGroupAddon>" },
                        }
                    ]
                },
                {
                    word: { tag: '</InputGroup>' }
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

export const inputGroupPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the input group component."
    }
]

export const inputGroupAddonPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">align</span>,
        type: (
            <div className="flex flex-wrap gap-1">
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"inline-start"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"inline-end"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"block-start"</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"block-end"</span>
            </div>
        ),
        default: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"horizontal"</span>,
        description: "A prop used to specify the alignment of an element relative to its container."
    },
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the input group component."
    }
]

export const inputGroupAddonAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-align</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"inline-start" | "inline-end" | "block-start" | "block-end"</span>,
        description: "A data attribute that reflects the alignment value of the element."
    }
]

export const inputGroupInputPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the input group input component."
    }
]