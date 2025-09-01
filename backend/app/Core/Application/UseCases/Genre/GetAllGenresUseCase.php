<?php

namespace App\Core\Application\UseCases\Genre;

use App\Core\Application\DTOs\GenreDTO;
use Domain\Repositories\GenreRepository;

class GetAllGenresUseCase
{
    public function __construct(
        private GenreRepository $genreRepository
    ) {}

    public function execute(): array
    {
        $genres = $this->genreRepository->getAll();
        
        return array_map(function ($genre) {
            return new GenreDTO(
                $genre['id'],
                $genre['name'],
                $genre['description'],
                $genre['books'] ?? []
            );
        }, $genres);
    }
}