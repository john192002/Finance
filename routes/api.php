<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AuthController; // 👈 Make sure this import is here!

// 🟢 PUBLIC ROUTES (No Token Needed)
// These must be OUTSIDE the middleware so people can actually join or log in
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']); // 👈 ADD THIS LINE!

// 🔴 PROTECTED ROUTES (Token Required)
Route::middleware('auth:sanctum')->group(function () {
    
    // 💸 Only logged-in owners can see or add transactions
    Route::apiResource('transactions', TransactionController::class);
    
    // Auth actions
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
});