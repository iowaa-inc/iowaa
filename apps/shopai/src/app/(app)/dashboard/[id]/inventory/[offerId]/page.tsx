import { InventoryProvider } from '@/features/inventory/inventory-provider';

import { PageContent } from './_components/page-content';

export default function ProductDetailsPage() {
  return (
    <InventoryProvider>
      <div className="mx-auto h-full w-full max-w-4xl pb-20">
        <PageContent />
      </div>
    </InventoryProvider>
  );
}
