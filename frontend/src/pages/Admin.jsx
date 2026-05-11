import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Admin.css';

const Admin = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="admin-page">
      <div className="container">
        <h1>👨‍💼 Admin Dashboard</h1>
        <p>Manage your cafe</p>

        <div className="admin-grid">
          <Link to="/admin/menu" className="admin-card">
            <div className="card-icon">☕</div>
            <h3>Manage Menu</h3>
            <p>Add, edit, delete menu items</p>
          </Link>

          <Link to="/admin/orders" className="admin-card">
            <div className="card-icon">📋</div>
            <h3>View Orders</h3>
            <p>Manage customer orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;