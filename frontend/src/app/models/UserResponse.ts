import { User } from "./User";

export interface UserResponse extends User {
  active_loans_count: number;
  can_borrow: boolean;
}