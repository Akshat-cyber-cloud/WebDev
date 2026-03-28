import { useState, useEffect } from 'react';
import { fetchCart, addItemToCart } from '../api/cartApi';        // Layer 1
import { addToCart, getTotal, getCount } from '../state/cardState'; // Layer 2

export function useCart() {
  const [cart, setCart]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);


  useEffect(() => {
    fetchCart()
      .then(res => setCart(res.data.cart))
      .catch(() => setError('Could not load cart'))
  }, []);

  const handleAddToCart = async (product) => {
    setLoading(true);
    setError(null);
    try {
      const res = await addItemToCart(product);   // Layer 1: hits server
      setCart(res.data.cart);                     // backend is source of truth
    } catch (err) {
      // Fallback: update local state if server fails
      setCart(prev => addToCart(prev, product));  // Layer 2: pure function
      setError('Server error — showing local state');
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    error,
    total:        getTotal(cart),    
    count:        getCount(cart),
    handleAddToCart,
  };
}