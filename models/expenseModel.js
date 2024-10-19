const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    splitType: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
    participants: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            amountOwed: { type: Number },
            percentageOwed: { type: Number }
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
