import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui-core/components/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui-core/components/collapsible";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@repo/ui-core/components/sidebar";
import { voiceProfileModuleRegistry } from "./registry";
import { RiArrowRightSLine, RiInformationLine, RiPlayFill } from "@remixicon/react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@repo/ui-core/components/tooltip";
import { Button } from "@repo/ui-core/components/button";

export function VoiceProfilePanel() {
    return (
        <Tabs defaultValue={voiceProfileModuleRegistry[0]?.name}>
            <TabsList variant="line" className="mb-2 w-full">
                {voiceProfileModuleRegistry.map((profile) => (
                    <TabsTrigger
                        key={profile.name}
                        value={profile.name}
                    >
                        {profile.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {voiceProfileModuleRegistry.map((profile) => (
                <TabsContent
                    key={profile.name}
                    value={profile.name}
                    className="p-0"
                >
                    {profile.options.map((group, iGroup) => (
                        <React.Fragment key={group.name}>
                            <SidebarGroup className="px-0">
                                <Collapsible defaultOpen={iGroup === 0} className="group/collapsible">
                                    <SidebarGroupLabel
                                        asChild
                                        className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
                                    >
                                        <CollapsibleTrigger className="flex items-center gap-1">
                                            {group.name}
                                            <RiArrowRightSLine className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        <SidebarGroupContent>
                                            <SidebarMenu>
                                                {group.options.map((option) => (
                                                    <SidebarMenuItem key={option.key} className="px-2 py-3">
                                                        <div className="flex w-full justify-between items-center">
                                                            <div className="flex items-center gap-1 text-xs font-mono uppercase font-normal mb-1">
                                                                <span className="mr-1">
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <RiInformationLine size={16} className="text-muted-foreground" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent side="left" className="max-w-xs text-sm">
                                                                            {option.description}
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </span>
                                                                {option.label}
                                                            </div>
                                                            {/* <div className="text-xs font-semibold text-muted-foreground mb-2">{option.description}</div> */}
                                                        </div>
                                                        <div className="w-full mt-3 flex gap-2 items-center">
                                                            <Button
                                                                type="button"
                                                                size="icon-sm"
                                                                variant="outline"
                                                                className="rounded-full"
                                                            >
                                                                <RiPlayFill />
                                                            </Button>
                                                            {option.render()}
                                                        </div>
                                                    </SidebarMenuItem>
                                                ))}
                                            </SidebarMenu>
                                        </SidebarGroupContent>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarGroup>
                            <SidebarSeparator className="mx-0" />
                        </React.Fragment>
                    ))}
                </TabsContent>
            ))}
        </Tabs>
    );
}
