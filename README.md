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
```

## Backend



```bash
cd Appointment-Booking/backend
npm install
npm start
```
Frontend (/frontend/.env)
VITE_API_URL=http://localhost:5000




#  Seeded Users

Patient → patient@example.com / Passw0rd!

Admin → admin@example.com / Passw0rd!

Admin is seeded via utils/seedAdmin.js.
Slots are generated via utils/seedSlots.js.

# 📡 API Endpoints
Auth

POST /api/register → Register new patient

POST /api/login → Login and receive { token, role }

Slots

GET /api/slots → List available slots for the next 7 days

Bookings

POST /api/book → Book a slot (double booking prevented)

GET /api/my-bookings → Patient’s bookings

GET /api/all-bookings → Admin view of all bookings

🔍 Quick Verification (cURL)
# Register new patient
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Passw0rd!"}'

# Login as patient
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@example.com","password":"Passw0rd!"}'

# Get available slots
curl http://localhost:5000/api/slots

# Book a slot (replace <TOKEN> and <SLOT_ID>)
curl -X POST http://localhost:5000/api/book \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"slotId":"<SLOT_ID>"}'

# Get patient’s bookings
curl http://localhost:5000/api/my-bookings \
  -H "Authorization: Bearer <TOKEN>"

# 🏗️ Architecture Notes

Folder Structure

controllers/ → Request handlers

models/ → Mongoose schemas (Users, Slots, Bookings)

routes/ → API endpoints grouped by domain

middleware/ → Auth & role checks

utils/ → Seeder scripts for admin, slots, and users

Auth + RBAC

JWT tokens issued at login.

Middleware validates role (patient vs admin).

Concurrency

Unique slot booking check prevents double-booking.

Error Handling

Standard JSON error shape:

