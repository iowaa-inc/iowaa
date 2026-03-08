"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface WordItem {
  text: string;
  lang?: string;
  font?: string | null;
}

export interface PreloaderProps {
  /** Array of words to cycle through. */
  words: WordItem[];
  /** Inner content to reveal after preload */
  children: React.ReactNode;
  /** Optional container class for the revealed content */
  wrapperClassName?: string;
  /** Duration in ms to hold the first word after fade-in. */
  firstHoldMs?: number;
  /** Duration in ms to hold subsequent words. */
  holdMs?: number;
  /** Duration in ms for the wipe animation fallback. */
  wipeMs?: number;
  /** Text color for the words and progress pips. */
  textColor?: string;
  /** Background color for the preloader screen. */
  backgroundColor?: string;
  /** Colors for the layered wipe animation [layer1, layer2]. */
  wipeColors?: [string, string];
  /** Callback fired when the preloader finishes its wipe animation. */
  onComplete?: () => void;
}

interface OverlayProps {
  words: WordItem[];
  firstHoldMs: number;
  holdMs: number;
  wipeMs: number;
  textColor: string;
  backgroundColor: string;
  wipeColors: [string, string];
  onComplete?: () => void;
}

interface WordRevealProps {
  word: WordItem;
  isFirst: boolean;
  textColor: string;
}

interface CurvedLayerProps {
  color: string;
  duration: number;
  delay: number;
  onAnimationComplete?: () => void;
}

interface CurvedWipeProps {
  wipeColors: [string, string];
  onDone: () => void;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_FIRST_HOLD_MS = 700;
const DEFAULT_HOLD_MS = 160;
const DEFAULT_WIPE_MS = 2000;

// ============================================================================
// Helpers
// ============================================================================

function fontForWord(w: WordItem) {
  return w.font ?? "'Geist', 'Geist Fallback', sans-serif";
}

// ============================================================================
// Internal Components
// ============================================================================

function WordReveal({ word, isFirst, textColor }: WordRevealProps) {
  const isRTL = word.lang === "ar";
  const direction = isRTL ? "rtl" : "ltr";

  const style: React.CSSProperties = {
    display: "block",
    fontFamily: fontForWord(word),
    fontSize: "clamp(24px, 5vw, 48px)",
    fontWeight: 600,
    color: textColor,
    letterSpacing: word.font ? "0.0em" : "-0.06em",
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={{
        lineHeight: 1.1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {isFirst ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          dir={direction}
          style={style}
          lang={word.lang}
        >
          {word.text}
        </motion.span>
      ) : (
        <span dir={direction} style={style} lang={word.lang}>
          {word.text}
        </span>
      )}
    </div>
  );
}

function CurvedLayer({
  color,
  duration,
  delay,
  onAnimationComplete,
}: CurvedLayerProps) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const animation = animate(progress, 1, {
      duration,
      delay,
      ease: [0.76, 0, 0.24, 1],
      onComplete: onAnimationComplete,
    });
    return () => animation.stop();
  }, [progress, duration, delay, onAnimationComplete]);

  const path = useTransform(progress, (v) => {
    const edgeY = 100 - v * 100;
    const controlY = edgeY + v * (1 - v) * 250; // Deeper downward curve
    return `M 0 ${edgeY} Q 50 ${controlY} 100 ${edgeY} L 100 100 L 0 100 Z`;
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path fill={color} d={path} />
    </svg>
  );
}

function CurvedWipe({ wipeColors, onDone }: CurvedWipeProps) {
  const called = useRef(false);

  const notify = () => {
    if (!called.current) {
      called.current = true;
      onDone();
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <CurvedLayer color={wipeColors[0]} duration={1.6} delay={0} />
      <CurvedLayer
        color={wipeColors[1]}
        duration={1.6}
        delay={0.15}
        onAnimationComplete={notify}
      />
    </div>
  );
}

function PreloaderOverlay({
  words,
  firstHoldMs,
  holdMs,
  wipeMs,
  textColor,
  backgroundColor,
  wipeColors,
  onComplete,
}: OverlayProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"words" | "wipe" | "done">("words");

  // Use latest refs to avoid re-triggering effects if parent passes unstable references
  const wordsRef = useRef(words);
  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Cycle words
  useEffect(() => {
    if (phase !== "words") return;

    const currentWords = wordsRef.current;
    if (!currentWords || currentWords.length === 0) {
      setPhase("wipe");
      return;
    }

    const delay = wordIndex === 0 ? firstHoldMs : holdMs;

    const t = setTimeout(() => {
      if (wordIndex >= currentWords.length - 1) {
        setPhase("wipe");
      } else {
        setWordIndex((i) => i + 1);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [wordIndex, phase, firstHoldMs, holdMs]);

  // Fallback for wipe animation
  useEffect(() => {
    if (phase !== "wipe") return;
    const t = setTimeout(() => {
      setPhase("done");
      onCompleteRef.current?.();
    }, wipeMs + 200);
    return () => clearTimeout(t);
  }, [phase, wipeMs]);

  if (phase === "done") return null;

  const currentWord = words?.[wordIndex];

  return (
    <motion.div
      className="fixed inset-0 z-50 h-[100dvh] w-screen overflow-hidden"
      style={{ backgroundColor }}
      // AnimatePresence exit
      exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.55 } }}
    >
      {/* ── Phase 1: word cycling ─────────────────────────────────── */}
      {currentWord && (
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center select-none">
          <WordReveal
            word={currentWord}
            isFirst={wordIndex === 0}
            textColor={textColor}
          />
        </div>
      )}

      {/* Progress pips — bottom center */}
      {words && words.length > 1 && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-[6px]"
          aria-hidden="true"
        >
          {words.map((_, i) => (
            <motion.span
              key={i}
              className="block rounded-full"
              style={{ height: 2, backgroundColor: textColor }}
              animate={{
                width: i === wordIndex ? 18 : 5,
                opacity: i < wordIndex ? 0.18 : i === wordIndex ? 0.75 : 0.12,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* ── Phase 2: curved wipe ──────────────────────────────────── */}
      {phase === "wipe" && (
        <CurvedWipe
          wipeColors={wipeColors}
          onDone={() => {
            setPhase("done");
            onComplete?.();
          }}
        />
      )}
    </motion.div>
  );
}

// ============================================================================
// Main Export
// ============================================================================

export function Preloader({
  words,
  children,
  wrapperClassName = "",
  firstHoldMs = DEFAULT_FIRST_HOLD_MS,
  holdMs = DEFAULT_HOLD_MS,
  wipeMs = DEFAULT_WIPE_MS,
  textColor = "#3a3a3a",
  backgroundColor = "#ffffff",
  wipeColors = ["#1a1a1a", "#0d0d0d"],
  onComplete,
}: PreloaderProps) {
  const [showPreloader, setShowPreloader] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Safety fallback — force-dismiss after 6s ensures the user is never stuck
    const t = setTimeout(() => {
      setShowPreloader(false);
      setRevealed(true);
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  const handleComplete = () => {
    setShowPreloader(false);
    // Small delay so the wipe is fully settled before content fades in
    setTimeout(() => setRevealed(true), 120);
    onComplete?.();
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <PreloaderOverlay
            words={words}
            firstHoldMs={firstHoldMs}
            holdMs={holdMs}
            wipeMs={wipeMs}
            textColor={textColor}
            backgroundColor={backgroundColor}
            wipeColors={wipeColors}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={wrapperClassName}
        initial={{ opacity: 0, y: 20 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
