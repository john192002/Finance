function Balance ({ transactions, categoryTotals }) {
    const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

    const total = income - expense;

    return (
        <div>
            <h1>Balance: ${total}</h1>
            <p>Income: ${income}</p>
            <p>Expenses: ${expense}</p>

            {/* The Breakdown Section */}
            {Object.keys(categoryTotals).length > 0 && (
              <div>
                <h4>Spending Breakdown:</h4>
                {Object.entries(categoryTotals).map(([category, amount]) => (
                    <div key={category} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", margin: "3px 0"}}>
                        <span>{category}</span>
                        <strong>${amount}</strong>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}

export default Balance