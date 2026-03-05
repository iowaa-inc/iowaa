import type {
  ProductAttribute,
  ProductAttributeProperty,
  ProductAttributeProposal,
  ProductEntity,
  ProductOffer,
} from './types';

export const productEntity: ProductEntity[] = [
  {
    id: 'pe-0',
    name: 'PUMA RS-X Heritage Sneakers',
    brand: 'PUMA',
    type: 'Sneakers',
    images: [
      '/placeholders/products/puma-rsx-heritage/puma-rsx-heritage-font-side.webp',
      '/placeholders/products/puma-rsx-heritage/puma-rsx-heritage-front.png',
      '/placeholders/products/puma-rsx-heritage/puma-rsx-heritage-back.webp',
      '/placeholders/products/puma-rsx-heritage/puma-rsx-heritage-bottom-top.webp',
      '/placeholders/products/puma-rsx-heritage/puma-rsx-heritage-left-one.webp',
      '/placeholders/products/puma-rsx-heritage/puma-rsx-heritage-left.webp',
      '/placeholders/products/puma-rsx-heritage/puma-rsx-heritage-right.webp',
    ],
    createdOn: '2024-06-04T00:00:00.000Z',
    updatedOn: '2024-06-04T00:00:00.000Z',
    description: `
            <div>
                <p>
                    Take your street style to the next level and make history in the <b>PUMA RS-X Heritage Sneakers</b>.
                    A bold fusion of retro-futuristic design and modern sustainability, these shoes are engineered for those who demand to stand out while living life on the move.
                </p>
                <h4 style="margin:1em 0 0.5em 0;"><b>Redefining Retro-Future Style</b></h4>
                <ul>
                    <li>
                        This silhouette commands attention with its signature chunky, multi-layered aesthetic.
                    </li>
                    <li>
                        Design features a sophisticated interplay of textures, combining a breathable <b>textile mesh base</b> with premium <b>hairy suede and synthetic overlays</b>.
                    </li>
                    <li>
                        Presented in a versatile cream and beige palette—grounded by earthy olive panels,<br/>
                        electrified by <b>vibrant orange geometric accents</b> on the midsole.
                    </li>
                    <li>
                        Creates a dynamic visual experience bridging the gap between heritage runner and modern street icon.
                    </li>
                </ul>
                <h4 style="margin:1em 0 0.5em 0;"><b>Legendary Comfort &amp; Innovation</b></h4>
                <ul>
                    <li>
                        At the core: PUMA’s celebrated <b>Running System (RS)</b> technology,
                        an advanced cushioning concept honoring moments of cultural reinvention.
                    </li>
                    <li>
                        <b>Lightweight PU midsole</b> delivers superior energy return and distinct “bounciness” with every stride.
                    </li>
                    <li>
                        Padded collar and <b>moulded heel piece</b> ensure a secure, plush fit for all-day wear.
                    </li>
                </ul>
                <h4 style="margin:1em 0 0.5em 0;"><b>Conscious Craftsmanship</b></h4>
                <ul>
                    <li>
                        Style meets responsibility in a build that looks to the future.
                    </li>
                    <li>
                        Construction incorporates <b>at least 20% recycled materials</b> in the upper and <b>10% in the bottom</b>.
                    </li>
                    <li>
                        Finished with a durable <b>rubber outsole</b> for traction and iconic <b>screen-printed PUMA Formstrip</b>.
                    </li>
                    <li>
                        Proves that high-impact fashion can have a lower impact on the planet—this is a sneaker designed to endure.
                    </li>
                </ul>
                <p>
                    <i>Make a statement with every step – the journey starts now.</i>
                </p>
            </div>
        `,
    createdById: '',
  },
  {
    id: 'pe-1',
    name: 'Kemi Set',
    brand: 'Zoya',
    type: 'Set',
    images: [
      '/placeholders/products/kemi-set-front.png',
      '/placeholders/products/kemi-set-back.png',
      '/placeholders/products/kemi-set-right.png',
    ],
    createdOn: '2024-06-01T00:00:00.000Z',
    updatedOn: '2024-06-01T00:00:00.000Z',
    description: `Upgrade your work wardrobe with the <b>Kemi Set</b> &mdash; a sophisticated, two-piece power ensemble designed to help you own the week.<br><br>
        <ul>
            <li><b>Includes:</b> Sleeveless crepe vest (<i>tailored fit</i>) + high-waisted cigarette trousers</li>
            <li><b>Fabric:</b> Breathable, luxurious crepe &mdash; sharp look, maximum comfort</li>
            <li><b>Look:</b> Effortlessly professional; crisp lines and versatile style for boardrooms or business lunches</li>
            <li><b>Inspiration:</b> Designed for the trailblazer who makes Mondays look easy</li>
            <li><b>Care:</b> Machine-washable, wrinkle-resistant</li>
        </ul>
        <i>Make an impression on your next big day: The Kemi Set brings senior-manager polish to your every move.</i>`,
    createdById: '',
  },
  {
    id: 'pe-2',
    name: 'Adesua Midi',
    brand: 'Zoya',
    type: 'Dress',
    images: [
      '/placeholders/products/adesua-midi-front.png',
      '/placeholders/products/adesua-midi-back.png',
      '/placeholders/products/adesua-midi-left.png',
      '/placeholders/products/adesua-midi-right.png',
    ],
    createdOn: '2024-06-02T00:00:00.000Z',
    updatedOn: '2024-06-02T00:00:00.000Z',
    description:
      'A midi-length faux-wrap dress with a smart collar. Reliable, classy, and transitions perfectly from customer meetings to evening events.',
    createdById: '',
  },
  {
    id: 'pe-3',
    name: 'Simi Shift',
    brand: 'Zoya',
    type: 'Dress',
    images: ['/placeholders/products/simi-shift.png'],
    createdOn: '2024-06-03T00:00:00.000Z',
    updatedOn: '2024-06-03T00:00:00.000Z',
    description:
      'A simple A-line shift dress made with Adire (Tie-dye) and soft denim pockets. Perfect for Dress Down Fridays — fun and youthful.',
    createdById: '',
  },
  {
    id: 'pe-4',
    name: 'Ngozi Peplum Set',
    brand: 'Zoya',
    type: 'Set',
    images: ['/placeholders/products/ngozi-peplum-set.png'],
    createdOn: '2024-06-04T00:00:00.000Z',
    updatedOn: '2024-06-04T00:00:00.000Z',
    description:
      "A structured, two-piece set with a waist-cinching peplum top and a midi pencil skirt. Perfect 'serious business' outfit — hides post-lunch bloat stylishly.",
    createdById: '',
  },
  {
    id: 'pe-5',
    name: 'Zainab Trousers',
    brand: 'Zoya',
    type: 'Trousers',
    images: ['/placeholders/products/zainab-trousers.png'],
    createdOn: '2024-06-05T00:00:00.000Z',
    updatedOn: '2024-06-05T00:00:00.000Z',
    description:
      'Ultra high-waisted, floor-length palazzo trousers with deep pockets. Breezy elegance — perfect with office heels.',
    createdById: '',
  },
  {
    id: 'pe-6',
    name: 'Chioma Top',
    brand: 'Zoya',
    type: 'Top',
    images: ['/placeholders/products/chioma-top.png'],
    createdOn: '2024-06-06T00:00:00.000Z',
    updatedOn: '2024-06-06T00:00:00.000Z',
    description:
      'A fitted crepe bodice top with dramatic, sheer organza puffy sleeves. Trendy and perfect for making a statement on video calls.',
    createdById: '',
  },
  {
    id: 'pe-7',
    name: 'Farida Kimono',
    brand: 'Zoya',
    type: 'Jacket',
    images: ['/placeholders/products/farida-kimono.png'],
    createdOn: '2024-06-07T00:00:00.000Z',
    updatedOn: '2024-06-07T00:00:00.000Z',
    description:
      'A hip-length, open-front jacket with three-quarter sleeves and a slight sheen. The stylish solution to freezing office A/C.',
    createdById: '',
  },
  {
    id: 'pe-8',
    name: 'Bidemi Jumpsuit',
    brand: 'Zoya',
    type: 'Jumpsuit',
    images: ['/placeholders/products/bidemi-jumpsuit.png'],
    createdOn: '2024-06-14T00:00:00.000Z',
    updatedOn: '2024-06-14T00:00:00.000Z',
    description:
      "A practical wide-leg jumpsuit with a V-neck wrap top and easy-access back zipper. For effortless, high-impact style when you can't be bothered to match separates.",
    createdById: '',
  },
  {
    id: 'pe-9',
    name: 'Folake Shirt-Boubou',
    brand: 'Zoya',
    type: 'Dress',
    images: ['/placeholders/products/folake-shirt-boubou.png'],
    createdOn: '2024-06-21T00:00:00.000Z',
    updatedOn: '2024-06-21T00:00:00.000Z',
    description:
      'A modern, free-size midi dress featuring a crisp shirt collar and button placket. Where comfort meets corporate structure.',
    createdById: '',
  },
];

export const productOffer: ProductOffer[] = [
  {
    id: 'po-0',
    entityId: 'pe-0',
    price: 152400,
    description:
      'Retro-futurist PUMA RS-X: heritage-inspired chunky sneakers with advanced RS tech, recycled materials, vibrant orange accents, and legendary comfort.',
    availability: true,
  },
  {
    id: 'po-1',
    entityId: 'pe-1',
    price: 28500,
    description:
      'Tailored vest and trouser set for ultimate boss energy. Versatile power dressing, all in one.',
    availability: true,
  },
  {
    id: 'po-2',
    entityId: 'pe-2',
    price: 18000,
    description:
      'Faux wrap midi dress in soft silk or patterned chiffon, effortless polish for meetings and events.',
    availability: true,
  },
  {
    id: 'po-3',
    entityId: 'pe-3',
    price: 16500,
    description:
      'Adire shift dress with denim details; bold color and comfort for Dress Down Fridays.',
    availability: true,
  },
  {
    id: 'po-4',
    entityId: 'pe-4',
    price: 26000,
    description:
      'Peplum top and pencil skirt; elegant, waist-cinching set for the office or special occasions.',
    availability: true,
  },
  {
    id: 'po-5',
    entityId: 'pe-5',
    price: 17500,
    description:
      'High-waist palazzo trousers with deep pockets; smart yet relaxed, perfect for workwear rotation.',
    availability: true,
  },
  {
    id: 'po-6',
    entityId: 'pe-6',
    price: 15000,
    description:
      'Fitted crepe top with sheer organza puffy sleeves for instant presence on every call.',
    availability: true,
  },
  {
    id: 'po-7',
    entityId: 'pe-7',
    price: 19500,
    description:
      'Sleek kimono jacket in a lustrous finish, three-quarter sleeves for year-round layering.',
    availability: true,
  },
  {
    id: 'po-8',
    entityId: 'pe-8',
    price: 29000,
    description:
      'Wide-leg jumpsuit with V-neck wrap; zips in the back for easy, high-impact style.',
    availability: true,
  },
  {
    id: 'po-9',
    entityId: 'pe-9',
    price: 24000,
    description:
      'Modern midi shirt-boubou featuring crisp collar and button placket; for comfort and style.',
    availability: true,
  },
];

export const productAttributesProperties: ProductAttributeProperty[] = [
  // Kemi Set (pe-1)
  { id: 'a-1', name: 'Material', type: 'Text', entityId: 'pe-1' },
  { id: 'a-2', name: 'Style', type: 'Text', entityId: 'pe-1' },
  { id: 'a-3', name: 'Pieces', type: 'Text', entityId: 'pe-1' },
  { id: 'a-4', name: 'Color', type: 'Text', entityId: 'pe-1' },
  { id: 'a-5', name: 'Fit', type: 'Text', entityId: 'pe-1' },
  { id: 'a-6', name: 'Features', type: 'Text', entityId: 'pe-1' },
  { id: 'a-7', name: 'Occasion', type: 'Text', entityId: 'pe-1' },
  // Puma RS-X Heritage Sneakers (pe-0)
  { id: 'p0-1', name: 'Brand', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-2', name: 'Model', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-3', name: 'Category', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-4', name: 'Upper Material', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-5', name: 'Midsole', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-6', name: 'Outsole', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-7', name: 'Colorway', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-8', name: 'Closure Type', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-9', name: 'Toe Shape', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-10', name: 'Heel Type', type: 'Text', entityId: 'pe-0' },
  { id: 'p0-11', name: 'Key Features', type: 'LongText', entityId: 'pe-0' },
  { id: 'p0-12', name: 'Visible Logos', type: 'Text', entityId: 'pe-0' },
];

export const productAttributes: ProductAttribute[] = [
  // Kemi Set attributes
  {
    id: 'pat-1',
    propertyId: 'a-1',
    entityId: 'pe-1',
    value: 'Thick slightly-stretchy Crepe',
  },
  { id: 'pat-2', propertyId: 'a-2', entityId: 'pe-1', value: 'Power Set' },
  {
    id: 'pat-3',
    propertyId: 'a-3',
    entityId: 'pe-1',
    value: 'Vest & Trouser',
  },
  {
    id: 'pat-4',
    propertyId: 'a-4',
    entityId: 'pe-1',
    value: 'Available in multiple colors',
  },
  {
    id: 'pat-5',
    propertyId: 'a-5',
    entityId: 'pe-1',
    value: 'Tailored, high-waist',
  },

  // Puma RS-X Heritage Sneakers (pe-0) attributes
  { id: 'p0-pat-1', propertyId: 'p0-1', entityId: 'pe-0', value: 'PUMA' },
  {
    id: 'p0-pat-2',
    propertyId: 'p0-2',
    entityId: 'pe-0',
    value: 'RS-X (Running System - X)',
  },
  {
    id: 'p0-pat-3',
    propertyId: 'p0-3',
    entityId: 'pe-0',
    value: 'Lifestyle / Retro Runner / Dad Shoe',
  },
  {
    id: 'p0-pat-4',
    propertyId: 'p0-4',
    entityId: 'pe-0',
    value: 'Breathable mesh base with textured suede and synthetic leather overlays',
  },
  {
    id: 'p0-pat-5',
    propertyId: 'p0-5',
    entityId: 'pe-0',
    value: 'Lightweight PU midsole with RS (Running System) cushioning technology',
  },
  {
    id: 'p0-pat-6',
    propertyId: 'p0-6',
    entityId: 'pe-0',
    value: 'Rubber outsole for durable grip and traction',
  },
  {
    id: 'p0-pat-7',
    propertyId: 'p0-7',
    entityId: 'pe-0',
    value: 'Cream/Beige (Base) with Olive Green (Overlays) and Vibrant Orange (Accents)',
  },
  {
    id: 'p0-pat-8',
    propertyId: 'p0-8',
    entityId: 'pe-0',
    value: 'Traditional Lace-up',
  },
  { id: 'p0-pat-9', propertyId: 'p0-9', entityId: 'pe-0', value: 'Round Toe' },
  {
    id: 'p0-pat-10',
    propertyId: 'p0-10',
    entityId: 'pe-0',
    value: 'Flat, Chunky Platform',
  },
  {
    id: 'p0-pat-11',
    propertyId: 'p0-11',
    entityId: 'pe-0',
    value: [
      '"RS-X" branding on tongue pull tab',
      '"RS RUNNING SYSTEM" text on lateral side',
      'Bulky, multi-layered aesthetic',
      'Padded collar and tongue for comfort',
      'Heel and tongue pull loops for easy on/off',
    ]
      .map((f) => `• ${f}`)
      .join('<br>'),
  },
  {
    id: 'p0-pat-12',
    propertyId: 'p0-12',
    entityId: 'pe-0',
    value: 'Puma Cat logo on tongue tab; Formstrip on lateral sides',
  },
];

export const productAttributeProposals: ProductAttributeProposal[] = [
  // Puma RS-X Heritage Sneakers (pe-0) attributes
  {
    id: 'pap-p0-1',
    value: "Men's US 8-12; Women's US 6-10; Unisex Sizing",
    entityId: 'pe-0',
    attributeId: '',
    propertyId: 'p0-13',
    createdById: '',
    createdOn: '2024-06-04T12:00:00.000Z',
    votes: 0,
    votesRequired: 4,
  },
  {
    id: 'pap-p0-2',
    value: 'Removable cushioned insole for added comfort and support',
    entityId: 'pe-0',
    attributeId: '',
    propertyId: 'p0-14',
    createdById: '',
    createdOn: '2024-06-04T12:02:00.000Z',
    votes: 0,
    votesRequired: 4,
  },
  {
    id: 'pap-p0-3',
    value: 'Regular fit',
    entityId: 'pe-0',
    attributeId: '',
    propertyId: 'p0-15',
    createdById: '',
    createdOn: '2024-06-04T12:04:00.000Z',
    votes: 0,
    votesRequired: 3,
  },
  {
    id: 'pap-p0-4',
    value: '398210_10',
    entityId: 'pe-0',
    attributeId: '',
    propertyId: 'p0-16',
    createdById: '',
    createdOn: '2024-06-04T12:06:00.000Z',
    votes: 0,
    votesRequired: 3,
  },
  {
    id: 'pap-p0-5',
    value: 'Padded collar and tongue',
    entityId: 'pe-0',
    attributeId: '',
    propertyId: 'p0-17',
    createdById: '',
    createdOn: '2024-06-04T12:08:00.000Z',
    votes: 0,
    votesRequired: 3,
  },
  {
    id: 'pap-p0-6',
    value: 'Heel and tongue pull loops for easy on/off',
    entityId: 'pe-0',
    attributeId: '',
    propertyId: 'p0-18',
    createdById: '',
    createdOn: '2024-06-04T12:10:00.000Z',
    votes: 0,
    votesRequired: 3,
  },

  // Kemi Set attributes
  {
    id: 'pap-1',
    value: 'Thick slightly-stretchy Crepe',
    entityId: 'pe-1',
    attributeId: 'pat-1',
    propertyId: 'a-1',
    createdById: '',
    createdOn: '2024-06-01T12:00:00.000Z',
    votes: 6,
    votesRequired: 10,
  },
  {
    id: 'pap-2',
    value: 'Cotton',
    entityId: 'pe-1',
    attributeId: 'pat-1',
    propertyId: 'a-1',
    createdById: '',
    createdOn: '2024-06-01T13:00:00.000Z',
    votes: 2,
    votesRequired: 5,
  },
  {
    id: 'pap-3',
    value: 'Power Set',
    entityId: 'pe-1',
    attributeId: 'pat-2',
    propertyId: 'a-2',
    createdById: '',
    createdOn: '2024-06-01T14:00:00.000Z',
    votes: 4,
    votesRequired: 5,
  },
  {
    id: 'pap-4',
    value: 'Midi Dress',
    entityId: 'pe-1',
    attributeId: 'pat-2',
    propertyId: 'a-2',
    createdById: '',
    createdOn: '2024-06-01T15:00:00.000Z',
    votes: 3,
    votesRequired: 5,
  },
];
