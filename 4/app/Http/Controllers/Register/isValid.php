<?php

namespace App\Http\Controllers\Register;

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


class isValid
{

    public static function validate_image($p)
    {
        //
        if (($validator = self::isvalid($p, ['imgname', 'img']))->fails()) {
            info("img failed");
            return [false, response()->json(['suc' => false, 'msg' => $validator->errors()->first()])];
        }
        return [true, ""];
    }

    public static function validate_image_mos($p)
    {
        //
        if (($validator = self::isvalid($p, ['imgname', 'img']))->fails()) {
            info("img failed");
            return [false, response()->json(['suc' => false, 'msg' => $validator->errors()->first()])];
        }
        return [true, ""];
    }


    public static function validate_mos_info_request($p)
    {
        //
        if (($validator = self::isvalid($p, ['firstName', 'LastName', 'mcode', 'email']))->fails()) {
            info("validator failed");
            return [false, response()->json(['suc' => false, 'msg' => $validator->errors()->first()])];
        }
        return [true, ""];
    }
    public static function validate_drv_info_request($p)
    {
        //
        if (($validator = self::isvalid($p, ['firstName', 'LastName', 'mcode', 'email']))->fails()) {
            info("validator failed");
            return [false, response()->json(['suc' => false, 'msg' => $validator->errors()->first()])];
        }
        return [true, ""];
    }
    public static function isvalid($p, $fields)
    {
        return Validator::make($p->all(), self::rules($fields), self::errs($fields), self::attr($fields));
    }
    public static function rules($fields): array
    {
        $rooles = [
            'imgname' => ['required', 'string', 'regex:/^[\a-z\s]{2,40}$/u', 'in:faceimg,liccard1,liccard2,carcard1,carcard2,Bimename'],
            'firstName' => ['required', 'string', 'regex:/^[\p{Arabic}\s]{2,40}$/u'],
            'lastName' => ['required', 'string', 'regex:/^[\p{Arabic}\s]{2,40}$/u'],
            'mcode' => ['required', 'string', 'regex:/^[0-9]{10}$/'],
            'email' => ['nullable', 'string', 'email', 'max:30'],
            'img' => 'required|image|max:999',
        ];
        return array_filter($rooles, fn($key) => in_array($key, $fields), ARRAY_FILTER_USE_KEY);
    }

    public static function errs($fields): array
    {
        $msgs = [
            'required' => ':attribute الزامی است',
            'string' => ':attribute باید کارکتر باشد',
            'regex' => ':attribute معتبر نیست',
            'jpeg' => ' فرمت فایل :attribute صحیح نیست ',
            'max' => 'حجم فایل زیاد است',
            'image' => 'نوع فایل باید عکس باشد',
        ];
        return $msgs;
    }

    public static function attr($fields): array
    {
        $attributes = [
            'firstName' => 'نام',
            'LastName' => 'نام خانوادگی ',
            'mcode' => 'کد ملی',
            'email' => 'ایمیل',
            'image' => 'عکس',
        ];
        return array_filter($attributes, fn($key) => in_array($key, $fields), ARRAY_FILTER_USE_KEY);
    }
}
