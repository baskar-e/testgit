import { t } from "@/components/codeBlock"

export const comboboxCode = [
  {
    word: { keyword: 'import', bracket: '{' },
    level: [
      {
        word: { text: 'Combobox,', },
      },
      {
        word: { text: 'ComboboxContent,' },
      },
      {
        word: { text: 'ComboboxEmpty,' },
      },
      {
        word: { text: 'ComboboxInput' },
      },
      {
        word: { text: 'ComboboxItem' },
      },
      {
        word: { text: 'ComboboxList' },
      }
    ],
  },
  {
    word: { bracket: '}', keyword: 'from', string: '"@/components/ui/combobox"' }
  }
]

export const comboboxUsage = [
    {
        word: [
            t("tag", "<Combobox"),
            t("prop", "items", false),
            t("keyword", "=", false),
            t("bracket", "{", false),
            t("text", "fruitsLabel", false),
            t("bracket", "}"),
            t("prop", "labelKey", false),
            t("keyword", "=", false),
            t("bracket", "{", false),
            t("string", "'name'", false),
            t("bracket", "}", false),
            t("tag", ">")
        ],
        level: [
            {
                word: [
                    t("tag", "<ComboboxInput"),
                    t("prop", "placeholder", false),
                    t("keyword", "=", false),
                    t("string", '"Select an option..."'),
                    t("tag", "/>")
                ]
            },
            {
                word: [t("tag", "<ComboboxContent>")],
                level: [
                    {
                        word: [t("tag", "<ComboboxEmpty"), t("tag", "/>")]
                    },
                    {
                        word: [t("tag", "<ComboboxList>")],
                        level: [
                            {
                                word: [
                                    t("bracket", "{", false),
                                    t("bracket", "(", false),
                                    t("variable", "item", false),
                                    t("bracket", ")"),
                                    t("keyword", "=>"),
                                    t("bracket", "(")
                                ]
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<ComboboxItem"),
                                            t("prop", "key", false),
                                            t("keyword", "=", false),
                                            t("bracket", "{", false),
                                            t("text", "item.name", false),
                                            t("bracket", "}"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("bracket", "{", false),
                                            t("text", "item", false),
                                            t("bracket", "}", false),
                                            t("tag", ">")
                                        ],
                                        level: [
                                            {
                                                word: [
                                                    t("bracket", "{", false),
                                                    t("text", "item.name", false),
                                                    t("bracket", "}")
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        word: [t("tag", "</ComboboxItem>")]
                                    }
                                ]
                            },
                            {
                                word: [t("bracket", ")", false), t("bracket", "}")]
                            }
                        ]
                    },
                    {
                        word: [t("tag", "</ComboboxList>")]
                    }
                ]
            },
            {
                word: [t("tag", "</ComboboxContent>")]
            }
        ]
    },
    {
        word: [t("tag", "</Combobox>")]
    }
];

export const comboboxLabel = [
    {
        word: [
            t("tag", "<Combobox"),
            t("prop", "items", false),
            t("keyword", "=", false),
            t("bracket", "{", false),
            t("text", "fruitsLabel", false),
            t("bracket", "}"),
            t("prop", "labelKey", false),
            t("keyword", "=", false),
            t("bracket", "{", false),
            t("string", "'name'", false),
            t("bracket", "}", false),
            t("tag", ">")
        ],
        level: [
            {
                word: [
                    t("tag", "<ComboboxInput"),
                    t("prop", "placeholder", false),
                    t("keyword", "=", false),
                    t("string", '"Select an option..."'),
                    t("tag", "/>")
                ]
            },
            {
                word: [t("tag", "<ComboboxContent>")],
                level: [
                    {
                        word: [t("tag", "<ComboboxEmpty"), t("tag", "/>")]
                    },
                    {
                        word: [t("tag", "<ComboboxList>")],
                        level: [
                            {
                                word: [
                                    t("bracket", "{", false),
                                    t("bracket", "(", false),
                                    t("variable", "item", false),
                                    t("bracket", ")"),
                                    t("keyword", "=>"),
                                    t("bracket", "(")
                                ]
                            },
                            {
                                level: [
                                    {
                                        word: [
                                            t("tag", "<ComboboxItem"),
                                            t("prop", "key", false),
                                            t("keyword", "=", false),
                                            t("bracket", "{", false),
                                            t("text", "item.name", false),
                                            t("bracket", "}"),
                                            t("prop", "value", false),
                                            t("keyword", "=", false),
                                            t("bracket", "{", false),
                                            t("text", "item", false),
                                            t("bracket", "}", false),
                                            t("tag", ">")
                                        ],
                                        level: [
                                            {
                                                word: [
                                                    t("bracket", "{", false),
                                                    t("text", "item.name", false),
                                                    t("bracket", "}")
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        word: [t("tag", "</ComboboxItem>")]
                                    }
                                ]
                            },
                            {
                                word: [t("bracket", ")", false), t("bracket", "}")]
                            }
                        ]
                    },
                    {
                        word: [t("tag", "</ComboboxList>")]
                    }
                ]
            },
            {
                word: [t("tag", "</ComboboxContent>")]
            }
        ]
    },
    {
        word: [t("tag", "</Combobox>")]
    }
];