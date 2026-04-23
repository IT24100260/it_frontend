export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p>{product.description}</p>
      <p className="price">LKR {Number(product.price).toLocaleString()}</p>
      <p className={product.inStock ? "stock in" : "stock out"}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
      <div className="card-actions">
        <button onClick={() => onEdit(product)}>Edit</button>
        <button className="danger" onClick={() => onDelete(product._id)}>Delete</button>
      </div>
    </div>
  );
}
