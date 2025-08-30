<?php

namespace Domain\Entities;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_genre');
    }
}