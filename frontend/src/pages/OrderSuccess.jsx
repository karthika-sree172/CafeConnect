import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container p-20 text-center">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order. Your order is being prepared.</p>
        <p>You can track your order status in your profile.</p>
        <div className="success-buttons">
          <button onClick={() => navigate('/menu')} className="primary-btn">
            Continue Shopping
          </button>
          <button onClick={() => navigate('/')} className="secondary-btn">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;