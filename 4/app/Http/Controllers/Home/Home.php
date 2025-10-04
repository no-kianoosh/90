<?php

namespace App\Http\Controllers\Home;

use Exception;
use App\Models\htrv;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\SMS\SMS;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Home\Funcs;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Home\isValid;


class Home extends Controller
{
    public function index()
    {
        // check auth
        $usr = Auth::user();
        if ($usr) return redirect()->route($usr->typ . '-' . $usr->sta);
        // create days
        $days = [];
        for ($i = 0; $i < 6; $i++) {
            $days[] = Jdate($i . 'day')->format('%A %d %B');
        }
        return inertia('Home/Home', [
            'days' => $days,
            "travels" => htrv::latest()->take(50)->paginate(5),
            "rules" => DB::table('defs')->where('id', 1)?->value('rules'),
            "rulesprivate" => "asdasd\nsdaasdasd",
        ]);
    }
    public function sendcode(Request $p)
    {
        //validation
        [$sta, $ans] = isValid::validate_send_code_request($p);
        if (!$sta) return $ans;
        //limitation
        session(["type" => $p->type]);
        session(["phone" => $p->num]);
        [$sta, $ans] = Funcs::limit_sms_per_60s($p->num . $p->type);
        if (!$sta) return $ans;
        //Code sending
        $digit = rand(10000, 99999) * 0 + 12345;
        session(['digit' => $digit]);
        [$sta, $ans] = SMS::sendcode($p->phone, $digit);
        if (!$sta) {
            session(['digit' => null]);
            return $ans;
        }
        //start timer 
        session(["startedAt" => now()]);
        return response()->json([
            'suc' => true,
            'msg' => 'کد تایید برای شما ارسال شد',
        ]);
    }

    public function verify(Request $p)
    {
        //validation
        [$sta, $ans] = isValid::validate_verify_code_request($p);
        if (!$sta) return $ans;
        //check 60s
        [$sta, $ans] = Funcs::checkReset(session("startedAt"));
        if (!$sta) return $ans;
        // check limitation 3 code for each sent code
        [$sta, $ans] = Funcs::checkRateLimitVerifyCode(session("phone"));
        if (!$sta) return $ans;
        // check code
        if ($p->code != session("digit")) {
            return response()->json(['suc' => false, 'msg' => 'کد نادرست است']);
        }
        //get or create user
        try {
            $usr = User::firstOrCreate(['no' => session("phone"), 'typ' => session("type")], ['sta' => 'not-reg', 'ws' => Str::random(7)]);
            $log = $usr->log ?? [];
            $log[] = 'login : ' . jdate()->format('Y-m-d H:i:s');
            if (count($log) > 30) array_shift($log);
            $usr->log = $log;
            $usr->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            \Log::error('Error in user login: ' . $e->getMessage());
        }
        // auth user
        Auth::login($usr);
        $route = Auth::user()->typ . '-' . Auth::user()->sta;
        // delete sessions
        session()->forget("phone");
        session()->forget("digit");
        session()->forget("startedAt");
        // redirect
        return response()->json([
            'suc' => true,
            'msg' => "کد وارد شده درست است",
            'redirect_to' => route($route),
        ]);
    }
}
