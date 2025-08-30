<?php

namespace Infrastructure\Persistence\Eloquent;

use Domain\Entities\Book;
use Domain\Repositories\BookRepository;

class EloquentBookRepository implements BookRepository
{
    public function findById(int $id): ?Book
    {
        return Book::with(['authors', 'genres'])->find($id);
    }

    public function getAll(): array
    {
        return Book::with(['authors', 'genres'])->get()->toArray();
    }

    public function save(Book $book): Book
    {
        $book->save();
        return $book;
    }

    public function delete(int $id): bool
    {
        return Book::destroy($id) > 0;
    }

    public function findByTitle(string $title): array
    {
        return Book::where('title', 'like', "%{$title}%")
            ->with(['authors', 'genres'])
            ->get()
            ->toArray();
    }

    public function findByIsbn(string $isbn): ?Book
    {
        return Book::where('isbn', $isbn)->with('authors')->first();
    }

    public function getAvailableBooks(): array
    {
        return Book::where('copies_available', '>', 0)
            ->with('authors')
            ->get()
            ->toArray();
    }

    public function search(string $query): array
    {
        return Book::where('title', 'like', "%{$query}%")
            ->orWhere('isbn', 'like', "%{$query}%")
            ->orWhereHas('authors', function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })
            ->with('authors')
            ->get()
            ->toArray();
    }

    public function findByGenre(string $genre): array
    {
        return Book::whereHas('genres', function($query) use ($genre) {
                $query->where('name', 'like', "%{$genre}%");
            })
            ->with(['authors', 'genres'])
            ->get()
            ->toArray();
    }

    public function searchByGenre(string $query): array
    {
        return Book::whereHas('genres', function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })
            ->with(['authors', 'genres'])
            ->get()
            ->toArray();
    }

}