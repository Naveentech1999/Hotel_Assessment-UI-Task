import React, { useState } from 'react';
import useBookingStore from '../store/bookingStore';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosInstance from '../api/api';

const HotelBookingForm = () => {
  const { selectedHotel, guestName, setGuestName } = useBookingStore();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize useNavigate

  const { data: bookings } = useQuery('bookings', async () => {
    const response = await axiosInstance.get('/bookings');
    return response.data;
  });

  const bookingMutation = useMutation(
    (bookingData) => axiosInstance.post('/bookings', bookingData),
    {
      onSuccess: () => {
        setConfirmationMessage(`Hello "${guestName}", you have successfully booked ${selectedHotel.name}.`);
        setGuestName('');
      },
    }
  );

  const deleteMutation = useMutation(
    async () => {
      const allBookingIds = bookings.map((booking) => booking.id);
      for (const id of allBookingIds) {
        await axiosInstance.delete(`/bookings/${id}`);
      }
    },
    {
      onSuccess: () => {
        alert('All bookings have been deleted.');
        setConfirmationMessage('All bookings have been deleted.');
        queryClient.invalidateQueries('bookings');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedHotel) {
      setConfirmationMessage('Please select a hotel to book.');
      return;
    }

    bookingMutation.mutate({
      hotelId: selectedHotel.id,
      guestName: guestName,
    });
  };

  const handleClearBookings = async () => {
    if (!bookings || bookings.length === 0) {
      alert('No bookings to delete.');
      setConfirmationMessage('No bookings to delete.');
      return;
    }

    deleteMutation.mutate();
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Booking for {selectedHotel ? selectedHotel.name : 'Select a Hotel'}
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Guest Name:</label>
          <input
            type="text"
            className="form-control"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success"
          disabled={!selectedHotel || bookingMutation.isLoading}
        >
          {bookingMutation.isLoading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>

      {confirmationMessage && (
        <div className="alert alert-success mt-3">{confirmationMessage}</div>
      )}

      {bookingMutation.isError && (
        <div className="alert alert-danger">Error submitting booking!</div>
      )}

      <button
        onClick={handleClearBookings}
        className="btn btn-danger"
        disabled={deleteMutation.isLoading}
      >
        {deleteMutation.isLoading ? 'Clearing...' : 'Clear All Bookings'}
      </button>

      {deleteMutation.isError && (
        <div className="alert alert-danger mt-3">Error deleting bookings!</div>
      )}

      <br></br>

      <button
        onClick={handleBack}
        className="btn btn-primary mt-3"
      >
        Back
      </button>
    </div>
  );
};

export default HotelBookingForm;
