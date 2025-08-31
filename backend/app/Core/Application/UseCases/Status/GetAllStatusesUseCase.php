<?php

namespace App\Core\Application\UseCases\Status;

use App\Core\Application\DTOs\StatusDTO;
use Domain\Repositories\StatusRepository;

class GetAllStatusesUseCase
{
    public function __construct(
        private StatusRepository $statusRepository
    ) {}

    public function execute(): array
    {
        $statuses = $this->statusRepository->getAll();
        
        return array_map(function ($status) {
            return new StatusDTO(
                $status['id'],
                $status['name'],
                $status['description']
            );
        }, $statuses);
    }
}