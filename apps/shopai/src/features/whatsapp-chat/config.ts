import type { WhatsappMessageTemplate, WhatsappTemplateMeta } from './type';

export const whatsappMessageTemplateRegistry: Record<
  WhatsappMessageTemplate,
  WhatsappTemplateMeta
> = {
  whatsapp_greeting: {
    name: 'whatsapp_greeting',
    components: [
      {
        type: 'BODY',
        text: 'Hello {{1}}, welcome to Iowaa.shop! How can we help you today?',
      },
    ],
  },
  whatsapp_product_info: {
    name: 'whatsapp_product_info',
    components: [
      {
        type: 'BODY',
        text: 'Here are the details for the product: {{1}}.\nPrice: {{2}}.',
      },
    ],
  },
  whatsapp_price: {
    name: 'whatsapp_price',
    components: [
      {
        type: 'BODY',
        text: 'The price for {{1}} is {{2}}.',
      },
    ],
  },
  whatsapp_delivery: {
    name: 'whatsapp_delivery',
    components: [
      {
        type: 'BODY',
        text: 'Your order {{1}} has been shipped! Track here: {{2}}.',
      },
      {
        type: 'FOOTER',
        text: 'Thank you for choosing Iowaa.shop',
      },
    ],
  },
  whatsapp_custom: {
    name: 'whatsapp_custom',
    components: [
      {
        type: 'BODY',
        text: '{{1}}',
      },
    ],
  },
};
