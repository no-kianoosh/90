<?php

namespace App\Http\Controllers\Home;

use App\Models\htrv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class Home extends Controller
{
    public function index()
    {
        $days = [];
        for ($i = 0; $i < 6; $i++) {
            $days[] = Jdate($i . 'day')->format('%A %d %B');
        }
        return inertia('Home', [
            'days' => $days,
            "travels" => htrv::latest()->take(50)->paginate(5),
            "rules" => DB::table('defs')->where('id', 1)?->value('rules'),
            "rulesprivate" => "asdasd\nsdaasdasd"
        ]);
    }

    public function rules() {}
}
