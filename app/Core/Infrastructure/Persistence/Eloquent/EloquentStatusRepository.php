<?php

namespace Infrastructure\Persistence\Eloquent;

use Domain\Entities\Status;
use Domain\Repositories\StatusRepository;

class EloquentStatusRepository implements StatusRepository
{
    public function findById(int $id): ?Status
    {
        return Status::find($id);
    }

    public function findByName(string $name): ?Status
    {
        return Status::where('name', $name)->first();
    }

    public function getAll(): array
    {
        return Status::all()->toArray();
    }
}