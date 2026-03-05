'use client';

import { type ReactNode, useState } from 'react';

import Image from 'next/image';

import { X } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface ImageGallerySheetProps {
  images: string[];
  title?: string;
  children: ReactNode;
}

export function ImageGallerySheet({ images, title, children }: ImageGallerySheetProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleImageClick = (idx: number) => setSelectedIndex(idx);
  const handleCloseViewer = () => setSelectedIndex(null);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="h-screen w-screen max-w-none p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-border border-b px-6 py-4">
            <SheetTitle className="text-xl font-semibold">{title ?? 'Gallery'}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto grid w-full max-w-[920px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {images.map((image: string, index: number) => (
                <button
                  key={index}
                  type="button"
                  className="bg-muted focus:ring-ring relative aspect-square overflow-hidden rounded-lg outline-none focus:ring-2"
                  style={{
                    padding: 0,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(index)}
                  tabIndex={0}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={`${title ?? 'Gallery'} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: 'top' }}
                    priority={index === 0}
                  />
                </button>
              ))}
            </div>
          </div>
          {selectedIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              style={{ animation: 'fadeIn 0.2s' }}
              aria-modal="true"
              role="dialog"
              tabIndex={-1}
              onClick={handleCloseViewer}
            >
              {/* Prevent click from bubbling if click on image or close */}
              <div
                className="relative flex h-full w-full flex-col items-center justify-center sm:h-auto sm:w-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseViewer}
                  aria-label="Close fullscreen image"
                  className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/90"
                  style={{
                    boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)',
                    lineHeight: 0,
                  }}
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="flex max-h-full max-w-full items-center justify-center">
                  <Image
                    src={images?.[selectedIndex] || '/placeholder.svg'}
                    alt={`${title ?? 'Gallery'} - Full View Image ${selectedIndex + 1}`}
                    width={800}
                    height={800}
                    className="max-h-[90vh] max-w-[95vw] rounded-lg bg-black object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
