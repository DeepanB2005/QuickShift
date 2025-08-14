import { useEffect, useState } from "react";
import API from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings");
        // Ensure bookings is always an array
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        setBookings([]); // Set to empty array on error
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.map(b => (
        <div key={b._id} className="bg-white p-4 rounded shadow mb-2">
          <p>Service: {b.service}</p>
          <p>Date: {new Date(b.scheduledDate).toLocaleDateString()}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}
