import { Input } from "@repo/ui-core/components/input";
import { Button } from "@repo/ui-core/components/button";
import { RiCloseLine } from "@remixicon/react";
import { SimpleAccordion } from "@repo/ui-core/components/simple-accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui-core/components/select";
import type { PronounciationBuilderEffectModule } from "../types";

export const EmphasisModule: PronounciationBuilderEffectModule = {
  type: "emphasis",
  label: "Emphasis",
  icon: null,
  render: ({ values, onRemove, onChange }) => (
    <SimpleAccordion
      label="Emphasis"
      actions={
        <Button size="icon" variant="secondary" className="size-7" onClick={onRemove}>
          <RiCloseLine size={18} />
        </Button>
      }
    >
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex flex-row gap-2 items-center justify-between">
          <span className="text-muted-foreground text-xs">Primary</span>
          <Select
            value={values?.emphasisType || "stress"}
            onValueChange={(val) => onChange("emphasisType", val)}
          >
            <SelectTrigger className="h-7 w-full text-xs bg-transparent border-dashed max-w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stress">stress</SelectItem>
              <SelectItem value="elongation">elongation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row gap-2 items-center justify-between">
          <span className="text-muted-foreground text-xs">On</span>
          <Input
            className="w-full bg-accent border-0 h-7 max-w-[140px] text-sm"
            placeholder="syllable"
            value={values?.target || ""}
            onChange={(e) => onChange("target", e.target.value)}
          />
        </div>
      </div>
      {/* <AudioPlayer
        text={item.values.phonetic || ""}
        preview={item.values.phonetic || ""}
      /> */}
    </SimpleAccordion>
  ),
};
