import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const PacingStrategy: VoiceProfileModule = {
    key: "pacing-strategy",
    label: "Pacing Strategy",
    description: "Pacing (Steady, Fast, etc.)",
    render: () => <Component />,
};
