import React from 'react';

import clsx from 'clsx';

import type { WhatsappMessage } from '../../../type';

type TextMessageProps = {
  text: string;
  content?: React.ReactNode;
  scope?: 'user' | 'system'; // determines the side and style
  sentAt?: Date;
  message?: WhatsappMessage;
};

function TickIcon({ status }: { status: NonNullable<WhatsappMessage['deliveryStatus']> }) {
  const isSent = status === 'sent';
  const isRead = status === 'read';
  const stroke = isRead ? '#53bdeb' : '#667781'; // WhatsApp-ish blue/grey

  if (isSent) {
    // single tick
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-[14px] w-[14px]" fill="none">
        <path d="M6.1 10.3 3.2 7.4 2.1 8.5l4 4L14 4.6l-1.1-1.1-6.8 6.8Z" fill={stroke} />
      </svg>
    );
  }

  // double ticks (delivered/read)
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="h-[14px] w-[18px]" fill="none">
      <path d="M6.2 12.3 2.8 8.9l-1 1 4.4 4.4L14.5 5.9l-1-1-7.3 7.4Z" fill={stroke} />
      <path
        d="M8.6 12.3 5.2 8.9l-1 1 4.4 4.4L16.9 5.9l-1-1-7.3 7.4Z"
        fill={stroke}
        opacity={0.95}
      />
    </svg>
  );
}

export const TextMessage: React.FC<TextMessageProps> = ({
  text,
  content,
  scope = 'system',
  sentAt,
  message,
}) => {
  const isUser = scope === 'user';
  const date = sentAt ?? message?.sentAt;
  const deliveryStatus = message?.deliveryStatus;

  const timeText =
    date instanceof Date && !Number.isNaN(date.getTime())
      ? new Intl.DateTimeFormat(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(date)
      : '';

  return (
    <div className={clsx('mb-2 flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'relative max-w-[78%] px-3 pt-2 pr-12 pb-5 text-[14px] leading-tight whitespace-pre-wrap',
          isUser
            ? 'rounded-[7px] rounded-br-[3px] bg-[#dcf8c6] text-black' // WhatsApp-ish user bubble
            : 'rounded-[7px] rounded-bl-[3px] bg-white text-black', // WhatsApp-ish incoming bubble
        )}
        style={{
          boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
        }}
      >
        {/* bubble tail */}
        <span
          aria-hidden="true"
          className={clsx('absolute top-0 h-0 w-0', isUser ? '-right-[6px]' : '-left-[6px]')}
          style={{
            borderBottom: '10px solid transparent',
            ...(isUser
              ? {
                  borderLeft: '10px solid #dcf8c6',
                }
              : {
                  borderRight: '10px solid #ffffff',
                }),
          }}
        />

        <span>{content ?? text}</span>

        {/* timestamp (inside bubble, bottom-right) */}
        {timeText ? (
          <span
            className={clsx(
              'absolute right-[8px] bottom-[6px] flex items-center gap-1 text-[11px] leading-none',
              isUser ? 'text-black/45' : 'text-black/40',
            )}
          >
            <span>{timeText}</span>
            {isUser && deliveryStatus ? <TickIcon status={deliveryStatus} /> : null}
          </span>
        ) : null}
      </div>
    </div>
  );
};

// Example usage
// <TextMessage text="Hello! How are you?" scope="user" />
// <TextMessage text="I'm good, thanks! What about you?" scope="system" />
