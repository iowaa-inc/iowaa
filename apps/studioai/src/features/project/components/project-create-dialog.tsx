'use client';

import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { useUserId } from '@/features/auth/hooks/use-user-id';
import { createProject } from '@/features/project/actions/create';
import { zodResolver } from '@hookform/resolvers/zod';
import { mutate } from 'swr';
import { z } from 'zod';

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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@repo/ui-core/components/field';
import { Input } from '@repo/ui-core/components/input';
import { Textarea } from '@repo/ui-core/components/textarea';

// Use "as const" with schema for better compatibility
const projectCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(64, 'Project name must be at most 64 characters')
    .trim(),
  description: z.string().max(256, 'Description must be at most 256 characters').trim().optional(),
});

type ProjectCreateFormValues = z.infer<typeof projectCreateSchema>;

interface ProjectCreateDialogProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

export function ProjectCreateDialog({ children, isOpen, onClose }: ProjectCreateDialogProps) {
  const router = useRouter();
  const uid = useUserId();
  const form = useForm<ProjectCreateFormValues>({
    resolver: zodResolver(projectCreateSchema as any),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function handleSubmit(data: ProjectCreateFormValues) {
    const result = await createProject({
      name: data.name,
      description: data.description || undefined,
    });

    if (result.success) {
      form.reset();
      onClose();
      if (uid.data) {
        await mutate(['projects', uid.data]);
        await mutate(['active_project', uid.data]);
      }
      router.replace(`/workspace/${result.project.id}`);
    } else {
      form.setError('root', { message: result.error });
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          onClose();
        }
      }}
    >
      {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}

      <DialogContent className="sm:max-w-sm">
        <form
          id="project-create-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>
              Create a new project to start adding and working on scripts.
            </DialogDescription>
            {form.formState.errors.root && (
              <FieldError className="mt-2" errors={[form.formState.errors.root]} />
            )}
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="project-create-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="project-create-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="My project"
                    autoComplete="off"
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="project-create-description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="project-create-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Optional description"
                    rows={3}
                    disabled={isSubmitting}
                  />
                  <FieldDescription>
                    Optional. Add a short description for this project.
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="project-create-form" disabled={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
