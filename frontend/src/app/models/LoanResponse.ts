import { Loan } from "./Loan";

export interface LoanResponse extends Loan {
  is_overdue: boolean;
  status_name: string;
}