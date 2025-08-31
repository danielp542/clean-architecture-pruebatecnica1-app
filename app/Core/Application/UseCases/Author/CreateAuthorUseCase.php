<?php

namespace App\Core\Application\UseCases\Author;

use App\Core\Application\DTOs\CreateAuthorDTO;
use App\Core\Application\DTOs\AuthorDTO;
use Domain\Repositories\AuthorRepository;

class CreateAuthorUseCase
{
    public function __construct(
        private AuthorRepository $authorRepository
    ) {}

    public function execute(CreateAuthorDTO $dto): AuthorDTO
    {
        $author = new \Domain\Entities\Author([
            'name' => $dto->name,
            'bio' => $dto->bio,
            'birth_date' => $dto->birth_date
        ]);

        $savedAuthor = $this->authorRepository->save($author);

        return new AuthorDTO(
            $savedAuthor->id,
            $savedAuthor->name,
            $savedAuthor->bio,
            $savedAuthor->birth_date,
            $savedAuthor->books->toArray() ?? []
        );
    }
}