import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const SibilanceControl: VoiceProfileModule = {
    key: "sibilance-control",
    label: "Sibilance Control",
    description: "Control of sibilant sounds.",
    render: () => <Component />,
};
