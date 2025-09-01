<?php

namespace App\Http\Controllers;

use Application\DTOs\UserDTO;
use Application\UseCases\User\CreateUserUseCase;
use Domain\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Infrastructure\Persistence\Eloquent\EloquentUserRepository;

class UserController extends Controller
{
    private UserRepository $userRepository;

    public function __construct()
    {
         $this->userRepository = new EloquentUserRepository();
    }

    // Crear nuevo usuario 
    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $userDTO = UserDTO::fromArray($request->all());
        
        $createUserUseCase = new CreateUserUseCase($this->userRepository);
        $user = $createUserUseCase->execute($userDTO);

        return response()->json([
            'message' => 'User created successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ], 201);

        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
        
    }

    public function index(): JsonResponse
    {
        try{
            $users = $this->userRepository->getAll();
            return response()->json($users);

        }catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }
        
    }
}