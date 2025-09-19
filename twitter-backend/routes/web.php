<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});


Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf' => true]);
});


Route::get('/', function () {
    return view('welcome');
});



//require __DIR__.'/auth.php';
