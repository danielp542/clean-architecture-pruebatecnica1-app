<?php

namespace Infrastructure\Persistence\Eloquent;

use Domain\Entities\Author;
use Domain\Repositories\AuthorRepository;

class EloquentAuthcorRepository implements AuthorRepository
{
    public function findById(int $id): ?Author
    {
        return Author::find($id);
    }

    public function getAll(): array
    {
        return Author::with('books')->get()->toArray();
    }

    public function save(Author $author): Author
    {
        $author->save();
        return $author;
    }

    public function delete(int $id): bool
    {
        return Author::destroy($id) > 0;
    }

    public function findByName(string $name): array
    {
        return Author::where('name', 'like', "%{$name}%")->get()->toArray();
    }
}