import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // BUG INTENTIONAL: Weak validation - allows empty fields
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      // BUG: No validation for empty email/password
      await login(formData.email, formData.password);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">

          <h1>🔐 Login</h1>
          <p>Welcome back to CafeConnect</p>

          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                data-testid="email-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                data-testid="password-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="submit-btn"
              data-testid="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>

          <p className="auth-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <div className="demo-credentials">
            <strong>Demo Credentials:</strong>

            <p>📧 user@cafeconnect.com / user123</p>
            <p>🔐 admin@cafeconnect.com / admin123</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;