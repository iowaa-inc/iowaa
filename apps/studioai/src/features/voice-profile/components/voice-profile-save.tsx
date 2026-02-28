import * as React from 'react';

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
import { Field, FieldContent, FieldLabel } from '@repo/ui-core/components/field';
import { Input } from '@repo/ui-core/components/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@repo/ui-core/components/select';

type VoiceProfileSaveLocation = 'script' | 'projects' | 'community';

type VoiceProfileSaveProps = {
  children: React.ReactNode;
  onSave?: (name: string, location: VoiceProfileSaveLocation) => void;
};

const saveLocations: {
  value: VoiceProfileSaveLocation;
  label: string;
  description: string;
}[] = [
  {
    value: 'script',
    label: 'Script',
    description: 'Save to this script only. Not visible elsewhere.',
  },
  {
    value: 'projects',
    label: 'Workspace',
    description: 'Share and reuse in your projects.',
  },
  {
    value: 'community',
    label: 'Community',
    description: 'Make it public for all users.',
  },
];

export function VoiceProfileSave({ children, onSave }: VoiceProfileSaveProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState<VoiceProfileSaveLocation>('script');

  const handleSave = () => {
    if (onSave) {
      onSave(name, location);
    }
    setOpen(false);
    setName('');
    setLocation('script');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Voice Profile</DialogTitle>
          <DialogDescription>
            Give your voice profile a memorable name and choose where to save it for later use.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-3"
        >
          <Field>
            <FieldLabel htmlFor="voice-profile-name">Name</FieldLabel>
            <FieldContent>
              <Input
                id="voice-profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter profile name"
                autoFocus
                required
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel id="voice-profile-save-location-label">Save location</FieldLabel>
            <FieldContent>
              <Select
                value={location}
                onValueChange={(val) => setLocation(val as VoiceProfileSaveLocation)}
              >
                <SelectTrigger
                  aria-labelledby="voice-profile-save-location-label"
                  className="w-full"
                >
                  <SelectValue>
                    {saveLocations.find((loc) => loc.value === location)?.label}
                    <span className="text-muted-foreground ml-3 max-w-[210px] truncate">
                      {saveLocations.find((loc) => loc.value === location)?.description}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Save to...</SelectLabel>
                    {saveLocations.map((option) => (
                      <SelectItem value={option.value} key={option.value}>
                        <div className="flex flex-col px-1.5 py-1">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-muted-foreground text-xs">
                            {option.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!name.trim()}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
