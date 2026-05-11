import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { orderAPI } from '../utils/api';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    phone: '',
  });

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // BUG INTENTIONAL: Allows duplicate orders with no debounce
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // BUG: No validation for empty form fields
    if (!formData.name || !formData.address || !formData.phone) {
      // BUG: Missing error message in some cases
      return;
    }

    setLoading(true);
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 50;

      const orderData = {
        items: cart.map((item) => ({
          menuItemId: item._id,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryInfo: formData,
        totalAmount,
      };

      await orderAPI.create(orderData);
      localStorage.removeItem('cart');
      navigate('/order-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Error placing order');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 50;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>💳 Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {error && <div className="error-alert">{error}</div>}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Delivery address"
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your phone number"
              />
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? 'Placing Order...' : `Place Order (₹${totalAmount})`}
            </button>
          </form>

          <div className="order-summary">
            <h2>Order Summary</h2>
            {cart.map((item) => (
              <div key={item._id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;