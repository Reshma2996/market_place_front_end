import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditEquipment = () => {
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate(); // Use the navigate hook here

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/equipment');
        setEquipments(response.data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchEquipments();
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEquipments = [...equipments];
    updatedEquipments[index][name] = value;
    setEquipments(updatedEquipments);
  };

  const handleUpdate = async (id, updatedEquipment) => {
    try {
      await axios.put(`http://localhost:5000/api/equipment/${id}`, updatedEquipment);
      alert('Equipment updated successfully!');
      navigate('/owner-dashboard'); // Navigate back to the dashboard
    } catch (error) {
      console.error('Error updating equipment:', error);
      alert('Failed to update equipment.');
    }
  };

  return (
    <div className="edit-equipment-container">
      <h2>Edit Equipment</h2>
      {equipments.map((equipment, index) => (
        <div key={equipment._id} className="equipment-item">
          <input
            type="text"
            name="name"
            value={equipment.name}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            name="description"
            value={equipment.description}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            name="specification"
            value={equipment.specification}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="number"
            name="rentalRate"
            value={equipment.rentalRate}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="date"
            name="availabilityStartDate"
            value={equipment.availabilityStartDate ? equipment.availabilityStartDate.split('T')[0] : ''}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="date"
            name="availabilityEndDate"
            value={equipment.availabilityEndDate ? equipment.availabilityEndDate.split('T')[0] : ''}
            onChange={(e) => handleInputChange(index, e)}
          />
          <button onClick={() => handleUpdate(equipment._id, equipment)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default EditEquipment;
