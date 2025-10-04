<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Cache;
use App\Jobs\ToDBJob;
use App\funcs\keys;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'users';

    protected $casts = [
        'log' => 'array',
    ];

    protected $fillable = [
        'no',
        'typ',
        'sta',
        'ws',
        'log',
        'trvs',
    ];
}
