<?php

namespace App\Http\Controllers\Rider;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Rider extends Controller
{
    public function index(Request $p)
    {
        return inertia('Rider/Home');
    }
}
