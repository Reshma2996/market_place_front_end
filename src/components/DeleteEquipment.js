import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteEquipment = () => {
  const [equipments, setEquipments] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/equipment/${id}`);
      setEquipments(equipments.filter((equipment) => equipment._id !== id));
      alert('Equipment deleted successfully!');
    } catch (error) {
      console.error('Error deleting equipment:', error);
      alert('Failed to delete equipment.');
    }
  };

  return (
    <div className="delete-equipment-container">
      <h2>Delete Equipment</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Specification</th>
            <th>Rental Rate</th>
            <th>Availability Start Date</th>
            <th>Availability End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment._id}>
              <td>{equipment.name}</td>
              <td>{equipment.description}</td>
              <td>{equipment.specification}</td>
              <td>{equipment.rentalRate}</td>
              <td>{new Date(equipment.availabilityStartDate).toLocaleDateString()}</td>
              <td>{new Date(equipment.availabilityEndDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(equipment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteEquipment;
