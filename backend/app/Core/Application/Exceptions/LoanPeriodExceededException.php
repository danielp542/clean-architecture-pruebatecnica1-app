<?php

namespace App\Core\Application\Exceptions;

use Exception;

class LoanPeriodExceededException extends Exception
{
    public function __construct()
    {
        parent::__construct('Loan period cannot exceed 15 days', 400);
    }
}