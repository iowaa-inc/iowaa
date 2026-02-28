import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const VocalTexture: VoiceProfileModule = {
    key: "vocal-texture",
    label: "Vocal Texture",
    description: "Clean, textured, airy, etc.",
    render: () => <Component />,
};
