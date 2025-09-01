export interface HttpResponse<T> {
  httpStatusCode: number; // Equivalente a HttpStatusCode
  message: string;
  data?: T;
  errors?: string[];
  extraData?: any;

  // Propiedades de paginación
  totalRecords?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
}
