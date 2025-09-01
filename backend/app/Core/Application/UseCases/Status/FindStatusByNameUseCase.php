<?php

namespace App\Core\Application\UseCases\Status;

use App\Core\Application\DTOs\StatusDTO;
use Domain\Repositories\StatusRepository;

class FindStatusByNameUseCase
{
    public function __construct(
        private StatusRepository $statusRepository
    ) {}

    public function execute(string $name): ?StatusDTO
    {
        $status = $this->statusRepository->findByName($name);
        
        if (!$status) {
            return null;
        }

        return new StatusDTO(
            $status->id,
            $status->name,
            $status->description
        );
    }
}