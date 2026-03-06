import { VoiceProfileModule } from "../registry";
import { useState } from "react";
import { Slider } from "@repo/ui-core/components/slider";

function Component() {
    const [value, setValue] = useState([0]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Amount</span>
                <span className="text-xs font-mono font-medium">{value[0]}%</span>
            </div>
            <Slider
                value={value}
                onValueChange={setValue}
                min={0}
                max={100}
                step={1}
                className="w-full"
            />
        </div>
    );
}

export const GlottalFry: VoiceProfileModule = {
    key: "glottal-fry-settings",
    label: "Glottal/Fry Settings",
    description: "Control the amount of glottal fry or vocal fry in the voice. Higher values create a creaky, lower-register sound.",
    render: () => <Component />,
};
