<?php

namespace Infrastructure\Persistence\Eloquent;

use Domain\Entities\Genre;
use Domain\Repositories\GenreRepository;

class EloquentGenreRepository implements GenreRepository
{
    public function findById(int $id): ?Genre
    {
        return Genre::with('books')->find($id);
    }

    public function findByName(string $name): ?Genre
    {
        return Genre::where('name', $name)->with('books')->first();
    }

    public function getAll(): array
    {
        return Genre::with('books')->get()->toArray();
    }

    public function save(Genre $genre): Genre
    {
        $genre->save();
        return $genre->load('books');
    }

    public function delete(int $id): bool
    {
        $genre = Genre::find($id);
        if ($genre) {
            // Eliminar relaciones muchos a muchos primero
            $genre->books()->detach();
            return $genre->delete();
        }
        return false;
    }
}