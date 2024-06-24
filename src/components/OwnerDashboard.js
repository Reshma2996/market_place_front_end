import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OwnerDashboard.css'; // Make sure to link the CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="button-group">
        <button onClick={() => navigate('/create-equipment')}>Create Equipment</button>
        <button onClick={() => navigate('/edit-equipment')}>Edit Equipment</button>
        <button onClick={() => navigate('/delete-equipment')}>Delete Equipment</button>
        <button onClick={() => navigate('/search-equipment')}>Search Equipment</button>
      </div>
      <div className="image-gallery">
        {/* Replace these with your actual image paths */}
        <img src={require('../assets/images/washing-machine.png').default} alt="Washing Machine" />
        <img src={require('../assets/images/refrigerator.png').default} alt="Refrigerator" />
        <img src={require('../assets/images/microwave.png').default} alt="Microwave" />
        <img src={require('../assets/images/air-conditioner.png').default} alt="Air Conditioner" />
      </div>
    </div>
  );
};

export default Dashboard;
