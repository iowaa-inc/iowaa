import type { DayHoursInputType } from '@/features/business-profile/schema';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// In our convention, DayHoursInputType is the hours for the *entire week*.
// The entries for each day (monday, tuesday, ...) are called hourEntry (from hourEntrySchema).
type HourEntry = DayHoursInputType[keyof DayHoursInputType];

export function OperatingHoursTable({ hours }: { hours: Record<string, HourEntry> }) {
  if (!hours || typeof hours !== 'object') return null;

  return (
    <Table className="mt-4 text-sm capitalize">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="w-1/3">Day</TableHead>
          <TableHead className="w-1/3">Open</TableHead>
          <TableHead className="w-1/3">Close</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(hours).map(([day, hour]: [string, HourEntry]) => (
          <TableRow key={day}>
            <TableCell className="font-medium">{day}</TableCell>
            {!hour.enabled ? (
              <TableCell colSpan={2}>
                <span className="text-muted-foreground">Closed</span>
              </TableCell>
            ) : (
              <>
                <TableCell>{hour.from || '--'}</TableCell>
                <TableCell>{hour.to || '--'}</TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
