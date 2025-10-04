<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('user', function (Request $request) {
            return Auth::user()
                ? Limit::perMinute(60)->by($request->user()->id)
                : Limit::perMinute(0)->by($request->ip());
        });

        RateLimiter::for('homepage', function (Request $request) {
            return Limit::perMinute(899)->by($request->ip());
        });
    }
}
