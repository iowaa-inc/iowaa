'use client';
'use no memo';

import { useMemo, useState } from 'react';

import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useProductEntity } from '../../hooks/use-product-entity';
import { useProductOffer } from '../../hooks/use-product-offer';
import type { ProductEntity, ProductOffer } from '../../types';
import { type InventoryTableRow, createColumns } from './columns';

export function InventoryTable() {
  const productEntity = useProductEntity();
  const productOffer = useProductOffer();

  const entityList = useMemo(() => (productEntity.get() as ProductEntity[]) ?? [], [productEntity]);

  const offerList = useMemo(() => (productOffer.get() as ProductOffer[]) ?? [], [productOffer]);

  const offerByEntity: Record<string, ProductOffer> = useMemo(() => {
    return offerList.reduce<Record<string, ProductOffer>>((map, offer) => {
      map[offer.entityId] = offer;
      return map;
    }, {});
  }, [offerList]);

  const tableRows: InventoryTableRow[] = useMemo(() => {
    return entityList.map((pe) => {
      const po = offerByEntity[pe.id];
      return {
        ...pe,
        offerId: po.id,
        price: po.price ?? 0,
        availability: po.availability,
      };
    });
  }, [entityList, offerByEntity]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      createColumns({
        onDelete: (entityId: string) => {
          const nextOffers =
            (productOffer.get() as ProductOffer[])?.filter((po) => po.entityId !== entityId) ?? [];
          productOffer.set(nextOffers);
        },
        onArchive: (entityId: string) => {
          const updatedOffers =
            (productOffer.get() as ProductOffer[])?.map((po) =>
              po.entityId === entityId ? { ...po } : po,
            ) ?? [];
          productOffer.set(updatedOffers);
        },
        onAvail: (entityId: string) => {
          const toggled =
            (productOffer.get() as ProductOffer[])?.map((po) =>
              po.entityId === entityId ? { ...po, availability: !po.availability } : po,
            ) ?? [];
          productOffer.set(toggled);
        },
      }),
    [productOffer],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: tableRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="bg-card overflow-x-auto rounded-md border">
      <Table>
        <TableHeader className="bg-muted/30">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // @ts-expect-error: "sticky" is a custom property on meta
                const isSticky = header.column.columnDef.meta?.['sticky'] === 'right';
                return (
                  <TableHead
                    key={header.id}
                    className={
                      isSticky
                        ? 'bg-muted/30 sticky right-0 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]'
                        : ''
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => {
                  // @ts-expect-error: "sticky" is a custom property on meta
                  const isSticky = cell.column.columnDef.meta?.['sticky'] === 'right';
                  return (
                    <TableCell
                      key={cell.id}
                      className={
                        isSticky
                          ? 'bg-card sticky right-0 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]'
                          : ''
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length ?? 1} className="h-24 text-center">
                No products yet. Click &apos;+&apos; to start selling.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
