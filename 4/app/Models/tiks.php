<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tiks extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'tikets';
    protected $casts = [
        'txt' => 'array',  // This automatically casts the JSON column to an array
    ];
    protected $fillable = ['no', 'txt', 'edit', 'typ'];
}
