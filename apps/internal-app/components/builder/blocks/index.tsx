import { TableIcon, AlignVerticalSpaceAroundIcon, RectangleEllipsisIcon, PanelRightCloseIcon, PanelBottomCloseIcon, TextCursorInputIcon, ListIcon, ListOrdered, ListOrderedIcon, SlidersHorizontalIcon, CalendarIcon, AppWindowIcon, CircleStopIcon, BetweenVerticalEndIcon, ToggleLeft, ToggleLeftIcon, SquareCheckIcon, TypeIcon, FileIcon, BadgeIcon, Badge, UserIcon } from "lucide-react";
import { BlockType } from "../enums";
import { Block } from "../types";
import { Table } from "./table"
import { Button } from "@workspace/ui/components/button";
import { AlertDialog } from "@workspace/ui/components/alert-dialog";
import { Sheet } from "@workspace/ui/components/sheet";
import { Select } from "@workspace/ui/components/select";
import { Drawer } from "@workspace/ui/components/drawer";
import { Slider } from "@workspace/ui/components/slider";
import { Tabs } from "@workspace/ui/components/tabs";
import { RadioGroup } from "@workspace/ui/components/radio-group";
import { Dialog } from "@workspace/ui/components/dialog";
import { DatePicker } from "@workspace/ui/components/date-picker";
import { Switch } from "@workspace/ui/components/switch";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import Text from "./text";
import { FilePicker } from "./file-picker";
import { Avatar } from "@workspace/ui/components/avatar";

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
        name: "Rich Text",
        types: [BlockType.Content],
        icon: FileIcon,
        description: "Rich text",
        block: <Textarea />
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