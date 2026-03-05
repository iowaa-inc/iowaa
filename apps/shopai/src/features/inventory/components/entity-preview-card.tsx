import Image from 'next/image';

import type { ProductEntity } from '@/features/inventory/types';
import { parseAsString, useQueryState } from 'nuqs';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useProductAttribute } from '../hooks/use-product-attribute';
import { useProductAttributeProperty } from '../hooks/use-product-attribute-property';
import { useProductEntity } from '../hooks/use-product-entity';

export function EntityPreviewCard() {
  const [peId] = useQueryState('peId', parseAsString);
  const entityId = peId || '';

  const entity = useProductEntity().get(entityId) as ProductEntity | undefined;

  const attributes = useProductAttribute().get('entityId', entityId);

  const properties = useProductAttributeProperty().get('entityId', entityId);
  const getPropertyNameById = (id: string) => {
    if (Array.isArray(properties)) {
      const property = properties.find((prop) => prop.id === id);
      return property ? property.name : '';
    }
    return '';
  };

  if (!entity) {
    return (
      <div className="border-border bg-muted/30 rounded-lg border p-6 text-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="border-border bg-muted/30 space-y-6 rounded-lg border p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="size-2 rounded-full bg-blue-500" />
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Product Catalog Data
        </p>
      </div>

      <div className="flex justify-center">
        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-2">
          {(entity.images || []).slice(0, 4).map((img, index) => (
            <div
              key={index}
              className="bg-secondary relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img || '/placeholder.svg'}
                alt={`${entity.name} - Image ${index + 1}`}
                fill
                className="object-cover object-top"
                sizes="(min-width: 640px) 192px, 100vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-foreground mb-2 text-xl font-semibold">{entity.name}</h4>
        {entity.brand && <p className="text-muted-foreground mb-2 text-sm">{entity.brand}</p>}
      </div>

      {entity.description && (
        <div className="border-border space-y-2 border-t pt-4">
          <h5 className="text-muted-foreground font-mono text-sm font-medium uppercase">
            Description
          </h5>
          <div className="bg-muted/50 rounded-lg p-4">
            <p
              className="text-foreground text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: entity.description }}
            />
          </div>
        </div>
      )}

      {attributes && Array.isArray(attributes) && attributes.length > 0 && (
        <div className="border-border space-y-3 border-t pt-4">
          <h5 className="text-muted-foreground font-mono text-sm font-medium uppercase">
            Core Attributes
          </h5>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributes.map((attr) => (
                <TableRow key={attr.id}>
                  <TableCell className="text-muted-foreground text-sm">
                    {getPropertyNameById(attr.propertyId)}
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-medium">
                    {attr.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
