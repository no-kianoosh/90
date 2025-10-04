<?php

namespace App\Models;

use App\funcs\keys;
use App\Jobs\ToDBJob;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class cus extends Model
{
    protected $table = 'cuss';
    protected $casts = [
        'inf' => 'array',  // This automatically casts the JSON column to an array
        'log' => 'array',
        'trvs' => 'array',
        'trns' => 'array',
    ];
    //protected $fillable = ['no'];
    protected $guarded = [];
    use HasFactory;

    // public $lifetime;

    // public function __construct(array $attributes = [])
    // {
    //     parent::__construct($attributes);

    //     $this->lifetime = config('session.lifetime') * 60;
    // }

    // public function key($no): string
    // {
    //     $key = $this->getTable() . ':' . $no . ":";
    //     keys::add_key($key);
    //     return $key;
    // }

    // public static function updatex(cus $user): void
    // {
    //     $key = $user->key($user->no);
    //     if (!Cache::has($key)) dd("key not exist");
    //     $user->update($user->only($user->fillable));
    //     Cache::put($key, $user->fresh(), $user->lifetime);
    // }

    // public function readx(string $no): ?self
    // {
    //     return Cache::remember($this->key($no), $this->lifetime, function () use ($no) {
    //         return static::firstOrCreate(['no' => $no]);
    //     });
    // }

    // public function getRedisKey(): string
    // {
    //     return  $this->getTable() . ':' . $this->no . ":";
    // }

    // public function saveredis(): void
    // {
    //     $key = $this->getRedisKey();
    //     keys::add_key($key);
    //     Redis::setex($key, config('session.lifetime') * 60, json_encode($this->toArray()));
    //     ToDBJob::dispatch($this, $this->toArray())->onQueue('med');
    // }

    // public static function readredis(string $no, $typ = ""): ?self
    // {
    //     $temp = new static;
    //     $key = "{$temp->getTable()}:{$no}:{$typ}";
    //     keys::add_key($key);
    //     $cached = Redis::get($key);
    //     if ($cached) {
    //         Redis::expire($key, config('session.lifetime') * 60);
    //         return new static(json_decode($cached, true));
    //     }

    //     $record = static::firstOrCreate(['no' => $no]);
    //     if ($record) {
    //         Redis::setex($key, config('session.lifetime') * 60, json_encode($record->toArray()));
    //     }
    //     return $record;
    // }
}
