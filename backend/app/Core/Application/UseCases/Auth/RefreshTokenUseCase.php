<?php

namespace Application\UseCases\Auth;

use Application\DTOs\RefreshTokenDTO;
use Application\DTOs\LoginResponseDTO;
use Domain\Repositories\AuthRepository;
use Exception;

class RefreshTokenUseCase
{
    public function __construct(
        private AuthRepository $authRepository
    ) {}

    public function execute(RefreshTokenDTO $refreshDTO): LoginResponseDTO
    {
        // Buscar usuario por refresh token
        $user = $this->authRepository->findUserByToken($refreshDTO->refresh_token);
        
        if (!$user) {
            throw new Exception('Refresh token inválido', 401);
        }

        
        $token = $user->tokens()
            ->where('token', hash('sha256', explode('|', $refreshDTO->refresh_token)[1]))
            ->first();

        if (!$token || !in_array('refresh', $token->abilities)) {
            throw new Exception('Token no es de tipo refresh', 401);
        }

        
        $newAccessToken = $this->authRepository->refreshAccessToken($user);

        return new LoginResponseDTO(
            access_token: $newAccessToken,
            refresh_token: $refreshDTO->refresh_token, // Mismo refresh token
            token_type: 'bearer',
            expires_in: config('sanctum.expiration') * 60,
            user: [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        );
    }
}