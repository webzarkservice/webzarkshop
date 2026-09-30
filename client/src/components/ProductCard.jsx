import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-transform hover:shadow-lg active:scale-95">
      <Link to={`/products/${product._id}`} className="flex flex-1 flex-col">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
        <div className="flex-1 p-3 pb-0">
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">{product.name}</h3>
          <p className="text-primary font-bold mt-1">₹{product.price}</p>
        </div>
      </Link>
      <div className="mt-auto p-3 pt-2">
        <a
          href={product.productLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center rounded-full bg-primary py-2 text-center text-sm font-medium text-white transition hover:bg-secondary"
        >
          View Deal
        </a>
      </div>
    </div>
  );
}
