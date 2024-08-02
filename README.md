# Foodie
### Foodie: A Cutting-Edge Restaurant Platform

Welcome to Foodie, an advanced restaurant management (Responsive) platform built with the MERN stack (MongoDB, Express, React, Node.js). Foodie provides a seamless and intuitive experience for both users and administrators, leveraging the latest technology to deliver a high-performance web application. 

#### Features

**For Users:**
- **User Authentication:** Secure registration and login with JWT token-based authorization.
- **Dynamic Food Filtering:** Advanced filters to help users easily find their desired dishes.
- **Shopping Cart & Checkout:** Effortlessly add items to your cart, review orders, and complete purchases.
- **Order Management:** View past orders and track current ones in the Order tab.
- **Reservation System:** Reserve tables, view current reservations, and cancel as needed.

**For Administrators:**
- **Dashboard:** Visualize daily sales volumes with interactive bar charts.
- **Order Management:** Efficiently manage and fulfill customer orders.
- **Reservation Management:** Assign or free tables based on reservations.
- **Food Item Management:** Upload, edit, and manage food items including setting and automating discounts.

#### Technical Specifications

**Backend:**
- **Technologies:** Node.js, Express, MongoDB
- **Key Modules:**
  - `bcrypt` for secure password hashing
  - `cors` for handling Cross-Origin Resource Sharing
  - `dotenv` for environment variable management
  - `jsonwebtoken` for token-based authentication
  - `mongoose` for MongoDB object modeling
  - `multer` for handling multipart form data
  - `node-cron` for scheduling tasks
  - `zod` for schema validation

**Frontend:**
- **Technologies:** React, Vite, TailwindCSS
- **Key Modules:**
  - `@reduxjs/toolkit` for state management
  - `axios` for HTTP requests
  - `chart.js` and `react-chartjs-2` for data visualization
  - `react-router-dom` for routing
  - `uuid` for generating unique IDs

**Development Tools:**
- **ESLint & Prettier:** For code quality and style consistency
- **Vite:** For fast build times and efficient development

Foodie stands out with its responsive design and user-friendly navigation, ensuring an engaging experience without long scrolls. Dive into a world where technology meets culinary delights and streamline your restaurant management with Foodie.

## 📂 How to Get Started

1. **Clone a Repository**:

2. **Install Dependencies**:
   - For the backend: `npm install`
   - For the frontend: `npm install`

3. **Run the Application**:
   - Backend: `npx nodemon index.js`
   - Frontend: `npm run dev`
