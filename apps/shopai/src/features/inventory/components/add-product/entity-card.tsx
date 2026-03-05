import Image from 'next/image';

import type { ProductEntity } from '@/features/inventory/types';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface EntityCardProps {
  product: ProductEntity;
  onSelect?: (product: ProductEntity) => void;
  disabled?: boolean;
}

export function EntityCard({ product, onSelect, disabled }: EntityCardProps) {
  // Handler that returns the product id, if onSelect is provided and not disabled
  const handleCardClick = () => {
    if (!disabled && onSelect) {
      onSelect(product.id as unknown as ProductEntity); // for type compatibility
    }
  };

  return (
    <li
      className="hover:bg-muted/60 flex cursor-pointer flex-col gap-2 px-6 py-5 transition-colors sm:flex-row sm:items-center sm:gap-4"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
    >
      {product.images && product.images.length > 0 ? (
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="64px"
            className="bg-muted rounded-lg border object-cover"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      ) : (
        <div className="bg-muted text-muted-foreground flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border text-sm">
          No Image
        </div>
      )}
      <div className="flex-1">
        <div className="font-medium">{product.name}</div>
        <div className="flex items-center gap-1.5">
          {product.brand && <div className="text-muted-foreground text-sm">{product.brand}</div>}
          <span className="bg-muted size-1.5 rounded-full"></span>
          <div className="text-muted-foreground text-sm">
            Type: <span className="font-semibold">{product.type}</span>
          </div>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="ml-auto rounded-full"
        aria-label={`Add ${product.name}`}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect && !disabled) {
            onSelect(product as unknown as ProductEntity);
          }
        }}
        disabled={disabled}
      >
        <CheckCircle2 className="h-4 w-4" />
        Select
      </Button>
    </li>
  );
}
