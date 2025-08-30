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
            // Validación
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string'
            ]);

            // Crear DTO
            $loginDTO = LoginDTO::fromArray($request->all());
            
            // Ejecutar caso de uso
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
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Sesión cerrada exitosamente'
        ]);
    }
}