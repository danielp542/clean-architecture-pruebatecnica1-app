<?php

namespace Infrastructure\Providers;

use Domain\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;
use App\Core\Infrastructure\Persistence\Eloquent\EloquentUserRepository;
use Domain\Repositories\AuthorRepository;
use Domain\Repositories\BookRepository;
use Domain\Repositories\LoanRepository;
use Domain\Repositories\StatusRepository;
use Infrastructure\Persistence\Eloquent\EloquentAuthorRepository;
use Infrastructure\Persistence\Eloquent\EloquentBookRepository;
use Infrastructure\Persistence\Eloquent\EloquentLoanRepository;
use Infrastructure\Persistence\Eloquent\EloquentStatusRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            UserRepository::class,
            EloquentUserRepository::class
            
        );
        $this->app->bind(StatusRepository::class, EloquentStatusRepository::class);
        $this->app->bind(AuthorRepository::class, EloquentAuthorRepository::class);
        $this->app->bind(BookRepository::class, EloquentBookRepository::class);
        $this->app->bind(LoanRepository::class, EloquentLoanRepository::class);
    }

    public function boot(): void
    {
        //
    }
}