import { t } from "@/components/codeBlock"

export const dialogCode = [
    {
        word: { keyword: 'import', bracket: '{' },
        level: [
            {
                word: { text: 'Dialog,', },
            },
            {
                word: { text: 'DialogButton,' },
            },
            {
                word: { text: 'DialogClose,' },
            },
            {
                word: { text: 'DialogContent,' },
            },
            {
                word: { text: 'DialogDescription,' },
            },
            {
                word: { text: 'DialogFooter,' },
            },
            {
                word: { text: 'DialogHeader,' },
            },
            {
                word: { text: 'DialogOverlay,' },
            },
            {
                word: { text: 'DialogTitle' },
            }
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/dialog"' }
    },
    { word: { text: "" } }
]

export const dialogUsage = [
    {
        word: { "tag": "<Dialog>" },
        level: [
            {
                word: [t("tag", "<DialogButton>", false), t("text", "Open", false), t("tag", "</DialogButton>")],
            },
            {
                word: { "tag": "<DialogContent>" },
                level: [
                    {
                        word: { "tag": "<DialogHeader>" },
                    },
                    {
                        level: [
                            { word: [t("tag", "<DialogTitle>", false), t("text", "Title", false), t("tag", "</DialogTitle>")] },
                            { word: [t("tag", "<DialogDescription>", false), t("text", "Description", false), t("tag", "</DialogDescription>")] },
                        ]
                    },
                    {
                        word: { "tag": "</DialogHeader>" },
                    },
                    {
                        word: { "text": "Content" }
                    },
                    {
                        word: { "tag": "<DialogFooter>" },
                    },
                    {
                        level: [
                            { word: [t("tag", "<DialogClose>", false), t("text", "Close", false), t("tag", "</DialogClose>")] },

                        ]
                    },
                    {
                        word: { "tag": "</DialogFooter>" },
                    }
                ]
            },
            {
                word: [t("tag", "</DialogContent>")]
            }
        ]
    },
    {
        word: [t("tag", "</Dialog>")]
    }
];

export const dialogBasic = [
    ...dialogCode,
    {
        word: [t("keyword", "export function"), t("function", "DialogBasic", false), t("bracket", "() {")],
    },
    {
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                }
            },
            {
                level: [
                    {
                        word: { "tag": "<Dialog>" },
                    },
                    {
                        level: [
                            {
                                word: [t("tag", "<DialogButton>", false), t("text", "Open", false), t("tag", "</DialogButton>")],
                            },
                            {
                                word: { "tag": "<DialogContent>" },
                            },
                            {
                                level: [
                                    {
                                        word: { "tag": "<DialogHeader>" },
                                    },
                                    {
                                        level: [
                                            { word: [t("tag", "<DialogTitle>", false), t("text", "Title", false), t("tag", "</DialogTitle>")] },
                                            { word: [t("tag", "<DialogDescription>", false), t("text", "Description", false), t("tag", "</DialogDescription>")] },
                                        ]
                                    },
                                    {
                                        word: { "tag": "</DialogHeader>" },
                                    },
                                    {
                                        word: { "tag": "<p>" },
                                    },
                                    {
                                        level: [{ word: { "text": "Here is the central content of the dialog where you can include any details or instructions." } }],
                                    },
                                    {
                                        word: { "tag": "</p>" },
                                    },
                                    {
                                        word: { "tag": "<DialogFooter>" },
                                    },
                                    {
                                        level: [
                                            { word: [t("tag", "<DialogClose"), t("prop", "className", false), t("keyword", "=", false), t("string", '"border"', false), t("tag", ">", false), t("text", "Close", false), t("tag", "</DialogClose>")] },
                                            { word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"primary"', false), t("tag", ">", false), t("text", "Save", false), t("tag", "</Button>")] },
                                        ]
                                    },
                                    {
                                        word: { "tag": "</DialogFooter>" },
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</DialogContent>" },
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Dialog>" },
                    }
                ]
            },
            {
                word: { "bracket": ");" }
            }
        ]
    },
    {
        word: { "bracket": "}" }
    }
];

export const dialogControlled = [
    ...dialogCode,
    {
        word: [t("keyword", "export function"), t("function", "DialogControlled", false), t("bracket", "() {")],
    },
    {
        level: [
            {
                word: [t("keyword", "const"), t("bracket", "[", false), t("variable", "open", false), t("text", ","), t("function", "setOpen", false), t("bracket", "]"), t("keyword", "="), t("function", "useState", false), t("bracket", "(", false), t("text", "false", false), t("bracket", ")", false), t("text", ";")],
            },
            { word: { text: '' } },
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                }
            },
            {
                level: [
                    {
                        word: [
                            t("tag", "<Dialog"),
                            t("prop", "open", false), t("keyword", "=", false), t("bracket", "{", false), t("variable", "open", false), t("bracket", "}"),
                            t("prop", "onOpen", false), t("keyword", "=", false), t("bracket", "{", false), t("function", "setOpen", false), t("bracket", "}", false),
                            t("tag", ">")
                        ],
                    },
                    {
                        level: [
                            {
                                word: [t("tag", "<DialogButton>", false), t("text", "Open", false), t("tag", "</DialogButton>")],
                            },
                            {
                                word: { "tag": "<DialogContent>" },
                            },
                            {
                                level: [
                                    {
                                        word: { "tag": "<DialogHeader>" },
                                    },
                                    {
                                        level: [
                                            { word: [t("tag", "<DialogTitle>", false), t("text", "Title", false), t("tag", "</DialogTitle>")] },
                                            { word: [t("tag", "<DialogDescription>", false), t("text", "Description", false), t("tag", "</DialogDescription>")] },
                                        ]
                                    },
                                    {
                                        word: { "tag": "</DialogHeader>" },
                                    },
                                    {
                                        word: { "tag": "<p>" },
                                    },
                                    {
                                        level: [{ word: { "text": "This is a controlled dialog component..." } }],
                                    },
                                    {
                                        word: { "tag": "</p>" },
                                    },
                                    {
                                        word: { "tag": "<DialogFooter>" },
                                    },
                                    {
                                        level: [
                                            { word: [t("tag", "<DialogClose"), t("prop", "className", false), t("keyword", "=", false), t("string", '"border"', false), t("tag", ">", false), t("text", "Close", false), t("tag", "</DialogClose>")] },
                                            { word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"primary"', false), t("tag", ">", false), t("text", "Save", false), t("tag", "</Button>")] },
                                        ]
                                    },
                                    {
                                        word: { "tag": "</DialogFooter>" },
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</DialogContent>" },
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Dialog>" },
                    }
                ]
            },
            {
                word: { "bracket": ");" }
            }
        ]
    },
    {
        word: { "bracket": "}" }
    }
];

export const dialogNoCloseBtn = [
    ...dialogCode,
    {
        word: [t("keyword", "export function"), t("function", "DialogWithNoCloseButton", false), t("bracket", "() {")],
    },
    {
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                }
            },
            {
                level: [
                    {
                        word: { "tag": "<Dialog>" },
                    },
                    {
                        level: [
                            {
                                word: [t("tag", "<DialogButton>", false), t("text", "Open", false), t("tag", "</DialogButton>")],
                            },
                            {
                                word: [t("tag", "<DialogContent"), t("prop", "showCloseButton", false), t("keyword", "=", false), t("bracket", "{", false), t("text", "false", false), t("bracket", "}", false), t("tag", ">")],
                            },
                            {
                                level: [
                                    {
                                        word: { "tag": "<DialogHeader>" },
                                    },
                                    {
                                        level: [
                                            { word: [t("tag", "<DialogTitle>", false), t("text", "Title", false), t("tag", "</DialogTitle>")] },
                                            { word: [t("tag", "<DialogDescription>", false), t("text", "Description", false), t("tag", "</DialogDescription>")] },
                                        ]
                                    },
                                    {
                                        word: { "tag": "</DialogHeader>" },
                                    },
                                    {
                                        word: { "tag": "<p>" },
                                    },
                                    {
                                        level: [{ word: { "text": "Here is the central content of the dialog where you can include any details or instructions." } }],
                                    },
                                    {
                                        word: { "tag": "</p>" },
                                    },
                                    {
                                        word: { "tag": "<DialogFooter>" },
                                    },
                                    {
                                        level: [
                                            { word: [t("tag", "<DialogClose"), t("prop", "className", false), t("keyword", "=", false), t("string", '"border"', false), t("tag", ">", false), t("text", "Close", false), t("tag", "</DialogClose>")] },
                                            { word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"primary"', false), t("tag", ">", false), t("text", "Save", false), t("tag", "</Button>")] },
                                        ]
                                    },
                                    {
                                        word: { "tag": "</DialogFooter>" },
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</DialogContent>" },
                            }
                        ]
                    },
                    {
                        word: { "tag": "</Dialog>" },
                    }
                ]
            },
            {
                word: { "bracket": ");" }
            }
        ]
    },
    {
        word: { "bracket": "}" }
    }
];

export const dialogOverlay = [
    ...dialogCode,
    {
        word: [t("keyword", "export function"), t("function", "DialogOverlay", false), t("bracket", "() {")],
    },
    {
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                }
            },
            {
                level: [
                    {
                        word: { "tag": "<Dialog>" },
                    },
                    {
                        level: [
                            {
                                word: [t("tag", "<DialogButton>", false), t("text", "Open", false), t("tag", "</DialogButton>")],
                            },
                            { word: [t("tag", "<DialogOverlay"), t("prop", "className", false), t("string", '"bg-violet-900/20"', false), t("tag", ">")] },
                            {
                                level: [
                                    {
                                        word: { "tag": "<DialogContent>" },
                                    },
                                    {
                                        level: [
                                            {
                                                word: { "tag": "<DialogHeader>" },
                                            },
                                            {
                                                level: [
                                                    { word: [t("tag", "<DialogTitle>", false), t("text", "Title", false), t("tag", "</DialogTitle>")] },
                                                    { word: [t("tag", "<DialogDescription>", false), t("text", "Description", false), t("tag", "</DialogDescription>")] },
                                                ]
                                            },
                                            {
                                                word: { "tag": "</DialogHeader>" },
                                            },
                                            {
                                                word: { "tag": "<p>" },
                                            },
                                            {
                                                level: [{ word: { "text": "Here is the central content of the dialog where you can include any details or instructions." } }],
                                            },
                                            {
                                                word: { "tag": "</p>" },
                                            },
                                            {
                                                word: { "tag": "<DialogFooter>" },
                                            },
                                            {
                                                level: [
                                                    { word: [t("tag", "<DialogClose"), t("prop", "className", false), t("keyword", "=", false), t("string", '"border"', false), t("tag", ">", false), t("text", "Close", false), t("tag", "</DialogClose>")] },
                                                    { word: [t("tag", "<Button"), t("prop", "variant", false), t("keyword", "=", false), t("string", '"primary"', false), t("tag", ">", false), t("text", "Save", false), t("tag", "</Button>")] },
                                                ]
                                            },
                                            {
                                                word: { "tag": "</DialogFooter>" },
                                            }
                                        ]
                                    },
                                    {
                                        word: { "tag": "</DialogContent>" },
                                    }
                                ]
                            },
                            { word: { "tag": '</DialogOverlay>' } }
                        ]
                    },
                    {
                        word: { "tag": "</Dialog>" },
                    }
                ]
            },
            {
                word: { "bracket": ");" }
            }
        ]
    },
    {
        word: { "bracket": "}" }
    }
];

export const dialogPropsData = [
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
    }
];

export const dialogContentPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">showCloseButton</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">boolean</span>,
        default: 'true',
        description: "indicates whether the close button will be displayed within the dialog component."
    },
]

export const dialogButtonAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">data-state</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">"open" | "closed"</span>,
        description: "Indicates whether the modal is opened or closed."
    }
]

export const dialogOverlayPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">portal</span>,
        type: <span className="inline-block w-max bg-gray-100 px-2 py-1 rounded-md dark:bg-zinc-800">{"RefObject<HTMLElement | null>"}</span>,
        default: 'document.body',
        description: "Specify a container element to render the content into via a portal."
    }
]