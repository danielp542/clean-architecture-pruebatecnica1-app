<?php

namespace Infrastructure\Providers;

use Domain\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;
use App\Core\Infrastructure\Persistence\Eloquent\EloquentUserRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            UserRepository::class,
            EloquentUserRepository::class
        );
    }

    public function boot(): void
    {
        //
    }
}