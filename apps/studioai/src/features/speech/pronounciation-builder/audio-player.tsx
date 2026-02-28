"use client";

import { Button } from "@repo/ui-core/components/button";
import { RiPauseLine, RiVolumeUpLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
    text: string
    preview?: React.ReactNode
}

export function AudioPlayer({ text, preview }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

    const togglePlayback = () => {
        if (isPlaying) {
            speechSynthesis.cancel()
            setIsPlaying(false)
        } else {
            speechSynthesis.cancel()
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.rate = 0.8
            utterance.onend = () => setIsPlaying(false)
            utteranceRef.current = utterance
            speechSynthesis.speak(utterance)
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        return () => {
            speechSynthesis.cancel()
        }
    }, [])

    return (
        <div className="flex items-center gap-3 mt-4">
            <div className="flex-1">
                {preview && (
                    <div className="text-sm text-slate-700 leading-relaxed">
                        {/* {preview} */}
                        Phonetic pronunciation
                    </div>
                )}
            </div>
            <Button
                size="sm"
                variant="outline"
                onClick={togglePlayback}
                className="shrink-0"
            >
                {isPlaying ? (
                    <RiPauseLine className="h-4 w-4" />
                ) : (
                    <RiVolumeUpLine className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}
