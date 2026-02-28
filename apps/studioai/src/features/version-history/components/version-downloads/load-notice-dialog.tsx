"use client"

import { Button } from "@repo/ui-core/components/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@repo/ui-core/components/dialog"

interface LoadNoticeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm?: () => void
}

export function LoadNoticeDialog({ open, onOpenChange, onConfirm }: LoadNoticeDialogProps) {

    function handleConfirm() {
        if (onConfirm) {
            onConfirm()
        }
        onOpenChange(false)
    }

    function handleCancel() {
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Load this version?</DialogTitle>
                    <DialogDescription>
                        Loading this version will overwrite your current work. You may want to make a backup before continuing. Are you sure you want to proceed?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" type="button" onClick={handleConfirm}>
                        Load version
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
