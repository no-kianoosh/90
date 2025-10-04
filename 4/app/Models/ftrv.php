<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ftrv extends Model
{
    protected $table = 'fai_trvs';
    protected $casts = [
        'inf' => 'array',  // This automatically casts the JSON column to an array
        'log' => 'array',
        'chat' => 'array',
    ];
}
