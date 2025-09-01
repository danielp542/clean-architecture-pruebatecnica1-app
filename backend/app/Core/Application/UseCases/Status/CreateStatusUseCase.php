<?php

namespace App\Core\Application\UseCases\Status;

use App\Core\Application\DTOs\StatusDTO;
use Domain\Repositories\StatusRepository;
use Domain\Entities\Status;

class CreateStatusUseCase
{
    public function __construct(
        private StatusRepository $statusRepository
    ) {}

    public function execute(string $name, ?string $description = null): StatusDTO
    {
        // Verificar si el status ya existe
        $existingStatus = $this->statusRepository->findByName($name);
        if ($existingStatus) {
            throw new \Exception('Status with this name already exists', 400);
        }

        $status = new Status([
            'name' => $name,
            'description' => $description
        ]);

        // Guardar el status
        $status->save();

        return new StatusDTO(
            $status->id,
            $status->name,
            $status->description
        );
    }
}