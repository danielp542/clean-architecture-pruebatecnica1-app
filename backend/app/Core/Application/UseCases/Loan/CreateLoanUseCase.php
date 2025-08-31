<?php

namespace App\Core\Application\UseCases\Loan;

use App\Core\Application\DTOs\CreateLoanDTO;
use App\Core\Application\DTOs\LoanDTO;
use App\Core\Application\Exceptions\MaxLoansExceededException;
use App\Core\Application\Exceptions\LoanPeriodExceededException;
use Domain\Repositories\LoanRepository;
use Domain\Repositories\UserRepository;
use Domain\Repositories\BookRepository;
use Domain\Entities\Loan;
use Carbon\Carbon;

class CreateLoanUseCase
{
    private const MAX_ACTIVE_LOANS = 3;
    private const MAX_LOAN_DAYS = 15;

    public function __construct(
        private LoanRepository $loanRepository,
        private UserRepository $userRepository,
        private BookRepository $bookRepository
    ) {}

    public function execute(CreateLoanDTO $dto): LoanDTO
    {
        // Verificar si el usuario existe
        $user = $this->userRepository->findById($dto->user_id);
        if (!$user) {
            throw new \Exception('User not found', 404);
        }

        // Verificar si el libro existe
        $book = $this->bookRepository->findById($dto->book_id);
        if (!$book) {
            throw new \Exception('Book not found', 404);
        }

        // Verificar si el libro está disponible
        if ($book->copies_available <= 0) {
            throw new \Exception('Book is not available', 400);
        }

        // Verificar regla 1: Máximo 3 préstamos activos
        $activeLoans = $this->loanRepository->getUserActiveLoans($dto->user_id);
        if (count($activeLoans) >= self::MAX_ACTIVE_LOANS) {
            throw new MaxLoansExceededException();
        }

        // Verificar regla 2: Máximo 15 días de préstamo
        $dueDate = Carbon::parse($dto->due_date);
        $loanDate = now();
        
        if ($dueDate->diffInDays($loanDate) > self::MAX_LOAN_DAYS) {
            throw new LoanPeriodExceededException();
        }

        // Crear el préstamo
        $loan = $this->loanRepository->createLoan($user, $book, $dueDate);

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