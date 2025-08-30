<?php

namespace Domain\Repositories;

use Domain\Entities\User;

interface AuthRepository
{
    public function findByEmail(string $email): ?User;
    public function verifyPassword(User $user, string $password): bool;
    public function createAccessToken(User $user): string;
    public function createRefreshToken(User $user): string;
    public function revokeToken(User $user, string $tokenId): bool;
    public function findUserByToken(string $token): ?User;
    public function refreshAccessToken(User $user): string;
}