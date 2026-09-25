import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/api";

const empty = { name: "", productLink: "", imageUrl: "", price: "" };

export default function AdminProductForm() {
  const [form, setForm] = useState(empty);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`).then(({ data }) => setForm(data));
    }
  }, [id]);

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Product name is required");
    if (!isValidUrl(form.productLink)) return toast.error("Enter a valid product link");
    if (!isValidUrl(form.imageUrl)) return toast.error("Enter a valid image URL");
    if (!(Number(form.price) > 0)) return toast.error("Price must be a positive number");

    try {
      const payload = { ...form, price: Number(form.price) };
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
        toast.success("Product updated");
      } else {
        await api.post("/products", payload);
        toast.success("Product added");
      }
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-light px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-4"
      >
        <h1 className="text-lg font-bold text-primary">
          {isEdit ? "Edit Product" : "Add Product"}
        </h1>

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          placeholder="Product Link"
          value={form.productLink}
          onChange={(e) => setForm({ ...form, productLink: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white font-medium py-2.5 rounded-lg transition"
        >
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
