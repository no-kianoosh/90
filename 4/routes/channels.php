<?php

use Illuminate\Support\Facades\Broadcast;

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('user.{ws}', function ($user, $ws) {
    return $user->ws === $ws;
});

Broadcast::channel('notifications', function ($user) {
    return true;  // or some auth logic
});
