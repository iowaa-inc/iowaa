'use client';

import { useState } from 'react';

import { Info, RotateCcw } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useProductAttributeProperty } from '../hooks/use-product-attribute-property';
import { ProductAttributeDraft, ProductAttributeProperty } from '../types';

const TYPE_OPTIONS = [
  { value: 'none', label: 'Type' },
  { value: 'Text', label: 'Text' },
  { value: 'Number', label: 'Number' },
  { value: 'Boolean', label: 'Boolean' },
];

function getInitialRow(): ProductAttributeDraft {
  return { id: crypto.randomUUID(), type: '', property: '', value: '' };
}

interface AttributesCreatorProps {
  onClose: () => void;
  productId: string;
}

export function AttributesCreator({ onClose, productId }: AttributesCreatorProps) {
  const [rows, setRows] = useState<ProductAttributeDraft[]>([getInitialRow()]);

  // Track selected property per row to avoid duplicate property assignment
  const [proposable, setProposable] = useState<{ rowId: string; propertyId: string }[]>([]);

  const attributeProperties = useProductAttributeProperty().get(
    'entityId',
    productId,
  ) as ProductAttributeProperty[];

  // Quick-access: map from name (lowercase) to property object for easy lookup
  const propertyNameLookup = Object.fromEntries(
    attributeProperties.map((prop) => [prop.name.toLowerCase(), prop]),
  );

  function updateRowById(rowId: string, field: keyof ProductAttributeDraft, value: string) {
    setRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)));

    // update proposable state if the property changes
    if (field === 'property') {
      setProposable((prev) => {
        // Remove any old assignment for this row
        const filtered = prev.filter((p) => p.rowId !== rowId);

        // Find the property by name to get its id
        const prop = attributeProperties.find(
          (p) => p.name.toLowerCase() === value.trim().toLowerCase(),
        );
        if (prop && value.trim() !== '') {
          return [...filtered, { rowId, propertyId: prop.id }];
        } else {
          // If the new property isn't a known property, just remove from proposable
          return filtered;
        }
      });
    }
  }

  // For the property Combobox: handles both selection and typing to create new
  function handlePropertyChange(rowId: string, input: string) {
    const lookup = propertyNameLookup[input.trim().toLowerCase()];
    if (lookup) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, property: lookup.name, type: lookup.type } : row,
        ),
      );
      setProposable((prev) => {
        // Remove any old assignment for this row
        const filtered = prev.filter((p) => p.rowId !== rowId);
        if (lookup.name.trim() !== '') {
          return [...filtered, { rowId, propertyId: lookup.id }];
        } else {
          return filtered;
        }
      });
    } else {
      setRows((prev) =>
        prev.map((row) => (row.id === rowId ? { ...row, property: input, type: '' } : row)),
      );
      setProposable((prev) => prev.filter((p) => p.rowId !== rowId));
    }
  }

  const addRow = () => {
    const newRow = getInitialRow();
    setRows((prev) => [newRow, ...prev]);
    // No proposable update needed, since the new row is blank
  };

  function resetRow(rowId: string) {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, property: '', type: '' } : row)),
    );
    setProposable((prev) => prev.filter((p) => p.rowId !== rowId));
  }

  const publish = () => {
    console.log(rows, proposable);
    const publishable = rows.filter(
      (row) => row.property.trim() !== '' && row.type.trim() !== '' && row.value.trim() !== '',
    );

    if (publishable.length === 0) return;

    // Submit/dispatch logic here

    // onClose();
  };

  return (
    <div className="border-border space-y-3 rounded-lg border p-4">
      <Alert variant="info">
        <Info />
        <AlertTitle>Select or propose attributes</AlertTitle>
        <AlertDescription>
          You can select an existing product attribute or type to add a new property.
        </AlertDescription>
      </Alert>
      <Button variant="outline" size="sm" onClick={addRow} className="h-9 w-full">
        Add more
      </Button>
      <ScrollArea className="h-1000 max-h-[360px] space-y-2">
        <Accordion type="multiple" className="space-y-2">
          {rows.map((row, idx) => {
            // If property is chosen from existing attributeProperties, its type is locked
            const matchedProp = attributeProperties.find(
              (p) => p.name.toLowerCase() === row.property.trim().toLowerCase(),
            );
            const propLocked = Boolean(matchedProp);

            const title =
              row.property.trim() !== '' ? row.property : `Attribute ${rows.length - idx}`;
            const showChangeBadge = !!matchedProp;

            const contentHeight = showChangeBadge
              ? 'h-[180px] sm:h-[100px]'
              : 'h-[130px] sm:h-[50px]';

            return (
              <AccordionItem value={row.id} key={row.id}>
                <AccordionTrigger className="flex items-center gap-2 py-3">
                  <span className="text-muted-foreground text-sm font-medium capitalize">
                    {title}
                  </span>
                  {showChangeBadge && (
                    <Badge variant="secondary" className="p-3">
                      Propose Change
                    </Badge>
                  )}
                </AccordionTrigger>
                <AccordionContent className={contentHeight}>
                  {showChangeBadge && (
                    <div className="mb-2">
                      <div className="bg-muted text-muted-foreground flex items-center rounded-lg px-3 py-2 text-sm">
                        <Info className="mr-2 h-4 w-4 text-blue-500" />
                        You are proposing a change to the{' '}
                        <span className="text-foreground mx-1 font-medium">
                          {row.property || 'Attribute'}
                        </span>{' '}
                        Attribute
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[auto_1fr_1fr_auto] sm:items-center">
                    {/* Type field - disabled if property is selected from existing */}
                    <div>
                      <Select
                        value={row.type ? row.type : 'none'}
                        onValueChange={(val) =>
                          updateRowById(row.id, 'type', val === 'none' ? '' : val)
                        }
                        disabled={propLocked}
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {TYPE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Combo input for Property field */}
                    <div className="relative flex items-center">
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="w-full">
                            <Input
                              placeholder="Property"
                              className="h-9 w-full pr-8"
                              value={row.property}
                              onChange={(e) => handlePropertyChange(row.id, e.target.value)}
                              autoComplete="off"
                            />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search or add property…"
                              value={row.property}
                              onValueChange={(val) => handlePropertyChange(row.id, val)}
                              className="h-9"
                            />
                            <CommandList className="mt-2">
                              {/* Only show existing ones not currently selected in other rows */}
                              {attributeProperties
                                .filter(
                                  (prop) =>
                                    prop.name !== '' &&
                                    prop.name.toLowerCase() !== row.property.trim().toLowerCase() &&
                                    !rows
                                      .filter((r) => r.id !== row.id)
                                      .some(
                                        (r) =>
                                          r.property.trim().toLowerCase() ===
                                          prop.name.toLowerCase(),
                                      ),
                                )
                                .map((prop) => (
                                  <CommandItem
                                    key={prop.id}
                                    value={prop.name}
                                    onSelect={() => {
                                      updateRowById(row.id, 'property', prop.name);
                                      updateRowById(row.id, 'type', prop.type);
                                      setProposable((prev) => {
                                        const filtered = prev.filter((p) => p.rowId !== row.id);
                                        return [
                                          ...filtered,
                                          {
                                            rowId: row.id,
                                            propertyId: prop.id,
                                          },
                                        ];
                                      });
                                    }}
                                    className="cursor-pointer"
                                  >
                                    {prop.name}
                                  </CommandItem>
                                ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {row.property && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => resetRow(row.id)}
                          className="absolute right-1 h-7 w-7"
                          tabIndex={-1}
                          type="button"
                          title="Reset property"
                        >
                          <span aria-label="Reset" className="sr-only">
                            Reset
                          </span>
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Value field always editable */}
                    <div>
                      <Input
                        placeholder="Value"
                        value={row.value}
                        onChange={(e) => updateRowById(row.id, 'value', e.target.value)}
                        className="h-9 w-full"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
      <div className="border-border border-t pt-3">
        <div className="flex items-stretch justify-end gap-2 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 w-full flex-1 sm:w-fit"
          >
            Cancel
          </Button>
          <Button size="sm" onClick={publish} className="h-9 w-full flex-1 sm:w-fit">
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
