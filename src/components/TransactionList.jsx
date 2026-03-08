import TransactionItem  from "./TransactionItem"

function TransactionList ({ transactions, onDelete }) {

    if (transactions.length === 0) return <p>No transactions yet</p>
     
    return (
        <div>
            {transactions.map((transaction) => (
                <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={onDelete}
            />
            ))}
        </div>
    )
}

export default TransactionList