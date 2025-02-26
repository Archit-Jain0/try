E-Commerce Web Application
  An e-commerce platform designed with user authentication, product management, shopping cart functionality, and payment processing. The application is equipped to handle various user roles, including customers and admins, with a secure and seamless experience for all users.

Features
  User Authentication
    Secure login and registration system.
    Password encryption using bcryptjs.
    Role-based access control for customers and admins.
    JWT-based authentication for protected routes and session management.
  Product Management
    Admins can:
      Add, edit, and delete products.
      Manage product categories and inventory.
    Customers can:
      Browse products.
      View detailed product descriptions and images.
  Shopping Cart
    Add/remove items to/from the shopping cart.
    Update item quantities dynamically.
    Persist cart data for logged-in users.
  Payment Processing
    Integrated with Stripe for secure and reliable payment handling.
    Real-time payment status updates.
  File Handling & Cloud Storage
    Image uploads for products using express-fileupload.
    Cloudinary integration for efficient and secure image management.
  Email Notifications
    Account verification and password reset functionality via emails powered by nodemailer.
Tech Stack
  Backend
    Core Libraries: Express, Mongoose
    Authentication & Security: bcryptjs, jsonwebtoken
    File Handling: express-fileupload, cloudinary
    Email Sending: nodemailer
    Environment Management: dotenv
    Utilities: validator
    Development Tools: nodemon
  Frontend
    React Ecosystem: React, React-DOM, React Router, Redux, React-Redux
    UI Library: Material-UI
    Payment Integration: @stripe/react-stripe-js, @stripe/stripe-js
    HTTP Requests: axios
    Charts: chart.js, react-chartjs-2
    Icons: react-icons
Getting Started
  Prerequisites
    Node.js (v14+)
    MongoDB (local or cloud instance)
    Stripe API keys for payment processing.
    Cloudinary Account for image storage.
  Setup Instructions
    1. Clone the repository
      git clone https://github.com/your-username/e-commerce-app.git
      cd e-commerce-app
    2. Install dependencies
      Backend:
        cd backend
        npm install
      Frontend:
        cd frontend
        npm install
    3. Configure environment variables
  Create a .env file in the backend directory with the following keys:
 ........
  4. Run the application
    Backend:
      npm run dev
    Frontend:
      npm start
Access the application at http://localhost:3000.
Demo
  Admin View
    Add/edit/delete products.
    View sales analytics via interactive charts.
  Customer View
    Browse products and add to cart.
    Secure checkout using Stripe.
