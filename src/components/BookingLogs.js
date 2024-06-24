import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../store/bookingSlice';

const BookingLogs = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Booking Logs</h1>
      <table>
        <thead>
          <tr>
            <th>Equipment</th>
            <th>User Contact</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.equipmentName}</td>
              <td>{booking.userContact}</td>
              <td>{new Date(booking.rentalStartDate).toLocaleDateString()}</td>
              <td>{new Date(booking.rentalEndDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingLogs;