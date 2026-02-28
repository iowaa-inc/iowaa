import { Button } from "@repo/ui-core/components/button";
import { SidebarGroup } from "@repo/ui-core/components/sidebar";
import { ScriptCreateDialog } from "@/features/script/components/script-create-dialog";

export function NavMain() {
  return (
    <SidebarGroup>
      <ScriptCreateDialog>
        <Button size="lg" className="w-full">Create script</Button>
      </ScriptCreateDialog>
    </SidebarGroup>
  )
}
