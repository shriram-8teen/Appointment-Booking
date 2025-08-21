import React, { useEffect, useState } from "react";
import api from "../api";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await api.get("/api/all-bookings"); // spec compat route
      const data = res.data.bookings || res.data || [];
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.error?.message || "Could not fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div>
      <h2>All Bookings (Admin)</h2>
      {err && <div className="error">{err}</div>}
      {loading && <div>Loading...</div>}
      {bookings.length === 0 && !loading && <div>No bookings yet</div>}
      {bookings.map((b) => (
        <div key={b._id || b.id} className="card">
          <div><strong>User:</strong> {(b.user && b.user.name) || b.userName || "—"} ({(b.user && b.user.email) || "—"})</div>
          <div><strong>Slot:</strong> {(b.slot && (b.slot.doctor || new Date(b.slot.startAt).toLocaleString())) || JSON.stringify(b.slot)}</div>
          <div className="small">Booked at: {new Date(b.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
