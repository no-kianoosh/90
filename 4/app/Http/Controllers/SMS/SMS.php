<?php

namespace App\Http\Controllers\SMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Trez\RayganSms\Facades\RayganSms;

class SMS extends Controller
{
    static function sendcode($no, $code)
    {
        $txt = "به بوتگر خوش آمدید" . "\n" . "کد تایید: " . $code . " " . "";
        //$response = RayganSms::sendMessage($no,  $txt); // time out 10 seconds
        return [true, ""];
    }
}
