import { AddProduct } from '@/features/inventory/components/add-product/add-product';
import { InventoryTable } from '@/features/inventory/components/inventory-table/table-view';
import { InventoryProvider } from '@/features/inventory/inventory-provider';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { PageHeader } from '../_components/layout/page-header';

export default function InventoryPage() {
  return (
    <InventoryProvider>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeader
            title="Inventory"
            subtitle="View and update your inventory data in real time"
          />
          <AddProduct>
            <Button className="hidden w-fit sm:inline-flex sm:w-auto" variant="default">
              Add Product
            </Button>
          </AddProduct>
        </div>
        <InventoryTable />
        <AddProduct>
          <Button
            className="fixed right-10 bottom-30 z-50 h-14 w-14 rounded-full p-0 shadow-lg sm:hidden"
            variant="default"
            size="icon"
            aria-label="Add Product"
          >
            <Plus className="h-7 w-7" />
          </Button>
        </AddProduct>
      </div>
    </InventoryProvider>
  );
}
