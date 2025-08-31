<?php

namespace App\Http\Controllers;

use App\Core\Application\UseCases\Status\GetStatusByIdUseCase;
use App\Core\Application\UseCases\Status\GetAllStatusesUseCase;
use App\Core\Application\UseCases\Status\FindStatusByNameUseCase;
use App\Core\Application\UseCases\Status\CreateStatusUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function __construct(
        private GetStatusByIdUseCase $getStatusByIdUseCase,
        private GetAllStatusesUseCase $getAllStatusesUseCase,
        private FindStatusByNameUseCase $findStatusByNameUseCase,
        private CreateStatusUseCase $createStatusUseCase
    ) {}

    public function findById($id): JsonResponse
    {
        try {
            $statusDTO = $this->getStatusByIdUseCase->execute($id);
            
            if (!$statusDTO) {
                return response()->json(['error' => 'Status not found'], 404);
            }

            return response()->json([
                'id' => $statusDTO->id,
                'name' => $statusDTO->name,
                'description' => $statusDTO->description
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getAll(): JsonResponse
    {
        try {
            $statusesDTO = $this->getAllStatusesUseCase->execute();
            
            $statusesArray = array_map(function ($statusDTO) {
                return [
                    'id' => $statusDTO->id,
                    'name' => $statusDTO->name,
                    'description' => $statusDTO->description
                ];
            }, $statusesDTO);

            return response()->json(['data' => $statusesArray]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function findByName($name): JsonResponse
    {
        try {
            $statusDTO = $this->findStatusByNameUseCase->execute($name);
            
            if (!$statusDTO) {
                return response()->json(['error' => 'Status not found'], 404);
            }

            return response()->json([
                'id' => $statusDTO->id,
                'name' => $statusDTO->name,
                'description' => $statusDTO->description
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:statuses,name',
                'description' => 'nullable|string'
            ]);

            $statusDTO = $this->createStatusUseCase->execute(
                $request->name,
                $request->description
            );

            return response()->json([
                'message' => 'Status created successfully',
                'status' => [
                    'id' => $statusDTO->id,
                    'name' => $statusDTO->name,
                    'description' => $statusDTO->description
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}