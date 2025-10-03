<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Htrv>
 */
class HtrvFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sta' => $this->faker->name,
            'unq' => Str::random(6),
            'day' =>  "12132",
            'tim' => 1758371400,
            "org" => $this->faker->word,
            "des1" => $this->faker->word,
            "cap" => $this->faker->numberBetween(1, 4),
            "inf" => [

                "drvr" => [
                    "profax" => "58c806d6b437",
                    "fam" => "عبادی",
                ],
                "trv" => [
                    "day" => 1,
                    "hour" => 16,
                    "min" => 0,
                    "dshow" => "جمعه 28 شهریور",
                    "hshow" => "16",
                    "mshow" => "00",
                    "mabcity" => "تهران",
                    "mag0city" => "تهران",
                    "mabadd" => "تهران، بلوار هاشم زاده، سروستان چهاردهم غربی",
                    "mag0add" => "تهران، بلوار هاشم زاده، سروستان چهاردهم غربی",
                    "mablat" => 35.75765724051562,
                    "mag0lat" => 35.75765724051562,
                    "mablng" => 51.23474121093751,
                    "mag0lng" => 51.23474121093751,
                    "capacity" => "3",
                    "toz" => "لطفا به موقع در مبدا حضور داشته باشید",
                    "magcounter" => 1,
                ],
                "chat" => "pKoDal",
                "rdrs" => [],
            ],
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
