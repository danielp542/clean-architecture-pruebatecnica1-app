<?php

namespace App\Core\Application\UseCases\Book;

use App\Core\Application\DTOs\BookDTO;
use Domain\Repositories\BookRepository;

class SearchBooksByGenreUseCase
{
    public function __construct(
        private BookRepository $bookRepository
    ) {}

    public function execute(string $query): array
    {
        $books = $this->bookRepository->searchByGenre($query);
        
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