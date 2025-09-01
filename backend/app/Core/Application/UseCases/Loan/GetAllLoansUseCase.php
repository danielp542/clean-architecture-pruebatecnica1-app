<?php

namespace App\Core\Application\UseCases\Loan;

use App\Core\Application\DTOs\LoanDTO;
use Domain\Repositories\LoanRepository;

class GetAllLoansUseCase
{
    public function __construct(
        private LoanRepository $loanRepository
    ) {}

    public function execute(): array
    {
        $loans = $this->loanRepository->getAll();
        
        return array_map(function ($loan) {
            return new LoanDTO(
                $loan['id'],
                $loan['user_id'],
                $loan['book_id'],
                $loan['status_id'],
                $loan['loan_date'],
                $loan['due_date'],
                $loan['return_date'],
                $loan['user'] ?? [],
                $loan['book'] ?? [],
                $loan['status'] ?? []
            );
        }, $loans);
    }
}