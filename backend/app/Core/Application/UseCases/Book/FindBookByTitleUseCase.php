<?php

namespace App\Core\Application\UseCases\Book;

use App\Core\Application\DTOs\BookDTO;
use Domain\Repositories\BookRepository;

class FindBookByTitleUseCase
{
    public function __construct(
        private BookRepository $bookRepository
    ) {}

    public function execute(string $title): array
    {
        $books = $this->bookRepository->findByTitle($title);
        
        return array_map(function ($book) {
            return new BookDTO(
                $book['id'],
                $book['title'],
                $book['isbn'],
                $book['published_year'],
                $book['copies_available'],
                $book['authors'] ?? [],
                $book['genres'] ?? []
            );
        }, $books);
    }
}