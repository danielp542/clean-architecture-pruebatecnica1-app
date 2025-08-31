<?php

namespace App\Core\Application\UseCases\Genre;

use App\Core\Application\DTOs\GenreDTO;
use Domain\Repositories\GenreRepository;

class GetGenreByIdUseCase
{
    public function __construct(
        private GenreRepository $genreRepository
    ) {}

    public function execute(int $id): ?GenreDTO
    {
        $genre = $this->genreRepository->findById($id);
        
        if (!$genre) {
            return null;
        }

        return new GenreDTO(
            $genre->id,
            $genre->name,
            $genre->description,
            $genre->books->toArray() ?? []
        );
    }
}   