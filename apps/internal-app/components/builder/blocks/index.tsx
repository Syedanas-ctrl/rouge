import {
  AlignVerticalSpaceAroundIcon,
  RectangleEllipsisIcon,
  PanelRightCloseIcon,
  PanelBottomCloseIcon,
  TextCursorInputIcon,
  ListOrderedIcon,
  SlidersHorizontalIcon,
  CalendarIcon,
  AppWindowIcon,
  CircleStopIcon,
  BetweenVerticalEndIcon,
  ToggleLeftIcon,
  SquareCheckIcon,
  TypeIcon,
  FileIcon,
  BadgeIcon,
  UserIcon,
} from "lucide-react";
import { BlockType } from "../enums";
import { Block } from "../types";
import { BlockSchemaType, BlockName } from "./schemas";

const Blocks: Block<BlockSchemaType>[] = [
  {
    name: "Input",
    types: [BlockType.Input],
    icon: TextCursorInputIcon,
    description: "An input block",
    component: BlockName.Input,
    defaultProps: {
      placeholder: "Enter text",
      label: "Input",
    },
    defaultPropsFunction:  `return {
      label: "Input",
      placeholder: "Enter text",
    }`,
  },
  {
    name: "Button",
    types: [BlockType.Button],
    icon: AlignVerticalSpaceAroundIcon,
    description: "A button block",
    component: BlockName.Button,
    defaultProps: {
      label: "Button",
      variant: "default",
    },
    defaultPropsFunction: `return {
      label: "Button",
      variant: "default",
    }`,
  },
  {
    name: "Confirm Dialog",
    types: [BlockType.Button],
    icon: RectangleEllipsisIcon,
    description: "Confirm action button",
    component: BlockName.AlertDialog,
    defaultProps: {
      label: "Complete action",
    },
    defaultPropsFunction: `return {
      label: "Complete action",
    }`,
  },
  {
    name: "Sheet",
    types: [BlockType.Layout],
    icon: PanelRightCloseIcon,
    description: "Side sheet modal",
    component: BlockName.Sheet,
    defaultProps: {
      label: "Open Sheet",
    },
    defaultPropsFunction: `return {
      label: "Open Sheet",
    }`,
  },
  {
    name: "Drawer",
    types: [BlockType.Layout],
    icon: PanelBottomCloseIcon,
    description: "Bottom drawer modal",
    component: BlockName.Drawer,
    defaultProps: {
      label: "Open Drawer",
    },
    defaultPropsFunction: `return {
      label: "Open Drawer",
    }`,
  },
  {
    name: "Select",
    types: [BlockType.Select],
    icon: ListOrderedIcon,
    description: "Select options",
    component: BlockName.Select,
    defaultProps: {
      label: "Select",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ],
    },
    defaultPropsFunction: `return {
      label: "Select",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ],
    }`,
  },
  {
    name: "Slider",
    types: [BlockType.Input],
    icon: SlidersHorizontalIcon,
    description: "Slider",
    component: BlockName.Slider,
    defaultProps: {
      min: 0,
      max: 100
    },
    defaultPropsFunction: `return {
      min: 0,
      max: 100
    }`,
  },
  {
    name: "Tabs",
    types: [BlockType.Layout],
    icon: BetweenVerticalEndIcon,
    description: "Tabs",
    component: BlockName.Tabs,
    defaultProps: {
      label: "Tabs",
    },
    defaultPropsFunction: `return {
      label: "Tabs",
    }`,
  },
  {
    name: "Radio",
    types: [BlockType.Select],
    icon: CircleStopIcon,
    description: "Radio group",
    component: BlockName.Radio,
    defaultProps: {
      label: "Radio",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ],
    },
    defaultPropsFunction: `return {
      label: "Radio",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ],
    }`,
  },
  {
    name: "Modal",
    types: [BlockType.Layout],
    icon: AppWindowIcon,
    description: "Modal",
    component: BlockName.Dialog,
    defaultProps: {
      label: "Open Modal",
    },
    defaultPropsFunction: `return {
      label: "Open Modal",
    }`,
  },
  {
    name: "Date Picker",
    types: [BlockType.Input],
    icon: CalendarIcon,
    description: "Date picker",
    component: BlockName.DatePicker,
    defaultProps: {
      label: "Date Picker",
    },
    defaultPropsFunction: `return {
      label: "Date Picker",
    }`,
  },
  {
    name: "Switch",
    types: [BlockType.Input],
    icon: ToggleLeftIcon,
    description: "Switch",
    component: BlockName.Switch,
    defaultProps: {
      label: "Switch",
    },
    defaultPropsFunction: `return {
      label: "Switch",
    }`,
  },
  {
    name: "Checkbox",
    types: [BlockType.Input],
    icon: SquareCheckIcon,
    description: "Checkbox",
    component: BlockName.Checkbox,
    defaultProps: {
      label: "Checkbox",
    },
    defaultPropsFunction: `return {
      label: "Checkbox",
    }`,
  },
  {
    name: "Text",
    types: [BlockType.Content, BlockType.Featured],
    icon: TypeIcon,
    description: "Text",
    component: BlockName.Text,
    defaultProps: {
      size: "md",
    },
    defaultPropsFunction: `return {
      size: "md",
    }`,
  },
  {
    name: "Rich Text",
    types: [BlockType.Content],
    icon: FileIcon,
    description: "Rich text",
    component: BlockName.Textarea,
    defaultProps: {
      label: "Rich Text",
      size: "md",
    },
    defaultPropsFunction: `return {
      label: "Rich Text",
      size: "md",
    }`,
  },
  {
    name: "File Picker",
    types: [BlockType.Input],
    icon: FileIcon,
    description: "File picker",
    component: BlockName.FilePicker,
    defaultProps: {
      label: "Upload file",
      maxSize: 5,
      accept: ["application/*"],
    },
    defaultPropsFunction: `return {
      label: "Upload file",
      maxSize: 5,
      accept: ["application/*"],
    }`,
  },
  {
    name: "Badge",
    types: [BlockType.Content],
    icon: BadgeIcon,
    description: "Badge",
    component: BlockName.Badge,
    defaultProps: {
      label: "Badge",
    },
    defaultPropsFunction: `return {
      label: "Badge",
    }`,
  },
  {
    name: "Avatar",
    types: [BlockType.Content],
    icon: UserIcon,
    description: "Avatar",
    component: BlockName.Avatar,
    defaultProps: {
      label: "Avatar",
    },
    defaultPropsFunction: `return {
      label: "Avatar",
    }`,
  },
];

export default Blocks;
