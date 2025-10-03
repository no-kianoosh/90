<?php

use App\Events\NotificationSent;
use App\Http\Controllers\Home\Home;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',  [Home::class, 'index']);
Route::post('/rules',  [Home::class, 'rules']);



Route::get('/ss', function () {
    $msg = ['msg', 'Hello!'];
    event(new NotificationSent($msg));
    return back();
});
