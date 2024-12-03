import {create} from 'zustand';

const useBookingStore = create((set) => ({
  selectedHotel: null,
  guestName: '',
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
  setGuestName: (name) => set({ guestName: name }),
}));

export default useBookingStore;
