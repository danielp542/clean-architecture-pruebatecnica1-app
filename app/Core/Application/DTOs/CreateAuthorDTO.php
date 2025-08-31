<?php

namespace App\Core\Application\DTOs;

class CreateAuthorDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $bio = null,
        public readonly ?string $birth_date = null
    ) {}
}