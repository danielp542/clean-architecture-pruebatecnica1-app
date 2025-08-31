<?php

namespace App\Core\Application\UseCases\Genre;

use App\Core\Application\DTOs\CreateGenreDTO;
use App\Core\Application\DTOs\GenreDTO;
use Domain\Repositories\GenreRepository;
use Domain\Entities\Genre;

class CreateGenreUseCase
{
    public function __construct(
        private GenreRepository $genreRepository
    ) {}

    public function execute(CreateGenreDTO $dto): GenreDTO
    {
        // Verificar si el género ya existe
        $existingGenre = $this->genreRepository->findByName($dto->name);
        if ($existingGenre) {
            throw new \Exception('Genre with this name already exists', 400);
        }

        $genre = new Genre([
            'name' => $dto->name,
            'description' => $dto->description
        ]);

        $savedGenre = $this->genreRepository->save($genre);

        return new GenreDTO(
            $savedGenre->id,
            $savedGenre->name,
            $savedGenre->description,
            $savedGenre->books->toArray() ?? []
        );
    }
}