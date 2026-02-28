'use client';

import { ReactNode, useState } from 'react';

import { Button } from '@repo/ui-core/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui-core/components/dialog';
import { Field, FieldGroup } from '@repo/ui-core/components/field';
import { Input } from '@repo/ui-core/components/input';
import { Label } from '@repo/ui-core/components/label';

interface ScriptCreateDialogProps {
  children?: ReactNode;
}

export function ScriptCreateDialog({ children }: ScriptCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    // Do something with name (submit to API, etc)
    // For now just close dialog and reset, since onCreate prop is not passed
    setOpen(false);
    setName('');
  }

  function handleCancel() {
    setOpen(false);
    setName('');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleCreate}>
        {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create new script</DialogTitle>
            <DialogDescription>
              Create a new script to start automating or documenting processes within your projects.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="script-name">Name</Label>
              <Input
                id="script-name"
                name="name"
                placeholder="Script name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!name.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
