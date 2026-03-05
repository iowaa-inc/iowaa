import type { WhatsappMessage } from '../../type';
import { MESSAGE_TYPE_COMPONENTS } from './message-type/CONFIG';

export type MessageProps = {
  message: WhatsappMessage;
};

// message orchestrator
export function ChatMessage({ message }: MessageProps) {
  const MessageComponent = MESSAGE_TYPE_COMPONENTS[message.type] ?? MESSAGE_TYPE_COMPONENTS['text'];

  if (!MessageComponent) return null;

  // Common props passed into all message-type components.
  // Individual components can choose which fields to use.
  const commonProps = {
    text: message.text,
    scope: message.sender,
    message,
  };

  return <MessageComponent {...commonProps} />;
}
