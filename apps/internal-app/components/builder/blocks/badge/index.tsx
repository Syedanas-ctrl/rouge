import { Badge as BadgeComponent } from "@workspace/ui/components/badge";
import { schema } from "./schema";
import { z } from "zod";

export const Badge = ({ label }: z.infer<typeof schema>) => {
    return <BadgeComponent>{label}</BadgeComponent>;
};

