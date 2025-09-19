<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\TweetController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tweets/private', [TweetController::class, 'private']);
    Route::post('/tweets', [TweetController::class, 'store']);
    Route::put('/tweets/{id}', [TweetController::class, 'update']);
    Route::delete('/tweets/{id}', [TweetController::class, 'destroy']);
});

Route::get('/tweets/public', [TweetController::class, 'public']);
