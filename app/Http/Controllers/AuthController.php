<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
    $fields = $request->validate([
        'name' => 'required|string',
        'email' => 'required|string|unique:users,email',
        'password' => 'required|string|confirmed'
    ]);

    $user = User::create([
        'name' => $fields['name'],
        'email' => $fields['email'],
        'password' => bcrypt($fields['password'])
    ]);

    // This creates the "Passport" React needs
    $token = $user->createToken('myapptoken')->plainTextToken;

    return response(['user' => $user, 'token' => $token], 201);
    }
    
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('financetoken')->plainTextToken;

        return response(['user' => $user, 'token' => $token], 200);
    }

    // public function changePassword(Request $request) {
    //     $fields = $request->validate([
    //         'current_password' => 'required|string',
    //         'new_password' => 'required|string|confirmed|min:8',
    //     ]);

    //     $user = auth()->user(); //This grabs the person who is currently logged in

    //     // Check if the old password is correct
    //     if(!Hash::check($fields['current_password'], $user->password)) {
    //         return response(['message' => 'Current password does not match'], 401);
    //     }

    //     // Update to the new password
    //     $user->update([
    //         'password' => bcrypt($fields['new_password'])
    //     ]);

    //     return response (['message' => 'Password changed successfully!']);
    // }
}
