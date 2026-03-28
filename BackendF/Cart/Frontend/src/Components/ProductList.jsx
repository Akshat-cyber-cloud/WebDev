import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Leather Weekender', price: 129, emoji: '🧳' },
  { id: 2, name: 'Ceramic Pour-Over',  price: 54,  emoji: '☕' },
  { id: 3, name: 'Wool Throw Blanket', price: 89,  emoji: '🧶' },
  { id: 4, name: 'Oak Desk Organiser', price: 67,  emoji: '🪵' },
];

export default function ProductList({ onAddToCart, loading }) {
  const [activeId, setActiveId] = useState(null);

  const handleClick = async (product) => {
    if (loading) return;
    setActiveId(product.id);
    await onAddToCart(product);
    setActiveId(null);
  };

  return (
    <div>
      {PRODUCTS.map(product => (
        <div key={product.id}>
          <span>{product.emoji} {product.name} — ${product.price}</span>
          <button
            onClick={() => handleClick(product)}
            disabled={loading}
          >
            {activeId === product.id ? 'Adding...' : '+ Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
}