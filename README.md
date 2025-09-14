#  React Analytics Dashboard

A simple Analytics Dashboard built with React + Vite that displays user data and sales analytics using charts and tables.  
This project demonstrates state management, data visualization, search, pagination, CSV export, and authentication flow.  

---

##  Features
-  Dashboard: Widgets for total sales & orders, Bar chart (monthly sales), Pie chart (sales by category).  
-  Users Page: User list with search, filter, pagination, and user detail modal.  
-  Reports Page*: Charts + Export data to CSV.  
-  Dummy Login: Use email-test@gmail.com & password-Tech@123 .  
-  Dark/Light Mode toggle.  
-  Responsive Design using only custom CSS + media queries .  

---

##  Tech Stack
- React (Vite) – fast dev environment  
- React Router DOM – routing  
- Recharts – charts (Bar, Pie)  
- Context API – authentication state  

---

##  Project Structure
src/
├── components/ # Reusable UI components (charts, tables, header, sidebar, modal)
├── context/ # Auth context
├── data/ # JSON data (sales, users)
├── pages/ # Pages (Dashboard, Users, Reports, Login)
├── App.jsx # Routes
├── main.jsx # Entry point
├── index.css # Global CSS

##  Setup Instructions

1. Clone the Repo
   git clone https://github.com/sanketpatil05/analytics-dashboard.git
2. Install Dependencies
   npm install
3. Run Locally
   npm run dev
App will run on → http://localhost:5173

