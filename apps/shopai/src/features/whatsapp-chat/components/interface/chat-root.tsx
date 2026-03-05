import React from 'react';

import Image from 'next/image';

type WhatsappChatRootProps = {
  children: React.ReactNode;
  className?: string;
};

export function ChatRoot({ children, className }: WhatsappChatRootProps) {
  return (
    <div
      className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden ${className ?? ''}`}
    >
      <Image
        src="/images/whatsApp-default-dark-doodle-wallpaper.jpg"
        alt="WhatsApp Doodle Wallpaper"
        fill
        className="pointer-events-none select-none"
        style={{ objectFit: 'cover', zIndex: 0 }}
        priority
      />
      {/* Foreground content */}
      <div className="relative z-10 flex h-full min-h-0 w-full flex-col">{children}</div>
    </div>
  );
}
