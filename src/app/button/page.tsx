'use client'

import { useRef, useState } from 'react'
import { Button } from '../../controls/button'
import { ButtonGroup } from '../../controls/button-group'
import { Input } from '../../controls/input'
import { InputGroup, InputGroupAddon } from '../../controls/input-group'
import { Heart, Moon, Search, Sun } from 'lucide-react'
import { Checkbox } from '../../controls/checkbox'
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from '../../controls/dropdown'
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '../../controls/combobox'
import { RadioGroup, RadioItem } from '../../controls/radio-group'
import { Switch, SwitchIcon } from '../../controls/switch'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from '../../controls/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AccordionValue } from '../../controls/accordion'
import { Dialog, DialogButton, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from '../../controls/dialog'
import { TabButton, TabHighLight, TabList, TabPanel, Tabs } from '../../controls/tabs'
import { Breadcrumbs, BreadcrumbsEllipsis, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsPage, BreadcrumbsSeparator } from '../../controls/breadcrumbs'
import { DynamicBreadcrumbs } from '../../controls/expandBReadCrumbs'
import { DatePicker, DatePickerContent, DatePickerGrid, DatePickerHeader, DatePickerTrigger } from '../../controls/datepicker'
import Sortable from '../../controls/dragAndDrop'

export default function ButtonPage() {
    const asd = useRef<HTMLDivElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const han = () => {
        asd.current?.focus();
    }
    const [s, ss] = useState(false);
    const [ci, setCi] = useState('');

    const users = [
        { name: 'Alice Smith', img: '/profiles/alice.jpg' },
        { name: 'Bob Jones', img: undefined },
        { name: 'marley', img: undefined },
        { name: 'catsey', img: undefined },
    ];
    const [check, setCheck] = useState('1');
    const [switchs, setSwitchs] = useState(false);
    const [acc, setAcc] = useState<AccordionValue[]>([1]);
    const [date, setDate] = useState<Date | null>();
    return (
        <>
            <div id='as'></div>
            <Button id='sdf'>labe</Button>
            <Button variant='primary' >labe</Button>
            <Button variant='secondary' >labe</Button>
            <Button variant='ghost' >labe</Button>
            <Button variant='white' >labe</Button>
            {/* <Input ref={asd} /> */}

            <Sortable />
            <ButtonGroup>
                <Button className='block bg-green-500 h-full'>asdfasd</Button>
                <Button variant='ghost'>asdg</Button>
            </ButtonGroup>
            <InputGroup>
                <InputGroupAddon><Search /></InputGroupAddon>
                <InputGroupAddon>asdfasf</InputGroupAddon>
                <Input />
                <Button className='bord er-non'>asdfsd</Button>
            </InputGroup>
            <DatePicker >
                <DatePickerTrigger />
                <DatePickerContent>
                    <DatePickerHeader />
                    <DatePickerGrid />
                </DatePickerContent>
            </DatePicker>
            <Tabs defaultValue={'1'} orientation='horizontal' variant='line'>
                {/* <TabHighLight className='bg-green-300'> */}
                <TabList className=''>
                    <TabButton value='1' >asswan</TabButton>
                    <TabButton value='2' >pantad</TabButton>
                    <TabButton value='3'>traret</TabButton>
                    <TabButton value='4'>maxel</TabButton>
                    <TabButton value='5'>sandal</TabButton>
                    <TabButton value='6'>shows</TabButton>
                    <TabButton value='7'>hamplton</TabButton>
                </TabList>
                {/* </TabHighLight> */}
                <TabPanel value='1'>
                    <span>tab one</span>
                </TabPanel>
                <TabPanel value='2'>
                    <span>tab two</span>
                </TabPanel>
            </Tabs>
            <Dialog>
                <DialogButton>
                    sd
                </DialogButton>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Title</DialogTitle>
                        <DialogDescription>desc</DialogDescription>
                        <DialogClose>

                        </DialogClose>
                    </DialogHeader>
                    asdf
                </DialogContent>
            </Dialog>
            <Accordion type='single'>
                <AccordionItem value={'1'}>
                    <AccordionTrigger >
                        button
                    </AccordionTrigger>
                    <AccordionContent>
                        as
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={'2'}>
                    <AccordionTrigger>
                        bu1
                    </AccordionTrigger>
                    <AccordionContent>
                        workd
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={'3'}>
                    <AccordionTrigger>
                        bu12
                    </AccordionTrigger>
                    <AccordionContent>
                        workd
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="min-h-screen p-3">
                <Card className='w-60'>
                    <CardHeader>
                        <CardTitle>Header</CardTitle>
                        <CardDescription>Work</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            One final recommendation for the Composite Pattern: group these exports under a single object.
                        </CardDescription>
                        <CardAction className='w-full'>Button</CardAction>
                    </CardContent>
                </Card>
                <Card className=''>
                    <CardImage src='https://wallpapers.com/images/featured/hd-anime-prr1y1k5gqxfcgpv.jpg' alt='3' />
                    <CardHeader>
                        <CardTitle>Header</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            One final recommendation for the Composite Pattern: group these exports under a single object.
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Heart />
                        <CardAction>Button</CardAction>
                    </CardFooter>
                </Card>
            </div>
            <label htmlFor="ne">controller</label>
            <Switch id='ne' className='w- h-6 p-1' >
                <SwitchIcon className=''>
                    <Sun className='group-has-checked:hidden' />
                    <Moon className='group-not-has-checked:hidden text-white' />
                </SwitchIcon>
            </Switch>
            <Switch />
            <Checkbox label='woeing' description='asdfasdf' className='bg-black h-8 w-8' />
            <Dropdown position='bottom'>
                <DropdownButton >
                    click
                </DropdownButton>
                <DropdownContent>
                    <DropdownItem>
                        now
                    </DropdownItem>
                    <DropdownItem>
                        asdf
                    </DropdownItem>
                    <DropdownItem onClick={() => console.log(3)}>
                        sakd
                    </DropdownItem>
                </DropdownContent>
            </Dropdown>
            <Combobox position='top-start' >
                <ComboboxInput placeholder='sd' value={ci} onChange={(e) => { setCi(e), console.log(e) }} />
                <ComboboxList>
                    <ComboboxEmpty />
                    {users.map((user) => (
                        <ComboboxItem ref={asd} key={user.name} value={user.name}>
                            {user.name}
                            {/* <div className="flex items-center gap-3"> */}
                            {/* <span>{user.name}</span> */}
                            {/* </div> */}
                        </ComboboxItem>
                    ))}
                </ComboboxList>
            </Combobox>
            <input type="text" onChange={(e) => setCi(e.target.value)} />
            <Button variant='secondary' onClick={han} >labe</Button>
            <RadioGroup value={check} onValueChange={setCheck}>
                <RadioItem value='1' onChange={(e) => console.log(e)}>Apple</RadioItem>
                <RadioItem value='2'>b</RadioItem>
                <RadioItem value='3'>c</RadioItem>
            </RadioGroup>
            <RadioGroup className='text-green-700'>
                <RadioItem value='1' className='text-green-700'>a</RadioItem>
                <RadioItem value='2'>b</RadioItem>
                <RadioItem value='3'>c</RadioItem>
            </RadioGroup>

            <Breadcrumbs separator={false}>
                <BreadcrumbsItem>
                    <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
                </BreadcrumbsItem>
                <BreadcrumbsItem>
                    <BreadcrumbsEllipsis />
                    <BreadcrumbsSeparator />
                </BreadcrumbsItem>
                <BreadcrumbsItem>
                    <BreadcrumbsLink href="/products">Products</BreadcrumbsLink>
                </BreadcrumbsItem>
                <BreadcrumbsItem>
                    <BreadcrumbsPage>Laptop</BreadcrumbsPage>
                </BreadcrumbsItem>
            </Breadcrumbs>
            <DynamicBreadcrumbs />
        </>
    )
}

// import { CodeBlock } from "@/components/codeBlock"
// import { TabButton, TabList, TabPanel, Tabs } from "../../controls/tabs"
// import { Button } from "@/controls/button"
// import { PropsTable } from "@/components/propsTable"
// import { AttributeTable } from "@/components/attributeTable"
// import { ButtonAttribute, buttonBasic, buttonCode, buttonGhost, buttonOutline, buttonPrimary, buttonPropsData, buttonSecondary, buttonSize, buttonUsage, buttonWhite } from "@/data/button-data"

// export default function ButtonPage() {
//   return (
//     <div className="grid gap-8 max-w-160 lg:max-w-180 2xl:max-w-200 py-4 xl:py-6 mx-auto" >
//       <div className="grid gap-3">
//         <h3 className="text-2xl xl:text-3xl font-medium">Button</h3>
//         <p className="max-xl:text-[15px]">A button component is an interactive element used to trigger immediate actions, handle form submissions.</p>
//       </div>
//       <div className="grid gap-5">
//         <h4 className="text-xl xl:text-2xl font-medium">Usage</h4>
//         <CodeBlock
//           title="Imports"
//           data={buttonCode}
//         />
//         <CodeBlock
//           title="Components"
//           data={buttonUsage}
//         />
//       </div>
//       <div className="grid gap-3">
//         <h4 className="text-xl xl:text-2xl font-medium pb-2">Examples</h4>
//         <h5 className="text-lg xl:text-xl font-medium pb-1">Default</h5>
//         <p className="text-sm">
//           Dislpays a basic button component with default styles.
//         </p>
//         <Tabs defaultValue={'preview'} variant="line">
//           <TabList>
//             <TabButton value="preview">Preview</TabButton>
//             <TabButton value="code">Code</TabButton>
//           </TabList>
//           <TabPanel value="preview" className="flex items-center justify-center px-12 min-h-77">
//               <Button>Button 1</Button>
//           </TabPanel>
//           <TabPanel value="code" className="p-0">
//             <CodeBlock
//               data={buttonBasic}
//             />
//           </TabPanel>
//         </Tabs>
//       </div>
//       <div className="grid gap-3">
//         <h5 className="text-lg xl:text-xl font-medium pb-1">Primary</h5>
//         <p className="text-sm">
//           Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{'variant="primary"'}</code> prop to change the variant of the button.
//         </p>
//         <Tabs defaultValue={'preview'} variant="line">
//           <TabList>
//             <TabButton value="preview">Preview</TabButton>
//             <TabButton value="code">Code</TabButton>
//           </TabList>
//           <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
//               <Button variant="primary">Button 1</Button>
//           </TabPanel>
//           <TabPanel value="code" className="p-0">
//             <CodeBlock
//               data={buttonPrimary}
//             />
//           </TabPanel>
//         </Tabs>
//       </div>
//      <div className="grid gap-3">
//         <h5 className="text-lg xl:text-xl font-medium pb-1">Secondary</h5>
//         <p className="text-sm">
//           Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{'variant="secondary"'}</code> prop to change the variant of the button.
//         </p>
//         <Tabs defaultValue={'preview'} variant="line">
//           <TabList>
//             <TabButton value="preview">Preview</TabButton>
//             <TabButton value="code">Code</TabButton>
//           </TabList>
//           <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
//               <Button variant="secondary">Button 1</Button>
//           </TabPanel>
//           <TabPanel value="code" className="p-0">
//             <CodeBlock
//               data={buttonSecondary}
//             />
//           </TabPanel>
//         </Tabs>
//       </div>
//       <div className="grid gap-3">
//         <h5 className="text-lg xl:text-xl font-medium pb-1">Ghost</h5>
//         <p className="text-sm">
//           Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{'variant="ghost"'}</code> prop to change the variant of the button.
//         </p>
//         <Tabs defaultValue={'preview'} variant="line">
//           <TabList>
//             <TabButton value="preview">Preview</TabButton>
//             <TabButton value="code">Code</TabButton>
//           </TabList>
//           <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
//               <Button variant="ghost">Button 1</Button>
//           </TabPanel>
//           <TabPanel value="code" className="p-0">
//             <CodeBlock
//               data={buttonGhost}
//             />
//           </TabPanel>
//         </Tabs>
//       </div>
//       <div className="grid gap-3">
//         <h5 className="text-lg xl:text-xl font-medium pb-1">Outline</h5>
//         <p className="text-sm">
//           Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{'variant="outline"'}</code> prop to change the variant of the button.
//         </p>
//         <Tabs defaultValue={'preview'} variant="line">
//           <TabList>
//             <TabButton value="preview">Preview</TabButton>
//             <TabButton value="code">Code</TabButton>
//           </TabList>
//           <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
//               <Button variant="outline">Button 1</Button>
//           </TabPanel>
//           <TabPanel value="code" className="p-0">
//             <CodeBlock
//               data={buttonOutline}
//             />
//           </TabPanel>
//         </Tabs>
//       </div>
//       <div className="grid gap-3">
//         <h5 className="text-lg xl:text-xl font-medium pb-1">White</h5>
//         <p className="text-sm">
//           Set the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{'variant="white"'}</code> prop to change the variant of the button.
//         </p>
//         <Tabs defaultValue={'preview'} variant="line">
//           <TabList>
//             <TabButton value="preview">Preview</TabButton>
//             <TabButton value="code">Code</TabButton>
//           </TabList>
//           <TabPanel value="preview" className="flex items-center justify-center px-12 py-9 min-h-77">
//               <Button variant="white">Button 1</Button>
//           </TabPanel>
//           <TabPanel value="code" className="p-0">
//             <CodeBlock
//               data={buttonWhite}
//             />
//           </TabPanel>
//         </Tabs>
//       </div>
//        <div className="grid gap-3">
//         <h5 className="text-lg xl:text-xl font-medium pb-1">Size</h5>
//         <p className="text-sm">
//           Use the <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">{"size"}</code> prop to change the size of the button. Default size is <code className="rounded-sm px-1.5 py-0.5 bg-gray-200">"md"</code>.
//         </p>
//         <Tabs defaultValue={'preview'} variant="line">
//           <TabList>
//             <TabButton value="preview">Preview</TabButton>
//             <TabButton value="code">Code</TabButton>
//           </TabList>
//           <TabPanel value="preview" className="flex max-sm:flex-col items-center justify-center gap-8 px-12 py-9 min-h-77">
//               <Button variant="white" size="xs">Extra Small</Button>
//               <Button variant="white" size="sm">Small</Button>
//               <Button variant="white" size="md">Default</Button>
//               <Button variant="white" size="lg">Large</Button>
//           </TabPanel>
//           <TabPanel value="code" className="p-0">
//             <CodeBlock
//               data={buttonSize}
//             />
//           </TabPanel>
//         </Tabs>
//       </div>

//       {/* Component API */}
//       <div className="grid gap-3">
//         <h4 className="text-xl xl:text-2xl font-medium pb-2">Component API</h4>
//         <h5 className="text-lg xl:text-xl font-medium">Button</h5>
//         <p className="text-sm pb-1">
//             The <span className="text-[13px] rounded-sm px-1.5 py-0.5 bg-gray-200">Button</span> component is a wrapper around the button element that adds a variety of styles and functionality.
//         </p>
//         <PropsTable data={buttonPropsData} className="mb-5" />
//         <AttributeTable data={ButtonAttribute} />
//       </div>
//     </div>
//   )
// }

