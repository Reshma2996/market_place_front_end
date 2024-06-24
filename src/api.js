import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  };
  
  export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  };

  export const ownerregisterUser = async (userData) => {
    const response = await axios.post(`${API_URL}/owners/register`, userData);
    return response.data;
  };
  
  export const ownerloginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/owners/login`, userData);
    return response.data;
  };
  
  export const fetchEquipments = async () => {
    const response = await axios.get(`${API_URL}/equipments`);
    return response.data;
  };

  export const fetchEquipmentById = async () => {
    const response = await axios.get(`${API_URL}/equipments`);
    return response.data;
  };
  export const createEquipment = async () => {
    const response = await axios.get(`${API_URL}/equipments`);
    return response.data;
  };
  export const updateEquipment = async () => {
    const response = await axios.get(`${API_URL}/equipments`);
    return response.data;
  };
  export const deleteEquipment = async () => {
    const response = await axios.get(`${API_URL}/equipments`);
    return response.data;
  };
  export const createBooking = async () => {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  };
  export const fetchBookings = async () => {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  };