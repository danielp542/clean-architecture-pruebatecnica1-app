<?php

namespace Application\DTOs;

class RefreshTokenDTO
{
    public function __construct(
        public string $refresh_token
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            refresh_token: $data['refresh_token']
        );
    }
}