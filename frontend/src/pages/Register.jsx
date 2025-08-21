import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setOk(null);
    try {
      await api.post("/api/register", form);
      setOk("Registered. You can now log in.");
      setTimeout(() => nav("/login"), 800);
    } catch (e) {
      setErr(e?.response?.data?.error?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {err && <div className="error">{err}</div>}
      {ok && <div className="success">{ok}</div>}
      <form onSubmit={submit}>
        <label>Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <label>Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
