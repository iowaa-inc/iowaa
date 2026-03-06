'use client';

import { ReactNode, useState } from 'react';
import { mutate } from 'swr';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createScript } from '@/features/script/actions/create';
import { useActiveProject } from '@/features/project/hooks/use-active-project';
import { useUserId } from '@/features/auth/hooks/use-user-id';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { activeProjectId } = useActiveProject();
  const uid = useUserId();
  const router = useRouter();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !activeProjectId) return;

    setIsSubmitting(true);
    const result = await createScript({
      name: name,
      projectId: activeProjectId,
    });
    
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.error || 'Failed to create script');
      return;
    }

    toast.success('Script created');
    
    if (uid.data) {
      mutate(
        (key) => Array.isArray(key) && key[0] === 'scripts' && key[1] === uid.data && key[2] === activeProjectId,
        undefined,
        { revalidate: true }
      );
    }
    
    setOpen(false);
    setName('');

    router.push(`/workspace/${activeProjectId}/${result.script.id}`);
  }

  function handleCancel() {
    setOpen(false);
    setName('');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleCreate}>
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
            <Button type="submit" disabled={!name.trim() || isSubmitting || !activeProjectId}>
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
