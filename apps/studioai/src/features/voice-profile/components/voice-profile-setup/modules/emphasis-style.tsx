import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const EmphasisStyle: VoiceProfileModule = {
    key: "emphasis-style",
    label: "Emphasis Style",
    description: "How emphasis is placed.",
    render: () => <Component />,
};
