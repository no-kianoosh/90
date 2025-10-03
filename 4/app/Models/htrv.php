<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class htrv extends Model
{
    use HasFactory;

    protected $table = 'hot_trvs';
    protected $casts = [
        'inf' => 'array',  // This automatically casts the JSON column to an array
        'log' => 'array',
        'chat' => 'array',
    ];
}
