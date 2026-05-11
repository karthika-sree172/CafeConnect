import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container p-20 text-center">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')} className="home-btn">
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;