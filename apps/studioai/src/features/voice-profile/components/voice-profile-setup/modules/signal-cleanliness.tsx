import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const SignalCleanliness: VoiceProfileModule = {
    key: "signal-cleanliness",
    label: "Signal Cleanliness",
    description: "Signal-to-noise guidelines.",
    render: () => <Component />,
};
