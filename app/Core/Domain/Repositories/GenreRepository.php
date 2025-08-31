<?php

namespace Domain\Repositories;

use Domain\Entities\Genre;

interface GenreRepository
{
    public function findById(int $id): ?Genre;
    public function findByName(string $name): ?Genre;
    public function getAll(): array;
    public function save(Genre $genre): Genre;
    public function delete(int $id): bool;
}