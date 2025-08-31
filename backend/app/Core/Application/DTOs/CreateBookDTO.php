<?php

namespace App\Core\Application\DTOs;

class CreateBookDTO
{
    public function __construct(
        public readonly string $title,
        public readonly string $isbn,
        public readonly int $published_year,
        public readonly int $available_copies,
        public readonly array $author_ids,
        public readonly array $genre_ids
    ) {}
}