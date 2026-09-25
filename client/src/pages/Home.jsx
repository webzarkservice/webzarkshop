import { useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import { useProductStore } from "../store/productStore";

export default function Home() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <SearchBar />

      <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}

        {!loading && products.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-10">
            No products found.
          </p>
        )}

        {!loading &&
          products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
