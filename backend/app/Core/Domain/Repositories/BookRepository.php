<?php

namespace Domain\Repositories;

use Domain\Entities\Book;

interface BookRepository
{
    public function findById(int $id): ?Book;
    public function getAll(): array;
    public function save(Book $book): Book;
    public function delete(int $id): bool;
    public function findByTitle(string $title): array;
    public function findByIsbn(string $isbn): ?Book;
    public function getAvailableBooks(): array;
    public function search(string $query): array;
    public function findByGenre(string $genre): array;
    public function searchByGenre(string $query): array;
}