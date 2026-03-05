import type { WhatsappMessage } from '@/features/whatsapp-chat/type';

export const sampleMessage: WhatsappMessage[] = [
  {
    id: '1',
    text: "Hi, I'm interested in buying the wireless earbuds listed on your store.",
    sentAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    sender: 'user',
    type: 'text',
    deliveryStatus: 'read',
  },
  {
    id: '2',
    text: "Hello! 👋 Thanks for reaching out to Iowaa.shop. I'd be happy to help you with the wireless earbuds. Would you like to know the price, features, or availability?",
    sentAt: new Date(Date.now() - 1000 * 60 * 4.5), // 4.5 minutes ago
    sender: 'system',
    type: 'text',
  },
  {
    id: '2b',
    text: '', // will be rendered from template registry + args
    sentAt: new Date(Date.now() - 1000 * 60 * 4.3), // 4.3 minutes ago
    sender: 'system',
    type: 'template',
    template: 'whatsapp_product_info',
    templateArgs: ['Wireless Earbuds Pro', '$59.99'],
  },
  {
    id: '3',
    text: 'Yes, could you tell me the price and if they are in stock?',
    sentAt: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    sender: 'user',
    type: 'text',
    deliveryStatus: 'read',
  },
  {
    id: '4',
    text: 'The price for Wireless Earbuds Pro is $59.99. Good news—they are currently in stock! 🎧',
    sentAt: new Date(Date.now() - 1000 * 60 * 3.5), // 3.5 minutes ago
    sender: 'system',
    type: 'template',
    template: 'whatsapp_price',
  },
  {
    id: '5',
    text: 'Great! How long does the delivery take?',
    sentAt: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    sender: 'user',
    type: 'text',
    deliveryStatus: 'read',
  },
  {
    id: '6',
    text: 'Your order can be delivered in 2-4 business days, depending on your location. Would you like to place an order now?',
    sentAt: new Date(Date.now() - 1000 * 60 * 2.7), // 2.7 minutes ago
    sender: 'system',
    type: 'text',
  },
  {
    id: '7',
    text: 'Yes, I want to order one set.',
    sentAt: new Date(Date.now() - 1000 * 60 * 2.3), // 2.3 minutes ago
    sender: 'user',
    type: 'text',
    deliveryStatus: 'delivered',
  },
  {
    id: '8',
    text: 'Awesome! Please provide your delivery address to proceed with your order.',
    sentAt: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    sender: 'system',
    type: 'text',
  },
  {
    id: '9',
    text: '123 Main Street, Lagos',
    sentAt: new Date(Date.now() - 1000 * 60 * 1.7), // 1.7 minutes ago
    sender: 'user',
    type: 'text',
    deliveryStatus: 'sent',
  },
  {
    id: '10',
    text: 'Thank you! 🎉 Your order for Wireless Earbuds Pro is being processed and will be shipped soon. Track here: https://iowaa.shop/track/ABC123.\nThank you for choosing Iowaa.shop',
    sentAt: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
    sender: 'system',
    type: 'template',
    template: 'whatsapp_delivery',
  },
  {
    id: '11',
    text: 'Thank you! 🙏',
    sentAt: new Date(Date.now() - 1000 * 60 * 0.5), // 30 seconds ago
    sender: 'user',
    type: 'text',
    deliveryStatus: 'sent',
  },
  {
    id: '12',
    text: "You're welcome. If you have more questions, just ask me here anytime.",
    sentAt: new Date(), // now
    sender: 'system',
    type: 'text',
  },
];
