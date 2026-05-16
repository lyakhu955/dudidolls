"use client";
import { create } from "zustand";
import type { Doll } from "./data";

export type CartItem = Doll & { qty: number };

type Store = {
  cart: CartItem[];
  drawerOpen: boolean;
  menuOpen: boolean;
  modalDoll: Doll | null;
  toast: { show: boolean; message: string };

  addToCart: (doll: Doll) => void;
  changeQty: (id: string, delta: number) => void;
  remove: (id: string) => void;
  setDrawer: (open: boolean) => void;
  setMenu: (open: boolean) => void;
  setModal: (doll: Doll | null) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
};

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useStore = create<Store>((set, get) => ({
  cart: [],
  drawerOpen: false,
  menuOpen: false,
  modalDoll: null,
  toast: { show: false, message: "" },

  addToCart: (doll) => {
    const cart = get().cart;
    const ex = cart.find((i) => i.id === doll.id);
    if (ex) {
      get().showToast(`${doll.name} è già nel carrello — pezzo unico`);
      return;
    }
    set({ cart: [...cart, { ...doll, qty: 1 }], modalDoll: null });
    get().showToast(`${doll.name} aggiunta al carrello`);
  },
  changeQty: (id, delta) =>
    set({
      cart: get().cart.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      ),
    }),
  remove: (id) => set({ cart: get().cart.filter((i) => i.id !== id) }),
  setDrawer: (open) => set({ drawerOpen: open }),
  setMenu: (open) => set({ menuOpen: open }),
  setModal: (doll) => set({ modalDoll: doll }),

  showToast: (message) => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: { show: true, message } });
    toastTimer = setTimeout(() => get().hideToast(), 2400);
  },
  hideToast: () => set((s) => ({ toast: { ...s.toast, show: false } })),
}));

// Persist cart to localStorage
if (typeof window !== "undefined") {
  // Load saved cart on init
  try {
    const saved = localStorage.getItem("dudidolls-cart");
    if (saved) {
      const parsed = JSON.parse(saved) as CartItem[];
      useStore.setState({ cart: parsed });
    }
  } catch {}

  // Subscribe to cart changes and save
  useStore.subscribe((state) => {
    try {
      localStorage.setItem("dudidolls-cart", JSON.stringify(state.cart));
    } catch {}
  });
}

export function useCartCount(): number {
  return useStore((s) => s.cart.reduce((sum, i) => sum + i.qty, 0));
}

export function useCartTotal(): number {
  return useStore((s) => s.cart.reduce((sum, i) => sum + i.price * i.qty, 0));
}
