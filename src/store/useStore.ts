import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../data/products';

export type CartItem = {
  product: Product;
  size: number;
  quantity: number;
};

type Theme = 'light' | 'dark';

export type User = {
  name: string;
  email: string;
  avatar: string;
};

type StoreState = {
  cart: CartItem[];
  wishlist: Product[];
  theme: Theme;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  toggleTheme: () => void;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      theme: 'dark',
      isAuthenticated: false,
      isAuthModalOpen: false,
      user: null,

      addToCart: (item) => {
        if (!get().isAuthenticated) {
          get().openAuthModal();
          return;
        }
        const cart = get().cart;
        const existingItemIndex = cart.findIndex(
          (cartItem) => cartItem.product.id === item.product.id && cartItem.size === item.size
        );

        if (existingItemIndex !== -1) {
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += item.quantity;
          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, item] });
        }
      },

      removeFromCart: (productId, size) => {
        set({
          cart: get().cart.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
        } else {
          set({
            cart: get().cart.map((item) =>
              item.product.id === productId && item.size === size ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const isInWishlist = wishlist.some((item) => item.id === product.id);

        if (isInWishlist) {
          set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
      },

      toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }));
      },

      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null, cart: [], wishlist: [] }),
      updateUser: (userData) => {
        if (get().user) {
          set({ user: { ...get().user!, ...userData } });
        }
      },
      openAuthModal: () => set({ isAuthModalOpen: true }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
    }),
    {
      name: 'solesphere-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['isAuthModalOpen'].includes(key))
        ),
    }
  )
);
