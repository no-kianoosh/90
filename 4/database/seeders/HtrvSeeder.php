<?php

namespace Database\Seeders;

use App\Models\htrv;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HtrvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        htrv::factory()->count(30)->create();
    }
}
