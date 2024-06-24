import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchEquipmentById } from '../api';

const EquipmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEquipmentById(id);
        setEquipment(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{equipment.name}</h1>
      <p>{equipment.description}</p>
      <p>{equipment.specifications}</p>
      <p>Rental Rate: {equipment.rentalRate}</p>
      <p>Available from: {new Date(equipment.availabilityStartDate).toLocaleDateString()}</p>
      <p>Available until: {new Date(equipment.availabilityEndDate).toLocaleDateString()}</p>
      <Link to={`/bookings/create/${id}`} className="btn btn-primary">Book Now</Link>
    </div>
  );
};

export default EquipmentDetails;
