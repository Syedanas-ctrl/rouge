import { ZodSchema } from "zod";
import { schema as AlertDialogSchema } from "./alert-dialog/schema";
import { schema as AvatarSchema } from "./avatar/schema";
import { schema as ButtonSchema } from "./button/schema";
import { schema as CheckboxSchema } from "./checkbox/schema";
import { schema as DatePickerSchema } from "./date-picker/schema";
import { schema as DialogSchema } from "./dialog/schema";
import { schema as DrawerSchema } from "./drawer/schema";
import { schema as FilePickerSchema } from "./file-picker/schema";
import { schema as InputSchema } from "./input/schema";
import { schema as RadioSchema } from "./radio-group/schema";
import { schema as SelectSchema } from "./select/schema";
import { schema as SheetSchema } from "./sheet/schema";
import { schema as SliderSchema } from "./slider/schema";
import { schema as SwitchSchema } from "./switch/schema";
import { schema as TextSchema } from "./text/schema";
import { schema as TextareaSchema } from "./textarea/schema";
import { schema as BadgeSchema } from "./badge/schema";
import { schema as TabsSchema } from "./tabs/schema";
import { schema as TableSchema } from "./table/schema";

export enum BlockName {
    AlertDialog = "AlertDialog",
    Avatar = "Avatar",
    Badge = "Badge",
    Button = "Button",
    Checkbox = "Checkbox",
    DatePicker = "DatePicker",
    Dialog = "Dialog",
    Drawer = "Drawer",
    FilePicker = "FilePicker",
    Input = "Input",
    Radio = "Radio",
    Select = "Select",
    Sheet = "Sheet",
    Slider = "Slider",
    Switch = "Switch",
    Table = "Table",
    Text = "Text",
    Textarea = "Textarea",
    Tabs = "Tabs",
}

export const BlockSchemas = {
    [BlockName.Input]: InputSchema,
    [BlockName.Button]: ButtonSchema,
    [BlockName.Badge]: BadgeSchema,
    [BlockName.Checkbox]: CheckboxSchema,
    [BlockName.DatePicker]: DatePickerSchema,
    [BlockName.Dialog]: DialogSchema,
    [BlockName.Drawer]: DrawerSchema,
    [BlockName.FilePicker]: FilePickerSchema,
    [BlockName.Radio]: RadioSchema,
    [BlockName.Select]: SelectSchema,
    [BlockName.Sheet]: SheetSchema,
    [BlockName.Slider]: SliderSchema,
    [BlockName.Switch]: SwitchSchema,
    [BlockName.Text]: TextSchema,
    [BlockName.Textarea]: TextareaSchema,
    [BlockName.AlertDialog]: AlertDialogSchema,
    [BlockName.Avatar]: AvatarSchema,
    [BlockName.Table]: TableSchema,
    [BlockName.Tabs]: TabsSchema,
} satisfies Record<BlockName, ZodSchema>;

export type BlockSchemaType = keyof typeof BlockSchemas;