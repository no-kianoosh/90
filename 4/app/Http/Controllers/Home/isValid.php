<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class isValid extends Controller
{
    public static function validate_send_code_request(Request $p)
    {
        //
        if (($validator = self::isvalid($p, ['num', 'type']))->fails()) {
            info("validator failed");
            return [false, response()->json(['suc' => false, 'msg' => $validator->errors()->first()])];
        }
        return [true, ""];
    }
    public static function validate_verify_code_request(Request $p)
    {
        //
        if (($validator = self::isvalid($p, ['code']))->fails()) {
            info("validator failed");
            return [false, response()->json(['suc' => false, 'msg' => $validator->errors()->first()])];
        }
        return [true, ""];
    }

    public static function rules($fields): array
    {
        $rooles = [
            'type' => 'required|string|in:mos,drv',
            'num' => 'required|string|regex:/^09\d{9}$/',
            'code' => 'required|integer|max:99999999999',
        ];
        return array_filter($rooles, fn($key) => in_array($key, $fields), ARRAY_FILTER_USE_KEY);
    }

    public static function errs($fields): array
    {
        $msgs = [
            'required' => ':attribute الزامی است.',
            'integer' => ':attribute باید عددی باشد.',
            'string' => ':attribute باید کارکتر باشد.',
            'in' => ':attribute معتبر نیست.',
            'min' => ':attribute باید حداقل :min باشد.',
            'regex' => ':attribute معتبر نیست.',
        ];
        return $msgs;
    }

    public static function attr($fields): array
    {
        $attributes = [
            'type' => 'نوع کاربر',
            'num' => 'شماره تماس',
            'code' => 'کد تایید',
        ];
        return array_filter($attributes, fn($key) => in_array($key, $fields), ARRAY_FILTER_USE_KEY);
    }

    public static function isvalid($p, $fields)
    {
        return Validator::make($p->all(), self::rules($fields), self::errs($fields), self::attr($fields));
    }
}
