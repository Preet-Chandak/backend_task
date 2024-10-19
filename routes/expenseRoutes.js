const express = require('express');
const { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/user', protect, getUserExpenses);
router.get('/all', getOverallExpenses);
router.get('/balance-sheet', protect, downloadBalanceSheet);

module.exports = router;
