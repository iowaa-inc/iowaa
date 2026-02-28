import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const IntonationRules: VoiceProfileModule = {
    key: "intonation-rules",
    label: "Intonation Rules",
    description: "Rules for intonation.",
    render: () => <Component />,
};
