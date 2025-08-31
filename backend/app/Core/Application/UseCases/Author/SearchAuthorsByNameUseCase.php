<?php

namespace App\Core\Application\UseCases\Author;

use App\Core\Application\DTOs\AuthorDTO;
use Domain\Repositories\AuthorRepository;

class SearchAuthorsByNameUseCase
{
    public function __construct(
        private AuthorRepository $authorRepository
    ) {}

    public function execute(string $name): array
    {
        $authors = $this->authorRepository->findByName($name);
        
        return array_map(function ($author) {
            return new AuthorDTO(
                $author['id'],
                $author['name'],
                $author['bio'],
                $author['birth_date'],
                $author['books'] ?? []
            );
        }, $authors);
    }
}