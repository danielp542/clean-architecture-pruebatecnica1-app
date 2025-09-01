export interface Loan {
  id?: number;
  user_id: number;
  book_id: number;
  status_id: number;
  loan_date: string;
  due_date: string;
  return_date?: string;
  user?: any;
  book?: any;
  status?: any;
}