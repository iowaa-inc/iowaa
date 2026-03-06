"use client";

import { Preloader } from "@repo/ui-core/components/preloader";

const PAGE_WORDS = [
  { text: "Hello", lang: "en", font: null },
  { text: "Bonjour", lang: "fr", font: null },
  { text: "Hola", lang: "es", font: null },
  { text: "Olà", lang: "pt", font: null },
  { text: "Ciao", lang: "it", font: null },
  { text: "Hallå", lang: "sv", font: null },
  { text: "Guten Tag", lang: "de", font: null },
  { text: "こんにちは", lang: "ja", font: "'Noto Sans JP', sans-serif" },
  {
    text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
    lang: "pa",
    font: "'Noto Sans Gurmukhi', sans-serif",
  },
  { text: "مرحبا", lang: "ar", font: "'Noto Sans Arabic', sans-serif" },
];

export default function Page() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <Preloader
        words={PAGE_WORDS}
        wrapperClassName="flex items-center justify-center w-full h-full"
      >
        <div className="flex flex-col flex-1 items-center justify-center h-full space-y-4 text-center px-4 py-24 mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
            Work in Progress
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            We are currently building something amazing. Please check back
            later.
          </p>
        </div>
      </Preloader>
    </main>
  );
}
