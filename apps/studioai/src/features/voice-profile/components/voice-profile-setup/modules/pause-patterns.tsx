import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const PausePatterns: VoiceProfileModule = {
    key: "pause-patterns",
    label: "Pause Patterns",
    description: "Patterns of pausing while speaking.",
    render: () => <Component />,
};
