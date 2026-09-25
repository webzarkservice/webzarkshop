import express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  const filter = search ? { name: { $regex: search, $options: "i" } } : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, productLink, imageUrl, price } = req.body;
    if (!name || !productLink || !imageUrl || price === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const product = await Product.create({ name, productLink, imageUrl, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

export default router;
