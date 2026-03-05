export type WhatsappMessageType =
  | 'text'
  | 'template'
  | 'image'
  | 'document'
  | 'audio'
  | 'video'
  | 'sticker'
  | 'location'
  | 'contacts'
  | 'interactive'
  | 'button'
  | 'unsupported';

export type WhatsappMessageTemplate =
  | 'whatsapp_greeting'
  | 'whatsapp_product_info'
  | 'whatsapp_price'
  | 'whatsapp_delivery'
  | 'whatsapp_custom';

export type WhatsappTemplateComponent =
  | {
      type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
      text?: string;
      format?: 'TEXT' | 'IMAGE' | 'DOCUMENT' | 'VIDEO';
    }
  | {
      type: 'BUTTONS';
      sub_type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
      index: number;
      text: string;
    };

export type WhatsappTemplateMeta = {
  name: WhatsappMessageTemplate;
  components: WhatsappTemplateComponent[];
  // WhatsApp recommends more metadata fields, but these are core
};

export type WhatsappMessage = {
  id: string;
  text: string;
  sentAt: Date;
  sender: 'user' | 'system';
  type: WhatsappMessageType;
  template?: WhatsappMessageTemplate;
  /**
   * Values used to fill template placeholders in `whatsappMessageTemplateRegistry`.
   * Example: template text "Price: {{2}}" uses templateArgs[1].
   */
  templateArgs?: string[];
  /**
   * WhatsApp-style delivery state for outgoing (user) messages.
   * - sent: single tick
   * - delivered: double ticks (grey)
   * - read: double ticks (blue)
   */
  deliveryStatus?: 'sent' | 'delivered' | 'read';
};
