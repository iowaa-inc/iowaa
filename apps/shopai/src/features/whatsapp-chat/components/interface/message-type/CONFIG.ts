import { TemplateMessage } from './template';
import { TextMessage } from './text';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MESSAGE_TYPE_COMPONENTS: Record<string, React.FC<any>> = {
  text: TextMessage,
  template: TemplateMessage,
  // Add more mappings as you implement more message types, e.g.:
  // image: ImageMessage,
  // etc.
};
