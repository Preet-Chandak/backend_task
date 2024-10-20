const Expense = require('../models/expenseModel');
const expenseService = require('../services/expenseService');

exports.addExpense = async (req, res) => {
    try {
        const { description, amount, splitType, participants } = req.body;
        const createdBy = req.user.id;

        if (!Array.isArray(participants)) {
            return res.status(400).json({ error: "participants must be an array" });
        }

        const expense = await expenseService.addExpense({
            description,
            amount,
            splitType,
            participants,
            createdBy
        });

        res.status(201).json(expense);
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

exports.getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ 'participants.userId': req.user.id });
        res.json(expenses);
    } catch (error) {
        console.error("Error fetching user expenses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getOverallExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        console.error("Error fetching overall expenses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.downloadBalanceSheet = async (req, res) => {
    // Implementation for generating and downloading the balance sheet
};
