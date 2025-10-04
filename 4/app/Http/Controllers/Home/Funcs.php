<?php

namespace App\Http\Controllers\Home;

use stdClass;
use Exception;
use App\Models\cus;
use App\Models\drv;
use App\Models\htrv;
use App\Models\mtrv;
use App\Jobs\ToDBJob;
use Illuminate\Support\Str;
use Livewire\Attributes\On;
use Livewire\Volt\Component;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;


class Funcs
{
    static function limit_sms_per_60s($key)
    {
        $key = 'send-sms-' . $key;
        if (RateLimiter::tooManyAttempts($key, 1)) {
            $seconds = RateLimiter::availableIn($key);
            return [false, response()->json(['suc' => false, 'msg' => 'لطفا تا درخواست بعدی ' . $seconds . ' ثانیه منتظر بمانید'])];
        }
        $sec = (int)env("one_sms_per_x_sec");
        RateLimiter::hit($key, $sec);
        return [true, ""];
    }
    static function checkReset($startedAt)
    {
        if ($startedAt && now()->diffInSeconds($startedAt) >= 60) {
            return [false, response()->json(['suc' => false, 'msg' => 'کد منقضی شده است. لطفا مجدد تلاش کنید'])];
        }
        return [true, ""];
    }
    static function checkRateLimitVerifyCode($key)
    {
        // every 30 seconds/ can enter 2 code
        $key = 'code-' . $key;
        if (RateLimiter::tooManyAttempts($key, 2)) {
            $seconds = RateLimiter::availableIn($key);
            return [false, response()->json(['suc' => false, 'msg' => 'لطفا تا درخواست بعدی ' . $seconds . ' ثانیه منتظر بمانید'])];
        }
        RateLimiter::hit($key, 30);
        return [true, ""];
    }
}
