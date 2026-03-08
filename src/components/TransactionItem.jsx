function TransactionItem({ transaction, onDelete }) {
    const {description, amount, type, category } = transaction;

    return (
        <div className={`transaction-item ${type === 'income' ? 'income-border' : 'expense-border'}`}>
            <div>
                <div style={{ fontWeight: 'bold' }}>{description}</div>
                <small style={{ color: '#64748b' }}>{category}</small>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 'bold', color: type === 'income' ? 'var(--income)' : 'var(--expense)' }}>
                {type === 'income' ? '+' : '-'}${amount}
                </span>
                <button className="delete-btn" onClick={() => onDelete(transaction)}>Delete</button>
            </div>
        </div>
    )
}

export default TransactionItem