import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchEquipment = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() !== '') {
      setLoading(true);
      axios.get(`/api/equipment?query=${query}`)
        .then(response => {
          setResults(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <h2>Search Equipment</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter equipment name..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="results">
        {results.map((equipment, index) => (
          <div key={index} className="result-item">
            <h3>{equipment.name}</h3>
            <p>{equipment.description}</p>
            <img src={equipment.imageUrl} alt={equipment.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchEquipment;
