import React from 'react';
import './Home.css';
import washingMachineImage from '../assets/images/washing-machine.png';
import refrigeratorImage from '../assets/images/refrigerator.png';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Rental Equipment Marketplace</h1>
      <p>Find and rent equipment easily!</p>
      <div className="image-gallery">
        <img src={washingMachineImage} alt="Washing Machine" />
        <img src={refrigeratorImage} alt="Refrigerator" />
      </div>
    </div>
  );
};

export default Home;
