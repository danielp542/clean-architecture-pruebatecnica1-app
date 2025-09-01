<?php

namespace Infrastructure\Persistence\Eloquent;

use Domain\Entities\User;
use Domain\Repositories\AuthRepository;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\NewAccessToken;
use Laravel\Sanctum\PersonalAccessToken;

class EloquentAuthRepository implements AuthRepository
{
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function verifyPassword(User $user, string $password): bool
    {
        return Hash::check($password, $user->password);
    }

    public function createAccessToken(User $user): string
    {
        // Crear token con abilities y expiración
        $token = $user->createToken(
            'auth_token', 
            ['*'], // Todos los permisos
            now()->addMinutes(config('sanctum.expiration', 60))
        );
        
        return $token->plainTextToken;
    }

    public function createRefreshToken(User $user): string
    {
        // Token de refresh con expiración más larga
        $token = $user->createToken(
            'refresh_token',
            ['refresh'], // Ability específico para refresh
            now()->addDays(7) // 7 días de expiración
        );
        
        return $token->plainTextToken;
    }

     public function revokeToken(User $user, string $tokenId): bool
    {
        $token = $user->tokens()->where('id', $tokenId)->first();
        if ($token) {
            $token->delete();
            return true;
        }
        return false;
    }

    public function findUserByToken(string $token): ?User
    {
        $accessToken = PersonalAccessToken::findToken($token);
        
        if (!$accessToken) {
            return null;
        }

        return $accessToken->tokenable;
    }

    public function refreshAccessToken(User $user): string
{
    
    $currentTokenId = $user->currentAccessToken()->id;
    
    
    $tokenModel = $user->tokens()->where('id', $currentTokenId)->first();
    if ($tokenModel) {
        $tokenModel->delete();
    }
    
    
    return $this->createAccessToken($user);
}
}