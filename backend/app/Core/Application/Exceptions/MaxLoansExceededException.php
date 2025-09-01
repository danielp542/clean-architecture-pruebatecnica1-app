<?php

namespace App\Core\Application\Exceptions;

use Exception;

class MaxLoansExceededException extends Exception
{
    public function __construct()
    {
        parent::__construct('User cannot have more than 3 active loans', 400);
    }
}