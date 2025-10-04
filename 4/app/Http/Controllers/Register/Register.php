<?php

namespace App\Http\Controllers\Register;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class Register extends Controller
{
    public function drvreg(Request $p)
    {
        session()->flush();
        return;
        session()->regenerateToken();
        return inertia('Register/DriverReg');
    }
    public function mosreg(Request $p)
    {
        session()->flush();
        return;
        return inertia('Register/MosReg');
    }
    public function drvdrvpendingreg(Request $p)
    {
        return inertia('Register/DriverPending');
    }
}
