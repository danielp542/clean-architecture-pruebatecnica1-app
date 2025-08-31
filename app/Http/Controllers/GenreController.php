<?php

namespace App\Http\Controllers;

use App\Core\Application\UseCases\Genre\CreateGenreUseCase;
use App\Core\Application\UseCases\Genre\GetAllGenresUseCase;
use App\Core\Application\UseCases\Genre\GetGenreByIdUseCase;
use App\Core\Application\UseCases\Genre\FindGenreByNameUseCase;
use App\Core\Application\DTOs\CreateGenreDTO;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function __construct(
        private GetGenreByIdUseCase $getGenreByIdUseCase,
        private GetAllGenresUseCase $getAllGenresUseCase,
        private FindGenreByNameUseCase $findGenreByNameUseCase,
        private CreateGenreUseCase $createGenreUseCase
    ) {}

    public function findById( $id): JsonResponse
    {
        try {

            $genreDTO = $this->getGenreByIdUseCase->execute($id);
            
            if (!$genreDTO) {
                return response()->json(['error' => 'Genre not found'], 404);
            }

            return response()->json([
                'id' => $genreDTO->id,
                'name' => $genreDTO->name,
                'description' => $genreDTO->description,
                'books' => $genreDTO->books
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getAll(): JsonResponse
    {
        try {
            $genresDTO = $this->getAllGenresUseCase->execute();
            
            $genresArray = array_map(function ($genreDTO) {
                return [
                    'id' => $genreDTO->id,
                    'name' => $genreDTO->name,
                    'description' => $genreDTO->description,
                    'books' => $genreDTO->books
                ];
            }, $genresDTO);

            return response()->json(['data' => $genresArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function findByName( $name): JsonResponse
    {
        try {

            $genreDTO = $this->findGenreByNameUseCase->execute($name);
            
            if (!$genreDTO) {
                return response()->json(['error' => 'Genre not found'], 404);
            }

            return response()->json([
                'id' => $genreDTO->id,
                'name' => $genreDTO->name,
                'description' => $genreDTO->description,
                'books' => $genreDTO->books
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:genres,name',
                'description' => 'nullable|string'
            ]);

            $dto = new CreateGenreDTO(
                $request->name,
                $request->description
            );

            $genreDTO = $this->createGenreUseCase->execute($dto);

            return response()->json([
                'message' => 'Genre created successfully',
                'genre' => [
                    'id' => $genreDTO->id,
                    'name' => $genreDTO->name,
                    'description' => $genreDTO->description,
                    'books' => $genreDTO->books
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function delete(Request $request, $id): JsonResponse
    {
        try {
            $request->validate(['id' => 'required|integer']);

            $genre = $this->getGenreByIdUseCase->execute($id);
            
            if (!$genre) {
                return response()->json(['error' => 'Genre not found'], 404);
            }

            // Usar el repositorio para eliminar
            $repository = app(\Domain\Repositories\GenreRepository::class);
            $deleted = $repository->delete($id);

            if ($deleted) {
                return response()->json(['message' => 'Genre deleted successfully']);
            } else {
                return response()->json(['error' => 'Failed to delete genre'], 400);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}