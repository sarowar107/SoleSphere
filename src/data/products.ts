export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  description: string;
  sizes: number[];
  stock: number;
  category: 'Lifestyle' | 'Running' | 'Basketball' | 'Skateboarding' | 'Soccer';
  isBestSeller: boolean;
  isNewArrival: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 'ss-001',
    name: 'Cosmic Glide',
    brand: 'Nova',
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewCount: 1204,
    imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Experience unparalleled comfort and style with the Cosmic Glide. Featuring a lightweight mesh upper and responsive cushioning, it\'s perfect for everyday wear.',
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 50,
    category: 'Lifestyle',
    isBestSeller: true,
    isNewArrival: true,
    tags: ['comfort', 'stylish', 'lightweight'],
  },
  {
    id: 'ss-002',
    name: 'Velocity Runner',
    brand: 'Apex',
    price: 179.99,
    rating: 4.9,
    reviewCount: 2345,
    imageUrl: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Push your limits with the Velocity Runner. Engineered for speed and performance, its carbon-fiber plate propels you forward with every stride.',
    sizes: [8, 9, 10, 11],
    stock: 30,
    category: 'Running',
    isBestSeller: true,
    isNewArrival: false,
    tags: ['performance', 'speed', 'running'],
  },
  {
    id: 'ss-003',
    name: 'Urban Roamer',
    brand: 'Crete',
    price: 99.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviewCount: 876,
    imageUrl: 'https://images.pexels.com/photos/2692460/pexels-photo-2692460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/2692460/pexels-photo-2692460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Navigate the city streets in style with the Urban Roamer. Its durable canvas upper and classic silhouette make it a versatile wardrobe staple.',
    sizes: [7, 8, 9, 10, 11, 12, 13],
    stock: 80,
    category: 'Lifestyle',
    isBestSeller: false,
    isNewArrival: true,
    tags: ['classic', 'durable', 'urban'],
  },
  {
    id: 'ss-004',
    name: 'Sky Dunker',
    brand: 'Gravity',
    price: 199.99,
    rating: 4.9,
    reviewCount: 3102,
    imageUrl: 'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Dominate the court with the Sky Dunker. Designed for explosive takeoffs and soft landings, it provides maximum support and impact protection.',
    sizes: [9, 10, 11, 12, 13, 14],
    stock: 25,
    category: 'Basketball',
    isBestSeller: true,
    isNewArrival: false,
    tags: ['basketball', 'support', 'performance'],
  },
  {
    id: 'ss-005',
    name: 'Deck Master',
    brand: 'Grind',
    price: 79.99,
    originalPrice: 89.99,
    rating: 4.5,
    reviewCount: 654,
    imageUrl: 'https://images.pexels.com/photos/1661905/pexels-photo-1661905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/1661905/pexels-photo-1661905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'The Deck Master is the ultimate skate shoe. Its vulcanized rubber outsole provides excellent grip and board feel, while the suede upper offers durability.',
    sizes: [7, 8, 9, 10, 11],
    stock: 60,
    category: 'Skateboarding',
    isBestSeller: false,
    isNewArrival: true,
    tags: ['skate', 'durable', 'grip'],
  },
  {
    id: 'ss-006',
    name: 'Trail Blazer',
    brand: 'Apex',
    price: 159.99,
    rating: 4.7,
    reviewCount: 932,
    imageUrl: 'https://images.pexels.com/photos/1464521/pexels-photo-1464521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/1464521/pexels-photo-1464521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Conquer any terrain with the Trail Blazer. Featuring a rugged outsole and waterproof membrane, it keeps your feet dry and comfortable on your adventures.',
    sizes: [8, 9, 10, 11, 12],
    stock: 40,
    category: 'Running',
    isBestSeller: false,
    isNewArrival: false,
    tags: ['trail', 'waterproof', 'rugged'],
  },
  {
    id: 'ss-007',
    name: 'Pitch Pro',
    brand: 'Strike',
    price: 139.99,
    rating: 4.8,
    reviewCount: 1589,
    imageUrl: 'https://images.pexels.com/photos/913448/pexels-photo-913448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/913448/pexels-photo-913448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Feel the ball like never before with the Pitch Pro. Its textured upper enhances touch and control, while the lightweight soleplate is built for rapid acceleration.',
    sizes: [8, 9, 10, 11],
    stock: 35,
    category: 'Soccer',
    isBestSeller: true,
    isNewArrival: false,
    tags: ['soccer', 'control', 'lightweight'],
  },
  {
    id: 'ss-008',
    name: 'Cloud Walker',
    brand: 'Nova',
    price: 129.99,
    rating: 4.9,
    reviewCount: 4512,
    imageUrl: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'So light and comfortable, you\'ll feel like you\'re walking on clouds. The Cloud Walker is the perfect shoe for long days on your feet.',
    sizes: [7, 8, 9, 10, 11, 12, 13],
    stock: 100,
    category: 'Lifestyle',
    isBestSeller: true,
    isNewArrival: true,
    tags: ['comfort', 'lightweight', 'all-day wear'],
  },
  {
    id: 'ss-009',
    name: 'Retro Runner \'88',
    brand: 'Crete',
    price: 99.99,
    originalPrice: 109.99,
    rating: 4.7,
    reviewCount: 781,
    imageUrl: 'https://images.pexels.com/photos/2759793/pexels-photo-2759793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/2759793/pexels-photo-2759793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'A timeless classic reimagined. The Retro Runner \'88 combines vintage aesthetics with modern comfort for a shoe that never goes out of style.',
    sizes: [7, 8, 9, 10, 11],
    stock: 70,
    category: 'Lifestyle',
    isBestSeller: false,
    isNewArrival: false,
    tags: ['retro', 'classic', 'vintage'],
  },
  {
    id: 'ss-010',
    name: 'Stealth Striker',
    brand: 'Strike',
    price: 169.99,
    rating: 4.8,
    reviewCount: 1105,
    imageUrl: 'https://images.pexels.com/photos/1580267/pexels-photo-1580267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
        'https://images.pexels.com/photos/1580267/pexels-photo-1580267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Sleek, black, and built for the beautiful game. The Stealth Striker offers a sock-like fit and deadly accuracy for the modern footballer.',
    sizes: [9, 10, 11],
    stock: 20,
    category: 'Soccer',
    isBestSeller: false,
    isNewArrival: true,
    tags: ['soccer', 'sleek', 'accuracy'],
  },
];

const allProducts = [...products];
const brands = ['Nova', 'Apex', 'Crete', 'Gravity', 'Grind', 'Strike'];
const categories: Product['category'][] = ['Lifestyle', 'Running', 'Basketball', 'Skateboarding', 'Soccer'];

for (let i = 0; i < 9; i++) {
    products.forEach(p => {
        const newId = `${p.id}-${i + 1}`;
        if (!allProducts.find(ap => ap.id === newId)) {
            const price = p.price + Math.random() * 20 - 10;
            const shouldHaveDiscount = Math.random() > 0.8;
            allProducts.push({
                ...p,
                id: newId,
                name: `${p.name} Mk${i + 2}`,
                brand: brands[Math.floor(Math.random() * brands.length)],
                category: categories[Math.floor(Math.random() * categories.length)],
                price: shouldHaveDiscount ? price * 0.8 : price,
                originalPrice: shouldHaveDiscount ? price : undefined,
                rating: Math.min(5, p.rating + Math.random() * 0.4 - 0.2),
                isBestSeller: Math.random() > 0.7,
                isNewArrival: Math.random() > 0.6,
            });
        }
    });
}

export const fullProductList = allProducts;
