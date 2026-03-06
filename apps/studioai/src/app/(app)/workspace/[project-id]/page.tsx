import { ScriptWorkspaceHeader } from '@/components/layout/script-workspace-header';

export default function WorkspaceProjectHome() {
  return (
    <>
      <ScriptWorkspaceHeader />
      <div className="flex h-full items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">No script selected</h2>
          <p className="text-muted-foreground">
            Select a script from the sidebar or create a new one to get started.
          </p>
        </div>
      </div>
    </>
  );
}
