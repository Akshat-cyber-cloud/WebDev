import { useCart } from './hooks/useCart';   // ← only import needed
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';

export default function App() {
  const { cart, loading, error, total, count, handleAddToCart } = useCart();

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ProductList
        onAddToCart={handleAddToCart}
        loading={loading}
      />

      <Cart
        cart={cart}
        total={total}
        count={count}
      />
    </div>
  );
}