import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const DefaultTemperament: VoiceProfileModule = {
    key: "default-temperament",
    label: "Default Temperament",
    description: "Go-to emotional state.",
    render: () => <Component />,
};
