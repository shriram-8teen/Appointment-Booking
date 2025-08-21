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
```
```bash
cd Appointment-Booking

```

## Backend



```bash
cd Appointment-Booking/backend
```
```bash
npm run dev
```
```bash
npm start
```
Runs on: http://localhost:5000

## Frontend
```bash
cd Appointment-Booking/frontend
```
```bash
npm install
```
```bash
npm start
```
Runs on: http://localhost:5173
## 🔑 Environment Variables

Environment variables are required for both backend and frontend.
Since .env files are not committed, use the provided .env.example as a reference.

Backend (/backend/.env)
```bash
PORT=5000
```
```bash
MONGO_URI=your_mongodb_connection_string_here
```
```bash
JWT_SECRET=your_secret_key_here
```





PORT: Port for the backend server

MONGO_URI: MongoDB Atlas connection string

JWT_SECRET: Secret key for signing JWT tokens

Frontend (/frontend/.env)
```bash
VITE_API_URL=http://localhost:5000
```



VITE_API_URL: URL of the backend API.
(In production, replace with deployed backend URL)





##  Seeded Users

Patient → patient@example.com / Passw0rd!

Admin → admin@example.com / Passw0rd!

Admin is seeded via utils/seedAdmin.js.
Slots are generated via utils/seedSlots.js.

## 📡 API Endpoints
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
## Register new patient
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Passw0rd!"}'

## Login as patient
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@example.com","password":"Passw0rd!"}'

## Get available slots
curl http://localhost:5000/api/slots

## Book a slot (replace <TOKEN> and <SLOT_ID>)
curl -X POST http://localhost:5000/api/book \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"slotId":"<SLOT_ID>"}'

##  Get patient’s bookings
curl http://localhost:5000/api/my-bookings \
  -H "Authorization: Bearer <TOKEN>"

## 🏗️ Architecture Notes

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
```bash
{ "error": { "code": "SLOT_TAKEN", "message": "This slot is already booked." } }

```
## 📬 Contact

For any questions or feedback, feel free to reach out:

**Shriram Hegde**  
📧 shriramh46@gmail.com  
🔗 [GitHub](https://github.com/shriram-8teen)
