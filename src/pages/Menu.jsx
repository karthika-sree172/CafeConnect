import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI } from '../utils/api';
import '../styles/Menu.css';

const Menu = () => {

  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const categories = [
    'coffee',
    'tea',
    'dessert',
    'snack',
    'beverage',
  ];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [category, menuItems]);

  // FETCH MENU ITEMS
  const fetchMenuItems = async () => {

    setLoading(true);

    try {

      const response = await menuAPI.getAll();

      setMenuItems(response.data.items);

    } catch (error) {

      console.error(
        'Error fetching menu items:',
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // FILTER ITEMS
  const filterItems = () => {

    if (category) {

      setFilteredItems(
        menuItems.filter(
          (item) => item.category === category
        )
      );

    } else {

      setFilteredItems(menuItems);

    }
  };

  // CATEGORY CLICK
  const handleCategoryClick = (cat) => {

    setCategory(
      category === cat ? '' : cat
    );
  };

  // ADD TO CART
  const handleAddToCart = (item, e) => {

    e.stopPropagation();

    const cart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      cart.push({
        ...item,
        quantity: 1,
      });

    }

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    alert('Item added to cart');
  };

  return (
    <div className="menu-page">

      <div className="container">

        <h1>☕ Our Menu</h1>

        {/* CATEGORY FILTER */}
        <div className="category-filter">

          {categories.map((cat) => (

            <button
              key={cat}
              className={`category-btn ${
                category === cat ? 'active' : ''
              }`}
              onClick={() =>
                handleCategoryClick(cat)
              }
            >
              {cat.charAt(0).toUpperCase() +
                cat.slice(1)}
            </button>

          ))}

        </div>

        {/* MENU ITEMS */}
        {loading ? (

          <p className="loading">
            Loading menu...
          </p>

        ) : filteredItems.length === 0 ? (

          <p className="no-items">
            No items found
          </p>

        ) : (

          <div className="menu-grid">

            {filteredItems.map((item) => (

              <div
                key={item._id}
                className="menu-item-card"
                onClick={() =>
                  navigate(`/menu/${item._id}`)
                }
              >

                {/* IMAGE */}
                <div className="item-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>

                {/* INFO */}
                <div className="item-info">

                  <h3>{item.name}</h3>

                  <p className="category">
                    {item.category}
                  </p>

                  <p className="description">
                    {item.description}
                  </p>

                  {/* FOOTER */}
                  <div className="item-footer">

                    <span className="price">
                      ₹{item.price}
                    </span>

                    {/* ADD TO CART BUTTON */}
                    <button
                      className="view-btn"
                      data-testid="add-cart-button"
                      onClick={(e) =>
                        handleAddToCart(item, e)
                      }
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Menu;