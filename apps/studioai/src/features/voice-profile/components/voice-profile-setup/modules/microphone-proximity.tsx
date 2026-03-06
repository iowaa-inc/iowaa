import { VoiceProfileModule } from "../registry";
import { useState } from "react";
import { Slider } from "@repo/ui-core/components/slider";

function Component() {
    const [value, setValue] = useState([30]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Distance</span>
                <span className="text-xs font-mono font-medium">{value[0]}cm</span>
            </div>
            <Slider
                value={value}
                onValueChange={setValue}
                min={5}
                max={100}
                step={5}
                className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                <span>Intimate</span>
                <span>Normal</span>
                <span>Distant</span>
            </div>
        </div>
    );
}

export const MicProximity: VoiceProfileModule = {
    key: "microphone-proximity",
    label: "Microphone Proximity",
    description: "Simulate microphone distance. Close (5-20cm) for intimate/ASMR effect, Normal (20-40cm) for standard recording, Distant (40-100cm) for room ambience.",
    render: () => <Component />,
};
