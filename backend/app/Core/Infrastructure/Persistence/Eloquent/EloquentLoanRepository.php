<?php

namespace Infrastructure\Persistence\Eloquent;

use Domain\Entities\Loan;
use Domain\Entities\User;
use Domain\Entities\Book;
use Domain\Repositories\LoanRepository;
use Domain\Entities\Status;

class EloquentLoanRepository implements LoanRepository
{
    public function findById(int $id): ?Loan
    {
        return Loan::with(['user', 'book', 'status'])->find($id);
    }

    public function getAll(): array
    {
        return Loan::with(['user', 'book', 'status'])->get()->toArray();
    }

    public function save(Loan $loan): Loan
    {
        $loan->save();
        return $loan;
    }

    public function update(Loan $loan): Loan
    {
        $loan->save();
        return $loan;
    }

    public function getUserLoans(int $userId): array
    {
        return Loan::where('user_id', $userId)
            ->with(['book', 'status'])
            ->get()
            ->toArray();
    }

    public function getOverdueLoans(): array
    {
        return Loan::where('due_date', '<', now())
            ->whereHas('status', function($query) {
                $query->where('name', 'prestado');
            })
            ->with(['user', 'book'])
            ->get()
            ->toArray();
    }

    public function createLoan(User $user, Book $book, \DateTime $dueDate): Loan
    {
        $statusPrestado = Status::where('name', 'prestado')->first();

        $loan = new Loan([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'status_id' => $statusPrestado->id,
            'loan_date' => now(),
            'due_date' => $dueDate
        ]);

        $this->save($loan);
        
        // Decrementar copias disponibles
        $book->decrementCopies();

        return $loan->load(['user', 'book', 'status']);
    }

    public function returnLoan(int $loanId): Loan
    {
        $loan = $this->findById($loanId);
        
        if ($loan) {
            $loan->markAsReturned();
        }

        return $loan;
    }

    public function getUserActiveLoans(int $userId): array
    {
        $statusPrestado = Status::where('name', 'prestado')->first();

        return Loan::where('user_id', $userId)
            ->where('status_id', $statusPrestado->id)
            ->with(['book', 'status'])
            ->get()
            ->toArray();
    }
}