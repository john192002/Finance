import { useState } from "react";

    const INCOME_CATEGORIES = ["Salary", "Freelance", "Gift", "Other"];
    const EXPENSE_CATEGORIES = ["Food", "Shopping", "Bills", "Rent", "Entertainment", "Other"];


    function TransactionForm({ addTransaction }) {
        const[description, setDescription] = useState("");
        const [amount, setAmount] = useState("");
        const [type, setType] = useState("expense");
        const [category, setCategory] = useState("food");

        const availableCategories = type === "income" ? INCOME_CATEGORIES  : EXPENSE_CATEGORIES;      

        const handleSubmit = (e) => {
            e.preventDefault();

            //validation

            if(!amount || Number(amount) <= 0) {
                alert("Amount must be a number greater than 0")
            return
            }

            if(description.match(/\d/)) {
                alert("Description should only be text")
            return
            }

            const newTransaction = {
                id: Date.now(),
                description,
                amount: Number(amount),
                type,
                category,
            };

            
            addTransaction(newTransaction);

            setDescription("")
            setAmount("")
            setType("income")
        };
        
       

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                required
            />
            <input 
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
                required
            />
            {/* Choose the 'Drawer' (Add or Subtract) */}
            <select value={type} onChange={(e) => {
                setType(e.target.value);
                //Reset Category to the first item of the new list so they stay in sync
                setCategory(e.target.value === "income" ? "Salary" : "Food");
            }}>

                <option value="income">Income</option>
                <option value="expense">Expense</option>
             </select>

             <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {availableCategories.map(category => 
                <option key={category} value={category}>{category}</option>)}
             </select>

             <button className="transaction-btn" type="submit">Add Transaction</button>
        </form>
    );
}


export default TransactionForm;