import { t } from "@/components/codeBlock"
import { classNameProps } from "./className-data"

export const breadcrumbCode = [
    {
        word: { keyword: 'import', bracket: '{' },
        level: [
            {
                word: { text: 'Breadcrumbs,' },
            },
            {
                word: { text: 'BreadcrumbsEllipsis,' },
            },
            {
                word: { text: 'BreadcrumbsItem,' },
            },
            {
                word: { text: 'BreadcrumbsLink,' },
            },
            {
                word: { text: 'BreadcrumbsPage,' },
            },
            {
                word: { text: 'BreadcrumbsSeparator' },
            }
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/breadcrumbs"' }
    }
]

export const breadcrumbUsage = [
    {
        word: { tag: '<Breadcrumbs>' },
        level: [
            {
                word: { tag: '<BreadcrumbsItem>' },
                level: [
                    {
                        word: [t("tag", "<", false), t("tag", "BreadcrumbsLink"), t("prop", "href", false), t("keyword", "=", false), t("string", '"#"', false), t("tag", ">", false), t("text", "Home", false), t("tag", "</BreadcrumbsLink>")],
                    }
                ],
            },
            {
                word: { tag: '</BreadcrumbsItem>' },
            },
            {
                word: { tag: '<BreadcrumbsItem>' },
                level: [
                    {
                        word: [t("tag", "<", false), t("tag", "BreadcrumbsLink"), t("prop", "href", false), t("keyword", "=", false), t("string", '"#"', false), t("tag", ">", false), t("text", "Products", false), t("tag", "</BreadcrumbsLink>")],
                    }
                ],
            },
            {
                word: { tag: '</BreadcrumbsItem>' },
            },
            {
                word: { tag: '<BreadcrumbsItem>' },
                level: [
                    {
                        word: [t("tag", "<BreadcrumbsPage>", false), t("text", "Laptop", false), t("tag", "</BreadcrumbsPage>")],
                    }
                ],
            },
            {
                word: { tag: '</BreadcrumbsItem>' },
            }
        ],
    },
    {
        word: { tag: '</Breadcrumbs>' }
    }
]

export const breadcrumbBasic = [
    ...breadcrumbCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "BreadcrumbBasic", false), t("bracket", "() {")],
        level: [
            {
                word: {
                    "keyword": "return",
                    "bracket": "("
                },
            },
            {
                level: breadcrumbUsage
            },
            {
                word: { bracket: ')' }
            }
        ]
    },
    { word: { bracket: '}' } }
]

export const breadcrumbCustomSeparator = [
    ...breadcrumbCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "BreadcrumbCustomSeparator", false), t("bracket", "() {")],
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
                        word: [t("tag", "<", false), t("tag", "Breadcrumbs"), t("prop", "separator", false), t("keyword", "=", false), t("string", '"false"', false), t("tag", ">", false)],
                        level: [
                            {
                                word: { tag: '<BreadcrumbsItem>' },
                                level: [
                                    {
                                        word: [t("tag", "<", false), t("tag", "BreadcrumbsLink"), t("prop", "href", false), t("keyword", "=", false), t("string", '"#"', false), t("tag", ">", false), t("text", "Home", false), t("tag", "</BreadcrumbsLink>")],
                                    },
                                    {
                                        word: [t("tag", "<BreadcrumbsSeparator>", false), t("string", "<Dot />", false), t("tag", "</BreadcrumbsSeparator>")],
                                    }
                                ],
                            },
                            {
                                word: { tag: '</BreadcrumbsItem>' },
                            },
                            {
                                word: { tag: '<BreadcrumbsItem>' },
                                level: [
                                    {
                                        word: [t("tag", "<", false), t("tag", "BreadcrumbsLink"), t("prop", "href", false), t("keyword", "=", false), t("string", '"#"', false), t("tag", ">", false), t("text", "Products", false), t("tag", "</BreadcrumbsLink>")],
                                    },
                                    {
                                        word: [t("tag", "<BreadcrumbsSeparator>", false), t("string", "<Dot />", false), t("tag", "</BreadcrumbsSeparator>")],
                                    }
                                ],
                            },
                            {
                                word: { tag: '</BreadcrumbsItem>' },
                            },
                            {
                                word: { tag: '<BreadcrumbsItem>' },
                                level: [
                                    {
                                        word: [t("tag", "<BreadcrumbsPage>", false), t("text", "Laptop", false), t("tag", "</BreadcrumbsPage>")],
                                    }
                                ],
                            },
                            {
                                word: { tag: '</BreadcrumbsItem>' },
                            }
                        ],
                    },
                    {
                        word: { tag: '</Breadcrumbs>' }
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

export const breadcrumbEllipsis = [
    ...breadcrumbCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "BreadcrumbEllipsis", false), t("bracket", "() {")],
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
                        word: { tag: '<Breadcrumbs>' },
                        level: [
                            {
                                word: { tag: '<BreadcrumbsItem>' },
                                level: [
                                    {
                                        word: [t("tag", "<", false), t("tag", "BreadcrumbsLink"), t("prop", "href", false), t("keyword", "=", false), t("string", '"#"', false), t("tag", ">", false), t("text", "Home", false), t("tag", "</BreadcrumbsLink>")],
                                    }
                                ],
                            },
                            {
                                word: { tag: '</BreadcrumbsItem>' },
                            },
                            {
                                word: { tag: '<BreadcrumbsItem>' },
                                level: [
                                    {
                                        word: { tag: '<BreadcrumbsEllipsis />' },
                                    }
                                ],
                            },
                            {
                                word: { tag: '</BreadcrumbsItem>' },
                            },
                            {
                                word: { tag: '<BreadcrumbsItem>' },
                                level: [
                                    {
                                        word: [t("tag", "<", false), t("tag", "BreadcrumbsLink"), t("prop", "href", false), t("keyword", "=", false), t("string", '"#"', false), t("tag", ">", false), t("text", "Products", false), t("tag", "</BreadcrumbsLink>")],
                                    }
                                ],
                            },
                            {
                                word: { tag: '</BreadcrumbsItem>' },
                            },
                            {
                                word: { tag: '<BreadcrumbsItem>' },
                                level: [
                                    {
                                        word: [t("tag", "<BreadcrumbsPage>", false), t("text", "Laptop", false), t("tag", "</BreadcrumbsPage>")],
                                    }
                                ],
                            },
                            {
                                word: { tag: '</BreadcrumbsItem>' },
                            }
                        ],
                    },
                    {
                        word: { tag: '</Breadcrumbs>' }
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

export const breadcrumbPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">className</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">string</span>,
        default: '-',
        description: "Custom CSS class name for styling the breadcrumb component."
    },
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">separator</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">boolean</span>,
        default: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">true</span>,
        description: "Disables separator for the breadcrumbs when set to false. You can also pass a custom separator component."
    },
]

export const breadcrumbEllipsisPropsData = [{ ...classNameProps, description: "Custom CSS class name for styling the breadcrumb ellipsis component." }]

export const breadcrumbItemPropsData = [{ ...classNameProps, description: "Custom CSS class name for styling the breadcrumb item component." }]

export const breadcrumbLinkPropsData = [{ ...classNameProps, description: "Custom CSS class name for styling the breadcrumb link component." }]

export const breadcrumbPagePropsData = [{ ...classNameProps, description: "Custom CSS class name for styling the breadcrumb page component." }]

export const breadcrumbSeparatorPropsData = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">children</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">React.ReactNode</span>,
        default: '-',
        description: "Custom separator element. By default, it renders a right arrow icon."
    },
    { ...classNameProps, description: "Custom CSS class name for styling the breadcrumb separator component." }
]

export const breadcrumbPageAttribute = [
    {
        name: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">data-current</span>,
        type: <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">boolean</span>,
        description: "Indicates whether the item is the current page."
    }
]