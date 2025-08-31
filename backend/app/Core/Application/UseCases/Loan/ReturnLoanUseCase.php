<?php

namespace App\Core\Application\UseCases\Loan;

use App\Core\Application\DTOs\LoanDTO;
use Domain\Repositories\LoanRepository;

class ReturnLoanUseCase
{
    public function __construct(
        private LoanRepository $loanRepository
    ) {}

    public function execute(int $loanId): LoanDTO
    {
        $loan = $this->loanRepository->returnLoan($loanId);
        
        if (!$loan) {
            throw new \Exception('Loan not found', 404);
        }

        return new LoanDTO(
            $loan->id,
            $loan->user_id,
            $loan->book_id,
            $loan->status_id,
            $loan->loan_date->toDateTimeString(),
            $loan->due_date->toDateTimeString(),
            $loan->return_date?->toDateTimeString(),
            $loan->user->toArray(),
            $loan->book->toArray(),
            $loan->status->toArray()
        );
    }
}