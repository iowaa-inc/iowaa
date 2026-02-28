import { Input } from "@repo/ui-core/components/input";
import { Button } from "@repo/ui-core/components/button";
import { RiCloseLine } from "@remixicon/react";
import { SimpleAccordion } from "@repo/ui-core/components/simple-accordion";
import type { PronounciationBuilderEffectModule } from "../types";

export const PronounceModule: PronounciationBuilderEffectModule = {
    type: "pronounce",
    label: "Pronounce",
    icon: null,
    render: ({ values, onRemove, onChange }) => (
        <SimpleAccordion
            label="Pronounced as"
            actions={
                <Button size="icon" variant="secondary" className="size-7" onClick={onRemove}>
                    <RiCloseLine />
                </Button>
            }
        >
            <Input
                className="w-full text-center bg-accent border-0 h-8 text-sm"
                placeholder='Phonetic spelling (e.g., təˈmeɪtoʊ)'
                value={values?.phonetic || ''}
                onChange={(e) => onChange('phonetic', e.target.value)}
            />
            {/* <AudioPlayer
                text={item.values.phonetic || ""}
                preview={item.values.phonetic || ""}
            /> */}
        </SimpleAccordion>
    )
};