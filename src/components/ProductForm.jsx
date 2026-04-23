import { useEffect, useState } from "react";

const initialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  inStock: true,
};

export default function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        imageUrl: editingProduct.imageUrl,
        inStock: editingProduct.inStock,
      });
    } else {
      setFormData(initialState);
    }
  }, [editingProduct]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...formData, price: Number(formData.price) });
    setFormData(initialState);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Update Product" : "Add Product"}</h2>
      <input name="name" placeholder="Product name" value={formData.name} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <label className="checkbox-row">
        <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
        In stock
      </label>
      <div className="form-actions">
        <button type="submit">{editingProduct ? "Save Changes" : "Create Product"}</button>
        {editingProduct && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
