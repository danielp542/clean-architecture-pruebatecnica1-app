import { Loan } from "./Loan";

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  email_verified_at?: string;
  loans?: Loan[];
  created_at?: string;
  updated_at?: string;
}