import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuAPI } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import coffeeImg from '../assets/coffee.jpg';
import '../styles/ProductDetails.css';

const ProductDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // FETCH PRODUCT
  const fetchProduct = async () => {

    setLoading(true);

    try {

      const response =
        await menuAPI.getById(id);

      setProduct(response.data.item);

    } catch (err) {

      setError('Product not found');

    } finally {

      setLoading(false);

    }
  };

  // ADD TO CART
  const handleAddToCart = () => {

    if (!user) {

      navigate('/login');

      return;
    }

    const cart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(
      (item) => item._id === product._id
    );

    // BUG: No validation for negative quantity
    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      cart.push({
        ...product,
        quantity,
      });

    }

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // LOADING
  if (loading) {

    return (
      <div className="container p-20 text-center">
        Loading...
      </div>
    );
  }

  // ERROR
  if (error || !product) {

    return (
      <div className="container p-20 text-center">

        <p>{error || 'Product not found'}</p>

        <button
          onClick={() => navigate('/menu')}
        >
          Back to Menu
        </button>

      </div>
    );
  }

  return (
    <div className="product-details-page">

      <div className="container">

        <div className="product-details">

          {/* IMAGE SECTION */}
          <div className="product-image-section">

            <img
              src={coffeeImg}
              alt={product.name}
            />

          </div>

          {/* INFO SECTION */}
          <div className="product-info-section">

            <h1>{product.name}</h1>

            <p className="category">
              {product.category}
            </p>

            <p className="description">
              {product.description}
            </p>

            {/* PRICE */}
            <div className="price-section">

              <span className="price">
                ₹{product.price}
              </span>

              <span
                className={`availability ${
                  product.available
                    ? 'available'
                    : 'unavailable'
                }`}
              >
                {product.available
                  ? '✓ Available'
                  : '✗ Unavailable'}
              </span>

            </div>

            {/* QUANTITY */}
            <div className="quantity-section">

              <label>Quantity:</label>

              <div className="quantity-selector">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(0, quantity - 1)
                    )
                  }
                >
                  −
                </button>

                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      parseInt(e.target.value) || 1
                    )
                  }
                />

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>

            {/* ADD TO CART */}
            <button
              className="add-to-cart-btn"
              data-testid="add-cart-button"
              onClick={handleAddToCart}
              disabled={!product.available}
            >
              🛒 Add to Cart
            </button>

            {/* SUCCESS */}
            {addedToCart && (

              <p className="success-message">
                ✓ Added to cart!
              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;