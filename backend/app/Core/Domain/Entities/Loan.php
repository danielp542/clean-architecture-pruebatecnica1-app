<?php

namespace Domain\Entities;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'status_id',
        'loan_date',
        'due_date',
        'return_date'
    ];

    protected $casts = [
        'loan_date' => 'datetime',
        'due_date' => 'datetime',
        'return_date' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function isOverdue(): bool
    {
        return $this->due_date->isPast() && $this->status->name !== 'devuelto';
    }

    public function markAsReturned(): void
    {
        $this->return_date = now();
        $this->status_id = Status::where('name', 'devuelto')->first()->id;
        $this->save();

        // Incrementar copias disponibles
        $this->book->incrementCopies();
    }
}