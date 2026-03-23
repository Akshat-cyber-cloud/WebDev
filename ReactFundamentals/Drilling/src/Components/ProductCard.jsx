import React from 'react'

const ProductCard = ({id, name, price ,inStock}) => {
  return (
    <>
    <h3>Product name: {name}</h3>
    <h4>Price: {price}</h4>
    <p style={{"color" : inStock ? "green" : "red"}}>
        {inStock}
    </p>
    </>
  )
}

export default ProductCard