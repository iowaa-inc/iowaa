"use client";

import { RiAddLine } from "@remixicon/react";
import { Button } from "@repo/ui-core/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui-core/components/popover";
import { MODULE_REGISTRY } from "./registry";
import { SelectedItemsDisplay } from "./selected-items-display";
import { useSpeech } from "./context";
import { SelectedExpression, ExpressionModule } from "./types";
import { useEffect } from "react";

interface SpeechExpressionSelectorProps {
  onChange?: (updated: SelectedExpression[]) => void;
}

export function SpeechExpressionSelector({
  onChange,
}: SpeechExpressionSelectorProps) {
  const speechApi = useSpeech();
  const {
    isOpen,
    setOpen,
    activeModuleId,
    setActiveModuleId,
    selectedItems,
    toggleItem,
    removeItem,
    getItemsForModule,
  } = speechApi;

  useEffect(() => {
    if (onChange) {
      onChange([...selectedItems]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  const handleToggleItem = (module: ExpressionModule, value: string) => {
    toggleItem(module, value);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const activeModule = activeModuleId
    ? MODULE_REGISTRY.find((m) => m.id === activeModuleId)
    : null;

  return (
    <div className="flex items-center gap-1.5 h-10">
      <div className="flex items-center gap-3">
        <Popover
          open={isOpen}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) setTimeout(() => setActiveModuleId(null), 200);
          }}
        >
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="size-7 rounded-full border-dashed">
              <RiAddLine size={16} className="text-muted-foreground" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-2 w-[320px]" align="start">
            {!activeModule && (
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-muted-foreground px-2 py-2">
                  Add Expressions
                </h4>
                {MODULE_REGISTRY.map((module) => (
                  <div key={module.id}>
                    {module.renderMenuItem({
                      isSelected: getItemsForModule(module.id).length > 0,
                      onToggle: () => handleToggleItem(module, module.label),
                      onOpenSubMenu: () => setActiveModuleId(module.id),
                    })}
                  </div>
                ))}
              </div>
            )}

            {activeModule && activeModule.renderSubMenu && (
              <div>
                {activeModule.renderSubMenu({
                  ...speechApi,
                  currentValues: getItemsForModule(activeModule.id),
                  onBack: () => setActiveModuleId(null),
                  onSelect: (value: string) => handleToggleItem(activeModule, value),
                })}
              </div>
            )}
          </PopoverContent>
        </Popover>

        <SelectedItemsDisplay selectedItems={selectedItems} onRemove={handleRemoveItem} />
      </div>
    </div>
  );
}
