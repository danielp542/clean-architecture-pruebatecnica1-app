<?php

namespace App\Core\Application\DTOs;

class StatusDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly ?string $description
    ) {}
}