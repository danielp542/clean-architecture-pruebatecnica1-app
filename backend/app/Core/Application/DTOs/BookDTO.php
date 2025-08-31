<?php

namespace App\Core\Application\DTOs;

class BookDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly string $isbn,
        public readonly int $published_year,
        public readonly int $available_copies,
        public readonly array $authors = [],
        public readonly array $genres = []
    ) {}
}