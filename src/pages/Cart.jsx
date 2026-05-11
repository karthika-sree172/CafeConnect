import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import coffeeImg from '../assets/coffee.jpg';
import '../styles/Cart.css';

const Cart = () => {

  const [cart, setCart] = useState([]);

  const [total, setTotal] = useState(0);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // LOAD CART
  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem('cart')) || [];

    setCart(savedCart);

  }, []);

  // CALCULATE TOTAL
  useEffect(() => {

    const totalPrice = cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    setTotal(totalPrice);

  }, [cart]);

  // REMOVE ITEM
  const handleRemove = (productId) => {

    const updatedCart = cart.filter(
      (item) => item._id !== productId
    );

    setCart(updatedCart);

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    );
  };

  // UPDATE QUANTITY
  const handleQuantityChange = (
    productId,
    newQuantity
  ) => {

    if (newQuantity <= 0) return;

    const updatedCart = cart.map((item) =>
      item._id === productId
        ? {
            ...item,
            quantity: newQuantity,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    );
  };

  // CHECKOUT
  const handleCheckout = () => {

    if (cart.length === 0) {

      alert('Your cart is empty!');

      return;
    }

    navigate('/checkout');
  };

  // EMPTY CART
  if (cart.length === 0) {

    return (
      <div className="container p-20 text-center">

        <h2>Your cart is empty</h2>

        <button
          className="continue-btn"
          onClick={() => navigate('/menu')}
        >
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

          {/* CART ITEMS */}
          <div className="cart-items-section">

            {cart.map((item) => (

              <div
                key={item._id}
                className="cart-item"
                data-testid="cart-item"
              >

                {/* IMAGE */}
                <img
                  src={coffeeImg}
                  alt={item.name}
                />

                {/* DETAILS */}
                <div className="item-details">

                  <h3>{item.name}</h3>

                  <p>₹{item.price}</p>

                </div>

                {/* QUANTITY */}
                <div className="quantity-control">

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item._id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <input
                    type="number"
                    data-testid="quantity-input"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item._id,
                        parseInt(e.target.value)
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                {/* TOTAL */}
                <div className="item-total">

                  <p>
                    ₹{item.price * item.quantity}
                  </p>

                </div>

                {/* REMOVE */}
                <button
                  className="remove-btn"
                  data-testid="remove-button"
                  onClick={() =>
                    handleRemove(item._id)
                  }
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>

          {/* SUMMARY */}
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

              <span data-testid="cart-total">
                ₹{total + 50}
              </span>

            </div>

            {/* CHECKOUT */}
            <button
              className="checkout-btn"
              data-testid="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;