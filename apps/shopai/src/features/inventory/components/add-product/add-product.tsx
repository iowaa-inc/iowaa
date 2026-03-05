'use client';

import { useMemo, useState } from 'react';

import type { ProductEntity } from '@/features/inventory/types';
import { Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { defineStepper } from '@/components/ui/stepper';

import { cn } from '@/lib/utils';

import { useProductEntity } from '../../hooks/use-product-entity';
import { EntityPreviewCard } from '../entity-preview-card';
import { CategorySelection } from './category-selection';
import { ConfigureProductOffer } from './configure-product-offer';
import { EmptySearch } from './empty-search';
import { EntityCard } from './entity-card';
import { ListingQualityIndicator } from './listing-quality-indicator';
import { NewEntityForm } from './new-entity-form';
import { ProductEntityDetail } from './product-entity-detail';
import { ReviewListing } from './review-listing';

const { Stepper: ExistingListingStepper } = defineStepper(
  {
    id: 'entity',
    title: 'Product Details',
    description: 'Review and confirm the selected product before listing.',
  },
  {
    id: 'configure',
    title: 'Configure Listing',
    description: 'Set important details and finalize your offer.',
  },
  {
    id: 'review',
    title: 'Review & Publish',
    description: 'Verify your listing and accept terms to publish.',
  },
);

const { Stepper: NewListingStepper } = defineStepper(
  {
    id: 'match',
    title: 'We think this might be it',
    description: 'Select the category that best matches your product',
  },
  {
    id: 'new-product',
    title: 'Create New Product',
    description: 'Add product details to create a new product entity in the master catalog',
  },
  {
    id: 'configure-offer',
    title: 'Configure Your Offer',
    description: 'Add your listing details to complete the offer',
  },
  {
    id: 'review-publish',
    title: 'Review & Publish',
    description: 'Verify your listing and accept terms to publish.',
  },
);

function filterProducts(products: ProductEntity[] = [], query: string): ProductEntity[] {
  if (!query.trim()) return [];
  const lowered = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowered) ||
      (p.brand?.toLowerCase?.().includes(lowered) ?? false),
  );
}

export function AddProduct({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [flowAction, setFlowAction] = useState<{
    scope: 'new' | 'existing' | null;
    payload: Record<'peId', string> | null;
  }>({
    scope: null,
    payload: null,
  });

  const { get } = useProductEntity();
  const allProducts = get() as ProductEntity[];

  const [peId, setPeId] = useQueryState('peId', parseAsString.withDefault(''));
  const entity = peId ? (get(peId) as ProductEntity | undefined) : undefined;

  const matchedProducts = useMemo(() => filterProducts(allProducts, query), [allProducts, query]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={true}
        className="inset-0! h-full! w-full! max-w-full! rounded-none!"
      >
        <SheetTitle className="sr-only">Find a Product to Add</SheetTitle>

        {flowAction.scope === null && (
          <div className="mx-auto h-full w-full max-w-4xl px-6 py-8">
            <div className="space-y-2 text-center">
              <SheetTitle className="text-xl sm:text-2xl">Find a Product to Add</SheetTitle>
              <SheetDescription className="text-base">
                Enter product name to search our master catalog
              </SheetDescription>
            </div>
            <section className="h-full py-10">
              <div className="relative mx-auto w-full max-w-lg">
                <Search
                  className="text-muted-foreground absolute top-4 left-4 h-5 w-5"
                  aria-hidden="true"
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='e.g., "Dyson V15 Detect" or "iPhone 14 Pro"'
                  className="h-12 w-full rounded-xl border-0 border-none bg-neutral-100 pl-12 text-base dark:bg-neutral-800"
                  autoFocus
                  type="search"
                  aria-label="Search for a product"
                />
              </div>
              {!!query.trim() && (
                <div className="mx-auto mt-8 w-full max-w-lg">
                  {matchedProducts.length > 0 ? (
                    <ScrollArea
                      className={cn(
                        'bg-background max-h-[min(60vh,520px)] rounded-xl border',
                        matchedProducts.length <= 3 ? 'h-fit' : 'h-1000',
                      )}
                    >
                      <ul className="divide-y">
                        {matchedProducts.map((product) => (
                          <EntityCard
                            key={product.id}
                            product={product}
                            onSelect={(pe) => {
                              setPeId(pe.id);
                              setFlowAction({
                                scope: 'existing',
                                payload: {
                                  peId: pe.id,
                                },
                              });
                            }}
                          />
                        ))}
                      </ul>
                    </ScrollArea>
                  ) : (
                    <EmptySearch
                      query={query}
                      onCreate={() =>
                        setFlowAction({
                          scope: 'new',
                          payload: null,
                        })
                      }
                    />
                  )}
                </div>
              )}
            </section>
          </div>
        )}

        {flowAction.scope === 'new' && (
          <NewListingStepper.Provider>
            {({ methods }) => (
              <div className="fixed inset-0 flex h-full min-h-0 w-full flex-col">
                <div className="border-border flex shrink-0 items-center justify-between border-b px-6 py-4">
                  <ListingQualityIndicator value={32} />
                </div>

                <ScrollArea className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col gap-4 px-6 py-10">
                  <div className="mb-8 px-1">
                    <h2 className="text-foreground mb-2 text-2xl font-semibold">
                      {methods.current.title}
                    </h2>
                    <p className="text-muted-foreground text-base">{methods.current.description}</p>
                  </div>

                  {methods.switch({
                    match: () => (
                      <>
                        <CategorySelection />
                      </>
                    ),
                    'new-product': () => (
                      <>
                        <NewEntityForm />
                      </>
                    ),
                    'configure-offer': () => (
                      <>
                        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
                          <EntityPreviewCard />
                          <ConfigureProductOffer />
                        </div>
                      </>
                    ),
                    'review-publish': () => (
                      <>
                        <ReviewListing />
                      </>
                    ),
                  })}
                </ScrollArea>

                <div className="bg-card shrink-0 px-6 py-4">
                  <div className="mx-auto flex max-w-2xl gap-3">
                    <Button variant="secondary" onClick={() => methods.prev()} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => methods.next()} className="flex-1">
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </NewListingStepper.Provider>
        )}

        {flowAction.scope === 'existing' && Boolean(peId) && entity && (
          <ExistingListingStepper.Provider>
            {({ methods }) => (
              <div className="fixed inset-0 flex h-full min-h-0 w-full flex-col">
                <div className="border-border flex shrink-0 items-center justify-between border-b px-6 py-4">
                  <ListingQualityIndicator value={32} />
                </div>

                <ScrollArea className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col gap-4 px-6 py-10">
                  <div className="mb-8 px-1">
                    <h2 className="text-foreground mb-2 text-2xl font-semibold">
                      {methods.current.title}
                    </h2>
                    <p className="text-muted-foreground text-base">{methods.current.description}</p>
                  </div>

                  {methods.switch({
                    entity: () => (
                      <>
                        <ProductEntityDetail entity={entity} />
                      </>
                    ),
                    configure: () => (
                      <>
                        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
                          <EntityPreviewCard />
                          <ConfigureProductOffer />
                        </div>
                      </>
                    ),
                    review: () => (
                      <>
                        <ReviewListing />
                      </>
                    ),
                  })}
                </ScrollArea>

                <div className="bg-card shrink-0 px-6 py-4">
                  <div className="mx-auto flex max-w-2xl gap-3">
                    <Button variant="secondary" onClick={() => methods.prev()} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => methods.next()} className="flex-1">
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </ExistingListingStepper.Provider>
        )}
      </SheetContent>
    </Sheet>
  );
}
