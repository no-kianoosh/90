<?php

use App\Events\NotificationSent;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return inertia('Home');
});


Route::get('/ss', function () {
    $msg = ['msg', 'Hello!'];
    event(new NotificationSent($msg));
    return back();
});
