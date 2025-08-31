<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Infrastructure\Persistence\Eloquent\EloquentAuthorRepository;
use Domain\Repositories\AuthorRepository;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthorRepository::class, EloquentAuthorRepository::class);
        $this->app->bind(\App\Core\Application\UseCases\Author\GetAuthorByIdUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Author\GetAllAuthorsUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Author\SearchAuthorsByNameUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Author\CreateAuthorUseCase::class);

        $this->app->bind(\Domain\Repositories\BookRepository::class, \Infrastructure\Persistence\Eloquent\EloquentBookRepository::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\CreateBookUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\GetAllBooksUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\GetBookByIdUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\FindBookByTitleUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\FindBookByIsbnUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\GetAvailableBooksUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\SearchBooksUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\FindBooksByGenreUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Book\SearchBooksByGenreUseCase::class);

        $this->app->bind(\Domain\Repositories\LoanRepository::class, \Infrastructure\Persistence\Eloquent\EloquentLoanRepository::class);
        $this->app->bind(\App\Core\Application\UseCases\Loan\GetLoanByIdUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Loan\GetAllLoansUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Loan\GetUserLoansUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Loan\GetOverdueLoansUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Loan\CreateLoanUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Loan\ReturnLoanUseCase::class);

        $this->app->bind(\Domain\Repositories\StatusRepository::class, \Infrastructure\Persistence\Eloquent\EloquentStatusRepository::class);
        $this->app->bind(\App\Core\Application\UseCases\Status\GetStatusByIdUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Status\GetAllStatusesUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Status\FindStatusByNameUseCase::class);
        $this->app->bind(\App\Core\Application\UseCases\Status\CreateStatusUseCase::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
