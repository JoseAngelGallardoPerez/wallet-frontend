export const getAmountClass = (amount: string): string => {
  return parseFloat(amount) < 0 ? 'amount_minus show' : 'amount_plus show';
};

export const getDebitCredit = (amount: string): string => {
  return parseFloat(amount) < 0 ? 'Debit' : 'Credit';
};
