
export const addToCart = (cart, item) => {
  return [...cart, item];
};

export const getTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price, 0);
};

export const getCount = (cart) => {
  return cart.length;
};

// Check if a specific product is already in cart
export const isInCart = (cart, productId) => {
  return cart.some(item => item.id === productId);
};