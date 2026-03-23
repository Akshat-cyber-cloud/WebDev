import React from 'react'
import ProductCard from './Components/ProductCard'

const App = () => {
  const products = [
  { id: 1, name: "Mechanical Keyboard", price: 120, inStock: true },
  { id: 2, name: "Wireless Mouse", price: 45, inStock: true },
  { id: 3, name: "Monitor", price: 300, inStock: false },
  { id: 4, name: "Webcam", price: 80, inStock: true },
  { id: 5, name: "Headphones", price: 150, inStock: true },
]
  

  return (
    <div>
      <ProductCard id = {products[0].id} name = {products[0].name} price = {products[0].price} inStock = {products[0].inStock} />
    </div>
  )
}

export default App