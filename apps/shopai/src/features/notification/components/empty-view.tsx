import { Bell } from 'lucide-react';

export function EmptyView() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Bell className="text-muted-foreground/50 mb-3 h-12 w-12" />
      <p className="text-muted-foreground text-sm">No notifications</p>
    </div>
  );
}
