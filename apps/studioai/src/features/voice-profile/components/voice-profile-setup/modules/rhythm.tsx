import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const Rhythm: VoiceProfileModule = {
    key: "rhythm",
    label: "Rhythm",
    description: "Rhythm type (stress-timed, syllable-timed).",
    render: () => <Component />,
};
