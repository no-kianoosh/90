<?php

namespace App\Http\Controllers\Driver;

use App\Models\drv;
use App\Models\htrv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class Driver extends Controller
{
    public function index()
    {
        // create days
        $days = [];
        for ($i = 0; $i < 6; $i++) {
            $days[] = Jdate($i . 'day')->format('%A %d %B');
        }

        $user = Auth::user();
        $drv = drv::where('no', $user->no)->first();
        $inf = $drv->inf;
        return inertia('Driver/Home', [
            'days' => $days,
            "travels" => htrv::latest()->take(50)->paginate(5),
            "rulesSabtSafar" => DB::table('defs')->where('id', 1)?->value('rules'),
            "chats" => "",
            "drv" => ["family" => $inf['fam'], "image" => $inf["profax"]], //$inf['sta'] -> cole dastan emtiazat
        ]);
    }
}
