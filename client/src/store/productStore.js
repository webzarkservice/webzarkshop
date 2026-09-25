import { create } from "zustand";
import api from "../lib/api";

export const useProductStore = create((set, get) => ({
  products: [],
  search: "",
  loading: false,

  setSearch: (search) => set({ search }),

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { search } = get();
      const { data } = await api.get("/products", { params: { search } });
      set({ products: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
