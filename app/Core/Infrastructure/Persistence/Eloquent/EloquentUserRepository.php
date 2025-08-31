<?php

namespace Infrastructure\Persistence\Eloquent;

use Domain\Entities\User;
use Domain\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class EloquentUserRepository implements UserRepository
{
    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function save(User $user): User
    {
        if (isset($user->password)) {
            $user->password = Hash::make($user->password);
        }
        
        $user->save();
        return $user;
    }

    public function delete(int $id): bool
    {
        return User::destroy($id) > 0;
    }

    public function getAll(): array
    {
        return User::all()->toArray();
    }
}