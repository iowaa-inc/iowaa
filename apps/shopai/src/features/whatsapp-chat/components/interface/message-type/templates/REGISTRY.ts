import type { WhatsappMessageTemplate } from '../../../../type';
import type { WhatsappMessage } from '../../../../type';
import { WhatsappProductInfoTemplate } from './whatsapp_product_info';

export type TemplateComponentProps = {
  message: WhatsappMessage;
};

export const TEMPLATE_COMPONENTS: Partial<
  Record<WhatsappMessageTemplate, React.FC<TemplateComponentProps>>
> = {
  whatsapp_product_info: WhatsappProductInfoTemplate,
};
