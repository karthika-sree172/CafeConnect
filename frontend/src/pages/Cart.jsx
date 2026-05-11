import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  };

  const calculateTotal = () => {
    // BUG: Incorrect total calculation if item.price is different from actual price
    const totalPrice = cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    setTotal(totalPrice);
  };

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // BUG: Allows negative quantity
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // BUG: Allows empty cart checkout
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container p-20 text-center">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/menu')} className="continue-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>🛒 Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items-section">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>

                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>−</button>
                  <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))} />
                  <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                </div>

                <div className="item-total">
                  <p>₹{item.price * item.quantity}</p>
                </div>

                <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>₹50</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total + 50}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;