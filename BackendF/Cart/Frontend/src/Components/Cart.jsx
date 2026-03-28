export default function Cart({ cart, total, count }) {
  if (count === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2>Cart ({count} items)</h2>
      {cart.map((item, i) => (
        <div key={i}>
          <span>{item.emoji} {item.name}</span>
          <span>${item.price}</span>
        </div>
      ))}
      <strong>Total: ${total}</strong>
    </div>
  );
}