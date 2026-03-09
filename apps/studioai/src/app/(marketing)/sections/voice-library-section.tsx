"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@repo/ui-core/components/badge";
import { BarVisualizer } from "@repo/ui-core/components/bar-visualizer";
import { RiPlayFill, RiStopFill, RiGlobalLine } from "@remixicon/react";
import { voiceLibrary } from "@/config/landing-content";

// ─── Voice data ───────────────────────────────────────────────────────────────

const REGIONS = [
  {
    id: "african",
    label: "African",
    voices: [
      { id: "amara",  name: "Amara",  lang: "Yoruba · Nigerian",        role: "Storyteller", emotions: ["Warm",      "Dramatic",  "Joyful",    "Calm"]    },
      { id: "kofi",   name: "Kofi",   lang: "Swahili · East African",   role: "Narrator",    emotions: ["Confident", "Calm",      "Energetic", "Wise"]    },
      { id: "fatima", name: "Fatima", lang: "Hausa · Northern Africa",  role: "Host",        emotions: ["Cheerful",  "Formal",    "Warm",      "Serious"] },
      { id: "sipho",  name: "Sipho",  lang: "Zulu · South African",     role: "Narrator",    emotions: ["Calm",      "Dramatic",  "Confident", "Warm"]    },
    ],
  },
  {
    id: "global",
    label: "Global",
    voices: [
      { id: "james",  name: "James",  lang: "English · British",        role: "Documentary", emotions: ["Calm",     "Serious",   "Warm",      "Dramatic"] },
      { id: "sofia",  name: "Sofia",  lang: "Spanish · Latin American", role: "Host",        emotions: ["Cheerful", "Energetic", "Calm",      "Warm"]    },
      { id: "claude", name: "Claude", lang: "French · European",        role: "Audiobook",   emotions: ["Warm",     "Dramatic",  "Calm",      "Joyful"]  },
      { id: "nadia",  name: "Nadia",  lang: "Arabic · Gulf",            role: "Narrator",    emotions: ["Formal",   "Warm",      "Calm",      "Serious"] },
    ],
  },
  {
    id: "asian",
    label: "Asian",
    voices: [
      { id: "hana",  name: "Hana",  lang: "Japanese · Tokyo",        role: "E-learning",  emotions: ["Calm",      "Cheerful",  "Formal",    "Warm"]    },
      { id: "jun",   name: "Jun",   lang: "Korean · Seoul",          role: "Narrator",    emotions: ["Confident", "Calm",      "Energetic", "Warm"]    },
      { id: "priya", name: "Priya", lang: "Hindi · Northern India",  role: "Storyteller", emotions: ["Warm",      "Dramatic",  "Joyful",    "Calm"]    },
      { id: "bao",   name: "Bao",   lang: "Mandarin · Beijing",      role: "Corporate",   emotions: ["Formal",    "Confident", "Calm",      "Serious"] },
    ],
  },
  {
    id: "european",
    label: "European",
    voices: [
      { id: "anna",  name: "Anna",  lang: "German · Berlin",         role: "Documentary", emotions: ["Calm",  "Serious",   "Confident", "Formal"]    },
      { id: "luca",  name: "Luca",  lang: "Italian · Milan",         role: "Storyteller", emotions: ["Warm",  "Dramatic",  "Joyful",    "Energetic"] },
      { id: "katia", name: "Katia", lang: "Polish · Warsaw",         role: "E-learning",  emotions: ["Calm",  "Cheerful",  "Formal",    "Warm"]      },
      { id: "erik",  name: "Erik",  lang: "Swedish · Stockholm",     role: "Audiobook",   emotions: ["Calm",  "Confident", "Warm",      "Dramatic"]  },
    ],
  },
] as const;

type RegionId = (typeof REGIONS)[number]["id"];
type Voice = (typeof REGIONS)[number]["voices"][number];

const PLAYBACK_DURATION = 4000;

// ─── Section ──────────────────────────────────────────────────────────────────

export function VoiceLibrarySection() {
  const [activeRegion, setActiveRegion] = useState<RegionId>("african");
  const [activeVoice,  setActiveVoice]  = useState<Voice>(REGIONS[0].voices[0]);
  const [activeEmotion, setActiveEmotion] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-stop after simulated playback
  useEffect(() => {
    if (playing) {
      timerRef.current = setTimeout(() => setPlaying(false), PLAYBACK_DURATION);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing]);

  function switchRegion(regionId: RegionId) {
    const region = REGIONS.find((r) => r.id === regionId)!;
    setActiveRegion(regionId);
    setActiveVoice(region.voices[0]);
    setActiveEmotion(null);
    setPlaying(false);
  }

  function selectVoice(voice: Voice) {
    setActiveVoice(voice);
    setActiveEmotion(null);
    setPlaying(false);
  }

  function playEmotion(emotion: string) {
    setActiveEmotion(emotion);
    setPlaying(true);
  }

  const region = REGIONS.find((r) => r.id === activeRegion)!;

  return (
    <section id="voice-library" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <Badge variant="secondary" className="w-fit">
            {voiceLibrary.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-2xl">
            {voiceLibrary.sectionTitle}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {voiceLibrary.sectionDescription}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-14 border-y border-border py-8">
          {voiceLibrary.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-3xl font-semibold tracking-tight">19</span>
            <span className="text-sm text-muted-foreground">Emotions per Voice</span>
          </div>
        </div>

        {/* Explorer */}
        <div className="max-w-5xl mx-auto border border-border rounded-2xl overflow-hidden bg-background">

          {/* Region tabs */}
          <div className="flex items-center border-b border-border overflow-x-auto [scrollbar-width:none]">
            <div className="flex items-center px-4 py-3 border-r border-border shrink-0 text-muted-foreground">
              <RiGlobalLine className="w-4 h-4" />
            </div>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => switchRegion(r.id)}
                className={`shrink-0 px-5 py-3 text-sm font-medium border-r border-border transition-colors duration-150 focus-visible:outline-none ${
                  activeRegion === r.id
                    ? "text-foreground bg-muted/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Main content: portrait left, voice list right */}
          <div className="flex flex-col lg:flex-row">

            {/* ── Portrait panel ──────────────────────────────────── */}
            <div className="lg:w-[38%] shrink-0 border-b lg:border-b-0 lg:border-r border-border flex flex-col">

              {/* Image placeholder — large portrait */}
              <div className="flex-1 min-h-[280px] lg:min-h-0 bg-muted relative overflow-hidden">
                {/* Placeholder persona silhouette hint */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full h-[70%] bg-linear-to-t from-background/60 to-transparent" />
                </div>

                {/* Persona meta — overlaid at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-lg font-semibold">{activeVoice.name}</span>
                      <span className="text-sm text-muted-foreground">{activeVoice.lang}</span>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm shrink-0">
                      {activeVoice.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Playback controls */}
              <div className="px-5 py-4 flex items-center gap-4 border-t border-border">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  disabled={!activeEmotion}
                  aria-label={playing ? "Stop" : "Play"}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background disabled:opacity-30 hover:opacity-80 transition-opacity focus-visible:outline-none shrink-0"
                >
                  {playing
                    ? <RiStopFill className="w-3.5 h-3.5" />
                    : <RiPlayFill className="w-3.5 h-3.5 translate-x-px" />
                  }
                </button>

                {/* ElevenLabs BarVisualizer — demo mode */}
                <BarVisualizer
                  demo
                  state={playing ? "speaking" : activeEmotion ? "listening" : undefined}
                  barCount={20}
                  minHeight={15}
                  className="flex-1 h-8 bg-transparent"
                />

                <span className="text-xs text-muted-foreground shrink-0">
                  {activeEmotion ?? "Pick an emotion"}
                </span>
              </div>
            </div>

            {/* ── Voice selector + emotions ────────────────────────── */}
            <div className="flex-1 flex flex-col divide-y divide-border overflow-hidden">
              {region.voices.map((voice) => {
                const isActive = activeVoice.id === voice.id;
                return (
                  <div
                    key={voice.id}
                    className={`transition-colors duration-150 ${isActive ? "bg-muted/30" : ""}`}
                  >
                    {/* Voice row — clickable header */}
                    <button
                      onClick={() => selectVoice(voice)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none group"
                    >
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className={`text-base font-medium truncate transition-colors ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {voice.name}
                        </span>
                        <span className="text-sm text-muted-foreground truncate">{voice.lang}</span>
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                        {voice.role}
                      </span>
                    </button>

                    {/* Emotion pills — only shown when this voice is active */}
                    {isActive && (
                      <div className="flex flex-wrap gap-2 px-5 pb-4">
                        {voice.emotions.map((emotion) => {
                          const isPlayingThis = activeEmotion === emotion && playing;
                          return (
                            <button
                              key={emotion}
                              onClick={() => playEmotion(emotion)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                activeEmotion === emotion
                                  ? "bg-foreground text-background border-foreground"
                                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                              }`}
                            >
                              {isPlayingThis && <MiniWaveform />}
                              {emotion}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Select a voice, then click an emotion to audition
        </p>
      </div>
    </section>
  );
}

// ─── Mini animated waveform in emotion pill ───────────────────────────────────

function MiniWaveform() {
  return (
    <span className="flex items-center gap-px h-3" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-px rounded-full bg-current"
          style={{
            height: "100%",
            animation: `miniwave 0.7s ease-in-out ${i * 0.15}s infinite`,
            display: "inline-block",
          }}
        />
      ))}
      <style>{`@keyframes miniwave { 0%,100%{transform:scaleY(.25)} 50%{transform:scaleY(1)} }`}</style>
    </span>
  );
}
