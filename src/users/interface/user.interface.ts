import { CreateUserDto } from '../dto/create-user.dto';

export interface UserInterface extends CreateUserDto {
  id: number;
}
