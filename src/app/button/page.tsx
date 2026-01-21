'use client'

import { useRef, useState } from 'react'
import { Button } from '../all-components/controls/button'
import { ButtonGroup } from '../all-components/controls/button-group'
import { Input } from '../all-components/controls/input'
import { InputGroup, InputGroupAddon } from '../all-components/controls/input-group'
import { Heart, Moon, Search, Sun } from 'lucide-react'
import { Checkbox } from '../all-components/controls/checkbox'
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from '../all-components/controls/dropdown'
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '../all-components/controls/combobox'
import { RadioGroup, RadioItem } from '../all-components/controls/radio-group'
import { Switch, SwitchIcon } from '../all-components/controls/switch'
import { Card, CardAction, CardBody, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from '../all-components/controls/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AccordionValue } from '../all-components/controls/accordion'
import { Dialog, DialogButton, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from '../all-components/controls/dialog'

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
    console.log(acc)
    return (
        <>
            <div id='as'></div>
            <Button id='sdf'>labe</Button>
            <Button variant='primary' >labe</Button>
            <Button variant='secondary' >labe</Button>
            <Button variant='ghost' >labe</Button>
            <Button variant='white' >labe</Button>
            {/* <Input ref={asd} /> */}
            <ButtonGroup>
                <Button className=' block bg-green-500 h-full'>asdfasd</Button>
                <Button variant='ghost'>asdg</Button>
            </ButtonGroup>
            <InputGroup>
                <InputGroupAddon><Search /></InputGroupAddon>
                <InputGroupAddon>asdfasf</InputGroupAddon>
                <Input />
                <Button className='border-non'>asdfsd</Button>
            </InputGroup>
            <Dialog>
                <DialogButton>
                    sd
                </DialogButton>
                <DialogOverlay>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Title</DialogTitle>
                            <DialogDescription>desc</DialogDescription>
                            <DialogClose>

                            </DialogClose>
                        </DialogHeader>
                        asdf
                    </DialogContent>
                </DialogOverlay>
            </Dialog>
            <Accordion type='multiple' value={acc} onValueChange={(e) => { setAcc(e) }}>
                <AccordionItem value={1}>
                    <AccordionTrigger >
                        button
                    </AccordionTrigger>
                    <AccordionContent>
                        as
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={2}>
                    <AccordionTrigger>
                        bu1
                    </AccordionTrigger>
                    <AccordionContent>
                        workd
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={3}>
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
                    <CardImage src='https://wallpapers.com/images/featured/hd-anime-prr1y1k5gqxfcgpv.jpg' alt='3' />
                    <CardBody>
                        <CardDescription>
                            One final recommendation for the Composite Pattern: group these exports under a single object.
                        </CardDescription>
                        <CardAction>Button</CardAction>
                    </CardBody>
                </Card>
                <Card className=''>
                    <CardImage src='https://wallpapers.com/images/featured/hd-anime-prr1y1k5gqxfcgpv.jpg' alt='3' />
                    <CardHeader>
                        <CardTitle>Header</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardDescription>
                            One final recommendation for the Composite Pattern: group these exports under a single object.
                        </CardDescription>
                    </CardBody>
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
        </>
    )
}
