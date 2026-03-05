import React from 'react';

import { interpolateTemplateText } from '@/features/whatsapp-chat/lib/utils';

import { whatsappMessageTemplateRegistry } from '../../../config';
import type { WhatsappMessage } from '../../../type';
import { FormattedText } from './formatted-text';
import { TEMPLATE_COMPONENTS } from './templates/REGISTRY';
import { TextMessage } from './text';

type TemplateMessageProps = {
  message: WhatsappMessage;
  text?: string;
  scope?: 'user' | 'system';
};

/**
 * Basic template message renderer.
 *
 * For now this simply reuses the text bubble styling from `TextMessage`.
 * In the future you can expand this to:
 * - Look up `message.template` in `whatsappMessageTemplateRegistry`
 * - Inject dynamic variables into the template components
 * - Render richer layouts (buttons, headers, footers, etc.)
 */
export const TemplateMessage: React.FC<TemplateMessageProps> = ({ message, text, scope }) => {
  const templateName = message.template;

  if (!templateName) {
    return <TextMessage text={text ?? message.text} scope={scope ?? message.sender} />;
  }

  // If we have a template-specific renderer, use it.
  const TemplateComponent = TEMPLATE_COMPONENTS[templateName];
  if (TemplateComponent) {
    return <TemplateComponent message={message} />;
  }

  const meta = whatsappMessageTemplateRegistry[templateName];
  const args = message.templateArgs ?? [];

  // For realistic WhatsApp UI, treat template messages as "system" bubbles by default.
  const resolvedScope = scope ?? 'system';

  const body = meta.components
    .filter((c) => c.type === 'BODY' && 'text' in c && typeof c.text === 'string')
    .map((c) => interpolateTemplateText(c.text as string, args))
    .join('\n');

  const footer = meta.components
    .filter((c) => c.type === 'FOOTER' && 'text' in c && typeof c.text === 'string')
    .map((c) => interpolateTemplateText(c.text as string, args))
    .join('\n');

  const composedText = [body, footer].filter(Boolean).join('\n') || (text ?? message.text);

  return (
    <TextMessage
      text={composedText}
      content={<FormattedText text={composedText} />}
      scope={resolvedScope}
      sentAt={message.sentAt}
    />
  );
};
