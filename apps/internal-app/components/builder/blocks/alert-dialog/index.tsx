import {
    AlertDialog as AlertDialogComponent,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@workspace/ui/components/alert-dialog"
  import { Button } from "@workspace/ui/components/button"
  import { schema } from "./schema"
  import { z } from "zod"
  
  export function AlertDialog({ label, action }: z.infer<typeof schema>) {
    return (
      <AlertDialogComponent>
        <AlertDialogTrigger asChild>
          <Button variant="outline">{label}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={action}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogComponent>
    )
  }
  