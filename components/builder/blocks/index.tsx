import { TableIcon, AlignVerticalSpaceAroundIcon, RectangleEllipsisIcon, PanelRightCloseIcon, PanelBottomCloseIcon, TextCursorInputIcon, ListIcon, ListOrdered, ListOrderedIcon, SlidersHorizontalIcon, CalendarIcon, AppWindowIcon, CircleStopIcon, BetweenVerticalEndIcon, ToggleLeft, ToggleLeftIcon, SquareCheckIcon, TypeIcon, FileIcon, BadgeIcon, Badge, UserIcon } from "lucide-react";
import { BlockType } from "../enums";
import { Block } from "../types";
import { Table } from "./table"
import { Button } from "@/components/ui/button";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Sheet } from "@/components/ui/sheet";
import { Select } from "@/components/ui/select";
import { Drawer } from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Tabs } from "@/components/ui/tabs";
import { RadioGroup } from "@/components/ui/radio-group";
import { Dialog } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Text from "./text";
import { FilePicker } from "./file-picker";
import { Avatar } from "@/components/ui/avatar";

const Blocks: Block[] = [
    {
        name: "Table",
        types: [BlockType.Featured, BlockType.Display],
        icon: TableIcon,
        description: "A table block",
        block: <Table />,
    },
    {
        name: "Input",
        types: [BlockType.Input],
        icon: TextCursorInputIcon,
        description: "An input block",
        block: <Input />,
    },
    {
        name: "Button",
        types: [BlockType.Button],
        icon: AlignVerticalSpaceAroundIcon,
        description: "A button block",
        block: <Button />,
    },
    {
        name: "Confirm Dialog",
        types: [BlockType.Button],
        icon: RectangleEllipsisIcon,
        description: "Confirm action button",
        block: <AlertDialog />
    },
    {
        name: "Sheet",
        types: [BlockType.Layout],
        icon: PanelRightCloseIcon,
        description: "Side sheet modal",
        block: <Sheet/>
    },
    {
        name: "Drawer",
        types: [BlockType.Layout],
        icon: PanelBottomCloseIcon,
        description: "Bottom drawer modal",
        block: <Drawer />
    },
    {
        name: "Select",
        types: [BlockType.Select],
        icon: ListOrderedIcon,
        description: "Select options",
        block: <Select />
    },
    {
        name: "Slider",
        types: [BlockType.Input],
        icon: SlidersHorizontalIcon,
        description: "Slider",
        block: <Slider />
    },
    {
        name: "Tabs",
        types: [BlockType.Layout],
        icon: BetweenVerticalEndIcon,
        description: "Tabs",
        block: <Tabs />
    },
    {
        name: "Radio",
        types: [BlockType.Select],
        icon: CircleStopIcon,
        description: "Radio group",
        block: <RadioGroup />
    },
    {
        name: "Modal",
        types: [BlockType.Layout],
        icon: AppWindowIcon,
        description: "Modal",
        block: <Dialog />
    },
    {
        name: "Date Picker",
        types: [BlockType.Input],
        icon: CalendarIcon,
        description: "Date picker",
        block: <DatePicker />
    },
    {
        name: "Switch",
        types: [BlockType.Input],
        icon: ToggleLeftIcon,
        description: "Switch",
        block: <Switch />
    },
    {
        name: "Checkbox",
        types: [BlockType.Input],
        icon: SquareCheckIcon,
        description: "Checkbox",
        block: <Checkbox />
    },
    {
        name: "Text",
        types: [BlockType.Content, BlockType.Featured],
        icon: TypeIcon,
        description: "Text",
        block: <Text />
    },
    {
        name: "File Picker",
        types: [BlockType.Input],
        icon: FileIcon,
        description: "File picker",
        block: <FilePicker />
    },
    {
        name: "Badge",
        types: [BlockType.Content],
        icon: BadgeIcon,
        description: "Badge",
        block: <Badge />
    },
    {
        name: "Avatar",
        types: [BlockType.Content],
        icon: UserIcon,
        description: "Avatar",
        block: <Avatar />
    }
]

export default Blocks;