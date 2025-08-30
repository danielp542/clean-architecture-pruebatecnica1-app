<?php

namespace Domain\Entities;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'isbn',
        'published_year',
        'copies_total',
        'copies_available'
    ];

    protected $casts = [
        'published_year' => 'integer',
        'copies_total' => 'integer',
        'copies_available' => 'integer'
    ];

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'author_book');
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'book_genre');
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function isAvailable(): bool
    {
        return $this->copies_available > 0;
    }

    public function decrementCopies(): void
    {
        if ($this->copies_available > 0) {
            $this->copies_available--;
            $this->save();
        }
    }

    public function incrementCopies(): void
    {
        if ($this->copies_available < $this->copies_total) {
            $this->copies_available++;
            $this->save();
        }
    }

    public function getGenresListAttribute(): string
    {
        return $this->genres->pluck('name')->implode(', ');
    }
}