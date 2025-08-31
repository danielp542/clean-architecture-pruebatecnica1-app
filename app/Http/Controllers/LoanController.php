<?php

namespace App\Http\Controllers;

use App\Core\Application\UseCases\Loan\CreateLoanUseCase;
use App\Core\Application\UseCases\Loan\GetAllLoansUseCase;
use App\Core\Application\UseCases\Loan\GetLoanByIdUseCase;
use App\Core\Application\UseCases\Loan\GetUserLoansUseCase;
use App\Core\Application\UseCases\Loan\GetOverdueLoansUseCase;
use App\Core\Application\UseCases\Loan\ReturnLoanUseCase;
use App\Core\Application\DTOs\CreateLoanDTO;
use App\Core\Application\Exceptions\MaxLoansExceededException;
use App\Core\Application\Exceptions\LoanPeriodExceededException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    public function __construct(
        private GetLoanByIdUseCase $getLoanByIdUseCase,
        private GetAllLoansUseCase $getAllLoansUseCase,
        private GetUserLoansUseCase $getUserLoansUseCase,
        private GetOverdueLoansUseCase $getOverdueLoansUseCase,
        private CreateLoanUseCase $createLoanUseCase,
        private ReturnLoanUseCase $returnLoanUseCase
    ) {}

    public function findById(int $id): JsonResponse
    {
        try {
            $loanDTO = $this->getLoanByIdUseCase->execute($id);
            
            if (!$loanDTO) {
                return response()->json(['error' => 'Loan not found'], 404);
            }

            return response()->json([
                'id' => $loanDTO->id,
                'user_id' => $loanDTO->user_id,
                'book_id' => $loanDTO->book_id,
                'status_id' => $loanDTO->status_id,
                'loan_date' => $loanDTO->loan_date,
                'due_date' => $loanDTO->due_date,
                'return_date' => $loanDTO->return_date,
                'user' => $loanDTO->user,
                'book' => $loanDTO->book,
                'status' => $loanDTO->status
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getAll(): JsonResponse
    {
        try {
            $loansDTO = $this->getAllLoansUseCase->execute();
            
            $loansArray = array_map(function ($loanDTO) {
                return [
                    'id' => $loanDTO->id,
                    'user_id' => $loanDTO->user_id,
                    'book_id' => $loanDTO->book_id,
                    'status_id' => $loanDTO->status_id,
                    'loan_date' => $loanDTO->loan_date,
                    'due_date' => $loanDTO->due_date,
                    'return_date' => $loanDTO->return_date,
                    'user' => $loanDTO->user,
                    'book' => $loanDTO->book,
                    'status' => $loanDTO->status
                ];
            }, $loansDTO);

            return response()->json(['data' => $loansArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getUserLoans(int $userId): JsonResponse
    {
        try {

            $loansDTO = $this->getUserLoansUseCase->execute($userId);
            
            $loansArray = array_map(function ($loanDTO) {
                return [
                    'id' => $loanDTO->id,
                    'user_id' => $loanDTO->user_id,
                    'book_id' => $loanDTO->book_id,
                    'status_id' => $loanDTO->status_id,
                    'loan_date' => $loanDTO->loan_date,
                    'due_date' => $loanDTO->due_date,
                    'return_date' => $loanDTO->return_date,
                    'user' => $loanDTO->user,
                    'book' => $loanDTO->book,
                    'status' => $loanDTO->status
                ];
            }, $loansDTO);

            return response()->json(['data' => $loansArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getOverdueLoans(): JsonResponse
    {
        try {
            $loansDTO = $this->getOverdueLoansUseCase->execute();
            
            $loansArray = array_map(function ($loanDTO) {
                return [
                    'id' => $loanDTO->id,
                    'user_id' => $loanDTO->user_id,
                    'book_id' => $loanDTO->book_id,
                    'status_id' => $loanDTO->status_id,
                    'loan_date' => $loanDTO->loan_date,
                    'due_date' => $loanDTO->due_date,
                    'return_date' => $loanDTO->return_date,
                    'user' => $loanDTO->user,
                    'book' => $loanDTO->book,
                    'status' => $loanDTO->status
                ];
            }, $loansDTO);

            return response()->json(['data' => $loansArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function createLoan(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'book_id' => 'required|integer|exists:books,id',
                'due_date' => 'required|date|after:today'
            ]);

            $dto = new CreateLoanDTO(
                $request->user_id,
                $request->book_id,
                $request->due_date
            );

            $loanDTO = $this->createLoanUseCase->execute($dto);

            return response()->json([
                'message' => 'Loan created successfully',
                'loan' => [
                    'id' => $loanDTO->id,
                    'user_id' => $loanDTO->user_id,
                    'book_id' => $loanDTO->book_id,
                    'status_id' => $loanDTO->status_id,
                    'loan_date' => $loanDTO->loan_date,
                    'due_date' => $loanDTO->due_date,
                    'user' => $loanDTO->user,
                    'book' => $loanDTO->book,
                    'status' => $loanDTO->status
                ]
            ], 201);

        } catch (MaxLoansExceededException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (LoanPeriodExceededException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function returnLoan(int $loanId): JsonResponse
    {
        try {

            $loanDTO = $this->returnLoanUseCase->execute($loanId);

            return response()->json([
                'message' => 'Loan returned successfully',
                'loan' => [
                    'id' => $loanDTO->id,
                    'user_id' => $loanDTO->user_id,
                    'book_id' => $loanDTO->book_id,
                    'status_id' => $loanDTO->status_id,
                    'loan_date' => $loanDTO->loan_date,
                    'due_date' => $loanDTO->due_date,
                    'return_date' => $loanDTO->return_date,
                    'user' => $loanDTO->user,
                    'book' => $loanDTO->book,
                    'status' => $loanDTO->status
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}