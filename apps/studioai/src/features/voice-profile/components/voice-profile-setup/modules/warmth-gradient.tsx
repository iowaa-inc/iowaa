import { VoiceProfileModule } from "../registry";
import { useState } from "react";
import { Slider } from "@repo/ui-core/components/slider";

function Component() {
    const [value, setValue] = useState([50]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Warmth</span>
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
            <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                <span>Cold</span>
                <span>Neutral</span>
                <span>Warm</span>
            </div>
        </div>
    );
}

export const WarmthGradient: VoiceProfileModule = {
    key: "warmth-gradient",
    label: "Warmth Gradient",
    description: "Control the emotional warmth in the voice. Cold (0%) for distant/professional, Warm (100%) for friendly/intimate.",
    render: () => <Component />,
};
