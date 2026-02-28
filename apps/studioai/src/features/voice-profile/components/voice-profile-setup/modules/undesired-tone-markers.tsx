import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const UndesiredToneMarkers: VoiceProfileModule = {
    key: "undesired-tone-markers",
    label: "Undesired Tone Markers",
    description: "Avoid tones (stiff, robotic, etc.).",
    render: () => <Component />,
};
