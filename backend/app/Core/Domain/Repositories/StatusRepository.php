<?php

namespace Domain\Repositories;

use Domain\Entities\Status;

interface StatusRepository
{
    public function findById(int $id): ?Status;
    public function findByName(string $name): ?Status;
    public function getAll(): array;
}