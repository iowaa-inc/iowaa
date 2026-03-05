import Image from 'next/image';

import type {
  ProductAttribute,
  ProductAttributeProperty,
  ProductEntity,
} from '@/features/inventory/types';
import { AlertCircle, Info } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useProductAttribute } from '../../hooks/use-product-attribute';
import { useProductAttributeProperty } from '../../hooks/use-product-attribute-property';
import { AttributeConcensus } from '../attribute-concensus';
import { AttributeProposal } from '../attribute-proposal';

export function ProductEntityDetail({ entity }: { entity: ProductEntity }) {
  const { get: getAttributes } = useProductAttribute();
  const { get: getProperties } = useProductAttributeProperty();

  const allAttributes = (getAttributes() as ProductAttribute[]) || [];

  const entityAttributes = allAttributes.filter((attr) => attr.entityId === entity.id);

  const propArray = getProperties();
  const propertyById = Object.fromEntries(
    Array.isArray(propArray)
      ? propArray.map((prop: ProductAttributeProperty) => [prop.id, prop])
      : [],
  );

  return (
    <div className="grid gap-8">
      {/* Product Image Carousel */}
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <Carousel className="w-full">
            <CarouselContent>
              {entity.images?.slice(0, 4).map((img: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="bg-secondary relative aspect-square min-h-0 min-w-0 overflow-hidden rounded-xl">
                    <Image
                      src={img || '/placeholder.svg'}
                      alt={`${entity.name} - Image ${index + 1}`}
                      fill
                      style={{ objectPosition: 'top' }}
                      className="object-cover"
                      sizes="(min-width: 768px) 384px, 100vw"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {entity.images && entity.images.length > 1 && (
              <>
                <CarouselPrevious className="left-2 shadow-lg" />
                <CarouselNext className="right-2 shadow-lg" />
              </>
            )}
          </Carousel>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-foreground mb-2 text-2xl font-semibold">{entity.name}</h4>
          <div className="flex items-center gap-1.5">
            {/* <p className="text-sm text-muted-foreground">Type</p> */}
            <Badge variant="outline" className="px-4 py-4">
              {entity.type}
            </Badge>
          </div>

          {/* {entity.creator && (
                            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                                <span className="font-medium">Creator:</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="size-4 rounded-full bg-muted overflow-hidden flex-shrink-0">
                                        <img
                                            src={selectedProduct.creator.logo || "/placeholder.svg"}
                                            alt={selectedProduct.creator.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none"
                                            }}
                                        />
                                    </div>
                                    <span className="text-foreground">{selectedProduct.creator.name}</span>
                                </div>
                            </div>
                        )} */}
        </div>

        <div className="space-y-3">
          <h2 className="text-foreground text-lg font-semibold tracking-normal">
            Product Overview
          </h2>
          <span
            dangerouslySetInnerHTML={{ __html: entity.description }}
            className="text-muted-foreground mt-1 block text-base"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-foreground text-lg font-semibold tracking-normal">Specification</h5>

            <div className="flex gap-2">
              <AttributeConcensus entityId={entity.id}>
                <Button variant="outline" size="sm">
                  <AlertCircle className="mr-1.5 h-3.5 w-3.5 text-amber-600" />
                  Support Changes
                </Button>
              </AttributeConcensus>
              <AttributeProposal entityId={entity.id}>
                <Button size="sm">Add Attribute</Button>
              </AttributeProposal>
            </div>
          </div>

          <Alert variant="default">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Each proposed attribute can be contested within 4 days. If no contest occurs within
              that time, it will automatically migrate to the master entity attributes.
            </AlertDescription>
          </Alert>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute Name</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entityAttributes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <span className="text-muted-foreground text-sm italic">
                      No attributes for this product entity yet.
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                entityAttributes.map((attr) => {
                  const prop = propertyById[attr.propertyId] || {};
                  return (
                    <TableRow key={attr.id}>
                      <TableCell className="capitalize">{prop.name || 'N/A'}</TableCell>
                      <TableCell>
                        {typeof attr.value === 'boolean'
                          ? attr.value
                            ? 'Yes'
                            : 'No'
                          : attr.value || '—'}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
