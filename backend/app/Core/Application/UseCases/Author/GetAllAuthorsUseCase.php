<?php

namespace App\Core\Application\UseCases\Author;

use App\Core\Application\DTOs\AuthorDTO;
use Domain\Repositories\AuthorRepository;

class GetAllAuthorsUseCase
{
    public function __construct(
        private AuthorRepository $authorRepository
    ) {}

    public function execute(): array
    {
        $authors = $this->authorRepository->getAll();
        
        return array_map(function ($author) {
            return new AuthorDTO(
                $author['id'],
                $author['name'],
                $author['nationality'] ?? null, // Cambiado de 'bio' a 'nationality'
                $author['birthdate'] ?? null,   // Cambiado de 'birth_date' a 'birthdate'
                $author['books'] ?? []
            );
        }, $authors);
    }
}