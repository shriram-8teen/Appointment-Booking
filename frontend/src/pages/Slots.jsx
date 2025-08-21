import React, { useEffect, useState } from "react";
import api, { normalizeSlots } from "../api";
import { useAuth } from "../AuthContext";

export default function Slots() {
  const [slots, setSlots] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetch = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await api.get("/api/slots");
      const normalized = normalizeSlots(res.data || res);
      setSlots(normalized);
    } catch (e) {
      setErr(e?.response?.data?.error?.message || "Could not fetch slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const book = async (slotId) => {
    setErr(null);
    try {
      // /api/book is spec endpoint; backend supports compat route
      await api.post("/api/book", { slotId });
      alert("Booked successfully — refresh to see update");
      fetch();
    } catch (e) {
      setErr(e?.response?.data?.error?.message || "Booking failed");
    }
  };

  return (
    <div>
      <h2>Available slots (next 7 days)</h2>
      {user ? <div className="small">Logged in as {user.name} ({user.role})</div> : <div className="small">You are not logged in.</div>}
      {err && <div className="error">{err}</div>}
      {loading && <div>Loading...</div>}
      {slots.length === 0 && !loading && <div>No slots available</div>}
      {slots.map((s) => (
        <div key={s._id || s.id || s.startAt} className="card">
          <div><strong>{s.doctor || "General"}</strong></div>
          <div>{new Date(s.startAt || s.startAt).toLocaleString()}</div>
          <div className="small">Booked: {s.isBooked ? "Yes" : "No"}</div>
          {!s.isBooked && user && user.role === "patient" && (
            <button onClick={() => book(s._id || s.id || s.startAt)}>Book</button>
          )}
        </div>
      ))}
    </div>
  );
}
