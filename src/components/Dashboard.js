import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { username } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Hardcoded equipment data
  const equipments = [
    {
      _id: '1',
      name: 'Washing Machine',
      description: 'Samsung - Front Load',
      specification: '3 Ton , white colour',
      rentalRate: 10000,
      availabilityStartDate: '2024-06-04T00:00:00.000+00:00',
      availabilityEndDate: '2024-06-30T00:00:00.000+00:00',
    },
    {
      _id: '2',
      name: 'Refrigerator',
      description: 'LG - Double Door',
      specification: '250 L, silver colour',
      rentalRate: 8000,
      availabilityStartDate: '2024-06-04T00:00:00.000+00:00',
      availabilityEndDate: '2024-06-30T00:00:00.000+00:00',
    },
    {
      _id: '3',
      name: 'Microwave Oven',
      description: 'Panasonic - Convection',
      specification: '32 L, black colour',
      rentalRate: 5000,
      availabilityStartDate: '2024-06-04T00:00:00.000+00:00',
      availabilityEndDate: '2024-06-30T00:00:00.000+00:00',
    },
  ];

  useEffect(() => {
    setFilteredEquipments(equipments); // Initialize filteredEquipments with all equipment data
  }, [equipments]);

  useEffect(() => {
    const results = equipments.filter(equipment =>
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEquipments(results);
  }, [searchQuery, equipments]);

  const addToCart = (equipment) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item._id === equipment._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === equipment._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...equipment, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (equipmentId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== equipmentId));
  };

  const updateQuantity = (equipmentId, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item._id === equipmentId ? { ...item, quantity } : item
      )
    );
  };

  const handleProceedToCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="dashboard-page">
      <div className="welcome-message">
        <h2>Welcome, {username}!</h2>
        <h3>Here are the updated Equipments Available for Rent. Grab them soon before they go off!</h3>
      </div>

      <div className="cart-section">
        <h3>Cart</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                <div>
                  <span>{item.name}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  <span>Total: ${item.rentalRate * item.quantity}</span>
                  <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
        {cart.length > 0 && (
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        )}
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search equipments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="equipment-list">
        {filteredEquipments.length > 0 ? (
          <ul>
            {filteredEquipments.map((equipment) => (
              <li key={equipment._id}>
                <div>
                  <h4>{equipment.name}</h4>
                  <p>{equipment.description}</p>
                  <p>{equipment.specification}</p>
                  <p>Rate: ${equipment.rentalRate}</p>
                  <button onClick={() => addToCart(equipment)}>Add to Cart</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No search results found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
