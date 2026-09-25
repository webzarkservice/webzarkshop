import { useProductStore } from "../store/productStore";

export default function SearchBar() {
  const { search, setSearch, fetchProducts } = useProductStore();

  return (
    <div className="px-4 pt-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchProducts()}
        onBlur={fetchProducts}
        placeholder="Search products..."
        className="w-full rounded-full border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-secondary bg-white shadow-sm"
      />
    </div>
  );
}
