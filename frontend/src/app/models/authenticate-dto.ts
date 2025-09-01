import {MenuDto} from './menu-dto';
import { UserDto } from './user-dto';

export interface AuthenticateDto {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserDto;
}
