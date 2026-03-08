import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import useTransactions from "../components/hooks/useTransactions";
import Balance from "../components/Balance";
import DeleteModal from "../components/modal/DeleteModal";

function Dashboard() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    filter, 
    setFilter,
    categoryTotals,
    setSortBy,
    searchBar,
    setSearchBar
  } = useTransactions();

  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  return (
    <div className="main-layout">
      {/* LEFT COLUMN: Summary & Form */}
      <aside className="sidebar">
        {/* Wrap Balance in the 'card' class for the white box effect */}
        <div className="card">
          <Balance transactions={transactions} categoryTotals={categoryTotals} />
        </div>
        
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Add Transaction</h3>
          <TransactionForm addTransaction={addTransaction} />
        </div>
      </aside>

  

      
      <main className="content">
        <div className="card top-bar">
          <div className="filter-group">
            <button 
              className={`filter-btn ${filter === "all" ? "active" : ""}`} 
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === "income" ? "active" : ""}`} 
              onClick={() => setFilter("income")}
            >
              Income
            </button>
            <button 
              className={`filter-btn ${filter === "expense" ? "active" : ""}`} 
              onClick={() => setFilter("expense")}
            >
              Expense
            </button>
          </div>

          <select className="sort-select" onChange={(e) => setSortBy(e.target.value)}>
             <option value="newest">Newest</option>
             <option value="oldest">Oldest</option>
             <option value="highest">Highest Amount</option>
             <option value="lowest">Lowest Amount</option>
          </select>
        </div>

         <div className="search-container">
          <input 
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchBar}
            onChange={e => setSearchBar(e.target.value)}
            /> 
            
      </div>

        <TransactionList 
          transactions={transactions} 
          onDelete={setTransactionToDelete} 
        />

        <DeleteModal
          isOpen={!!transactionToDelete}
          description={transactionToDelete?.description}
          onCancel={() => setTransactionToDelete(null)}
          onConfirm={confirmDelete}
        />
      </main>
    </div>
  );
}

export default Dashboard;