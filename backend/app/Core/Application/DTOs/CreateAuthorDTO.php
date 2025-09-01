<?php

namespace App\Core\Application\DTOs;

class CreateAuthorDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $nationality = null, // Cambiado de bio
        public readonly ?string $birthdate = null    // Cambiado de birth_date
    ) {}
}