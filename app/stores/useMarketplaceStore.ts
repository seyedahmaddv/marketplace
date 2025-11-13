import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  images: string[];
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  productName: string;
  customer: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  date: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Thread {
  id: string;
  participant: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface MarketplaceState {
  products: Product[];
  orders: Order[];
  threads: Thread[];
  messages: Record<string, Message[]>;
  selectedProduct: Product | null;
  selectedOrder: Order | null;
  selectedThread: string | null;
  sidebarOpen: boolean;
  isProductDrawerOpen: boolean;
  editingProduct: Product | null;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedOrder: (order: Order | null) => void;
  setSelectedThread: (threadId: string | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openProductDrawer: (product?: Product) => void;
  closeProductDrawer: () => void;
  addMessage: (threadId: string, message: Message) => void;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    category: 'Electronics',
    inventory: 45,
    images: ['https://c.animaapp.com/mhw515p9c8jRKK/img/ai_1.png'],
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with advanced health monitoring',
    price: 199.99,
    category: 'Electronics',
    inventory: 32,
    images: ['https://c.animaapp.com/mhw515p9c8jRKK/img/ai_1.png'],
    rating: 4.7,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable chair designed for long work sessions',
    price: 449.99,
    category: 'Furniture',
    inventory: 18,
    images: ['https://c.animaapp.com/mhw515p9c8jRKK/img/ai_1.png'],
    rating: 4.3,
    reviews: 56,
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker with 12-hour battery life',
    price: 79.99,
    category: 'Electronics',
    inventory: 67,
    images: ['https://c.animaapp.com/mhw515p9c8jRKK/img/ai_1.png'],
    rating: 4.6,
    reviews: 203,
  },
];

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    productName: 'Premium Wireless Headphones',
    customer: 'John Doe',
    status: 'processing',
    total: 299.99,
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    productName: 'Smart Fitness Watch',
    customer: 'Jane Smith',
    status: 'shipped',
    total: 199.99,
    date: '2024-01-14',
  },
  {
    id: 'ORD-003',
    productName: 'Ergonomic Office Chair',
    customer: 'Bob Johnson',
    status: 'delivered',
    total: 449.99,
    date: '2024-01-13',
  },
  {
    id: 'ORD-004',
    productName: 'Portable Bluetooth Speaker',
    customer: 'Alice Williams',
    status: 'pending',
    total: 79.99,
    date: '2024-01-15',
  },
];

const mockThreads: Thread[] = [
  {
    id: 'thread-1',
    participant: 'John Doe',
    lastMessage: 'When will my order ship?',
    timestamp: '2024-01-15T10:30:00',
    unread: 1,
  },
  {
    id: 'thread-2',
    participant: 'Jane Smith',
    lastMessage: 'Thank you for the quick delivery!',
    timestamp: '2024-01-14T15:20:00',
    unread: 0,
  },
];

const mockMessages: Record<string, Message[]> = {
  'thread-1': [
    {
      id: 'msg-1',
      sender: 'John Doe',
      content: 'Hi, I just placed an order for the wireless headphones.',
      timestamp: '2024-01-15T10:00:00',
      isRead: true,
    },
    {
      id: 'msg-2',
      sender: 'You',
      content: 'Thank you for your order! It will be processed within 24 hours.',
      timestamp: '2024-01-15T10:15:00',
      isRead: true,
    },
    {
      id: 'msg-3',
      sender: 'John Doe',
      content: 'When will my order ship?',
      timestamp: '2024-01-15T10:30:00',
      isRead: false,
    },
  ],
  'thread-2': [
    {
      id: 'msg-4',
      sender: 'Jane Smith',
      content: 'I received my fitness watch today!',
      timestamp: '2024-01-14T15:00:00',
      isRead: true,
    },
    {
      id: 'msg-5',
      sender: 'You',
      content: 'Great! We hope you enjoy it.',
      timestamp: '2024-01-14T15:10:00',
      isRead: true,
    },
    {
      id: 'msg-6',
      sender: 'Jane Smith',
      content: 'Thank you for the quick delivery!',
      timestamp: '2024-01-14T15:20:00',
      isRead: true,
    },
  ],
};

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  products: mockProducts,
  orders: mockOrders,
  threads: mockThreads,
  messages: mockMessages,
  selectedProduct: null,
  selectedOrder: null,
  selectedThread: null,
  sidebarOpen: true,
  isProductDrawerOpen: false,
  editingProduct: null,
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSelectedOrder: (order) => set({ selectedOrder: order }),
  setSelectedThread: (threadId) => set({ selectedThread: threadId }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openProductDrawer: (product) =>
    set({ isProductDrawerOpen: true, editingProduct: product || null }),
  closeProductDrawer: () =>
    set({ isProductDrawerOpen: false, editingProduct: null }),
  addMessage: (threadId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [threadId]: [...(state.messages[threadId] || []), message],
      },
    })),
}));
