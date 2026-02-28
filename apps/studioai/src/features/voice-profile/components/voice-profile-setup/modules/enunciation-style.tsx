import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const EnunciationStyle: VoiceProfileModule = {
    key: "enunciation-style",
    label: "Enunciation Style",
    description: "How words are articulated.",
    render: () => <Component />,
};
