<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// Repositories
use Domain\Repositories\AuthorRepository;
use Domain\Repositories\BookRepository;
use Domain\Repositories\LoanRepository;
use Domain\Repositories\StatusRepository;
use Domain\Repositories\GenreRepository;

// Eloquent Repositories
use Infrastructure\Persistence\Eloquent\EloquentAuthorRepository;
use Infrastructure\Persistence\Eloquent\EloquentBookRepository;
use Infrastructure\Persistence\Eloquent\EloquentLoanRepository;
use Infrastructure\Persistence\Eloquent\EloquentStatusRepository;
use Infrastructure\Persistence\Eloquent\EloquentGenreRepository;

// Author Use Cases
use App\Core\Application\UseCases\Author\GetAuthorByIdUseCase;
use App\Core\Application\UseCases\Author\GetAllAuthorsUseCase;
use App\Core\Application\UseCases\Author\SearchAuthorsByNameUseCase;
use App\Core\Application\UseCases\Author\CreateAuthorUseCase;

// Book Use Cases
use App\Core\Application\UseCases\Book\CreateBookUseCase;
use App\Core\Application\UseCases\Book\GetAllBooksUseCase;
use App\Core\Application\UseCases\Book\GetBookByIdUseCase;
use App\Core\Application\UseCases\Book\FindBookByTitleUseCase;
use App\Core\Application\UseCases\Book\FindBookByIsbnUseCase;
use App\Core\Application\UseCases\Book\GetAvailableBooksUseCase;
use App\Core\Application\UseCases\Book\SearchBooksUseCase;
use App\Core\Application\UseCases\Book\FindBooksByGenreUseCase;
use App\Core\Application\UseCases\Book\SearchBooksByGenreUseCase;

// Loan Use Cases
use App\Core\Application\UseCases\Loan\GetLoanByIdUseCase;
use App\Core\Application\UseCases\Loan\GetAllLoansUseCase;
use App\Core\Application\UseCases\Loan\GetUserLoansUseCase;
use App\Core\Application\UseCases\Loan\GetOverdueLoansUseCase;
use App\Core\Application\UseCases\Loan\CreateLoanUseCase;
use App\Core\Application\UseCases\Loan\ReturnLoanUseCase;

// Status Use Cases
use App\Core\Application\UseCases\Status\GetStatusByIdUseCase;
use App\Core\Application\UseCases\Status\GetAllStatusesUseCase;
use App\Core\Application\UseCases\Status\FindStatusByNameUseCase;
use App\Core\Application\UseCases\Status\CreateStatusUseCase;

// Genre Use Cases
use App\Core\Application\UseCases\Genre\GetGenreByIdUseCase;
use App\Core\Application\UseCases\Genre\GetAllGenresUseCase;
use App\Core\Application\UseCases\Genre\FindGenreByNameUseCase;
use App\Core\Application\UseCases\Genre\CreateGenreUseCase;
use Domain\Repositories\UserRepository;
use Infrastructure\Persistence\Eloquent\EloquentUserRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Author bindings
        $this->app->bind(AuthorRepository::class, EloquentAuthorRepository::class);
        $this->app->bind(GetAuthorByIdUseCase::class);
        $this->app->bind(GetAllAuthorsUseCase::class);
        $this->app->bind(SearchAuthorsByNameUseCase::class);
        $this->app->bind(CreateAuthorUseCase::class);

        // Book bindings
        $this->app->bind(BookRepository::class, EloquentBookRepository::class);
        $this->app->bind(CreateBookUseCase::class);
        $this->app->bind(GetAllBooksUseCase::class);
        $this->app->bind(GetBookByIdUseCase::class);
        $this->app->bind(FindBookByTitleUseCase::class);
        $this->app->bind(FindBookByIsbnUseCase::class);
        $this->app->bind(GetAvailableBooksUseCase::class);
        $this->app->bind(SearchBooksUseCase::class);
        $this->app->bind(FindBooksByGenreUseCase::class);
        $this->app->bind(SearchBooksByGenreUseCase::class);

        // Loan bindings
        $this->app->bind(LoanRepository::class, EloquentLoanRepository::class);
        $this->app->bind(GetLoanByIdUseCase::class);
        $this->app->bind(GetAllLoansUseCase::class);
        $this->app->bind(GetUserLoansUseCase::class);
        $this->app->bind(GetOverdueLoansUseCase::class);
        $this->app->bind(CreateLoanUseCase::class);
        $this->app->bind(ReturnLoanUseCase::class);
        $this->app->bind(UserRepository::class, EloquentUserRepository::class); 

        // Status bindings
        $this->app->bind(StatusRepository::class, EloquentStatusRepository::class);
        $this->app->bind(GetStatusByIdUseCase::class);
        $this->app->bind(GetAllStatusesUseCase::class);
        $this->app->bind(FindStatusByNameUseCase::class);
        $this->app->bind(CreateStatusUseCase::class);

        // Genre bindings
        $this->app->bind(GenreRepository::class, EloquentGenreRepository::class);
        $this->app->bind(GetGenreByIdUseCase::class);
        $this->app->bind(GetAllGenresUseCase::class);
        $this->app->bind(FindGenreByNameUseCase::class);
        $this->app->bind(CreateGenreUseCase::class);
    }

    public function boot(): void
    {
        //
    }
}