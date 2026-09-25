export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden active:scale-95 transition-transform hover:shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">{product.name}</h3>
        <p className="text-primary font-bold mt-1">₹{product.price}</p>
        <a
          href={product.productLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-center bg-primary hover:bg-secondary text-white text-sm font-medium py-2 rounded-full transition"
        >
          View Deal
        </a>
      </div>
    </div>
  );
}
