import React, { useEffect, useState } from "react";
import api from "../api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await api.get("/api/my-bookings"); // compat endpoint
      // many backends return { bookings } or array — handle both
      const data = res.data.bookings || res.data || [];
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.error?.message || "Could not fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {err && <div className="error">{err}</div>}
      {loading && <div>Loading...</div>}
      {bookings.length === 0 && !loading && <div>No bookings yet</div>}
      {bookings.map((b) => (
        <div key={b._id || b.id} className="card">
          <div><strong>Slot:</strong> {b.slot?.doctor || "General"}</div>
          <div>{new Date(b.slot?.startAt || b.slot).toLocaleString()}</div>
          <div className="small">Booked at: {new Date(b.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
