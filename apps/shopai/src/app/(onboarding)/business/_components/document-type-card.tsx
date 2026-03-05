import { BUSINESS_IDENTITY_DOCUMENTS } from '@/features/business-profile/constants';
import { Info } from 'lucide-react';

export function DocumentTypeCard() {
  return (
    <div className="bg-card space-y-4 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <Info className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-foreground text-sm font-medium">
          Documents required to verify this business type
        </p>
      </div>
      <ol className="text-muted-foreground space-y-2 pl-6 text-sm">
        {BUSINESS_IDENTITY_DOCUMENTS.map((doc: string, idx: number) => (
          <li key={idx} className="list-decimal leading-relaxed">
            {doc}
          </li>
        ))}
      </ol>
    </div>
  );
}
