'use client';
import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

// Data structures for select fields
const CONDITION_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'salvage', label: 'Salvage' },
];

// In the future, for localization or extensibility, use id as value.
const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

const OFFER_QUERY_STATE = {
  offer_condition: parseAsString.withDefault(''),
  offer_defect: parseAsString.withDefault(''),
  offer_warranty: parseAsString.withDefault(''),
  offer_currency: parseAsString.withDefault(CURRENCY_OPTIONS[0].value),
  offer_price: parseAsString.withDefault(''),
  offer_location: parseAsString.withDefault(''),
  offer_availability: parseAsBoolean.withDefault(true),
  offer_marketing: parseAsString.withDefault(''),
};

export function ConfigureProductOffer() {
  // Use useQueryStates from nuqs for all offer fields, stored in URL
  const [
    {
      offer_condition,
      offer_defect,
      offer_warranty,
      offer_currency,
      offer_price,
      offer_location,
      offer_availability,
      offer_marketing,
    },
    setOffer,
  ] = useQueryStates(OFFER_QUERY_STATE);

  // Replace this with actual save logic
  //   function handleSave() {
  //     alert(
  //       `Saved!\nCondition: ${offer_condition}\nDefects: ${offer_defect}\nWarranty: ${offer_warranty}\nCurrency: ${offer_currency}\nPrice: ${offer_price}\nLocation: ${offer_location}\nAvailability: ${offer_availability}\nMarketing Description: ${offer_marketing}`
  //     );
  //   }

  return (
    <div className="space-y-6">
      <div className="border-border rounded-lg border p-6">
        <div className="mb-6 flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-500" />
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Your Listing Details
          </p>
        </div>
        <div className="space-y-6">
          {/* Condition Selection */}
          <div className="space-y-2">
            <Label htmlFor="condition" className="text-sm font-medium">
              Item Condition <span className="text-red-500">*</span>
            </Label>
            <Select
              value={offer_condition}
              onValueChange={(value) => setOffer((s) => ({ ...s, offer_condition: value }))}
            >
              <SelectTrigger id="condition" className="h-10">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {CONDITION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Fields for Non-New Conditions */}
          {offer_condition && offer_condition !== 'new' && (
            <div className="border-border bg-card space-y-4 rounded-lg border p-4">
              <div className="space-y-2">
                <Label htmlFor="defects" className="text-foreground text-sm font-medium">
                  Defect Declaration <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="defects"
                  value={offer_defect}
                  onChange={(e) =>
                    setOffer((s) => ({
                      ...s,
                      offer_defect: e.target.value,
                    }))
                  }
                  placeholder="Describe any defects, scratches, or issues..."
                  className="bg-muted border-border text-foreground min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warranty" className="text-foreground text-sm font-medium">
                  Warranty Period
                </Label>
                <Input
                  id="warranty"
                  type="text"
                  value={offer_warranty}
                  onChange={(e) =>
                    setOffer((s) => ({
                      ...s,
                      offer_warranty: e.target.value,
                    }))
                  }
                  placeholder="e.g., 30 days, 90 days, No warranty"
                  className="bg-muted border-border text-foreground h-10"
                />
              </div>
            </div>
          )}

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Unit Price <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Select
                value={offer_currency}
                onValueChange={(value) => setOffer((s) => ({ ...s, offer_currency: value }))}
              >
                <SelectTrigger className="h-10 w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="price"
                type="number"
                value={offer_price}
                onChange={(e) =>
                  setOffer((s) => ({
                    ...s,
                    offer_price: e.target.value,
                  }))
                }
                placeholder="0.00"
                className="h-10 flex-1"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Location (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location (Optional)
            </Label>
            <Input
              id="location"
              type="text"
              value={offer_location}
              onChange={(e) =>
                setOffer((s) => ({
                  ...s,
                  offer_location: e.target.value,
                }))
              }
              placeholder="e.g., Warehouse A, Shelf 12"
              className="h-10"
            />
          </div>

          {/* Availability Toggle */}
          <div className="space-y-2">
            <Label
              className="text-foreground text-sm font-medium"
              htmlFor="offer-availability-switch"
            >
              Availability
            </Label>
            <div className="border-border flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-foreground text-sm font-medium">
                  {offer_availability ? 'In Stock' : 'Out of Stock'}
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {offer_availability
                    ? 'Item is visible to buyers in search results'
                    : 'Item is hidden from search results'}
                </p>
              </div>
              <Switch
                id="offer-availability-switch"
                checked={offer_availability}
                onCheckedChange={(checked) =>
                  setOffer((s) => ({
                    ...s,
                    offer_availability: checked,
                  }))
                }
              />
            </div>
          </div>

          {/* Marketing Description */}
          <div className="space-y-2">
            <Label
              className="text-foreground text-sm font-medium"
              htmlFor="offer-marketing-description"
            >
              Marketing Description
            </Label>
            <p className="text-muted-foreground text-xs">
              Add your own description to highlight unique selling points
            </p>
            <Textarea
              id="offer-marketing-description"
              value={offer_marketing}
              onChange={(e) =>
                setOffer((s) => ({
                  ...s,
                  offer_marketing: e.target.value,
                }))
              }
              placeholder="Describe what makes your listing special..."
              className="min-h-[120px] resize-none"
            />
            <p className="text-muted-foreground text-right text-xs">
              {offer_marketing.length} characters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
