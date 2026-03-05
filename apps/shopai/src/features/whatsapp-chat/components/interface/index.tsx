import { ChatBody } from './chat-body';
import { ChatFooter } from './chat-footer';
import { ChatHeader } from './chat-header';
import { ChatMessage } from './chat-message';
import { ChatRoot } from './chat-root';

export const WhatsappChat = Object.assign(ChatRoot, {
  Header: ChatHeader,
  Body: ChatBody,
  Footer: ChatFooter,
  Message: ChatMessage,
});
