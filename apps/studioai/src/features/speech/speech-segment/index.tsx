import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { Button } from '@repo/ui-core/components/button'
import { Badge } from '@repo/ui-core/components/badge'
import { RiPlayFill, RiPauseLine } from '@remixicon/react'

import { SpeechSegmentEditor } from '../speech-segment-editor'
import { Descendant } from "slate"
import { cn } from "@repo/ui-core/lib/utils"
import { Separator } from "@repo/ui-core/components/separator";

// --- Context for sharing segment text height ---
type SpeechSegmentContextType = {
    textHeight: number | undefined
    setTextHeight: (h: number) => void
}
const SpeechSegmentContext = createContext<SpeechSegmentContextType | undefined>(undefined)
export function useSpeechSegmentContext() {
    const ctx = useContext(SpeechSegmentContext)
    if (!ctx) throw new Error('useSpeechSegmentContext must be used within SpeechSegmentRoot')
    return ctx
}

type SpeechSegmentRootProps = {
    children: React.ReactNode
}

type SpeechSegmentTimestampProps = {
    seconds: number
}

type SpeechSegmentPlayButtonProps = {
    onClick?: () => void
}

type SpeechSegmentTextProps = {
    segment: Descendant[]
    readOnly?: boolean
    className?: string
    onChange?: (value: Descendant[]) => void
}

interface SpeechSegmentIndentProps {
    className?: string;
}


// Utility function to format seconds as mm:ss
function formatTimestamp(seconds: number) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const SpeechSegmentRoot: React.FC<SpeechSegmentRootProps> = ({ children }) => {
    const [textHeight, setTextHeight] = useState<number | undefined>(undefined)
    return (
        <SpeechSegmentContext.Provider value={{ textHeight, setTextHeight }}>
            <div className={cn("w-full flex flex-col gap-2")}>{children}</div>
        </SpeechSegmentContext.Provider>
    )
}

const SpeechSegmentTimestamp: React.FC<SpeechSegmentTimestampProps> = ({ seconds }) => (
    <Badge className={cn("text-sm py-3 font-mono ")} variant="default">
        {formatTimestamp(seconds)}
    </Badge>
)

const SpeechSegmentPlayButton: React.FC<SpeechSegmentPlayButtonProps> = ({ onClick }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        setIsPlaying((prev) => !prev);
        if (onClick) onClick();
    };

    return (
        <Button
            aria-label={isPlaying ? "Pause segment" : "Play segment"}
            onClick={handleClick}
            size="icon"
            className={cn("rounded-full size-8")}
        >
            {isPlaying ? <RiPauseLine /> : <RiPlayFill />}
        </Button>
    );
};

const SpeechSegmentText: React.FC<SpeechSegmentTextProps> = ({
    segment,
    readOnly = false,
    className = "",
    onChange,
}) => {
    // Provide a local state fallback handler if no onChange is passed (for demo/prototype)
    const [internalValue, setInternalValue] = useState<Descendant[]>(segment && segment.length > 0 ? segment : [])
    const { setTextHeight } = useSpeechSegmentContext()
    const ref = useRef<HTMLDivElement>(null)

    const handleEditorChange = (value: Descendant[]) => {
        setInternalValue(value)
        if (onChange) {
            onChange(value)
        }
    }

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        // Provide height on mount
        setTextHeight(el.offsetHeight);

        // --- Observe size changes using ResizeObserver ---
        let animationFrameId: number | null = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ResizeObs = (window as any).ResizeObserver;
        let observer: ResizeObserver | null = null;
        if (typeof ResizeObs === 'function') {
            observer = new ResizeObs((entries: ResizeObserverEntry[]) => {
                if (entries[0]) {
                    const { height } = entries[0].contentRect;
                    if (animationFrameId != null) cancelAnimationFrame(animationFrameId);
                    animationFrameId = requestAnimationFrame(() => {
                        setTextHeight(height);
                    });
                }
            });
            if (observer) {
                observer.observe(el);
            }
        }

        return () => {
            if (observer) observer.unobserve(el);
            if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
        }
    }, [setTextHeight]);

    return (
        <div ref={ref} className={cn("pb-10")}>
            <SpeechSegmentEditor
                value={onChange ? segment : internalValue}
                onChange={onChange ? onChange : handleEditorChange}
                readOnly={readOnly}
                className={className}
            />
        </div>
    )
}

const SpeechSegmentIndent: React.FC<SpeechSegmentIndentProps> = ({ className }) => {
    const { textHeight } = useSpeechSegmentContext()
    return (
        <div className={cn("relative flex items-start shrink-0", className)} style={{ width: '48px' }}>
            <div className="w-full flex justify-center">
                <div
                    className="w-[2px] bg-primary transition-all duration-150"
                    style={{ height: textHeight ? `${textHeight}px` : '100%' }}
                />
            </div>
        </div>
    )
};

export const SpeechSegment = {
    Root: SpeechSegmentRoot,
    Timestamp: SpeechSegmentTimestamp,
    PlayButton: SpeechSegmentPlayButton,
    Text: SpeechSegmentText,
    Indent: SpeechSegmentIndent
}
