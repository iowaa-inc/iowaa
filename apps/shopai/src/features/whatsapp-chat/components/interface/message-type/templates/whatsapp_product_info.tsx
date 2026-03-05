import React from 'react';

import type { WhatsappMessage } from '../../../../type';
import { FormattedText } from '../formatted-text';

type WhatsappProductInfoTemplateProps = {
  message: WhatsappMessage;
};

function interpolate(template: string, args: string[] = []) {
  return template.replace(/\{\{(\d+)\}\}/g, (_match, indexStr: string) => {
    const index = Number(indexStr);
    if (!Number.isFinite(index) || index <= 0) return '';
    return args[index - 1] ?? '';
  });
}

/**
 * Template-specific renderer for `whatsapp_product_info`.
 *
 * This is where you can implement 1:1 WhatsApp template behaviors:
 * - formatted text (bold/italic/monospace)
 * - header media (image/document/video)
 * - buttons (quick reply/url/phone)
 *
 * For now we render a realistic "product info" bubble layout using the args.
 */
export const WhatsappProductInfoTemplate: React.FC<WhatsappProductInfoTemplateProps> = ({
  message,
}) => {
  const args = message.templateArgs ?? [];
  const productName = args[0] ?? 'Product';
  const price = args[1] ?? '';

  const timeText =
    message.sentAt instanceof Date && !Number.isNaN(message.sentAt.getTime())
      ? new Intl.DateTimeFormat(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(message.sentAt)
      : '';

  // “Realistic” WhatsApp-ish text formatting: bold product name, line breaks, compact meta.
  const lines = [
    `Here are the details for the product: *${productName}*`,
    price ? `Price: *${price}*` : '',
  ].filter(Boolean);

  return (
    <div className="mb-2 flex w-full justify-start">
      <div
        className="relative max-w-[78%] rounded-[7px] rounded-bl-[3px] bg-white px-3 pt-2 pr-12 pb-5 text-[14px] leading-tight whitespace-pre-wrap text-black"
        style={{ boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)' }}
      >
        {/* bubble tail (incoming) */}
        <span
          aria-hidden="true"
          className="absolute top-0 -left-[6px] h-0 w-0"
          style={{
            borderBottom: '10px solid transparent',
            borderRight: '10px solid #ffffff',
          }}
        />

        {/* formatted text - for now we just keep asterisks; next step is rendering spans */}
        <span>
          <FormattedText text={interpolate(lines.join('\n'), args)} />
        </span>

        {/* timestamp */}
        {timeText ? (
          <span className="absolute right-[8px] bottom-[6px] text-[11px] leading-none text-black/40">
            {timeText}
          </span>
        ) : null}
      </div>
    </div>
  );
};
