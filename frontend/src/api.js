import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use((cfg) => {
  const raw = localStorage.getItem("sb_token");
  if (raw) cfg.headers.Authorization = `Bearer ${raw}`;
  return cfg;
});

export default api;

// helpers to handle differing response shapes (some endpoints return { slots } vs [..])
export const normalizeSlots = (resp) => {
  if (!resp) return [];
  if (Array.isArray(resp)) return resp;
  if (resp.slots) return resp.slots;
  if (resp.data && Array.isArray(resp.data)) return resp.data;
  if (resp.data && resp.data.slots) return resp.data.slots;
  return [];
};
