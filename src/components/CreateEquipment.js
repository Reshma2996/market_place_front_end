import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEquipment = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [rentalRate, setRentalRate] = useState('');
  const [availabilityStartDate, setAvailabilityStartDate] = useState('');
  const [availabilityEndDate, setAvailabilityEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const equipment = {
      name,
      description,
      specification,
      rentalRate,
      availabilityStartDate,
      availabilityEndDate,
    };

    try {
      await axios.post('http://localhost:5000/api/equipment', equipment);
      alert('Equipment created successfully!');
      navigate('/owner-dashboard');
    } catch (error) {
      console.error('Error creating equipment:', error);
      alert('Failed to create equipment.');
    }
  };

  return (
    <div className="create-equipment-container">
      <h2>Create Equipment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Specification"
          value={specification}
          onChange={(e) => setSpecification(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rental Rate"
          value={rentalRate}
          onChange={(e) => setRentalRate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Availability Start Date"
          value={availabilityStartDate}
          onChange={(e) => setAvailabilityStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Availability End Date"
          value={availabilityEndDate}
          onChange={(e) => setAvailabilityEndDate(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

};

export default CreateEquipment;
