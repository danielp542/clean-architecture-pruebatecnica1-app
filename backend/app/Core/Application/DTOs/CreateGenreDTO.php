<?php

namespace App\Core\Application\DTOs;

class CreateGenreDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $description = null
    ) {}
}