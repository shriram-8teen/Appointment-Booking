# Appointment Booking App

A full-stack appointment booking application for a small clinic.  
Implements user authentication, role-based access (patient/admin), slot booking with conflict prevention, and dashboards for patients and admins.

---

##  Tech Stack & Trade-offs

- **Backend**: Node.js + Express + MongoDB (Mongoose ORM)  
  - Trade-off: Chose MongoDB Atlas (free tier) for quick setup and flexible schema. Could have used Postgres for stronger relational constraints.
- **Frontend**: React + Vite  
  - Trade-off: Vite chosen for faster development and build times compared to CRA.
- **Auth**: JWT-based authentication with role-based access control (RBAC).  

---

## ⚙️ Running Locally

Clone the repository:

```bash
git clone https://github.com/shriram-8teen/Appointment-Booking
cd Appointment-Booking
---

## Backend



```bash
cd Appointment-Booking/backend
npm install
npm start

