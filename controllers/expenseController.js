const Expense = require('../models/expenseModel');
const expenseService = require('../services/expenseService');
const User = require('../models/userModel');
const PDFDocument = require('pdfkit');

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
    try {
        const userId = req.user.id;
        // console.log(userId)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch all expenses where the user is either the creator or a participant
        const expenses = await Expense.find({
            $or: [
                { createdBy: userId },
                { 'participants.userId': userId }
            ]
        }).populate('createdBy', 'name email');

        let totalOwed = 0;
        let totalOwes = 0;
        const balances = {};

        expenses.forEach(expense => {
            const isCreator = expense.createdBy._id.toString() === userId;
            const userParticipant = expense.participants.find(p => p.userId.toString() === userId);

            if (isCreator) {
                expense.participants.forEach(participant => {
                    if (participant.userId.toString() !== userId) {
                        const amount = participant.amountOwed;
                        totalOwed += amount;
                        balances[participant.email] = (balances[participant.email] || 0) + amount;
                    }
                });
            } else if (userParticipant) {
                const amount = userParticipant.amountOwed;
                totalOwes += amount;
                const creatorEmail = expense.createdBy.email;
                balances[creatorEmail] = (balances[creatorEmail] || 0) - amount;
            }
        });

        // Generate PDF
        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            let pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-disposition': `attachment;filename=balance_sheet_${user.name}.pdf`,
            }).end(pdfData);
        });

        // Add content to PDF
        doc.fontSize(20).text('Balance Sheet', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`User: ${user.name} (${user.email})`);
        doc.moveDown();
        doc.text(`Total Owed to You: $${totalOwed.toFixed(2)}`);
        doc.text(`Total You Owe: $${totalOwes.toFixed(2)}`);
        doc.moveDown();
        doc.text('Detailed Balances:');
        Object.entries(balances).forEach(([email, amount]) => {
            const formattedAmount = Math.abs(amount).toFixed(2);
            if (amount > 0) {
                doc.text(`${email} owes you $${formattedAmount}`);
            } else if (amount < 0) {
                doc.text(`You owe ${email} $${formattedAmount}`);
            }
        });

        doc.end();
    } catch (error) {
        console.error("Error generating balance sheet:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};