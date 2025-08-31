<?php

namespace App\Http\Controllers;

use Application\DTOs\LoginDTO;
use Application\UseCases\Auth\LoginUseCase;
use Domain\Repositories\AuthRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private AuthRepository $authRepository
    ) {}

    public function login(Request $request): JsonResponse
    {
        try {
            
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string'
            ]);

            
            $loginDTO = LoginDTO::fromArray($request->all());
            
            
            $loginUseCase = new LoginUseCase($this->authRepository);
            $response = $loginUseCase->execute($loginDTO);

            return response()->json($response->toArray());

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $tokenId = $user->currentAccessToken()->id;
            
            $this->authRepository->revokeToken($user, $tokenId);

            return response()->json([
                'success' => true,
                'message' => 'Sesión cerrada exitosamente'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}