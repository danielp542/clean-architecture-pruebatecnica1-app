<?php

namespace Domain\Repositories;

use Domain\Entities\Author;

interface AuthorRepository
{
    public function findById(int $id): ?Author;
    public function getAll(): array;
    public function save(Author $author): Author;
    public function delete(int $id): bool;
    public function findByName(string $name): array;
}