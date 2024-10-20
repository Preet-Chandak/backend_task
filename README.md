# **Daily Expenses Sharing Application**

A simple, user-friendly application designed to manage and share daily expenses between multiple users. It allows users to register, add expenses, split costs among participants, and generate detailed balance sheets.

## **Quick Links**
- **GitHub Repository**: [Preet-Chandak/backend_task](https://github.com/Preet-Chandak/backend_task)
- **Live Deployment (AWS)**: [Daily Expenses Sharing App](http://3.110.217.208/)
- **Portfolio Website**: [Preet Chandak](https://www.preetchandak.in/)
- **LinkedIn Profile**: [Preet Chandak](https://www.linkedin.com/in/preet-chandak/)

---

## **Features**
- **User Registration & Login**: Secure user authentication.
- **Expense Management**: Add expenses and split them equally, by percentage, or custom amounts.
- **Personal & Group Expense Tracking**: View individual and group expenses.
- **Balance Sheets**: Generate and download balance sheets for your expenses.

---

## **Tech Stack**
- **Backend**: Node.js with Express
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Amazon Web Services (AWS)

---

## **Getting Started**

Follow the steps below to set up the server locally.

### **Prerequisites**
- **Node.js** (v14+)
- **MongoDB** (Local instance or cloud provider like MongoDB Atlas)

### **Installation**

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/daily-expenses-sharing-app.git
    cd daily-expenses-sharing-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:  
   Create a `.env` file in the root directory and add the following:

    ```bash
    DB_URI="mongodb+srv://preet2828chandak:tXbptcEefX8diu4a@cluster0.wm03e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/daily-expenses-sharing"
   JWT_SECRET=zxcvbnmasdfghjklqwertyuiop@
   PORT=5000
    ```
    *Note: Providing with my .env file for Quick and Easy Setup 

4. **Start the application**:

    ```bash
    npm run dev
    ```

5. The server will be running at `http://localhost:5000`.

---

## **API Endpoints**

### **User Routes**
- **POST** `/api/users/register`: Register a new user
- **POST** `/api/users/login`: User login
- **GET** `/api/users/profile`: Get user details (JWT required)

### **Expense Routes**
- **POST** `/api/expenses/add`: Add a new expense (JWT required)
- **GET** `/api/expenses/user`: Get individual user expenses (JWT required)
- **GET** `/api/expenses/all`: Get all expenses (public)
- **GET** `/api/expenses/balance-sheet`: Download balance sheet (JWT required)

---
