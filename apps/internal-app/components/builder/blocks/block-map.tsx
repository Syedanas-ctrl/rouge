import { Badge } from "./badge";
import { Button } from "./button";
import { BlockName } from "./schemas";
import { DatePicker } from "./date-picker";
import { Dialog } from "./dialog";
import { Checkbox } from "./checkbox";
import { FilePicker } from "./file-picker";
import { RadioGroup } from "./radio-group";
import { Select } from "./select";
import { Sheet } from "./sheet";
import { Slider } from "./slider";
import { Switch } from "./switch";
import { Text } from "./text";
import { Textarea } from "./textarea";
import { AlertDialog } from "./alert-dialog";
import { Avatar } from "./avatar";
import { Table } from "./table";
import { Tabs } from "./tabs";
import { Drawer } from "./drawer";
import { Input } from "./input";

export const BlockMap = {
    [BlockName.Input]: Input,
    [BlockName.Button]: Button,
    [BlockName.Badge]: Badge,
    [BlockName.Checkbox]: Checkbox,
    [BlockName.DatePicker]: DatePicker,
    [BlockName.Dialog]: Dialog,
    [BlockName.Drawer]: Drawer,
    [BlockName.FilePicker]: FilePicker,
    [BlockName.Radio]: RadioGroup,
    [BlockName.Select]: Select,
    [BlockName.Sheet]: Sheet,
    [BlockName.Slider]: Slider,
    [BlockName.Switch]: Switch,
    [BlockName.Text]: Text,
    [BlockName.Textarea]: Textarea,
    [BlockName.AlertDialog]: AlertDialog,
    [BlockName.Avatar]: Avatar,
    [BlockName.Table]: Table,
    [BlockName.Tabs]: Tabs,
} 