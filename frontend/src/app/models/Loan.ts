import { Book } from "./book";
import { Status } from "./Status";
import { User } from "./User";

export interface Loan {
  id?: number;
  user_id: number;
  book_id: number;
  status_id: number;
  loan_date: string;
  due_date: string;
  return_date?: string;
  user?: User;
  book?: Book;
  status?: Status;
  created_at?: string;
  updated_at?: string;
}