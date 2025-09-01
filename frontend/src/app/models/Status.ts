import { Loan } from "./Loan";

export interface Status {
  id?: number;
  name: string;
  description?: string;
  loans?: Loan[];
  created_at?: string;
  updated_at?: string;
}