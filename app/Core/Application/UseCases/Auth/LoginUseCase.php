<?php

namespace Application\UseCases\Auth;

use Application\DTOs\LoginDTO;
use Application\DTOs\LoginResponseDTO;
use Domain\Repositories\AuthRepository;
use Exception;

class LoginUseCase
{
    public function __construct(
        private AuthRepository $authRepository
    ) {}

    public function execute(LoginDTO $loginDTO): LoginResponseDTO
    {
        $user = $this->authRepository->findByEmail($loginDTO->email);
        
        if (!$user) {
            throw new Exception('Credenciales inválidas', 401);
        }

        if (!$this->authRepository->verifyPassword($user, $loginDTO->password)) {
            throw new Exception('Credenciales inválidas', 401);
        }

        $accessToken = $this->authRepository->createAccessToken($user);
        $refreshToken = $this->authRepository->createRefreshToken($user);

        // 4. Retornar respuesta estructurada
        return new LoginResponseDTO(
            access_token: $accessToken,
            refresh_token: $refreshToken,
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