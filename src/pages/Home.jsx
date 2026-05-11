import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>☕ Welcome to CafeConnect</h1>
          <p>Your favorite cafe, delivered to your door</p>
          <button className="cta-btn" onClick={() => navigate('/menu')}>
            Explore Menu
          </button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Get your order delivered quickly</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">☕</div>
          <h3>Quality Coffee</h3>
          <p>Premium quality cafe items</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Easy Payment</h3>
          <p>Secure payment methods</p>
        </div>
      </section>
    </div>
  );
};

export default Home;