export const products = [
  {
    id: '1',
    name: 'Whole Wheat Bread',
    description: 'Healthy and fresh wheat bread made with premium quality ingredients',
    category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    price: { fixed: 40 },
    colorOptions: ['Brown' ,'gold' , 'red' , 'blue' , 'purple'],
    rating: 4.2
  },
  {
    id: '2',
    name: 'Fresh Milk',
    description: 'Farm-fresh cow milk, rich in calcium and proteins',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
    price: {
      sizes: {
        small: 20,
        medium: 35,
        large: 50
      }
    },
    rating: 4.6
  },
  {
    id: '3',
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky croissant filled with rich chocolate',
    category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=800',
    price: { fixed: 35 },
    rating: 4.8
  },
  {
    id: '4',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice, no added sugar',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800',
    price: {
      sizes: {
        small: 25,
        medium: 40,
        large: 55
      }
    },
    rating: 4.4
  }
];