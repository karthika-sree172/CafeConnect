import React, { useState, useEffect } from 'react';
import { menuAPI } from '../utils/api';
import '../styles/Admin.css';

const AdminMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'coffee',
    image: '',
    available: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await menuAPI.getAll();
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === 'true' ? true : value === 'false' ? false : value,
    }));
  };

  const handleAddNew = () => {
    setFormData({ name: '', description: '', price: '', category: 'coffee', image: '', available: true });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await menuAPI.update(editingId, formData);
      } else {
        await menuAPI.create(formData);
      }
      fetchItems();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await menuAPI.delete(id);
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div className="admin-menu">
      <div className="container">
        <h1>☕ Manage Menu Items</h1>

        <button className="add-btn" onClick={handleAddNew}>
          + Add New Item
        </button>

        {showForm && (
          <div className="form-modal">
            <div className="form-content">
              <h2>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Item name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="coffee">Coffee</option>
                  <option value="tea">Tea</option>
                  <option value="dessert">Dessert</option>
                  <option value="snack">Snack</option>
                  <option value="beverage">Beverage</option>
                </select>
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Item'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="items-table">
          {items.length === 0 ? (
            <p>No items found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.available ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => handleEdit(item)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;