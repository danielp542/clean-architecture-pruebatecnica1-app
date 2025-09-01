<?php

namespace App\Core\Application\DTOs;

class AuthorDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly ?string $nationality, // Cambiado de bio a nationality
        public readonly ?string $birthdate,   // Cambiado de birth_date a birthdate
        public readonly array $books = []
    ) {}
}