import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const GlottalFry: VoiceProfileModule = {
    key: "glottal-fry-settings",
    label: "Glottal/Fry Settings",
    description: "Glottal or vocal fry characteristics.",
    render: () => <Component />,
};
