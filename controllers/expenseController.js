const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const { calculateSplit } = require('../services/expenseService');

exports.addExpense = async (req, res) => {
    const { description, amount, splitType, participants } = req.body;
    const createdBy = req.user.id;

    const calculatedParticipants = calculateSplit(splitType, amount, participants);

    const expense = new Expense({
        description,
        amount,
        splitType,
        participants: calculatedParticipants,
        createdBy
    });

    await expense.save();
    res.status(201).json(expense);
};

exports.getUserExpenses = async (req, res) => {
    const expenses = await Expense.find({ 'participants.userId': req.user.id });
    res.json(expenses);
};

exports.getOverallExpenses = async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
};

exports.downloadBalanceSheet = async (req, res) => {
    // Implementation for generating and downloading the balance sheet
};
