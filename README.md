### **README File (`README.md`)**
This file provides instructions on how to set up and run the project. 

```md
# Daily Expenses Sharing Application

This is a simple application to manage and share daily expenses between multiple users. Users can add expenses, split them among participants, and generate balance sheets.

## Features
- User Registration and Login
- Add Expenses and Split Them (equally, by percentage, or exact amounts)
- View Personal and Overall Expenses
- Generate and Download Balance Sheets

## Tech Stack
- **Backend**: Node.js with Express
- **Database**: MongoDB (Mongoose for ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **File Handling**: Multer for balance sheet downloads

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally or on a cloud provider like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/daily-expenses-sharing-app.git
   cd daily-expenses-sharing-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```bash
   DB_URI=mongodb://localhost:27017/daily-expenses-sharing
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the MongoDB server:

   ```bash
   mongod
   ```

5. Start the application:

   ```bash
   npm run dev
   ```

6. The server will be running at `http://localhost:5000`.

## API Endpoints

### User Routes
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: User login
- `GET /api/users/profile`: Get user details (JWT token required)

### Expense Routes
- `POST /api/expenses/add`: Add a new expense (JWT token required)
- `GET /api/expenses/user`: Get individual user expenses (JWT token required)
- `GET /api/expenses/all`: Get all expenses (public)
- `GET /api/expenses/balance-sheet`: Download balance sheet (JWT token required)

## Testing

Unit and integration tests are written using Jest and Supertest. To run the tests:

```bash
npm test
```

## License

This project is licensed under the MIT License.
```

---

These files should complete your project setup and provide a good foundation for expanding functionality. Let me know if you need any additional information or clarification!