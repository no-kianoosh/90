<?php

namespace App\Http\Controllers\Register;

use Exception;
use App\Models\drv;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Register\Funcs;

class Register extends Controller
{
    public function drvreg(Request $p)
    {
        session()->regenerateToken();
        return inertia('Register/DriverReg');
    }

    public function driver_info(Request $p)
    {
        [$sta, $ans] = isValid::validate_drv_info_request($p);
        if (!$sta) return $ans;
        $usr = drv::firstOrCreate(['no' => Auth::user()->no], ['sta' => 'not-reg']);
        $usr->fam = $p->lastName;
        $inf = $usr->inf;
        if (empty($inf)) {
            $inf['code_meli'] = $p->mcode;
            $inf['phone'] = $p->phone;
            $inf['email'] = $p->email;
            $inf['profax'] = substr(md5(uniqid(mt_rand(), true)), 0, 12);
            $inf['folder'] = substr(md5(uniqid(mt_rand(), true)), 0, 12);
        }
        $inf['nam'] = $p->name;
        $inf['fam'] = $p->fame;
        $usr->inf = $inf;
        DB::beginTransaction();
        try {
            $usr->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            \Log::error('Error in save driver Info: ' . $e->getMessage());
            return [false, response()->json(['suc' => false, 'msg' => 'خطایی در ثبت اطلاعات رخ داده است، لطفا مجددا تلاش کنید'])];
        }
        return response()->json(['suc' => true, 'msg' => 'اطلاعات با موفقیت ثبت شد']);
    }

    public function upload_img(Request $p)
    {

        [$sta, $ans] = isValid::validate_image($p);
        if (!$sta) return $ans;

        $usr = drv::firstWhere('no', Auth::user()->no);
        $inf = $usr->inf;

        if (empty($inf) || !isset($inf['folder']) || !isset($inf['profax'])) {
            return response()->json(['suc' => false, 'msg' => 'ابتدا اطلاعات شخصی خود را در مرحله اول ثبت کنید']);
        }

        $name = $p->imgname;
        DB::beginTransaction();
        try {
            if ($name == 'faceimg') {
                //$this->img->move(public_path('users'), $inf['profax']);
                $p->img->storeAs('users', $inf['profax'] . '.jpg', 'public');
            } elseif ($name == 'Bimename') {

                $p->img->storeAs($inf['folder'], $name . '.jpg', 'private');
                $usr->sta = 'chk-reg';
                $usr->save();
                $user = User::firstWhere(['no' => Auth::user()->no, 'typ' => 'drv']);
                $user->sta = 'chk-reg';
                $user->save();
                DB::commit();
            } else {
                $p->img->storeAs($inf['folder'], $name . '.jpg', 'private');
            }
        } catch (Exception $e) {
            DB::rollBack();
            \Log::error('Error in Uploade image: ' . $e->getMessage());
            return [false, response()->json(['suc' => false, 'msg' => 'خطایی در ثبت اطلاعات رخ داده است، لطفا مجددا تلاش کنید'])];
        }

        return response()->json(['suc' => true, 'msg' => 'آپلود با موفقیت انجام شد']);
    }


    public function mosreg(Request $p)
    {
        session()->flush();
        return;
        return inertia('Register/MosReg');
    }



    public function drvdrvpendingreg(Request $p)
    {
        return inertia('Register/DriverPending');
    }
}
