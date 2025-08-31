<?php

namespace App\Core\Application\UseCases\Status;

use App\Core\Application\DTOs\StatusDTO;
use Domain\Repositories\StatusRepository;

class GetStatusByIdUseCase
{
    public function __construct(
        private StatusRepository $statusRepository
    ) {}

    public function execute(int $id): ?StatusDTO
    {
        $status = $this->statusRepository->findById($id);
        
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