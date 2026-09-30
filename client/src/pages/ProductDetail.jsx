import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../lib/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchProduct() {
      setLoading(true);
      setError(false);
      setProduct(null);

      try {
        const { data } = await api.get(`/products/${id}`);
        if (active) setProduct(data);

        const { data: products } = await api.get("/products");
        if (active) {
          setRelatedProducts(
            products.filter((item) => item._id !== id).slice(0, 4)
          );
        }
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProduct();
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="transition hover:text-primary">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-gray-700">
            {product?.name || "Product details"}
          </span>
        </nav>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 md:gap-10 animate-pulse">
            <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
            <div className="space-y-5 py-3">
              <div className="h-4 w-1/4 rounded bg-gray-200" />
              <div className="h-8 w-3/4 rounded bg-gray-200" />
              <div className="h-8 w-1/3 rounded bg-gray-200" />
              <div className="h-px w-full bg-gray-200" />
              <div className="h-16 w-full rounded bg-gray-200" />
              <div className="h-12 w-2/3 rounded-lg bg-gray-200" />
            </div>
          </div>
        ) : error || !product ? (
          <div className="py-16 text-center sm:py-20">
            <h1 className="text-xl font-semibold text-gray-800">Product not found</h1>
            <p className="mt-2 text-gray-500">This product may have been removed.</p>
            <Link
              to="/"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <section className="grid gap-6 md:grid-cols-2 md:gap-10">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col items-start py-1 md:py-3">
                <p className="text-sm font-medium text-primary">Product details</p>
                <h1 className="mt-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-2xl font-bold text-gray-900">
                  ₹{new Intl.NumberFormat("en-IN").format(product.price)}
                </p>

                <div className="my-5 h-px w-full bg-gray-200" />

                <h2 className="text-sm font-semibold text-gray-900">Description</h2>
                <p className="mt-2 max-w-prose text-sm leading-6 text-gray-600">
                  Find out more about this product, including current availability and
                  delivery options, on the seller's website.
                </p>
                <p className="mt-3 text-xs text-gray-500">
                  Price and availability may change on the seller's website.
                </p>

                <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
                  <a
                    href={product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-secondary sm:w-44"
                  >
                    View deal
                  </a>
                  <Link
                    to="/"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-center text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary sm:w-44"
                  >
                    Back to products
                  </Link>
                </div>
              </div>
            </section>

            {relatedProducts.length > 0 && (
              <section className="mt-12 border-t border-gray-200 pt-6 sm:mt-14">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    More products
                  </h2>
                  <Link to="/" className="text-sm font-medium text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {relatedProducts.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}