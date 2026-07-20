import { create } from 'zustand';

export type View = 'home' | 'collections' | 'product' | 'about' | 'craftsmanship' | 'commission' | 'dashboard' | 'journal' | 'masterclass' | 'contact' | 'cart' | 'checkout';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface AppState {
  // Navigation
  currentView: View;
  selectedProductId: string | null;
  selectedCollection: string | null;
  
  // Cart
  cart: CartItem[];
  cartOpen: boolean;
  
  // Commission
  commissionProductId: string | null;
  
  // UI State
  mobileMenuOpen: boolean;
  searchQuery: string;
  
  // Actions
  setView: (view: View) => void;
  selectProduct: (productId: string) => void;
  selectCollection: (collection: string | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  startCommission: (productId: string | null) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentView: 'home',
  selectedProductId: null,
  selectedCollection: null,
  cart: [],
  cartOpen: false,
  commissionProductId: null,
  mobileMenuOpen: false,
  searchQuery: '',

  setView: (view) => set({ currentView: view, mobileMenuOpen: false }),
  selectProduct: (productId) => set({ selectedProductId: productId, currentView: 'product' }),
  selectCollection: (collection) => set({ selectedCollection: collection }),
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({ cart: state.cart.filter((i) => i.productId !== productId) })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  startCommission: (productId) => set({ commissionProductId: productId, currentView: 'commission' }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  getCartTotal: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
}));
