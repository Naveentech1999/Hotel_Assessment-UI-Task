import React from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../api/api';
import useBookingStore from '../store/bookingStore';
import { useNavigate } from 'react-router-dom';

const HotelList = () => {
  const { setSelectedHotel } = useBookingStore();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery('hotels', async () => {
    const response = await axiosInstance.get('/hotels');
    return response.data;
  });

  if (isLoading) return <div className="text-center mt-4">Loading hotels...</div>;
  if (error) return <div className="alert alert-danger">Error fetching hotels!</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Hotels</h2>
      <div className="row">
        {data.map((hotel) => (
          <div className="col-md-4 mb-4" key={hotel.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Name: {hotel.name}</h5>
                <p className="card-text">
                  <strong>Location:</strong> {hotel.location}
                </p>
                <p className="card-text">
                  <strong>Price per Night:</strong> {hotel.pricePerNight}
                </p>
                <p className="card-text">
                  <strong>Available Rooms:</strong> {hotel.availableRooms}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong> ⭐ {hotel.rating}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedHotel(hotel);
                    navigate('/booking');  
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
