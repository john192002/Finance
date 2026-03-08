<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $casts = [
    'amount' => 'float', // 👈 This forces Laravel to send a Number to React
];
    // This allows Laravel to "fill" these columns from your React data
    protected $fillable = ['description', 'amount', 'type', 'category', 'user_id',];
}
