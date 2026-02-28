import { Input } from "@repo/ui-core/components/input";
import { Button } from "@repo/ui-core/components/button";
import { RiCloseLine } from "@remixicon/react";
import { SimpleAccordion } from "@repo/ui-core/components/simple-accordion";
import type { PronounciationBuilderEffectModule } from "../types";

export const RhymeModule: PronounciationBuilderEffectModule = {
    type: "rhyme",
    label: "Rhyme",
    icon: null,
    render: ({ values, onRemove, onChange }) => (
        <SimpleAccordion
            label="Rhyme Scheme"
            actions={
                <Button size="icon" variant="secondary" className="size-7" onClick={onRemove}>
                    <RiCloseLine size={18} />
                </Button>
            }
        >
            <div className="flex flex-col gap-2 mb-2">
                <div className="flex flex-row gap-2 items-center justify-between">
                    <span className="text-muted-foreground text-xs">Rhyme with</span>
                    <Input
                        className="w-full bg-accent border-0 h-7 max-w-[140px] text-sm"
                        placeholder='e.g., "time"'
                        value={values?.with || ""}
                        onChange={(e) => onChange("with", e.target.value)}
                    />
                </div>
                <div className="flex flex-row gap-2 items-center justify-between">
                    <span className="text-muted-foreground text-xs">Not</span>
                    <Input
                        className="w-full bg-accent border-0 h-7 max-w-[140px] text-sm"
                        placeholder='optional, e.g., "lime"'
                        value={values?.not || ""}
                        onChange={(e) => onChange("not", e.target.value)}
                    />
                </div>
            </div>
            {/* <AudioPlayer
                text={values?.with || ""}
                preview={values?.with || ""}
            /> */}
        </SimpleAccordion>
    ),
};
