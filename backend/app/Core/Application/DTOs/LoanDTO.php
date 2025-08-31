<?php

namespace App\Core\Application\DTOs;

class LoanDTO
{
    public function __construct(
        public readonly int $id,
        public readonly int $user_id,
        public readonly int $book_id,
        public readonly int $status_id,
        public readonly string $loan_date,
        public readonly string $due_date,
        public readonly ?string $return_date,
        public readonly array $user = [],
        public readonly array $book = [],
        public readonly array $status = []
    ) {}
}