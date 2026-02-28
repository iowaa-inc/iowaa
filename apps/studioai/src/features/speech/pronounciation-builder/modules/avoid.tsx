import { Input } from "@repo/ui-core/components/input";
import { Button } from "@repo/ui-core/components/button";
import { RiCloseLine } from "@remixicon/react";
import { SimpleAccordion } from "@repo/ui-core/components/simple-accordion";
import type { PronounciationBuilderEffectModule } from "../types";

export const AvoidModule: PronounciationBuilderEffectModule = {
    type: "avoid",
    label: "Avoid",
    icon: null,
    render: ({ onRemove, onChange, values }) => (
        <SimpleAccordion
            label="Avoid"
            actions={
                <Button size="icon" variant="secondary" className='size-7' onClick={onRemove}>
                    <RiCloseLine />
                </Button>
            }
        >
            <Input
                className="w-full text-center bg-accent border-0 h-8 text-sm"
                placeholder='Word(s) to avoid (e.g., "cat")'
                value={values.avoidWord || ''}
                onChange={(e) => onChange('avoidWord', e.target.value)}
            />
            {/* <AudioPlayer
                text={item.values.avoidWord || ""}
                preview={item.values.avoidWord || ""}
            /> */}
        </SimpleAccordion>
    ),
};
