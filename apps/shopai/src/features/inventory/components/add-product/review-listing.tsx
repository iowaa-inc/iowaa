import Image from 'next/image';

import { useProductEntity } from '@/features/inventory/hooks/use-product-entity';
import type { ProductEntity } from '@/features/inventory/types';
import { parseAsBoolean, parseAsString, useQueryState, useQueryStates } from 'nuqs';

import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

type CustomAttribute = {
  name: string;
  value: string;
  unit?: string;
};

const OFFER_QUERY_STATE = {
  offer_condition: parseAsString.withDefault(''),
  offer_defect: parseAsString.withDefault(''),
  offer_warranty: parseAsString.withDefault(''),
  offer_currency: parseAsString.withDefault('USD'),
  offer_price: parseAsString.withDefault(''),
  offer_location: parseAsString.withDefault(''),
  offer_availability: parseAsBoolean.withDefault(true),
  offer_marketing: parseAsString.withDefault(''),
  offer_verify_spec: parseAsBoolean.withDefault(false),
  offer_accept_legal: parseAsBoolean.withDefault(false),
  offer_certify_iata: parseAsBoolean.withDefault(false),
  offer_stock: parseAsString.withDefault(''),
  selectedProduct: parseAsString.withDefault(''),
  customAttributes: parseAsString.withDefault(''),
  isHighRiskProduct: parseAsBoolean.withDefault(false),
};

function safeJsonParse<T>(v: string | undefined): T | null {
  try {
    if (!v) return null;
    return JSON.parse(v);
  } catch {
    return null;
  }
}

function getProductCoverImage(images?: string[]): string | null {
  if (Array.isArray(images) && images.length > 0) {
    return images[0] || null;
  }
  return null;
}

function getProductCategory(entity?: ProductEntity) {
  return entity?.type || 'Unknown';
}

export function ReviewListing() {
  const [peId] = useQueryState('peId', parseAsString);
  const entityId = peId || '';

  const [
    {
      offer_condition,
      offer_price,
      offer_currency,
      offer_stock,
      offer_verify_spec,
      offer_accept_legal,
      offer_certify_iata,
      customAttributes: customAttributesRaw,
      isHighRiskProduct,
    },
    setOffer,
  ] = useQueryStates(OFFER_QUERY_STATE);

  // Fetch ProductEntity using the provided entityId prop
  const { get } = useProductEntity();
  const selectedProduct = (get(entityId) as ProductEntity | undefined) || {
    id: 'unknown',
    name: 'Unknown Product',
    brand: '',
    type: '',
    images: [],
    createdOn: '',
    updatedOn: '',
    description: '',
    createdById: '',
  };

  const customAttributes: CustomAttribute[] =
    safeJsonParse<CustomAttribute[]>(customAttributesRaw) || [];

  const handleSpec = (checked: boolean) => setOffer((s) => ({ ...s, offer_verify_spec: checked }));
  const handleLegal = (checked: boolean) =>
    setOffer((s) => ({ ...s, offer_accept_legal: checked }));
  const handleIATA = (checked: boolean) => setOffer((s) => ({ ...s, offer_certify_iata: checked }));

  const productImage = getProductCoverImage(selectedProduct.images) || '/placeholder.svg';
  const productCategory = getProductCategory(selectedProduct);

  return (
    <div className="space-y-3 pb-32">
      <div className="bg-card text-card-foreground space-y-6 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          {/* IMAGE COLUMN */}
          <div className="bg-secondary relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-28 sm:w-28">
            <Image
              src={productImage}
              alt={selectedProduct.name}
              fill
              className="object-cover"
              sizes="112px"
              priority
            />
          </div>

          {/* MAIN INFO COLUMN */}
          <div className="max-w-full flex-1">
            <div className="mb-4 grid grid-cols-2 gap-1">
              <div className="col-span-2 flex items-center gap-2">
                <h4 className="text-foreground text-lg font-semibold wrap-break-word">
                  {selectedProduct.name}
                </h4>
                <Badge variant="secondary">{productCategory}</Badge>
              </div>
              <span className="text-muted-foreground col-span-2 text-base break-all">
                {selectedProduct.brand}
              </span>
            </div>
            <div className="grid max-w-[420px] grid-cols-2 gap-4 text-sm sm:grid-cols-3 [&>div]:space-y-1">
              <div>
                <div className="text-muted-foreground">Condition</div>
                <div className="font-medium capitalize">{offer_condition || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Price</div>
                <div className="font-medium">
                  {offer_currency ? `${offer_currency} ` : ''}
                  {offer_price || '-'}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Stock</div>
                <div className="font-medium">{offer_stock || '-'} units</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Specifications */}
        {customAttributes.length > 0 && (
          <div className="border-border border-t pt-4">
            <h5 className="text-muted-foreground mb-3 text-[15px] font-medium">
              Additional Specifications
            </h5>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[max-content_1fr]">
              {customAttributes.map((attr, idx) => (
                <span key={idx} className="contents">
                  <div className="text-muted-foreground text-sm">{attr.name}:</div>
                  <div className="text-sm font-medium">
                    {attr.value}
                    {attr.unit ? ` ${attr.unit}` : ''}
                  </div>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-border space-y-6 rounded-lg border p-6">
        <div>
          <h4 className="text-foreground mb-2 text-lg font-semibold">Legal Verification</h4>
          <p className="text-muted-foreground text-sm">
            Please review and accept the following terms to publish your listing
          </p>
        </div>
        {/* Grouped callouts for consent */}
        <div className="space-y-2">
          <div className="border-border flex items-start gap-4 rounded-lg border p-4">
            <Switch id="verify-specs" checked={offer_verify_spec} onCheckedChange={handleSpec} />
            <label htmlFor="verify-specs" className="flex-1 cursor-pointer">
              <p className="text-foreground text-sm font-medium">
                I verify these technical specs match my physical inventory
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                You confirm that all product specifications accurately represent the items you have
                in stock
              </p>
            </label>
          </div>
          <div className="border-border flex items-start gap-4 rounded-lg border p-4">
            <Switch id="accept-legal" checked={offer_accept_legal} onCheckedChange={handleLegal} />
            <label htmlFor="accept-legal" className="flex-1 cursor-pointer">
              <p className="text-foreground text-sm font-medium">
                I accept legal responsibility for this listing
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                You take full responsibility for the accuracy of this listing and any claims made
              </p>
            </label>
          </div>
          {isHighRiskProduct && (
            <div className="flex items-start gap-4 rounded-lg border border-amber-500 bg-amber-50 p-4">
              <Switch id="certify-iata" checked={offer_certify_iata} onCheckedChange={handleIATA} />
              <label htmlFor="certify-iata" className="flex-1 cursor-pointer">
                <div className="mb-1 flex items-center gap-2">
                  <p className="text-foreground text-sm font-medium">
                    I certify IATA packaging compliance
                  </p>
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs">
                  This product contains batteries or hazardous materials. You certify compliance
                  with International Air Transport Association (IATA) packaging and shipping
                  regulations
                </p>
              </label>
            </div>
          )}
        </div>
        <p className="text-muted-foreground mt-4 text-sm">
          Upon publishing, a snapshot log will be generated. You will receive a Copyright Shield for
          your product description and listing contributions.
        </p>
      </div>
    </div>
  );
}
