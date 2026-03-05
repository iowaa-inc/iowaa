'use client';

import React, { useRef, useState } from 'react';

import Image, { ImageProps } from 'next/image';

// Helper: exclude certain props from spreading twice
const filterImageProps = (
  allProps: Partial<React.ComponentProps<typeof Image>> = {},
  keys: string[],
) => {
  const filtered: Record<string, unknown> = {};
  Object.entries(allProps).forEach(([k, v]) => {
    if (!keys.includes(k)) filtered[k] = v;
  });
  return filtered;
};

export interface ViewImageProps {
  src: string;
  alt?: string;
  className?: string;
  overlayText?: React.ReactNode;
  /**
   * Use imageProps.fill=true for relative parent fill behavior,
   * or provide width/height for fixed-size (non-fill) images.
   */
  imageProps?: React.ComponentProps<typeof Image>;
}

export const ViewImage: React.FC<ViewImageProps> = ({
  src,
  alt = '',
  className = '',
  overlayText,
  imageProps = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  // Image Adaptation - Figure out fill mode and width/height
  const { fill, width, height, style = {}, ...restImageProps } = imageProps;
  // For fill, parent must be relative; otherwise, pass width/height
  const isFill = !!fill;

  // Modal Image Adaptation
  const modalFill =
    // If parent image is fill, keep fill in modal, else use contain/fixed
    imageProps.fill !== undefined ? imageProps.fill : false;
  const modalWidth = imageProps.width !== undefined ? imageProps.width : 1000;
  const modalHeight = imageProps.height !== undefined ? imageProps.height : 800;

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        ref={imgContainerRef}
        className={`group relative cursor-pointer ${className}`}
        style={{
          display: 'inline-block',
          position: isFill ? 'relative' : undefined,
          width: isFill ? style.width || '200px' : width || style.width || '200px',
          height: isFill ? style.height || '200px' : height || style.height || '200px',
          ...(!isFill && width && height ? {} : { width: '200px', height: '200px' }), // fallback for demo
        }}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill={isFill}
          width={!isFill ? width : undefined}
          height={!isFill ? height : undefined}
          style={{
            objectFit: 'cover',
            width: isFill ? '100%' : '100%',
            height: isFill ? '100%' : 'auto',
            display: 'block',
            borderRadius: 8,
            ...style,
          }}
          {...filterImageProps(restImageProps, ['src', 'alt', 'fill', 'width', 'height', 'style'])}
        />
        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
          style={{ pointerEvents: 'none' }}
        >
          {overlayText ?? <span className="text-base font-semibold text-white">View</span>}
        </div>
      </div>
      {isOpen && (
        <div
          className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black"
          style={{ animation: 'fadeIn .15s' }}
        >
          <button
            aria-label="Close"
            className="absolute top-8 right-8 z-10 rounded-full bg-black/60 p-2 text-white shadow-lg transition-colors hover:bg-black/80"
            style={{ fontSize: 24, lineHeight: 0 }}
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className="relative flex w-full max-w-5xl items-center justify-center"
            style={{
              maxHeight: '90vh',
              maxWidth: '95vw',
              position: modalFill ? 'relative' : undefined,
              width: modalFill ? '90vw' : modalWidth,
              height: modalFill ? '90vh' : modalHeight,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill={modalFill}
              width={!modalFill ? modalWidth : undefined}
              height={!modalFill ? modalHeight : undefined}
              sizes={modalFill ? '90vw' : undefined}
              style={{
                objectFit: 'contain',
                width: modalFill ? '100%' : '100%',
                maxHeight: '90vh',
                borderRadius: 12,
                ...style,
              }}
              {...filterImageProps(restImageProps, [
                'src',
                'alt',
                'fill',
                'width',
                'height',
                'style',
              ])}
              priority
            />
          </div>
          <style jsx global>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};
