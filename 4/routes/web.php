<?php

use Inertia\Inertia;
use App\Http\Middleware\chksta;
use App\Events\NotificationSent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Home\Home;
use App\Http\Controllers\Driver\Driver;
use App\Http\Controllers\Rider\Rider;
use App\Http\Controllers\Register\Register;
use App\Http\Middleware\chkauth;

// ------------------------ Others ------------------------
Route::fallback(function () {
    return redirect(route("login"));
});
// ------------------------ Home Page ------------------------
Route::middleware('throttle:homepage')->controller(Home::class)->group(function () {
    Route::get('/', 'index')->name("login");;
    Route::post('/code', 'sendcode');
    Route::post('/verify', 'verify');
});
// ------------------------ Driver Page ------------------------
Route::middleware([chksta::class, 'throttle:user'])->controller(Driver::class)->group(function () {
    Route::get('/driver', 'index')->name("drv-ok");
});
// ------------------------ Rider Page ------------------------
Route::middleware([chksta::class, 'throttle:user'])->controller(Rider::class)->group(function () {
    Route::get('/rider', 'index')->name("mos-ok");
});
// ------------------------ Register Page ------------------------
Route::middleware([chksta::class, 'throttle:user'])->controller(Register::class)->group(function () {
    Route::get('/driver-register', 'drvreg')->name("drv-not-reg");
    Route::get('/rider-register', 'mosreg')->name("mos-not-reg");
    Route::get('/driver-pending', 'drvpending')->name("drv-chk-reg");
});
Route::middleware([chkauth::class, 'throttle:user'])->controller(Register::class)->group(function () {
    Route::post('/upload', 'upload_img')->name("upload");
    Route::post('/driver-info', 'driver_info')->name("driver-info");
});
// ------------------------ Logout ------------------------
Route::middleware([chkauth::class, 'throttle:user'])->group(function () {
    Route::post('/logout', function () {
        Auth::logout();
        session()->flush();
        return redirect('/');
    });
    //sss
});





Route::get('/ss', function () {
    $msg = ['msg', 'Hello!'];
    event(new NotificationSent($msg));
    return back();
});
