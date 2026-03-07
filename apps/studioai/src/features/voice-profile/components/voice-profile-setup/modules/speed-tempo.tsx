import { VoiceProfileModule } from "../registry";
import { useState } from "react";
import { Slider } from "@repo/ui-core/components/slider";

function Component() {
    const [value, setValue] = useState([1.0]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Rate</span>
                <span className="text-xs font-mono font-medium">{(value[0] ?? 1.0).toFixed(2)}x</span>
            </div>
            <Slider
                value={value}
                onValueChange={setValue}
                min={0.5}
                max={2.0}
                step={0.05}
                className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                <span>Slow</span>
                <span>Normal</span>
                <span>Fast</span>
            </div>
        </div>
    );
}

export const SpeedTempo: VoiceProfileModule = {
    key: "speed-tempo",
    label: "Speed / Tempo",
    description: "Control the overall speech rate. 0.5x is very slow, 1.0x is normal pace, 2.0x is very fast.",
    render: () => <Component />,
};
