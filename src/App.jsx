import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard.jsx";
import ProductForm from "./components/ProductForm.jsx";
import api from "./services/api.js";

export default function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
        setEditingProduct(null);
      } else {
        await api.post("/products", formData);
      }
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">MERN + MongoDB + Mongoose</p>
          <h1>Learn Shop Dashboard</h1>
          <p>
            මේ project එකෙන් CRUD, API calls, React state, Express routes, MongoDB model
            කියන basics ඉගෙනගන්න පුළුවන්.
          </p>
        </div>
      </header>

      <div className="layout">
        <ProductForm
          editingProduct={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => setEditingProduct(null)}
        />

        <section>
          <div className="section-header">
            <h2>Products</h2>
            <button className="secondary" onClick={fetchProducts}>Refresh</button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : products.length === 0 ? (
            <p>No products yet. Add your first product.</p>
          ) : (
            <div className="grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={setEditingProduct}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
