<?php

namespace Application\UseCases\User;

use Application\DTOs\UserDTO;
use Domain\Entities\User;
use Domain\Repositories\UserRepository;

class CreateUserUseCase
{
    public function __construct(
        private UserRepository $userRepository
    ) {}

    public function execute(UserDTO $userDTO): User
    {
        try {
            $userexists = $this->userRepository->findByEmail($userDTO->email);

            if ($userexists) {
                throw new \Exception("User with email {$userDTO->email} already exists.");
            }
            
            $user = new User($userDTO->toArray());
            return $this->userRepository->save($user);

        }catch (\Exception $e) {
            throw new \Exception("Error creating user: " . $e->getMessage());
        }
        
    }
}