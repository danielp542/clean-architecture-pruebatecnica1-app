<?php

namespace App\Core\Application\DTOs;

class CreateLoanDTO
{
    public function __construct(
        public readonly int $user_id,
        public readonly int $book_id,
        public readonly string $due_date
    ) {}
}