import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="navbar-brand">
          ☕ CafeConnect
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart ({cart.length})
          </Link>

          {user && user.role === 'admin' && (
            <Link to="/admin" className="admin-link">
              Admin Dashboard
            </Link>
          )}

          {user ? (
            <>
              <span className="user-name">Hi, {user.name}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;