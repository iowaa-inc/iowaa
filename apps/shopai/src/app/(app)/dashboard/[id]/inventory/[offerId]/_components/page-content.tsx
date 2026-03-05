'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { AttributeConcensus } from '@/features/inventory/components/attribute-concensus';
import { AttributeProposal } from '@/features/inventory/components/attribute-proposal';
import { useProductAttribute } from '@/features/inventory/hooks/use-product-attribute';
import { useProductAttributeProperty } from '@/features/inventory/hooks/use-product-attribute-property';
import { useProductEntity } from '@/features/inventory/hooks/use-product-entity';
import { useProductOffer } from '@/features/inventory/hooks/use-product-offer';
import type {
  ProductAttribute,
  ProductAttributeProperty,
  ProductEntity,
  ProductOffer,
} from '@/features/inventory/types';
import { AlertCircle, ArrowLeft, Edit, Info, Trash2 } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Indicator } from '@/components/ui/indicator';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { formatCurrency, formatDate } from '@/lib/utils';

export function PageContent() {
  const params = useParams();
  const router = useRouter();
  const offerId = String(params.offerId || '');

  const offer = useProductOffer().get(offerId) as ProductOffer;
  const entity = useProductEntity().get(offer.entityId) as ProductEntity;

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

  const handleDeleteListing = () => {
    console.log('Deleting listing for product:', offerId);
    router.push('/dashboard/inventory');
  };

  return (
    <div className="space-y-6">
      <header
        className="flex w-full items-center justify-between gap-5 border-b py-4 md:flex-row md:gap-6"
        aria-label="Product Details"
      >
        <Button
          asChild
          variant="ghost"
          size="sm"
          aria-label="Back"
          className="flex items-center gap-2"
        >
          <Link href="/dashboard/inventory" className="flex items-center gap-2">
            <ArrowLeft />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
        <nav className="flex shrink-0 gap-2" aria-label="Actions">
          <Button asChild variant="outline">
            <Link href={`/dashboard/inventory/${offerId}/edit`}>
              <Edit />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this listing? This will remove the product from
                  your inventory and hide it from buyers. The product entity will remain in the
                  system. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteListing} variant="destructive">
                  Delete Listing
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </nav>
      </header>

      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/inventory">Inventory</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{entity.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Amazon-style image gallery */}
          {(() => {
            const images =
              Array.isArray(entity.images) && entity.images.length
                ? entity.images
                : ['/placeholder.svg'];
            return (
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="order-2 flex w-full flex-row justify-start gap-2 md:order-0 md:w-16 md:max-w-[64px] md:min-w-[56px] md:flex-col md:gap-3">
                  {images.map((img, idx) => (
                    <div
                      key={img + idx}
                      className="bg-muted border-border flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border md:h-14 md:w-14"
                    >
                      <Image
                        src={img || '/placeholder.svg'}
                        alt={`${entity.name} - preview ${idx + 1}`}
                        width={56}
                        height={56}
                        className="aspect-square h-14 w-14 object-cover"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </div>
                  ))}
                </div>
                {/* Main image */}
                <div className="bg-muted relative flex aspect-square size-80 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg md:size-[400px]">
                  <Image
                    src={images[0] || '/placeholder.svg'}
                    alt={entity.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 18rem"
                    className="object-cover"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                    priority
                  />
                </div>
              </div>
            );
          })()}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground text-sm">
                  Brand: <span className="text-primary">{entity.brand}</span>
                </p>
                <h2 className="text-foreground text-3xl font-medium">{entity.name}</h2>
              </div>
              {/*  {entity.creator && (
                                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                                    <span className="font-medium">Creator:</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-4 rounded-full bg-muted overflow-hidden flex-shrink-0 relative">
                                            <Image
                                                src={entity.creator.logo || "/placeholder.svg"}
                                                alt={entity.creator.name}
                                                fill
                                                sizes="1.5rem"
                                                className="object-cover"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                        <span className="text-foreground">{entity.creator.name}</span>
                                    </div>
                                </div>
                            )}  */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-foreground font-mono text-lg font-semibold">
                    {formatCurrency(offer.price)}
                    {/* {
                                        currencySymbol: business.currencySymbol
                                    } */}
                  </p>
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm">
                      Category:{' '}
                      <Badge variant="outline" className="p-3">
                        {entity.type || 'Uncategorized'}
                      </Badge>
                    </span>
                    <div className="my-4 flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-muted-foreground mb-1 text-xs">Availability</p>
                        <div className="flex items-center gap-2">
                          <Indicator variant={offer.availability ? 'success' : 'danger'} />
                          <span className="text-sm">
                            {offer.availability ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                      <div className="bg-border h-8 w-px" />
                      <div>
                        <p className="text-muted-foreground text-xs">Health</p>
                        {/* <Badge variant="outline" className={`rounded-full ${HEALTH_COLORS[offer.health as keyof typeof HEALTH_COLORS]}`}>
                                    {HEALTH_LABELS[offer.health as keyof typeof HEALTH_LABELS]}
                                </Badge> */}
                      </div>
                      <div className="bg-border h-8 w-px" />
                      <div>
                        <p className="text-muted-foreground text-xs">Created On</p>
                        <p className="text-foreground text-sm">{formatDate(entity.createdOn)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <section className="space-y-4 pt-4">
          <Tabs defaultValue="ai" className="w-full">
            <TabsList
              variant="line"
              className="w-full justify-start"
              aria-label="Product descriptions"
            >
              <TabsTrigger value="ai">Product Overview</TabsTrigger>
              <TabsTrigger value="marketing">Why You&apos;ll Love It</TabsTrigger>
            </TabsList>
            <TabsContent value="ai" className="mt-4 space-y-2">
              <h2 className="text-foreground text-lg font-semibold tracking-normal">
                Product Overview
              </h2>
              <span
                dangerouslySetInnerHTML={{ __html: entity.description }}
                className="text-muted-foreground mt-1 block text-base"
              />
            </TabsContent>
            <TabsContent value="marketing" className="mt-4 space-y-2">
              <h2 className="text-foreground text-lg font-semibold tracking-normal">
                Why You&apos;ll Love It
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed font-normal">
                {offer.description}
              </p>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Product Specification */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-muted-foreground font-mono text-sm font-medium uppercase">
              Specification
            </h5>

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

          <Table className="">
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
                      <TableCell className="capitalize">
                        {(prop as ProductAttributeProperty).name || 'N/A'}
                      </TableCell>
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
