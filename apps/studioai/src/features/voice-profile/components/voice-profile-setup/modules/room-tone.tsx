import { VoiceProfileModule } from "../registry";

function Component() {

    return (
        <></>
    );
}

export const RoomTone: VoiceProfileModule = {
    key: "room-tone",
    label: "Room Tone",
    description: "Room ambience specifics.",
    render: () => <Component />,
};
