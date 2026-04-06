export interface SubComponentProps {
  component: string;
  description?: string;
  props: Record<string, string>;
}

export interface ComponentEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  codeSnippet?: string;
  subComponents?: SubComponentProps[];
  href: string;
}

export const COMPONENTS: ComponentEntry[] = [

  // ─── Layout ───────────────────────────────────────────────────────────────

  {
    id: "accordion",
    name: "Accordion",
    category: "Layout",
    description: "Vertically stacked sections that expand and collapse. Useful for FAQs, settings panels, and progressive disclosure.",
    tags: ["expand", "collapse", "faq", "disclosure", "toggle", "panel", "collapsible"],
    codeSnippet: `<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. Follows the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Can it be animated?</AccordionTrigger>
    <AccordionContent>Yes, using CSS transitions on height.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    subComponents: [
      {
        component: "Accordion",
        description: "Root container — manages which item(s) are open.",
        props: {
          value: 'string | string[] — controlled open item(s). String when type="single", string[] when type="multiple".',
          defaultValue: "string | string[] — uncontrolled initial open item(s).",
          onValueChange: "(value: string | string[]) => void — fires when open state changes.",
          type: '"single" | "multiple" — single allows one item open at a time, multiple allows many.',
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "AccordionItem",
        description: "A single collapsible section. Direct child of Accordion.",
        props: {
          value: "string — unique ID for this item. Used by Accordion to track open state. Required. Must be unique among siblings.",
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "AccordionTrigger",
        description: "Clickable header that toggles the item.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "AccordionContent",
        description: "Collapsible body shown when item is open.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/components/accordion",
  },

  // ─── Navigation ───────────────────────────────────────────────────────────

  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Navigation",
    description: "Hierarchical navigation trail showing the user's current location. Renders an ordered list of links separated by dividers.",
    tags: ["navigation", "path", "location", "trail", "hierarchy", "links", "wayfinding"],
    codeSnippet: `<Breadcrumbs>
  <BreadcrumbsItem>
    <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
  </BreadcrumbsItem>
  <BreadcrumbsItem>
    <BreadcrumbsLink href="/components">Components</BreadcrumbsLink>
  </BreadcrumbsItem>
  <BreadcrumbsItem>
    <BreadcrumbsPage>Breadcrumbs</BreadcrumbsPage>
  </BreadcrumbsItem>
</Breadcrumbs>`,
    subComponents: [
      {
        component: "Breadcrumbs",
        description: "Root nav wrapper.",
        props: {
          separator: 'ReactNode — custom separator between items. Defaults to ">".',
          className: "string - additional CSS classes for styling.",
          "aria-label": 'string — accessible label. Defaults to "Breadcrumbs".',
        },
      },
      {
        component: "BreadcrumbsItem",
        description: "A wrapper for breadcrumbs - link, page, ellipsis and separartor.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "BreadcrumbsLink",
        description: "An interactive link representing a previous page in the hierarchy.",
        props: {
          href: "A string defining the URL or path to navigate to.",
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "BreadcrumbsPage",
        description: "The current active page, typically rendered as non-clickable text.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "BreadcrumbsEllipsis",
        description: "Indicates collapsed or hidden steps in a long navigation trail.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "BreadcrumbsSeparator",
        description: "Visual separator displayed between breadcrumb items",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/breadcrumbs",
  },

  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Organises content into multiple panels accessible via a tabbed interface. Only one panel visible at a time. Supports keyboard navigation.",
    tags: ["tab", "panel", "switch", "navigation", "sections", "content", "active"],
    codeSnippet: `<Tabs defaultValue="account">
  <TabList>
    <TabButton value="account">Account</TabButton>
    <TabButton value="password">Password</TabButton>
  </TabList>
  <TabPanel value="account">Account settings.</TabPanel>
  <TabPanel value="password">Change your password.</TabPanel>
</Tabs>`,
    subComponents: [
      {
        component: "Tabs",
        description: "Root container — manages active tab state.",
        props: {
          value: "string — controlled active tab key.",
          defaultValue: "string — uncontrolled initial active tab.",
          onValueChange: "(value: string) => void — fires when active tab changes.",
          orientation: '"horizontal" | "vertical" — layout direction. Default horizontal.',
          variant: '"pill" | "line" - defines the visual style, either a rounded capsule or a simple underlined text.',
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "TabList",
        description: "Container for the tab trigger buttons.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "TabButton",
        description: "Clickable tab button. Activates the matching TabsContent.",
        props: {
          value: "string — must match the value of the TabsContent it controls. Required.",
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "TabPanel",
        description: "Panel shown when its matching trigger is active.",
        props: {
          value: "string — must match the value of the TabsTrigger that controls it. Required.",
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "TabHighlight",
        description: "A decorative element used to style and highlight the active tab.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/tabs",
  },

  // ─── Inputs ───────────────────────────────────────────────────────────────

  {
    id: "button",
    name: "Button",
    category: "Inputs",
    description: "Triggers an action or event. Supports variants, sizes, loading state, disabled state, and leading/trailing icons.",
    tags: ["click", "action", "submit", "cta", "primary", "secondary", "loading", "icon", "danger"],
    codeSnippet: `<Button variant="primary" size="md" onClick={handleSave}>
  Save changes
</Button>
<Button variant="outline" loading={isSaving}>
  <UploadIcon /> Export
</Button>
<Button variant="ghost" disabled>Delete</Button>`,
    subComponents: [
      {
        component: "Button",
        description: "A clickable UI component used to trigger an action.",
        props: {
          variant: '"primary" | "secondary" | "outline" | "ghost" | "white"',
          size: '"xs" | "sm" | "md" | "lg"',
          loading: "boolean — shows a spinner and disables interaction.",
          disabled: "boolean",
          type: '"button" | "submit" | "reset"',
          onClick: "(e: React.MouseEvent) => void",
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/components/button",
  },

  {
    id: "button-group",
    name: "Button Group",
    category: "Inputs",
    description: "Groups related buttons together, merging borders for a fused appearance. Ideal for toolbars, segmented controls, and pagination.",
    tags: ["group", "toolbar", "segmented", "button", "cluster", "joined", "actions"],
    codeSnippet: `<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`,
    subComponents: [
      {
        component: "ButtonGroup",
        description: "Wrapper that fuses child Button borders.",
        props: {
          orientation: '"horizontal" | "vertical" — default horizontal.',
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/button-group",
  },

  {
    id: "checkbox",
    name: "Checkbox",
    category: "Inputs",
    description: "Binary toggle for boolean form values. Supports indeterminate state for select-all patterns.",
    tags: ["check", "toggle", "boolean", "select", "form", "tick", "indeterminate", "multiple"],
    codeSnippet: `<Checkbox
  label="I agree to the terms"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>
<Checkbox
  label="Select all"
  checked={allSelected}
  onChange={handleSelectAll}
/>`,
    subComponents: [
      {
        component: "Checkbox",
        description: "A toggle input used for selecting one or multiple options in a list or form.",
        props: {
          checked: "boolean — controlled checked state.",
          defaultChecked: "boolean — uncontrolled initial state.",
          onChange: "(e: React.ChangeEvent<HTMLInputElement>) => void",
          label: "string | ReactNode — visible label.",
          description: "string — shown below the label.",
          disabled: "boolean",
          required: "boolean",
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/checkbox",
  },

  {
    id: "combobox",
    name: "Combobox",
    category: "Inputs",
    description: "Searchable select combining a text field with a dropdown. Supports async loading, multi-select, and creatable options.",
    tags: ["search", "select", "autocomplete", "typeahead", "filter", "async", "multi", "dropdown", "creatable"],
    codeSnippet: `<Combobox items={frameworks} labelKey="name" valueKey="id">
  <ComboboxInput value={value} onChange={setValue} placeholder="Search frameworks..." />
  <ComboboxContent>
    <ComboboxEmpty />
    <ComboboxList>
      <ComboboxItem value="react">React</ComboboxItem>
      <ComboboxItem value="next">Next</ComboboxItem>
      <ComboboxItem value="angular">Angular</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
    subComponents: [
      {
        component: "Combobox",
        description: "wrapper component that manages the open state and shared context.",
        props: {
          items: "Items[] — An array of data objects used as selectable options.",
          open: "boolean — Controlled state to handle the visibility of the menu.",
          onOpen: "(open: boolean) => void — Callback function triggered when the menu opens or closes.",
          autoHighlight: "boolean — If true, the first option is highlighted by default (Default: false).",
          align: "'start' | 'center' | 'end' — The alignment of the menu relative to the trigger (Default: 'center').",
          side: "'top' | 'right' | 'bottom' | 'left' — The preferred side for menu placement (Default: 'bottom').",
          space: "number — The pixel gap between the trigger and the menu (Default: 5).",
          labelKey: "string | ((item: T) => string) — The object key used to display text (Default: 'label').",
          valueKey: "string | ((item: T) => string) — The object key used for the unique value (Default: 'value').",
          disabledKey: "string | ((item: T) => boolean | undefined) — The object key used to identify disabled items (Default: 'disabled').",
        },
      },
      {
        component: "ComboboxInput",
        description: "Input field that captures user typing and triggers filtering.",
        props: {
          ref: "RefObject — direct access to the underlying input or trigger element.",
          value: "string — controlled value of the input or currently selected option.",
          onChange: "((value: string) => void) — callback triggered when typing or selecting an option.",
          className: "string - additional CSS classes for styling."
        },
      },
      {
        component: "ComboboxContent",
        description: "Floating dropdown container that positions and renders the combobox",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "ComboboxList",
        description: "Component rendering the list of filtered items inside the dropdown.",
        props: {}
      },
      {
        component: "ComboboxItem",
        description: "Component rendering the list of filtered items inside the dropdown.",
        props: {
          value: "string — Represents the data item associated with this option.",
          onSelect: "((value: string, item: string | Record<string, any>) => void) — Callback triggered when the item is selected, returning the item’s value and the original item data.",
          className: "string - additional CSS classes for styling."
        }
      },
      {
        component: "ComboboxEmpty",
        description: "Component that displays a message or UI when the filtered list is empty.",
        props: {
          className: "string - additional CSS classes for styling."
        }
      },
    ],
    href: "/combobox",
  },

  {
    id: "input",
    name: "Input",
    category: "Inputs",
    description: "Single-line text input with label, helper text, error state, character count, and optional leading/trailing icons.",
    tags: ["text", "form", "field", "textfield", "email", "password", "search", "number"],
    codeSnippet: `<Input
  type="email"
  placeholder="you@example.com"
/>
<Input
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>`,
    subComponents: [
      {
        component: "Input",
        description: "A field that allows users to enter and edit text or data",
        props: {
          placeholder: "string",
          value: "string — controlled value.",
          onChange: "(e: React.ChangeEvent<HTMLInputElement>) => void",
          disabled: "boolean",
          required: "boolean",
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/input",
  },

  {
    id: "input-group",
    name: "Input Group",
    category: "Inputs",
    description: "Fuses an input with prefix/suffix addons or buttons into a single control. Used for URLs, phone numbers, unit inputs, and search-with-action.",
    tags: ["addon", "prefix", "suffix", "append", "prepend", "input", "group", "url", "unit"],
    codeSnippet: `<InputGroup>
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupInput placeholder="yoursite.com" />
</InputGroup>
<InputGroup>
  <InputGroupAddon>$</InputGroupAddon>
  <InputGroupInput type="number" placeholder="0.00" />
  <InputGroupAddon align="inline-end">USD</InputGroupAddon>
</InputGroup>
<InputGroup>
  <InputGroupInput placeholder="Enter invite code" />
  <Button variant="primary">Apply</Button>
</InputGroup>`,
    subComponents: [
      {
        component: "InputGroup",
        description: "Wrapper that fuses child borders into a single control.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "InputGroupAddon",
        description: "Adds elements to the prefix or suffix inside the group.",
        props: {
          align: "Controls the position of the addon relative to its container.",
          onClick: "(e: MouseEvent<HTMLDivElement, MouseEvent>) => void - Callback function triggered when the element is clicked.",
          className: "string - additional CSS classes for styling."
        },
      },
      {
        component: "InputGroupInput",
        description: "Input field that captures user typing.",
        props: {
          ref: "RefObject — direct access to the underlying input element.",
          className: "string - additional CSS classes for styling."
        },
      },
    ],
    href: "/input-group",
  },

  {
    id: "radio-group",
    name: "Radio Group",
    category: "Inputs",
    description: "Mutually exclusive radio buttons — only one option selectable at a time. Supports horizontal/vertical layouts and disabled options.",
    tags: ["radio", "select", "option", "choice", "mutually exclusive", "single select", "form"],
    codeSnippet: `<RadioGroup
  value={preference}
  onChange={setPreference}
>
  <RadioOption value="all">All notifications</RadioOption>
  <RadioOption value="mentions">Mentions only</RadioOption>
  <RadioOption value="none">None</RadioOption>
</RadioGroup>`,
    subComponents: [
      {
        component: "RadioGroup",
        description: "Root container — manages which option is selected.",
        props: {
          name: "string — HTML name attribute for native form submission.",
          defaultValue: "string — uncontrolled initial value.",
          value: "string — controlled selected value.",
          onValueChange: "(value: string) => void",
          orientation: '"vertical" | "horizontal" — default horizontal.',
          disabled: "boolean — disables all options.",
          required: "boolean — marks the input as required.",
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "RadioGroupItem",
        description: "A single selectable radio item.",
        props: {
          id: "string — unique identifier for the radio item.",
          value: "string — the value this option represents. Compared against RadioGroup value to determine if checked. Required.",
          disabled: "boolean — disables only this option.",
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/components/radio-group",
  },

  {
    id: "switch",
    name: "Switch",
    category: "Inputs",
    description: "On/off toggle for immediate-effect settings. Prefer Switch over Checkbox when the change applies instantly without a form submit.",
    tags: ["toggle", "on", "off", "boolean", "enable", "disable", "settings", "preference"],
    codeSnippet: `<Switch
  value={enabled}
  onValueChange={setEnabled}
/>
<Switch>
  <SwitchThumb>
    <Sun />
    <Moon color="white" />
  </SwitchThumb>  
</Switch>`,
    subComponents: [
      {
        component: "Switch",
        description: "A toggle control used to switch between on and off states.",
        props: {
          value: "boolean — controlled on/off state.",
          defaultValue: "boolean — uncontrolled initial state.",
          onValueChange: "(checked: boolean) => void — note: receives the boolean directly, not an event.",
          disabled: "boolean",
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "SwitchThumb",
        description: "The movable element inside the switch that indicates its current state.",
        props: {
          className: "string - additional CSS classes for styling.",
        },
      },
    ],
    href: "/components/switch",
  },

  // ─── Overlays ─────────────────────────────────────────────────────────────

  {
    id: "dialog",
    name: "Dialog",
    category: "Overlays",
    description: "Modal window for critical information or decisions. Includes focus trapping, scroll locking, backdrop dismiss, and escape-to-close.",
    tags: ["modal", "popup", "overlay", "confirm", "alert", "focus trap", "portal", "prompt"],
    codeSnippet: `<Dialog open={open} onOpen={() => setOpen(false)}>
  <DialogHeader>
    <DialogTitle>Save project</DialogTitle>
    <DialogDescription>This action cannot be undone.</DialogDescription>
  </DialogHeader>
  <DialogContent>
    <p>Content</p>
  <DialogContent>
  <DialogFooter>
    <DialogClose>Close</DialogClose>
    <Button variant="primary" onClick={handleSave}>Save</Button>
  </DialogFooter>
</Dialog>`,
    subComponents: [
      {
        component: "Dialog",
        description: "Root — controls visibility and portal rendering.",
        props: {
          open: "boolean — controls whether the dialog is visible.",
          onOpen: "((open: boolean, event?: Event | undefined, reason?: OpenChangeReason | undefined) => void) — called when the modal opens or backdrop is clicked or Escape is pressed.",
        },
      },
      {
        component: "DialogHeader",
        description: "Top section — wraps title and description.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "DialogTitle",
        description: "Primary heading of the dialog. Linked to the dialog via aria-labelledby.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "DialogDescription",
        description: "Secondary explanatory text below the title. Linked via aria-describedby.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "DialogButton",
        description: "Triggers the dialog to open.",
        props: {
          ref: "RefObject — direct access to the button element.",
          className: "string - additional CSS classes for styling."
        },
      },
      {
        component: "DialogContent",
        description: "Main container that holds the dialog content.",
        props: {
          showCloseButton: "boolean - controls whether the close button is displayed.",
          className: "string - additional CSS classes for styling."
        },
      },
      {
        component: "DialogOverlay",
        description: "Backdrop overlay displayed behind the dialog.",
        props: {
          portal: "RefObject — specifies the container where the overlay is rendered.",
          className: "string - additional CSS classes for styling."
        },
      },
      {
        component: "DialogClose",
        description: "Top section — wraps title and description.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "DialogFooter",
        description: "Bottom action area — typically contains cancel and confirm buttons.",
        props: { className: "string - additional CSS classes for styling." },
      },
    ],
    href: "/dialog",
  },

  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Overlays",
    description: "Contextual floating menu triggered by a button or right-click. Supports icons, shortcuts, separators, submenus, and checkable items.",
    tags: ["menu", "context", "popup", "actions", "options", "floating", "right-click", "submenu"],
    codeSnippet: `<Dropdown>
  <DropdownButton variant="white">
    Options <ChevronDown />
  </DropdownButton>
  <DropdownContent>
    <DropdownItem onSelect={handleEdit}>
      <EditIcon /> Edit
    </DropdownItem>
    <DropdownItem onSelect={handleDelete}>
      <TrashIcon /> Delete
    </DropdownItem>
  </DropdownContent>
</Dropdown>`,
    subComponents: [
      {
        component: "Dropdown",
        description: "Root — manages open state.",
        props: {
          open: "boolean — controlled open state.",
          onOpen: "((open: boolean) => void) - Callback function triggered when the dropdown opens or closes.",
          align: '"start" | "center" | "end" — alignment relative to trigger. Default center.',
          side: '"top" | "bottom" | "left" | "right" — preferred placement. Default bottom.',
          space: "number — gap between trigger and menu in px. Default 8.",
        },
      },
      {
        component: "DropdownButton",
        description: "Element that opens the menu on click.",
        props: {
          ref: "RefObject — direct access to the button element.",
          disabled: "boolean",
          className: "string - additional CSS classes for styling."
        },
      },
      {
        component: "DropdownContent",
        description: "The floating panel containing menu items.",
        props: {
          portal: "RefObject — specifies the container where the overlay is rendered.",
          modal: "boolean — determines whether the dropdown behaves as a modal, blocking interaction outside.",
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "DropdownItem",
        description: "A single clickable menu item.",
        props: {
          onSelect: "(e: Event) => void — fires when item is clicked or activated by keyboard.",
          disabled: "boolean — makes item non-interactive.",
          variant: '"default" | "danger" — danger applies destructive styling.',
          className: "string - additional CSS classes for styling.",
        },
      }
    ],
    href: "/dropdown-menu",
  },

  // ─── Display ──────────────────────────────────────────────────────────────

  {
    id: "card",
    name: "Card",
    category: "Display",
    description: "Flexible surface container with optional header, body, and footer sections. Use for dashboards, listings, summaries, and data display.",
    tags: ["container", "surface", "panel", "box", "content", "dashboard", "list", "summary", "tile"],
    codeSnippet: `<Card>
  <CardHeader>
    <CardTitle>Monthly Revenue</CardTitle>
    <CardDescription>Jan – Mar 2025</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">$48,295</p>
  </CardContent>
  <CardFooter>
    <CardAction>View report</CardAction>
  </CardFooter>
</Card>`,
    subComponents: [
      {
        component: "Card",
        description: "Root surface container.",
        props: {
          onClick: "(e: React.MouseEvent) => void — makes the whole card clickable.",
          className: "string - additional CSS classes for styling.",
        },
      },
      {
        component: "CardHeader",
        description: "Top section — typically contains CardTitle and CardDescription.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "CardTitle",
        description: "Primary heading inside the card header.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "CardDescription",
        description: "Muted secondary text below the title.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "CardContent",
        description: "Main body area of the card.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "CardImage",
        description: "Displays an image within the card.",
        props: {
          src: "string — image source URL.",
          alt: "string — alternative text for the image.",
          className: "string - additional CSS classes for styling."
        },
      },
      {
        component: "CardAction",
        description: "Button used to trigger actions within the card.",
        props: { className: "string - additional CSS classes for styling." },
      },
      {
        component: "CardFooter",
        description: "Bottom section — typically contains actions.",
        props: { className: "string - additional CSS classes for styling." },
      },
    ],
    href: "/card",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const CATEGORIES = [...new Set(COMPONENTS.map((c) => c.category))];

export function getByCategory(category: string): ComponentEntry[] {
  return COMPONENTS.filter((c) => c.category === category);
}

export function getComponent(id: string): ComponentEntry | undefined {
  return COMPONENTS.find((c) => c.id === id);
}