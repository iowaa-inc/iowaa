import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const WarmthGradient: VoiceProfileModule = {
    key: "warmth-gradient",
    label: "Warmth Gradient",
    description: "Warmth in tone.",
    render: () => <Component />,
};
