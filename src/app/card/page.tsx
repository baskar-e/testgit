import { CodeBlock } from "@/components/codeBlock"
import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
import { PropsTable } from "@/components/propsTable"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from "@/controls/card"
import { cardActionPropsData, cardBasic, cardCode, cardContentPropsData, cardDescriptionPropsData, cardFooterPropsData, cardHeaderPropsData, cardImage, cardImagePropsData, cardPropsData, cardTitlePropsData, cardUsage } from "@/data/card-data"
import { Heart } from "lucide-react"

export default function CardPage() {
    return (
        <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto" >
            <div className="grid gap-3">
                <h3 className="text-2xl xl:text-3xl font-medium">Card</h3>
                <p className="max-xl:text-[15px]">Cards are flexible containers used to group related content and action. It includes subcomponents for header, title, description, image, content and footer sections to structure information effectively.</p>
            </div>
            <div className="grid gap-5">
                <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
                <CodeBlock
                    title="Imports"
                    data={cardCode}
                />
                <CodeBlock
                    title="Components"
                    data={cardUsage}
                />
            </div>
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
                <h5 className="text-lg xl:text-xl font-medium pb-1">Basic</h5>
                <p className="text-sm">
                    Displays a basic card component with header, description and actions.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quote</CardTitle>
                                <CardDescription>Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    “You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth.”
                                </p>
                                <CardAction>Action</CardAction>
                            </CardContent>
                        </Card>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={cardBasic}
                        />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium pb-1">Image</h5>
                <p className="text-sm">
                    Add an image using <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{'<CardImage />'}</code> component to create a card with an image.
                </p>
                <Tabs defaultValue={'preview'} variant="line">
                    <TabList>
                        <TabButton value="preview">Preview</TabButton>
                        <TabButton value="code">Code</TabButton>
                    </TabList>
                    <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
                        <Card className=''>
                            <CardImage src='https://free-3dtextureshd.com/wp-content/uploads/2025/01/614.jpg.webp' alt='Card Image' />
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle>Quote</CardTitle>
                                <Heart size={18} />
                            </CardHeader>
                            <CardContent>
                                <p>
                                    “You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth.”
                                </p>
                            </CardContent>
                            <CardFooter>
                                <CardAction>Learn more</CardAction>
                                <CardAction>Action</CardAction>
                            </CardFooter>
                        </Card>
                    </TabPanel>
                    <TabPanel value="code" className="p-0">
                        <CodeBlock
                            data={cardImage}
                        />
                    </TabPanel>
                </Tabs>
            </div>

            {/* Component API */}
            <div className="grid gap-3">
                <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
                <h5 className="text-lg xl:text-xl font-medium">Card</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">Card</span> component is the root container for card content.
                </p>
                <PropsTable data={cardPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">CardAction</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">CardAction</span> component provides mechanism to make card elements interactive.
                </p>
                <PropsTable data={cardActionPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">CardContent</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">CardContent</span> component is used for the main card body.
                </p>
                <PropsTable data={cardContentPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">CardDescription</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">CardDescription</span> component is used for helper text under the title.
                </p>
                <PropsTable data={cardDescriptionPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">CardFooter</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">CardFooter</span> component is used for actions and secondary content at the bottom of the card.
                </p>
                <PropsTable data={cardFooterPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">CardHeader</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">CardHeader</span> component is used for a title, description, and optional action.
                </p>
                <PropsTable data={cardHeaderPropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">CardImage</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">CardImage</span> component is used to display the main image of the card.
                </p>
                <PropsTable data={cardImagePropsData} />
            </div>
            <div className="grid gap-3">
                <h5 className="text-lg xl:text-xl font-medium">CardTitle</h5>
                <p className="text-sm pb-1">
                    The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">CardTitle</span> component is used for the card title.
                </p>
                <PropsTable data={cardTitlePropsData} />
            </div>
        </div>
    )
}