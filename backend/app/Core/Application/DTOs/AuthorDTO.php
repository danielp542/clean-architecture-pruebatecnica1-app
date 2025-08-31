<?php

namespace App\Core\Application\DTOs;

class AuthorDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly ?string $bio,
        public readonly ?string $birth_date,
        public readonly array $books = []
    ) {}
}