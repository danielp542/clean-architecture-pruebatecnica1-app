<?php

namespace App\Core\Application\UseCases\Genre;

use App\Core\Application\DTOs\GenreDTO;
use Domain\Repositories\GenreRepository;

class FindGenreByNameUseCase
{
    public function __construct(
        private GenreRepository $genreRepository
    ) {}

    public function execute(string $name): ?GenreDTO
    {
        $genre = $this->genreRepository->findByName($name);
        
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