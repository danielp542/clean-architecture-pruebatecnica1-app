<?php

namespace App\Core\Application\UseCases\Author;

use App\Core\Application\DTOs\AuthorDTO;
use Domain\Repositories\AuthorRepository;

class GetAuthorByIdUseCase
{
    public function __construct(
        private AuthorRepository $authorRepository
    ) {}

    public function execute(int $id): ?AuthorDTO
    {
        $author = $this->authorRepository->findById($id);
        
        if (!$author) {
            return null;
        }

        return new AuthorDTO(
            $author->id,
            $author->name,
            $author->bio,
            $author->birth_date,
            $author->books->toArray() ?? []
        );
    }
}