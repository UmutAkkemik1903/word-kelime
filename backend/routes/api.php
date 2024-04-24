<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('word','App\Http\Controllers\Api\WordController@index');
Route::get('word/{id}','App\Http\Controllers\Api\WordController@show');
Route::post('word','App\Http\Controllers\Api\WordController@store');
Route::post('word/{id}','App\Http\Controllers\Api\WordController@update');
Route::post('word-delete','App\Http\Controllers\Api\WordController@destroy');