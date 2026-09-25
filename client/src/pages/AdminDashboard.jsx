import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/api";
import { useAuthStore } from "../store/authStore";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <header className="bg-primary text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <h1 className="font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
          className="text-sm bg-secondary px-3 py-1.5 rounded-full"
        >
          Logout
        </button>
      </header>

      <div className="max-w-3xl mx-auto p-4">
        <Link
          to="/admin/add"
          className="inline-block mb-4 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium transition"
        >
          + Add Product
        </Link>

        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3"
            >
              <img src={p.imageUrl} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{p.name}</p>
                <p className="text-primary font-semibold text-sm">₹{p.price}</p>
              </div>
              <Link
                to={`/admin/edit/${p._id}`}
                className="text-xs bg-secondary text-white px-3 py-1.5 rounded-full"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p._id)}
                className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-full"
              >
                Delete
              </button>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-center text-gray-500 py-10">No products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
