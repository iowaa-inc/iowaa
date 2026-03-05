'use client';

import Image from 'next/image';

import type { ProductEntity, ProductOffer } from '@/features/inventory/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

export type InventoryTableRow = ProductEntity &
  Pick<ProductOffer, 'price' | 'availability'> & {
    offerId: string;
  };

interface InventoryTableColumnsProps {
  onDelete: (peId: string) => void;
  onArchive: (peId: string) => void;
  onAvail: (peId: string) => void;
}

export const createColumns = ({
  onDelete,
  onArchive,
  onAvail,
}: InventoryTableColumnsProps): ColumnDef<InventoryTableRow>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pe = row.original;
      // We'll use the first image or a placeholder
      const imageUrl = pe.images && pe.images.length > 0 ? pe.images[0] : '/placeholder.svg';
      return (
        <div className="ml-3 flex items-center gap-3">
          <div className="bg-muted relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt={pe.name}
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="40px"
              priority={false}
            />
          </div>
          <a
            href={`/dashboard/inventory/${pe.offerId}`}
            className="text-foreground block truncate font-medium hover:underline"
          >
            {pe.name}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="text-foreground ml-3">{row.getValue('brand')}</span>;
    },
    size: 120,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          My Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue('price') as number;
      return <span className="text-foreground ml-3">&#8358;{price.toLocaleString('en-NG')}</span>;
    },
    size: 112,
  },
  {
    accessorKey: 'availability',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Availability
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pe = row.original;
      return (
        <div className="ml-3 flex items-center gap-2">
          <Switch checked={pe.availability} onCheckedChange={() => onAvail(pe.id)} />
          <span className="text-muted-foreground text-sm">
            {pe.availability ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      );
    },
    size: 140,
  },
  {
    accessorKey: 'createdOn',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdOn'));
      return (
        <span className="text-foreground ml-3">
          {date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      );
    },
    size: 120,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const pe = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a href={`/dashboard/inventory/${pe.id}/edit`}>Edit</a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onArchive(pe.id)}>Archive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(pe.id)} className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 64,
    meta: {
      sticky: 'right',
    },
  },
];
