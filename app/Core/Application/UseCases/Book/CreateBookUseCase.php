<?php

namespace App\Core\Application\UseCases\Book;

use App\Core\Application\DTOs\CreateBookDTO;
use App\Core\Application\DTOs\BookDTO;
use Domain\Repositories\BookRepository;
use Domain\Entities\Book;

class CreateBookUseCase
{
    public function __construct(
        private BookRepository $bookRepository
    ) {}

    public function execute(CreateBookDTO $dto): BookDTO
    {
        $book = new Book([
            'title' => $dto->title,
            'isbn' => $dto->isbn,
            'published_year' => $dto->published_year,
            'copies_available' => $dto->available_copies,
            'copies_total' => $dto->available_copies
        ]);

        $savedBook = $this->bookRepository->save($book);
        
        // Attach relationships
        $savedBook->authors()->attach($dto->author_ids);
        $savedBook->genres()->attach($dto->genre_ids);

        // Reload with relationships
        $bookWithRelations = $this->bookRepository->findById($savedBook->id);

        return new BookDTO(
            $bookWithRelations->id,
            $bookWithRelations->title,
            $bookWithRelations->isbn,
            $bookWithRelations->published_year,
            $bookWithRelations->copies_available,
            $bookWithRelations->authors->toArray(),
            $bookWithRelations->genres->toArray()
        );
    }
}