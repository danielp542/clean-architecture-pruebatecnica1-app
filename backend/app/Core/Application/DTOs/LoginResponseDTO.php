<?php

namespace Application\DTOs;

class LoginResponseDTO
{
    public function __construct(
        public string $access_token,
        public string $refresh_token,
        public string $token_type,
        public int $expires_in,
        public array $user
    ) {}

    public function toArray(): array
    {
        return [
            'access_token' => $this->access_token,
            'refresh_token' => $this->refresh_token,
            'token_type' => $this->token_type,
            'expires_in' => $this->expires_in,
            'user' => $this->user
        ];
    }
}