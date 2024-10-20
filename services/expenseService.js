const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const { calculateSplit } = require('../utils/splitUtils'); 

exports.addExpense = async ({ description, amount, splitType, participants, createdBy }) => {
    const creator = await User.findById(createdBy);
    if (!creator) {
        throw new Error('Creator user not found.');
    }

    const participantEmails = participants.map(p => p.email);
    const allEmails = [...new Set([...participantEmails, creator.email])];
    const users = await User.find({ email: { $in: allEmails } });
    
    if (users.length !== allEmails.length) {
        throw new Error('Some participants are not registered users.');
    }

    try {
        const calculatedParticipants = calculateSplit(splitType, amount, participants, users);

        const expense = new Expense({
            description,
            amount,
            splitType,
            participants: calculatedParticipants,
            createdBy
        });

        await expense.save();
        return expense;
    } catch (error) {
        throw new Error(`Error calculating split: ${error.message}`);
    }
};