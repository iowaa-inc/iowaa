import { useMemo, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { RiAddLine, RiArrowDownSLine, RiCheckLine } from '@remixicon/react';
import { toast } from 'sonner';

import { Button } from '@repo/ui-core/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui-core/components/dropdown-menu';
import { Input } from '@repo/ui-core/components/input';
import { ScrollArea, ScrollBar } from '@repo/ui-core/components/scroll-area';
import { useSidebar } from '@repo/ui-core/components/sidebar';

import { useProjects } from '../hooks/use-projects';
import { useSwitchActiveProject } from '../hooks/use-switch-active-project';
import { getProjectIdFromPath } from '../utils';
import { ProjectCreateDialog } from './project-create-dialog';

export function ProjectSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useSidebar();
  const [filter, setFilter] = useState('');

  const pathname = usePathname();
  const router = useRouter();

  const { data: projects, isLoading } = useProjects();
  const { switchActiveProject } = useSwitchActiveProject();

  const activeProjectId = useMemo(() => getProjectIdFromPath(pathname), [pathname]);

  // Find the active project by id from the list
  const activeProject = useMemo(() => {
    return projects?.find((p) => p.id === activeProjectId);
  }, [projects, activeProjectId]);

  const filteredProjects =
    projects?.filter((project) => project.name.toLowerCase().includes(filter.toLowerCase())) || [];

  const handleSwitchProject = async (projectId: string) => {
    try {
      await switchActiveProject(projectId);
      router.replace(`/workspace/${projectId}`);
      toast.success('Switched project!', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Failed to switch project:', error);
      toast.error('Failed to switch project.', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="bg-sidebar-accent/80 hover:bg-sidebar-accent w-full justify-between"
            size={'lg'}
            disabled={isLoading}
          >
            <span className="max-w-[200px] truncate font-medium">
              {isLoading ? 'Loading...' : activeProject?.name || 'No project'}
            </span>
            <RiArrowDownSLine className="opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          align="start"
          side={isMobile ? 'bottom' : 'right'}
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-muted-foreground text-sm">Projects</DropdownMenuLabel>
          <div className="p-2">
            <Input
              placeholder="Filter projects..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-8"
              autoFocus
            />
          </div>
          <ScrollArea className="h-50 overflow-hidden">
            <div className="pr-2">
              {isLoading ? (
                <div className="text-muted-foreground flex h-50 w-full flex-col items-center justify-center gap-2 px-2 py-1 text-sm">
                  <span>Loading projects...</span>
                </div>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <DropdownMenuItem
                    key={project.id}
                    onClick={() => {
                      // CHECK: Don't allow switching to active project
                      if (activeProject?.id === project.id) {
                        toast.info('Already on this project', {
                          position: 'top-center',
                        });
                        return;
                      }
                      handleSwitchProject(project.id);
                    }}
                    className="gap-2 p-2"
                  >
                    <span className="block w-full max-w-[200px] truncate">{project.name}</span>
                    {activeProject?.id === project.id ? (
                      <RiCheckLine className="ml-auto opacity-50" />
                    ) : null}
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="text-muted-foreground flex h-50 w-full flex-col items-center justify-center gap-2 px-2 py-1 text-sm">
                  <span>No projects found</span>
                </div>
              )}
            </div>
            <ScrollBar className="data-vertical:w-2" />
          </ScrollArea>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 p-2" onClick={() => setIsOpen(true)}>
            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
              <RiAddLine className="size-4" />
            </div>
            <div className="text-muted-foreground font-medium">Add project</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProjectCreateDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
