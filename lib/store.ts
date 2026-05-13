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
    const next = ex
      ? cart.map((i) => (i.id === doll.id ? { ...i, qty: i.qty + 1 } : i))
      : [...cart, { ...doll, qty: 1 }];
    set({ cart: next, modalDoll: null });
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

export function useCartCount(): number {
  return useStore((s) => s.cart.reduce((sum, i) => sum + i.qty, 0));
}

export function useCartTotal(): number {
  return useStore((s) => s.cart.reduce((sum, i) => sum + i.price * i.qty, 0));
}
