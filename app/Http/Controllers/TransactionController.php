<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    // GET: http://finance-api.test/api/transactions
    public function index()
    {
        // 🏠 Only get transactions belonging to the current user
        return Transaction::where('user_id', auth()->id())->get();
    }

    // POST: http://finance-api.test/api/transactions
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'amount'      => 'required|numeric',
            'type'        => 'required|string',
            'category'    => 'required|string',
        ]);

        // ✨ Use the $validated array instead of $fields
        $transaction = Transaction::create([
            'description' => $validated['description'],
            'amount'      => $validated['amount'],
            'type'        => $validated['type'],
            'category'    => $validated['category'], // 👈 Added missing category
            'user_id'     => auth()->id()
        ]);

        return response()->json($transaction, 201);
    }

    public function destroy($id)
    {
        // 🛡️ Extra Security: Only find transaction if it belongs to THIS user
        $transaction = Transaction::where('user_id', auth()->id())->find($id);

        if ($transaction) {
            $transaction->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        }

        return response()->json(['message' => 'Transaction not found'], 404);
    }
}