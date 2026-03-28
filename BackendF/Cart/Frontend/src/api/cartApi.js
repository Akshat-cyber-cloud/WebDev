import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

// GET /cart — load existing cart
export const fetchCart = () => {
  return API.get('/cart');
};

// POST /cart — add one item
export const addItemToCart = (item) => {
  return API.post('/cart', { item });
};