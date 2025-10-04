<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class trans extends Model
{
    protected $table = 'trans';
    protected $casts = [
        'inf' => 'array',
    ];
}
