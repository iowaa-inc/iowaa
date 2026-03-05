import { Info } from 'lucide-react';

export function AttributeEmptyView() {
  return (
    <div className="text-muted-foreground border-border bg-muted/40 mt-2 flex items-center justify-center gap-2 rounded-md border border-dashed p-3 text-sm">
      <Info className="text-muted-foreground h-10 w-4" />
      <span>No attributes added yet. Click &quot;Add Attribute&quot; to get started.</span>
    </div>
  );
}
