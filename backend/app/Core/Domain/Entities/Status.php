<?php

namespace Domain\Entities;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }
}