<?php

namespace Domain\Repositories;

use Domain\Entities\Loan;
use Domain\Entities\User;
use Domain\Entities\Book;

interface LoanRepository
{
    public function findById(int $id): ?Loan;
    public function getAll(): array;
    public function save(Loan $loan): Loan;
    public function update(Loan $loan): Loan;
    public function getUserLoans(int $userId): array;
    public function getOverdueLoans(): array;
    public function createLoan(User $user, Book $book, \DateTime $dueDate): Loan;
    public function returnLoan(int $loanId): Loan;
}