<?php

namespace App\Http\Controllers;

use App\Core\Application\UseCases\Book\CreateBookUseCase;
use App\Core\Application\UseCases\Book\GetAllBooksUseCase;
use App\Core\Application\UseCases\Book\GetBookByIdUseCase;
use App\Core\Application\UseCases\Book\FindBookByTitleUseCase;
use App\Core\Application\UseCases\Book\FindBookByIsbnUseCase;
use App\Core\Application\UseCases\Book\GetAvailableBooksUseCase;
use App\Core\Application\UseCases\Book\SearchBooksUseCase;
use App\Core\Application\UseCases\Book\FindBooksByGenreUseCase;
use App\Core\Application\UseCases\Book\SearchBooksByGenreUseCase;
use App\Core\Application\DTOs\CreateBookDTO;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function __construct(
        private CreateBookUseCase $createBookUseCase,
        private GetAllBooksUseCase $getAllBooksUseCase,
        private GetBookByIdUseCase $getBookByIdUseCase,
        private FindBookByTitleUseCase $findBookByTitleUseCase,
        private FindBookByIsbnUseCase $findBookByIsbnUseCase,
        private GetAvailableBooksUseCase $getAvailableBooksUseCase,
        private SearchBooksUseCase $searchBooksUseCase,
        private FindBooksByGenreUseCase $findBooksByGenreUseCase,
        private SearchBooksByGenreUseCase $searchBooksByGenreUseCase
    ) {}

    public function save(Request $request): JsonResponse  
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'isbn' => 'required|string|max:13|unique:books,isbn',
                'published_year' => 'required|integer|min:1000|max:' . date('Y'),
                'available_copies' => 'required|integer|min:0',
                'author_ids' => 'required|array',
                'author_ids.*' => 'exists:authors,id',
                'genre_ids' => 'required|array',
                'genre_ids.*' => 'exists:genres,id'
            ]);

            $dto = new CreateBookDTO(
                $request->title,
                $request->isbn,
                $request->published_year,
                $request->available_copies,
                $request->author_ids,
                $request->genre_ids
            );

            $bookDTO = $this->createBookUseCase->execute($dto);

            return response()->json([
                'message' => 'Book created successfully',
                'book' => [
                    'id' => $bookDTO->id,
                    'title' => $bookDTO->title,
                    'isbn' => $bookDTO->isbn,
                    'published_year' => $bookDTO->published_year,
                    'available_copies' => $bookDTO->available_copies,
                    'authors' => $bookDTO->authors,
                    'genres' => $bookDTO->genres
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getall(): JsonResponse    
    {
        try {
            $booksDTO = $this->getAllBooksUseCase->execute();
            
            $booksArray = array_map(function ($bookDTO) {
                return [
                    'id' => $bookDTO->id,
                    'title' => $bookDTO->title,
                    'isbn' => $bookDTO->isbn,
                    'published_year' => $bookDTO->published_year,
                    'available_copies' => $bookDTO->available_copies,
                    'authors' => $bookDTO->authors,
                    'genres' => $bookDTO->genres
                ];
            }, $booksDTO);

            return response()->json(['data' => $booksArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function findById(int $id): JsonResponse
    {
        try {

            $bookDTO = $this->getBookByIdUseCase->execute($id);
            
            if (!$bookDTO) {
                return response()->json(['message' => 'Book not found'], 404);
            }

            return response()->json([
                'id' => $bookDTO->id,
                'title' => $bookDTO->title,
                'isbn' => $bookDTO->isbn,
                'published_year' => $bookDTO->published_year,
                'available_copies' => $bookDTO->available_copies,
                'authors' => $bookDTO->authors,
                'genres' => $bookDTO->genres
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function findByTitle(string $title): JsonResponse
    {
        try {
            

            $booksDTO = $this->findBookByTitleUseCase->execute($title);
            
            $booksArray = array_map(function ($bookDTO) {
                return [
                    'id' => $bookDTO->id,
                    'title' => $bookDTO->title,
                    'isbn' => $bookDTO->isbn,
                    'published_year' => $bookDTO->published_year,
                    'available_copies' => $bookDTO->available_copies,
                    'authors' => $bookDTO->authors,
                    'genres' => $bookDTO->genres
                ];
            }, $booksDTO);

            return response()->json(['data' => $booksArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function findByIsbn( $isbn): JsonResponse
    {
        try {

            $bookDTO = $this->findBookByIsbnUseCase->execute($isbn);
            
            if (!$bookDTO) {
                return response()->json(['message' => 'Book not found'], 404);
            }

            return response()->json([
                'id' => $bookDTO->id,
                'title' => $bookDTO->title,
                'isbn' => $bookDTO->isbn,
                'published_year' => $bookDTO->published_year,
                'available_copies' => $bookDTO->available_copies,
                'authors' => $bookDTO->authors,
                'genres' => $bookDTO->genres
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getAvailableBooks(): JsonResponse
    {
        try {
            $booksDTO = $this->getAvailableBooksUseCase->execute();
            
            $booksArray = array_map(function ($bookDTO) {
                return [
                    'id' => $bookDTO->id,
                    'title' => $bookDTO->title,
                    'isbn' => $bookDTO->isbn,
                    'published_year' => $bookDTO->published_year,
                    'available_copies' => $bookDTO->available_copies,
                    'authors' => $bookDTO->authors,
                    'genres' => $bookDTO->genres
                ];
            }, $booksDTO);

            return response()->json(['data' => $booksArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function search(string $query): JsonResponse
    {
        try {

            $booksDTO = $this->searchBooksUseCase->execute($query);
            
            $booksArray = array_map(function ($bookDTO) {
                return [
                    'id' => $bookDTO->id,
                    'title' => $bookDTO->title,
                    'isbn' => $bookDTO->isbn,
                    'published_year' => $bookDTO->published_year,
                    'available_copies' => $bookDTO->available_copies,
                    'authors' => $bookDTO->authors,
                    'genres' => $bookDTO->genres
                ];
            }, $booksDTO);

            return response()->json(['data' => $booksArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function findByGenre(string $genre): JsonResponse
    {
        try {

            $booksDTO = $this->findBooksByGenreUseCase->execute($genre);
            
            $booksArray = array_map(function ($bookDTO) {
                return [
                    'id' => $bookDTO->id,
                    'title' => $bookDTO->title,
                    'isbn' => $bookDTO->isbn,
                    'published_year' => $bookDTO->published_year,
                    'available_copies' => $bookDTO->available_copies,
                    'authors' => $bookDTO->authors,
                    'genres' => $bookDTO->genres
                ];
            }, $booksDTO);

            return response()->json(['data' => $booksArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function searchByGenre(string $query): JsonResponse
    {
        try {

            $booksDTO = $this->searchBooksByGenreUseCase->execute($query);
            
            $booksArray = array_map(function ($bookDTO) {
                return [
                    'id' => $bookDTO->id,
                    'title' => $bookDTO->title,
                    'isbn' => $bookDTO->isbn,
                    'published_year' => $bookDTO->published_year,
                    'available_copies' => $bookDTO->available_copies,
                    'authors' => $bookDTO->authors,
                    'genres' => $bookDTO->genres
                ];
            }, $booksDTO);

            return response()->json(['data' => $booksArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}