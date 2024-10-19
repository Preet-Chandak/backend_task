const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { handleError } = require('./utils/errorHandler');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    handleError(err, req, res, next);
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
