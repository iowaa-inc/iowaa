import { ExpressionModule } from "./types";
import { SpeedModule } from "./modules/speed";
import { EmotionsModule } from "./modules/emotions";
import { PitchModule } from "./modules/pitch";
import { IntonationModule } from "./modules/intonation";
import { TimbreModule } from "./modules/timbre";
import { VolumeModule } from "./modules/volume";

export const MODULE_REGISTRY: ExpressionModule[] = [
    SpeedModule,
    EmotionsModule,
    PitchModule,
    IntonationModule,
    TimbreModule,
    VolumeModule
];
