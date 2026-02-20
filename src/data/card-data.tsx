import { t } from "@/components/codeBlock"
import { classNameProps } from "./className-data"

export const cardCode = [
    {
        word: { "keyword": "import", "bracket": "{" },
        level: [
            { word: { "text": "Card," } },
            { word: { "text": "CardAction," } },
            { word: { "text": "CardContent," } },
            { word: { "text": "CardDescription," } },
            { word: { "text": "CardFooter," } },
            { word: { "text": "CardHeader," } },
            { word: { "text": "CardImage," } },
            { word: { "text": "CardTitle" } },
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/card"' }
    }
]

export const cardUsage = [
    {
        word: { tag: '<Card>' },
        level: [
            {
                word: { tag: '<CardImage src="..." alt="..." />' },
            },
            {
                word: { "tag": "<CardHeader>" },
                level: [
                    {
                        word: [t('tag', '<CardTitle>', false), t('text', 'Card Title', false), t('tag', '</CardTitle>')],
                    },
                    {
                        word: [t('tag', '<CardDescription>', false), t('text', 'Card Description', false), t('tag', '</CardDescription>')],
                    }
                ]
            },
            {
                word: { "tag": "</CardHeader>" },
            },
            {
                word: { tag: '<CardContent>' },
                level: [
                    {
                        word: [t('tag', '<p>', false), t('text', 'Card content goes here...', false), t('tag', '</p>')],
                    }
                ],
            },
            {
                word: { tag: '</CardContent>' },
            },
            {
                word: { tag: '<CardFooter>' },
                level: [
                    {
                        word: [t('tag', '<CardAction>', false), t('text', 'Action', false), t('tag', '</CardAction>')],
                    }
                ]
            },
            {
                word: { tag: '</CardFooter>' },
            }
        ],
    },
    {
        word: { tag: '</Card>' }
    }
]

export const cardBasic = [
    {
        word: { "keyword": "import", "bracket": "{" },
        level: [
            { word: { "text": "Card," } },
            { word: { "text": "CardAction," } },
            { word: { "text": "CardContent," } },
            { word: { "text": "CardDescription," } },
            { word: { "text": "CardHeader," } },
            { word: { "text": "CardTitle" } },
        ],
    },
    {
        word: { bracket: '}', keyword: 'from', string: '"@/components/ui/card"' }
    },
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "CardBasic", false), t("bracket", "() {")],
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
                        word: { tag: '<Card>' },
                        level: [
                            {
                                word: { "tag": "<CardHeader>" },
                                level: [
                                    {
                                        word: [t('tag', '<CardTitle>', false), t('text', 'Quote', false), t('tag', '</CardTitle>')],
                                    },
                                    {
                                        word: [t('tag', '<CardDescription>', false), t('text', 'Description', false), t('tag', '</CardDescription>')],
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</CardHeader>" },
                            },
                            {
                                word: { tag: '<CardContent>' },
                                level: [
                                    {
                                        word: { "tag": "<p>" },
                                        level: [
                                            {
                                                word: { text: "“You've gotta dance like there's nobody watching," }
                                            },
                                            {
                                                word: { text: "Love like you'll never be hurt," }
                                            },
                                            {
                                                word: { text: "Sing like there's nobody listening," }
                                            },
                                            {
                                                word: { text: "And live like it's heaven on earth.”" }
                                            }
                                        ]
                                    },
                                    {
                                        word: { "tag": "</p>" },
                                    },
                                    {
                                        word: [t('tag', '<CardAction>', false), t('text', 'Action', false), t('tag', '</CardAction>')],
                                    }
                                ],
                            },
                            {
                                word: { tag: '</CardContent>' },
                            },
                        ],
                    },
                    {
                        word: { tag: '</Card>' }
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

export const cardImage = [
    ...cardCode,
    { word: { text: "" } },
    {
        word: [t("keyword", "export function"), t("function", "CardImage", false), t("bracket", "() {")],
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
                        word: { tag: '<Card>' },
                        level: [
                            {
                                word: { tag: '<CardImage src="https://free-3dtextureshd.com/wp-content/uploads/2025/01/614.jpg.webp" alt="Card Image" />' }
                            },
                            {
                                word: { "tag": "<CardHeader>" },
                                level: [
                                    {
                                        word: [t('tag', '<CardTitle>', false), t('text', 'Quote', false), t('tag', '</CardTitle>')],
                                    },
                                    {
                                        word: [t('tag', '<CardDescription>', false), t('text', 'Description', false), t('tag', '</CardDescription>')],
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</CardHeader>" },
                            },
                            {
                                word: { tag: '<CardContent>' },
                                level: [
                                    {
                                        word: { "tag": "<p>" },
                                        level: [
                                            {
                                                word: { text: "“You've gotta dance like there's nobody watching," }
                                            },
                                            {
                                                word: { text: "Love like you'll never be hurt," }
                                            },
                                            {
                                                word: { text: "Sing like there's nobody listening," }
                                            },
                                            {
                                                word: { text: "And live like it's heaven on earth.”" }
                                            }
                                        ]
                                    },
                                    {
                                        word: { "tag": "</p>" },
                                    },
                                ],
                            },
                            {
                                word: { tag: '</CardContent>' },
                            },
                            {
                                word: { "tag": "<CardFooter>" },
                                level: [
                                    {
                                        word: [t('tag', '<CardAction>', false), t('text', 'Learn more', false), t('tag', '</CardAction>')],
                                    },
                                    {
                                        word: [t('tag', '<CardAction>', false), t('text', 'Action', false), t('tag', '</CardAction>')],
                                    }
                                ]
                            },
                            {
                                word: { "tag": "</CardFooter>" },
                            }
                        ],
                    },
                    {
                        word: { tag: '</Card>' }
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

export const cardPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the card component."
    }
]

export const cardActionPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the card action component."
    }
]

export const cardContentPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the card content component."
    }
]

export const cardDescriptionPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the card description component."
    }
]

export const cardFooterPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the card footer component."
    }
]

export const cardHeaderPropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the card header component."
    }
]

export const cardImagePropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the card image component."
    }
]

export const cardTitlePropsData = [
    {
        ...classNameProps,
        description: "Custom CSS class name for styling the card title component."
    }
]
