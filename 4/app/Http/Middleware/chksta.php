<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class chksta
{
    public function handle(Request $request, Closure $next): Response
    {;
        $usr = Auth::user();
        if (!$usr) return redirect()->route('login');
        $targetRoute = $usr->typ . '-' . $usr->sta;
        if ($request->route()?->getName() === $targetRoute) return $next($request);
        return redirect()->route($targetRoute);
    }
}
