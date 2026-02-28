import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const SpeedTempo: VoiceProfileModule = {
    key: "speed-tempo",
    label: "Speed / Tempo",
    description: "Speaking speed (e.g. 0.9x - 1.0x).",
    render: () => <Component />,
};
