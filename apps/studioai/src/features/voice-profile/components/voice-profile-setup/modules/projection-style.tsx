import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const ProjectionStyle: VoiceProfileModule = {
    key: "projection-style",
    label: "Projection Style",
    description: "How voice projects (intimate, broad, etc.).",
    render: () => <Component />,
};
