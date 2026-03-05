'use client';

import { useState } from 'react';

import { WhatsappChat } from '@/features/whatsapp-chat/components/interface';
import { sampleMessage } from '@/features/whatsapp-chat/data';

import { Iphone16Mockup } from '@/components/iphone16-mockup';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PlaygroundPage() {
  const [message] = useState(sampleMessage);

  return (
    <ScrollArea className="h-full w-full">
      {/* Show the iPhone mockup only on desktop screens (md and up) */}
      <div className="flex h-full w-full items-center justify-center pb-20 md:pb-0">
        <div className="hidden md:block">
          <Iphone16Mockup className="max-h-[600px] bg-[#2b3e49] text-white">
            <WhatsappChat>
              <WhatsappChat.Header
                info={{
                  avatarSrc: '/images/iowaa-icon.png',
                  name: 'Iowaa.shop',
                }}
              />
              <WhatsappChat.Body>
                {message.map((m) => (
                  <WhatsappChat.Message key={m.id} message={m} />
                ))}
              </WhatsappChat.Body>
              <WhatsappChat.Footer />
            </WhatsappChat>
          </Iphone16Mockup>
        </div>
        {/* On smaller screens (mobile/tablet), show just the chat area without the mockup */}
        <div className="mx-auto block w-full max-w-md md:hidden">
          <div className="overflow-hidden rounded-xl bg-[#2b3e49] text-white shadow-lg">
            <WhatsappChat>
              <WhatsappChat.Header
                info={{
                  avatarSrc: '/images/iowaa-icon.png',
                  name: 'Iowaa.shop',
                }}
              />
              <WhatsappChat.Body>
                {message.map((m) => (
                  <WhatsappChat.Message key={m.id} message={m} />
                ))}
              </WhatsappChat.Body>
              <WhatsappChat.Footer />
            </WhatsappChat>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
