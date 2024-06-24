import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEquipments } from '../store/equipmentSlice';
import { Link } from 'react-router-dom';

const EquipmentList = () => {
  const dispatch = useDispatch();
  const { equipments, loading, error } = useSelector((state) => state.equipment);

  useEffect(() => {
    dispatch(getEquipments());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="row">
      {equipments.map((equipment) => (
        <div className="col-md-4" key={equipment.id}>
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{equipment.name}</h5>
              <p className="card-text">{equipment.description}</p>
              <Link to={`/equipments/${equipment.id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentList;
