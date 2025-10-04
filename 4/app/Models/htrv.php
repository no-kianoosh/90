<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class htrv extends Model
{
    protected $table = 'hot_trvs';
    protected $casts = [
        'inf' => 'array',  // This automatically casts the JSON column to an array
        'log' => 'array',
        'chat' => 'array',
    ];
}
