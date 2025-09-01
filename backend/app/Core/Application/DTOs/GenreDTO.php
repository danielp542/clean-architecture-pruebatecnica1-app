<?php

namespace App\Core\Application\DTOs;

class GenreDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly ?string $description,
        public readonly array $books = []
    ) {}
}