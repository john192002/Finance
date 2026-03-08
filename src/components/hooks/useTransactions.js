import { useState, useEffect, useMemo } from "react";
import axios from "axios";

    // Create a configured axios instance
    const api = axios.create({
        baseURL: "http://finance-api.test/api",
        });

        api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    export default function useTransactions() {

    const [searchBar, setSearchBar] = useState("");
    // 1. Transactions now start as an empty array (no more localStorage)
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    // 2. FETCH from Laravel when the app loads
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get("/transactions");
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        fetchTransactions();
    }, []);

    // 3. ADD to Laravel & Database
    const addTransaction = async (newtransaction) => {
        try {
            // Send to Laravel Controller
            const response = await api.post("/transactions", newtransaction);
            // Laravel returns the new transaction with a real MySQL ID
            setTransactions(prev => [response.data, ...prev]);
        } catch (error) {
            console.error("Add failed:", error);
        }
    };

    const deleteTransaction = async (id) => {
        console.log("ID received in hook:", id);
    try {
        // 1. Tell Laravel to delete it from MySQL
        await api.delete(`/transactions/${id}`);
        
        // 2. ONLY update the UI if the database successfully deleted it
        setTransactions(prev => prev.filter(t => t.id !== id));
        
        console.log("Deleted ID:", id);
    } catch (error) {
        console.error("Delete failed:", error.response?.data);
        alert("Could not delete from database. Check if the ID exists.");
    }
};

    //Derived filtered transactions
    const filteredTransactions = useMemo(() => {
        console.log("Filtering..."); // This will now only run when transactions or filter changes
        return transactions.filter((t) => {
            //Create the Search Check
            const matchesSearch = t.description.toLowerCase().includes(searchBar.toLowerCase());
            // Create the Category Check
            const matchesType = filter === "all" || t.type === filter;
            // Only keep the item if BOTH are try
            return matchesSearch && matchesType;
        });
    }, [transactions, filter, searchBar]); // Dependency array

    //Derived sorted transactions
    const sortedTransactions = useMemo(() => {
        return [...filteredTransactions].sort((a, b) => {
            if (sortBy === "newest") return b.id - a.id;
            if (sortBy === "oldest") return a.id - b.id;
            if (sortBy === "highest") return b.amount - a.amount;
            if (sortBy === "lowest") return a.amount - b.amount;
            return 0;
        })
    }, [filteredTransactions, sortBy]);

    // ✅ Fix: Balance calculation
        const balance = useMemo(() => {
            return transactions.reduce((acc, t) => {
                const amount = parseFloat(t.amount) || 0; // Force string to number
                return t.type === "income" ? acc + amount : acc - amount;
            }, 0);
        }, [transactions]);

    // ✅ Fix: Category Totals
        const categoryTotals = useMemo(() => {
            return transactions
                .filter(t => t.type === "expense")
                .reduce((acc, t) => {
                    const amount = Number(t.amount); // Force string to number
                    acc[t.category] = (acc[t.category] || 0) + amount;
                    return acc;
                }, {});
        }, [transactions]);

    return {
        transactions: sortedTransactions,
        addTransaction,
        deleteTransaction,
        balance,
        filter,
        categoryTotals,
        setFilter,
        sortBy,
        setSortBy,
        searchBar,
        setSearchBar
    }
}