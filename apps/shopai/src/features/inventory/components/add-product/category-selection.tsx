import { useState } from 'react';

import { Loader2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CATEGORIES = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'books', name: 'Books' },
];

// Placeholder - in real scenario, associate a confidence value to category.
const CATEGORY_CONFIDENCE = 94;

export function CategorySelection({
  isLoadingCategory = false,
  // onCategoryConfirm,
  // onTryAgain,
}: {
  isLoadingCategory?: boolean;
  onCategoryConfirm?: (category: string, role: string) => void;
  onTryAgain?: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [manufacturerSelection, setManufacturerSelection] = useState<'creator' | 'reseller' | null>(
    null,
  );

  function handleCategorySelect(categoryId: string) {
    setSelectedCategory(categoryId);
  }

  // function handleConfirmCategory() {
  //   if (selectedCategory && manufacturerSelection) {
  //     onCategoryConfirm?.(selectedCategory, manufacturerSelection);
  //   }
  // }

  // function handleTryAgain() {
  //   setSelectedCategory(null);
  //   setManufacturerSelection(null);
  //   onTryAgain?.();
  // }

  return (
    <div className="space-y-8">
      {isLoadingCategory ? (
        <div className="space-4 flex flex-col items-center justify-center py-12">
          <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Analyzing product category...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Manufacturer / Creator Selection */}
          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-medium">
              Are you the manufacturer or creator?
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <RadioGroup
                value={manufacturerSelection ?? ''}
                onValueChange={(value: string) =>
                  setManufacturerSelection(value as 'creator' | 'reseller')
                }
                className="col-span-2 w-full"
              >
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                  <FieldLabel htmlFor="creator" className="w-full">
                    <Field orientation="horizontal" className="w-full">
                      <FieldContent className="p-2">
                        <FieldTitle>Yes, I am the creator</FieldTitle>
                        <FieldDescription>
                          Verify authenticity and unlock creator benefits
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="creator" id="creator" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="reseller" className="w-full">
                    <Field orientation="horizontal" className="w-full">
                      <FieldContent className="p-2">
                        <FieldTitle>No, I&apos;m reselling</FieldTitle>
                        <FieldDescription>
                          I&apos;m selling an existing product from another brand
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="reseller" id="reseller" />
                    </Field>
                  </FieldLabel>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-medium">Select category</h4>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`cursor-pointer rounded-lg border p-3 transition-all ${
                    selectedCategory === category.id
                      ? 'border-primary bg-primary/5 border-2'
                      : 'border-border hover:border-border/70 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-foreground font-medium">{category.name}</p>
                    <Badge variant="secondary" className="p-3">
                      {CATEGORY_CONFIDENCE}% confident
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          {/* <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleTryAgain} className="flex-1 bg-transparent">
              Try Again
            </Button>
            <Button
              onClick={handleConfirmCategory}
              disabled={!selectedCategory || !manufacturerSelection}
              className="flex-1"
            >
              Confirm Category
            </Button>
          </div> */}
        </div>
      )}
    </div>
  );
}
