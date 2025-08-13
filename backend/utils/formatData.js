function formatTransactions(transactions) {
    return transactions.map(tx => ({
      from: tx.from,
      to: tx.to,
      value: tx.value,
      timeStamp: tx.timeStamp
    }));
  }
  
  module.exports = { formatTransactions };
  