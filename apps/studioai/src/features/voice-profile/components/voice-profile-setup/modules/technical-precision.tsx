import { VoiceProfileModule } from "../registry";
import { useState } from "react";
import { Slider } from "@repo/ui-core/components/slider";

function Component() {
    const [value, setValue] = useState([75]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Precision</span>
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
                <span>Balanced</span>
                <span>Technical</span>
            </div>
        </div>
    );
}

export const TechnicalPrecision: VoiceProfileModule = {
    key: "technical-precision",
    label: "Technical Precision",
    description: "Control pronunciation accuracy and technical terminology handling. Higher values ensure precise articulation of technical terms and formal speech.",
    render: () => <Component />,
};
