import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.post("/api/login", { email: form.email, password: form.password });
      // spec: response includes { token, role, user }
      const token = res.data.token || res.data?.token;
      const user = res.data.user || { email: form.email, role: res.data.role || "patient", name: res.data.user?.name };
      if (!token) throw new Error("No token in response");
      login(token, user);
      nav("/slots");
    } catch (e) {
      setErr(e?.response?.data?.error?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={submit}>
        <label>Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
      <div className="small">Test accounts: patient@example.com / Passw0rd!  &nbsp; admin@example.com / Passw0rd!</div>
    </div>
  );
}
