<?php

namespace App\Core\Application\UseCases\Book;

use App\Core\Application\DTOs\BookDTO;
use Domain\Repositories\BookRepository;

class GetBookByIdUseCase
{
    public function __construct(
        private BookRepository $bookRepository
    ) {}

    public function execute(int $id): ?BookDTO
    {
        $book = $this->bookRepository->findById($id);
        
        if (!$book) {
            return null;
        }

        return new BookDTO(
            $book->id,
            $book->title,
            $book->isbn,
            $book->published_year,
            $book->copies_available,
            $book->authors->toArray(),
            $book->genres->toArray()
        );
    }
}