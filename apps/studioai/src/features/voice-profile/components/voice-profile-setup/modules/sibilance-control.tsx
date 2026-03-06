import { VoiceProfileModule } from "../registry";
import { useState } from "react";
import { Slider } from "@repo/ui-core/components/slider";

function Component() {
    const [value, setValue] = useState([50]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Reduction</span>
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
                <span>Natural</span>
                <span>Reduced</span>
                <span>Minimal</span>
            </div>
        </div>
    );
}

export const SibilanceControl: VoiceProfileModule = {
    key: "sibilance-control",
    label: "Sibilance Control",
    description: "Control the intensity of sibilant sounds (S, SH, Z). Higher values reduce harsh sibilance for a smoother sound.",
    render: () => <Component />,
};
