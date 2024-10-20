exports.calculateSplit = (splitType, amount, participants, users) => {
    switch (splitType) {

        case 'equal':

            const perPerson = amount / participants.length;
            
            return users.map(u => ({
                userId: u._id,
                email: u.email,
                amountOwed: perPerson,
                percentageOwed: (100 / participants.length).toFixed(2)
            }));

        case 'percentage':

            const totalPercentage = participants.reduce((sum, p) => sum + p.percentageOwed, 0);

            if (Math.abs(totalPercentage - 100) > 0.01) { 
                throw new Error('Total percentage must equal 100%');
            }

            return participants.map(p => {
                const user = users.find(u => u.email === p.email);
                return {
                    userId: user._id,
                    email: p.email,
                    amountOwed: (p.percentageOwed / 100) * amount,
                    percentageOwed: p.percentageOwed
                };
            });
        case 'exact':

            const totalAmountOwed = participants.reduce((sum, p) => sum + p.amountOwed, 0);

            if (Math.abs(totalAmountOwed - amount) > 0.01) { 
                throw new Error('Total of amountOwed must equal the total amount');
            }

            return participants.map(p => {
                const user = users.find(u => u.email === p.email);
                return {
                    userId: user._id,
                    email: p.email,
                    amountOwed: p.amountOwed,
                    percentageOwed: ((p.amountOwed / amount) * 100).toFixed(2)
                };
            });
        default:
            throw new Error('Invalid split type');
    }
};