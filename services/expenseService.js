exports.calculateSplit = (splitType, amount, participants) => {
    let calculatedParticipants = [];

    if (splitType === 'equal') {
        const perPerson = amount / participants.length;
        calculatedParticipants = participants.map(p => ({ ...p, amountOwed: perPerson }));
    }

    if (splitType === 'exact') {
        calculatedParticipants = participants;
    }

    if (splitType === 'percentage') {
        calculatedParticipants = participants.map(p => ({...p, amountOwed: (p.percentageOwed / 100) * amount }));
    }

    return calculatedParticipants;
};
