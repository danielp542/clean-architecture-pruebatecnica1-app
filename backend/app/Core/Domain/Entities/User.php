<?php

namespace Domain\Entities;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime'
    ];

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function activeLoans()
    {
        return $this->loans()->whereHas('status', function($query) {
            $query->where('name', 'prestado');
        });
    }

    public function canBorrow(): bool
    {
        // Lógica para determinar si el usuario puede pedir prestado
        return $this->activeLoans()->count() < 3; // Máximo 3 préstamos
    }
}