<?php

namespace Infrastructure\Providers;

use Domain\Repositories\AuthRepository;
use Illuminate\Support\ServiceProvider;
use Infrastructure\Persistence\Eloquent\EloquentAuthRepository;

class AuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            AuthRepository::class,
            EloquentAuthRepository::class
        );
    }
}