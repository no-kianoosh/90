<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class extiks extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'extikets';
    protected $casts = [
        'txt' => 'array',  // This automatically casts the JSON column to an array
    ];
    protected $fillable = ['no', 'txt', 'edit', 'typ'];
}
