<?php

namespace Domain\Entities;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'name',
        'birthdate',
        'nationality'
    ];

    protected $casts = [
        'birthdate' => 'date'
    ];

    public function books()
    {
        return $this->belongsToMany(Book::class, 'author_book');
    }
}