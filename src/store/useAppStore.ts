import { create } from 'zustand';

export type View = 'home' | 'collections' | 'product' | 'about' | 'craftsmanship' | 'commission' | 'dashboard' | 'journal' | 'masterclass' | 'contact' | 'cart' | 'checkout' | 'policies';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  type: 'ready-to-wear' | 'bespoke';
  leather?: string;
  patina?: string;
  sole?: string;
}

interface AppState {
  currentView: View;
  selectedProductId: string | null;
  selectedCollection: string | null;
  cart: CartItem[];
  savedForLater: CartItem[];
  cartOpen: boolean;
  commissionProductId: string | null;
  mobileMenuOpen: boolean;
  searchQuery: string;

  // Analytics events buffer
  analyticsEvents: { event: string; data: Record<string, unknown>; ts: number }[];

  setView: (view: View) => void;
  selectProduct: (productId: string) => void;
  selectCollection: (collection: string | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  saveForLater: (productId: string) => void;
  moveToCart: (item: CartItem) => void;
  removeFromSaved: (productId: string) => void;
  startCommission: (productId: string | null) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  trackEvent: (event: string, data?: Record<string, unknown>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentView: 'home',
  selectedProductId: null,
  selectedCollection: null,
  cart: [],
  savedForLater: [],
  cartOpen: false,
  commissionProductId: null,
  mobileMenuOpen: false,
  searchQuery: '',
  analyticsEvents: [],

  setView: (view) => {
    set({ currentView: view, mobileMenuOpen: false });
    get().trackEvent('page_view', { view });
  },
  selectProduct: (productId) => {
    set({ selectedProductId: productId, currentView: 'product' });
    get().trackEvent('product_view', { productId });
  },
  selectCollection: (collection) => set({ selectedCollection: collection }),
  addToCart: (item) =>
    set((state) => {
      get().trackEvent('add_to_cart', { productId: item.productId, type: item.type });
      const existing = state.cart.find((i) => i.productId === item.productId && i.size === item.size);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.productId === item.productId && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      get().trackEvent('remove_from_cart', { productId });
      return { cart: state.cart.filter((i) => i.productId !== productId) };
    }),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  saveForLater: (productId) =>
    set((state) => {
      const item = state.cart.find((i) => i.productId === productId);
      if (!item) return {};
      get().trackEvent('save_for_later', { productId });
      return {
        cart: state.cart.filter((i) => i.productId !== productId),
        savedForLater: [...state.savedForLater, item],
      };
    }),
  moveToCart: (item) =>
    set((state) => ({
      savedForLater: state.savedForLater.filter((i) => i.productId !== item.productId),
      cart: [...state.cart, { ...item, quantity: 1 }],
    })),
  removeFromSaved: (productId) =>
    set((state) => ({ savedForLater: state.savedForLater.filter((i) => i.productId !== productId) })),
  startCommission: (productId) => {
    set({ commissionProductId: productId, currentView: 'commission' });
    get().trackEvent('start_commission', { productId });
  },
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  getCartTotal: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
  trackEvent: (event, data = {}) =>
    set((state) => ({
      analyticsEvents: [...state.analyticsEvents.slice(-49), { event, data, ts: Date.now() }],
    })),
}));
