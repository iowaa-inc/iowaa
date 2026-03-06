import { VoiceProfileModule } from "../registry";
import { useState } from "react";
import { Slider } from "@repo/ui-core/components/slider";

function Component() {
    const [value, setValue] = useState([90]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Cleanliness</span>
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
                <span>Noisy</span>
                <span>Clean</span>
                <span>Pristine</span>
            </div>
        </div>
    );
}

export const SignalCleanliness: VoiceProfileModule = {
    key: "signal-cleanliness",
    label: "Signal Cleanliness",
    description: "Control noise reduction and signal purity. Higher values produce cleaner audio with less background noise and artifacts.",
    render: () => <Component />,
};
