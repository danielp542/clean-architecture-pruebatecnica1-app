<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\StatusController;
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
Route::prefix('v1')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::post('users', [UserController::class, 'store']);
    Route::get('users', [UserController::class, 'index']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::prefix('authors')->group(function () {
    Route::get('/', [AuthorController::class, 'getAll']);
    Route::get('/{id}', [AuthorController::class, 'findById']);
    Route::get('/search/{name}', [AuthorController::class, 'findByName']);
    Route::post('/', [AuthorController::class, 'create']);
});

Route::prefix('books')->group(function () {

    Route::post('/', [BookController::class, 'save']);
    Route::get('/', [BookController::class, 'getall']);
    Route::get('/{id}', [BookController::class, 'findById']);
    Route::get('/title/{title}', [BookController::class, 'findByTitle']);
    Route::get('/isbn/{isbn}', [BookController::class, 'findByIsbn']);
    Route::get('/available/books', [BookController::class, 'getAvailableBooks']);
    Route::get('/search/{query}', [BookController::class, 'search']);
    Route::get('/genre/{genre}', [BookController::class, 'findByGenre']);
    Route::get('/genre/search/{query}', [BookController::class, 'searchByGenre']);
});

Route::prefix('loans')->group(function () {
    Route::get('/', [LoanController::class, 'getAll']);
    Route::get('/{id}', [LoanController::class, 'findById']);
    Route::get('/user/{userId}', [LoanController::class, 'getUserLoans']);
    Route::get('/overdue/loans', [LoanController::class, 'getOverdueLoans']);
    Route::post('/', [LoanController::class, 'createLoan']);
    Route::post('/return/{loanId}', [LoanController::class, 'returnLoan']);
});

Route::prefix('statuses')->group(function () {
    Route::get('/', [StatusController::class, 'getAll']);
    Route::get('/{id}', [StatusController::class, 'findById']);
    Route::get('/name/{name}', [StatusController::class, 'findByName']);
    Route::post('/', [StatusController::class, 'create']);
});
