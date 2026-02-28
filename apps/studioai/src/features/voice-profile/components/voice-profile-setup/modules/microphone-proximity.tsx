import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const MicProximity: VoiceProfileModule = {
    key: "microphone-proximity",
    label: "Microphone Proximity",
    description: "Microphone distance/settings.",
    render: () => <Component />,
};
