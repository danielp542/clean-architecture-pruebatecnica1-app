<?php

namespace App\Http\Controllers;

use App\Core\Application\UseCases\Author\CreateAuthorUseCase;
use App\Core\Application\UseCases\Author\GetAllAuthorsUseCase;
use App\Core\Application\UseCases\Author\GetAuthorByIdUseCase;
use App\Core\Application\UseCases\Author\SearchAuthorsByNameUseCase;
use App\Core\Application\DTOs\CreateAuthorDTO;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function __construct(
        private GetAuthorByIdUseCase $getAuthorByIdUseCase,
        private GetAllAuthorsUseCase $getAllAuthorsUseCase,
        private SearchAuthorsByNameUseCase $searchAuthorsByNameUseCase,
        private CreateAuthorUseCase $createAuthorUseCase
    ) {}

    public function findById(Request $request, int $id): JsonResponse
    {
        try {
            $request->validate(['id' => 'required|integer']);

            $authorDTO = $this->getAuthorByIdUseCase->execute($id);
            
            if (!$authorDTO) {
                return response()->json(['error' => 'Author not found'], 404);
            }

            return response()->json([
                'id' => $authorDTO->id,
                'name' => $authorDTO->name,
                'bio' => $authorDTO->bio,
                'birth_date' => $authorDTO->birth_date,
                'books' => $authorDTO->books
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getAll(): JsonResponse
    {
        try {
            $authorsDTO = $this->getAllAuthorsUseCase->execute();
            
            $authorsArray = array_map(function ($authorDTO) {
                return [
                    'id' => $authorDTO->id,
                    'name' => $authorDTO->name,
                    'bio' => $authorDTO->bio,
                    'birth_date' => $authorDTO->birth_date,
                    'books' => $authorDTO->books
                ];
            }, $authorsDTO);

            return response()->json(['data' => $authorsArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function findByName(Request $request, string $name): JsonResponse
    {
        try {
            $request->validate(['name' => 'required|string|max:255']);

            $authorsDTO = $this->searchAuthorsByNameUseCase->execute($name);
            
            if (empty($authorsDTO)) {
                return response()->json(['error' => 'No authors found'], 404);
            }

            $authorsArray = array_map(function ($authorDTO) {
                return [
                    'id' => $authorDTO->id,
                    'name' => $authorDTO->name,
                    'bio' => $authorDTO->bio,
                    'birth_date' => $authorDTO->birth_date,
                    'books' => $authorDTO->books
                ];
            }, $authorsDTO);

            return response()->json(['data' => $authorsArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'bio' => 'nullable|string',
                'birth_date' => 'nullable|date'
            ]);

            $dto = new CreateAuthorDTO(
                $request->name,
                $request->bio,
                $request->birth_date
            );

            $authorDTO = $this->createAuthorUseCase->execute($dto);

            return response()->json([
                'message' => 'Author created successfully',
                'author' => [
                    'id' => $authorDTO->id,
                    'name' => $authorDTO->name,
                    'bio' => $authorDTO->bio,
                    'birth_date' => $authorDTO->birth_date,
                    'books' => $authorDTO->books
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}