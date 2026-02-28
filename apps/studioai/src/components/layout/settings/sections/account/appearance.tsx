'use client';

import { useTheme } from 'next-themes';

import { Field, FieldGroup, FieldLabel, FieldSet } from '@repo/ui-core/components/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui-core/components/select';

export function AppearanceSection() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex max-w-3xl flex-col gap-3">
      <h2 className="text-lg font-semibold">Appearance Settings</h2>
      <p className="text-muted-foreground text-sm">Set your theme and style preferences.</p>
      <FieldSet>
        <FieldGroup>
          <Field className="items-center justify-between gap-4" orientation="horizontal">
            <FieldLabel className="max-w-[130px] min-w-[130px] text-right text-sm whitespace-nowrap">
              Theme
            </FieldLabel>
            <Select
              value={theme === 'system' ? 'system' : resolvedTheme || 'system'}
              onValueChange={(value) => setTheme(value)}
            >
              <SelectTrigger className="w-[260px]">
                <SelectValue placeholder="Select theme..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
